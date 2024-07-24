import json
import time
from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.params import Form
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


class PriorityLevelResponse(BaseModel):
    priority_level: str


# Initialize LLM and Memory
llm = OpenAI(model_name="gpt-3.5-turbo")
memory = ConversationBufferMemory()

def load_documents_from_path(path):
    documents = []
    if os.path.isfile(path) and path.endswith('.pdf'):
        doc = fitz.open(path)
        for page in doc:
            text = page.get_text()
            documents.append(text)
    return documents


def format_docs(docs):
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

@app.post("/generate_reminders")
async def generate_reminders(event: str = Form(...), file: UploadFile = File(None)):
    user_details = user_memory.get("user_details")
    if not user_details:
        raise HTTPException(status_code=400, detail="User details not set")

    # 解析 JSON 数据
    try:
        event_data = json.loads(event)
        event_details = EventDetails(**event_data)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON data")

    document_context = ""
    retriever = None
    if file:
        # 保存并处理上传的文件
        file_location = file.filename
        with open(file_location, "wb") as f:
            f.write(await file.read())
        # 解析文件内容
        documents = load_documents_from_path(file_location)
        embedding_model = OpenAIEmbeddings()
        # 提取文档内容
        texts = documents  # texts 现在是字符串列表
        # 创建向量存储并添加嵌入
        vector_store = FAISS.from_texts(texts, embedding_model)
        retriever = vector_store.as_retriever()
        document_context = format_docs(texts)

    prompt_template = PromptTemplate(
        input_variables=["context", "identity", "sleep_schedule", "challenge", "title", "category", "location", "details", "ddl"],
        template="""
        "I'm a {identity}, and my sleep schedule is {sleep_schedule}. "
        "The main challenges I face with time management are {challenge}.\n\n"
        "Generate three concise reminders for the following event: each one in a line\n"
        "Title: {title}\n"
        "Category: {category}\n"
        "Location: {location}\n"
        "Details: {details}\n"
        "Context: {context}\n"
        "Deadline: {ddl}\n"
        "Reminders can consider include:\n"
        "- Things to bring\n"
        "- Appropriate attire\n"
        "- Important things to note\n\n"
        "Reminders:"
        """
    )

    combined_input = {
        "context": document_context if retriever else "",
        "identity": user_details["identity"],
        "sleep_schedule": user_details["sleep_schedule"],
        "challenge": user_details["challenge"],
        "title": event_details.title,
        "category": event_details.category,
        "location": event_details.location,
        "details": event_details.details,
        "ddl": event_details.ddl,
    }

    rag_chain = (
        {"context": combined_input["context"],
         "identity": combined_input["identity"],
         "sleep_schedule": combined_input["sleep_schedule"],
         "challenge": combined_input["challenge"],
         "title": combined_input["title"],
         "category": combined_input["category"],
         "location": combined_input["location"],
         "details": combined_input["details"],
         "ddl": combined_input["ddl"]}
        | prompt_template
        | ChatOpenAI(api_key=os.environ["OPENAI_API_KEY"], model_name="gpt-3.5-turbo")
        | StrOutputParser()
    )

    try:
        result = rag_chain.invoke(combined_input)
    except ValueError as e:
        # Detailed error logging
        logging.error(f"Error in llm invoke: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    reminders = result.strip().split("\n")
    formatted_reminders = [reminder.strip() for reminder in reminders if reminder]
    print(formatted_reminders[:3])  # 打印返回的内容
    return formatted_reminders[:3]


@app.post("/generate_subtasks")
async def generate_subtasks(event: EventDetails, file: UploadFile = File(None)):
    start_time = time.time()
    user_details = user_memory.get("user_details")
    if not user_details:
        raise HTTPException(status_code=400, detail="User details not set")

    if file:
        # 保存并处理上传的文件
        file_location = f"files/{file.filename}"
        with open(file_location, "wb") as f:
            f.write(await file.read())
        # 解析文件内容
        documents = load_documents_from_path(file_location)
        texts = [doc.page_content for doc in documents]
        vector_store = FAISS.from_texts(texts, OpenAIEmbeddings())
        retriever = vector_store.as_retriever()
        prompt = hub.pull("rlm/rag-prompt")
        rag_chain = (
                {"context": retriever | format_docs, "question": RunnablePassthrough()}
                | prompt
                | ChatOpenAI(api_key=os.environ["OPENAI_API_KEY"], model_name="gpt-3.5-turbo")
                | StrOutputParser()
        )
        context = format_docs(documents)
    else:
        context = ""

    prompt_template = (
        "I am a {identity}, and my sleep schedule is {sleep_schedule}. "
        "The main challenges I face with time management are {challenge}.\n\n"
        "Generate three specific subtasks for the following event. Each subtask should follow the format strictly. Each subtask in a line:\n"
        "Title: {title}\n"
        "Category: {category}\n"
        "Location: {location}\n"
        "Details: {details}\n"
        "Event Deadline: {ddl}\n"
        "Format: Simple Description (Text) - Deadline: yyyy-mm-dd\n"
        "{context}\n"
        "Subtasks:"
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
        "context": context
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

    subtasks = result.strip().split("\n")
    formatted_subtasks = []
    for subtask in subtasks:
        if subtask:
            parts = subtask.split(" - Deadline: ")
            if len(parts) == 2:
                content, ddl = parts
                formatted_subtasks.append({"content": content.strip(), "ddl": ddl.strip()})

    end_time = time.time()
    processing_time = end_time - start_time
    print(processing_time)
    print(formatted_subtasks[:3])  # 打印返回的内容
    return {"subtasks": formatted_subtasks[:3], "processing_time": processing_time}





if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
