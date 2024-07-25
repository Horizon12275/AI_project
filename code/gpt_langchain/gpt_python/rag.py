import json
import time
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging
from langchain_community.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
import os
from typing import List

from langchain_community.document_loaders import PyMuPDFLoader
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.chat_models import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.prompts import PromptTemplate
from langchain import hub
import fitz  # PyMuPDF

app = FastAPI()

# Set OpenAI API key and base URL
os.environ["OPENAI_API_KEY"] = "sk-XysyZtmVqlQayx6tD75eBc6705B5426fA9F422Ad2a38D44c"
os.environ["OPENAI_API_BASE"] = "https://api.openai-hub.com/v1"
logging.basicConfig(level=logging.INFO)


class UserDetails(BaseModel):
    identity: str
    sleep_schedule: str
    challenge: str


class EventDetails(BaseModel):
    title: str
    category: str
    location: str
    details: str
    ddl: str


class GenerateRemindersRequest(BaseModel):
    event: EventDetails
    path: str


# Initialize LLM and Memory
llm = OpenAI(model_name="gpt-3.5-turbo")
memory = ConversationBufferMemory()


def load_documents_from_path(path: str) -> List[str]:
    documents = []
    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)
        if os.path.isfile(file_path) and file_path.endswith('.pdf'):
            loader = PyMuPDFLoader(file_path)
            documents.extend(loader.load())
    return documents


def format_docs(docs: List[str]) -> str:
    return "\n\n".join(docs)


user_memory = {}


@app.post("/set_user_details")
def set_user_details(user: UserDetails):
    user_memory["user_details"] = {
        "identity": user.identity,
        "sleep_schedule": user.sleep_schedule,
        "challenge": user.challenge,
    }
    memory.save_context(
        {"user_input": "User details set."}, {"assistant_output": "User details saved."}
    )
    response = {"message": "User details set successfully"}
    print(response)  # 打印返回的内容
    return response


@app.post("/generate_priority")
async def generate_priority(event: EventDetails):
    user_details = user_memory.get("user_details")
    if not user_details:
        raise HTTPException(status_code=400, detail="User details not set")

    prompt_template = (
        "Given that I am a {identity} with the following sleep schedule: {sleep_schedule}, "
        "and my main challenges with time management are {challenge}, generate a priority level, please just answer in a word (high, medium or low) "
        "for the following event:\n"
        "Title: {title}\n"
        "Category: {category}\n"
        "Location: {location}\n"
        "Details: {details}\n"
        "Deadline: {ddl}\n\n"
        "Priority Level:"
    )

    combined_input = {
        "identity": user_details["identity"],
        "sleep_schedule": user_details["sleep_schedule"],
        "challenge": user_details["challenge"],
        "title": event.title,
        "category": event.category,
        "location": event.location,
        "details": event.details,
        "ddl": event.ddl,
    }

    formatted_prompt = prompt_template.format(**combined_input)

    # Debug print
    print(f"Formatted Prompt: {formatted_prompt}")

    try:
        result = llm(formatted_prompt)
    except ValueError as e:
        # Detailed error logging
        logging.error(f"Error in llm invoke: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    priority_level = result.strip().lower()

    if "high" in priority_level:
        priority = "high"
    elif "medium" in priority_level:
        priority = "medium"
    elif "low" in priority_level:
        priority = "low"
    else:
        priority = "unknown"  # 或者你可以抛出一个错误

    print(priority)  # 打印返回的内容
    return priority


@app.post("/generate_reminders")
async def generate_reminders(request: GenerateRemindersRequest):
    user_details = user_memory.get("user_details")
    if not user_details:
        raise HTTPException(status_code=400, detail="User details not set")

    event = request.event
    path = request.path

    

    documents = load_documents_from_path(path)
    embedding_model = OpenAIEmbeddings()
    texts = [doc.page_content for doc in documents]
    vector_store = FAISS.from_texts(texts, embedding_model)
    prompt = hub.pull("rlm/rag-prompt")
    retriever = vector_store.as_retriever()

    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    rag_chain = (
            {"context": retriever | format_docs, "question": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
    )

    rag_prompt_template = (
        "I'm a {identity}, and my sleep schedule is {sleep_schedule}. "
        "The main challenges I face with time management are {challenge}.\n\n"
        "Generate three concise reminders for the following event based on (reference) the documents' content : each one in a line.\n"
        "Title: {title}\n"
        "Category: {category}\n"
        "Location: {location}\n"
        "Details: {details}\n"
        "Deadline: {ddl}\n"
        "Reminders can consider include:\n"
        "- Things to bring\n"
        "- Appropriate attire\n"
        "- Important things to note\n\n"
        "Reminders:"
    )

    rag_formatted_prompt = rag_prompt_template.format(identity=user_details["identity"],
                                                      sleep_schedule=user_details["sleep_schedule"],
                                                      challenge=user_details["challenge"],
                                                      title=event.title,
                                                      category=event.category,
                                                      location=event.location,
                                                      details=event.details,
                                                      ddl=event.ddl)

    result2 = rag_chain.invoke(rag_formatted_prompt)

    reminders2 = result2.split('\n')

    # Select the desired reminders
    selected_reminders = [ reminders2[0], reminders2[1], reminders2[2]]

    # Combine the selected reminders
    final_reminders = "\n".join(selected_reminders)
    reminders = final_reminders.strip().split("\n")
    formatted_reminders = [reminder.strip() for reminder in reminders if reminder]
    print(formatted_reminders[:3])  # 打印返回的内容
    return formatted_reminders[:3]


@app.post("/generate_subtasks")
async def generate_subtasks(request: GenerateRemindersRequest):
    start_time = time.time()
    user_details = user_memory.get("user_details")
    if not user_details:
        raise HTTPException(status_code=400, detail="User details not set")

    event = request.event
    path = request.path


    documents = load_documents_from_path(path)
    embedding_model = OpenAIEmbeddings()
    texts = [doc.page_content for doc in documents]
    vector_store = FAISS.from_texts(texts, embedding_model)
    prompt = hub.pull("rlm/rag-prompt")
    retriever = vector_store.as_retriever()

    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    rag_prompt_template = (
        "I am a {identity}, and my sleep schedule is {sleep_schedule}. "
        "The main challenges I face with time management are {challenge}.\n\n"
        "Generate three specific subtasks for the following event based on (reference) the documents' content "
        "Title: {title}\n"
        "Category: {category}\n"
        "Location: {location}\n"
        "Details: {details}\n"
        "Event Deadline: {ddl}\n"
        "Each subtask should follow the format strictly. Each subtask in a line:\n"
        "Format: Simple Description (Text) - Deadline: yyyy-mm-dd\n"
    )

    rag_formatted_prompt = rag_prompt_template.format(identity=user_details["identity"],
                                                      sleep_schedule=user_details["sleep_schedule"],
                                                      challenge=user_details["challenge"],
                                                      title=event.title,
                                                      category=event.category,
                                                      location=event.location,
                                                      details=event.details,
                                                      ddl=event.ddl)

    rag_chain = (
            {"context": retriever | format_docs, "question": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
    )

    result2 = rag_chain.invoke(rag_formatted_prompt)
    print(result2)

    # Extract and split subtasks
    subtasks2 = result2.strip().split("\n")

    # Select the first two subtasks from each
    selected_subtasks = subtasks2[:3]

    # Format the selected subtasks
    formatted_subtasks = []
    for subtask in selected_subtasks:
        if subtask:
            parts = subtask.split(" - Deadline: ")
            if len(parts) == 2:
                content, ddl = parts
                formatted_subtasks.append({"content": content.strip(), "ddl": ddl.strip()})

    end_time = time.time()
    processing_time = end_time - start_time
    print(f"Processing time: {processing_time}")
    print(f"Formatted subtasks: {formatted_subtasks}")  # 打印返回的内容

    return formatted_subtasks[:3]


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
