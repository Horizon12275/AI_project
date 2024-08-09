import time
import nacos

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging
from langchain_community.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.chat_models import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from typing import List
import os
import openai
import pandas as pd


app = FastAPI()

# register nacos

SERVER_ADDRESSES = "192.168.0.226:8848"
NAMESPACE = "public"

client = nacos.NacosClient(SERVER_ADDRESSES, namespace=NAMESPACE)
client.add_naming_instance(
    service_name="AI-service",
    ip="192.168.0.106",
    port="8000",
    cluster_name="DEFAULT",
    heartbeat_interval=5,
)

# Set OpenAI API key and base URL


api_key = "sk-XysyZtmVqlQayx6tD75eBc6705B5426fA9F422Ad2a38D44c"
api_base = "https://api.openai-hub.com/v1"
os.environ["OPENAI_API_KEY"] = api_key
os.environ["OPENAI_API_BASE"] = api_base
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
        "and my main challenges with time management are {challenge}, generate a priority level, please just answer a number range from 1 to 3,the bigger number,the greater priority."
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

    return result.strip()


@app.post("/generate_reminders")
async def generate_reminders(event: EventDetails):

    user_details = user_memory.get("user_details")
    if not user_details:
        raise HTTPException(status_code=400, detail="User details not set")

    prompt_template = (
        "I'm a {identity}, and my sleep schedule is {sleep_schedule}. "
        "The main challenges I face with time management are {challenge}.\n\n"
        "Generate three concise reminders for the following event: each one in a line\n"
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

    reminders = result.strip().split("\n")
    formatted_reminders = [reminder.strip() for reminder in reminders if reminder]
    print(formatted_reminders[:3])  # 打印返回的内容
    return formatted_reminders[:3]


@app.post("/generate_subtasks")
async def generate_subtasks(event: EventDetails):
    start_time = time.time()
    user_details = user_memory.get("user_details")
    if not user_details:
        raise HTTPException(status_code=400, detail="User details not set")

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
                formatted_subtasks.append(
                    {"content": content.strip(), "ddl": ddl.strip()}
                )

    end_time = time.time()
    processing_time = end_time - start_time
    print(processing_time)
    print(formatted_subtasks[:3])  # 打印返回的内容
    return formatted_subtasks[:3]


# Define request data model
class EventData(BaseModel):
    title: str
    category: str
    details: str


# Define a class for OpenAI interaction
class OpenAIHandler:

    def __init__(self, api_key: str, api_base: str, model_name: str):
        self.api_key = api_key
        self.api_base = api_base
        self.model_name = model_name
        openai.api_key = self.api_key
        openai.api_base = self.api_base

    def generate_summary(self, eventDatas: list[EventData]) -> str:
        prompt = "I have the following event data during this time period, Please evaluate and summarize my recent time allocation across various categories based on the provided information. Also make suggestionsfor improving my time management moving forward.\n"
        for eventDate in eventDatas:
            prompt += f"Title: {eventDate.title}\n"
            prompt += f"Category: {eventDate.category}\n"
            prompt += f"Details: {eventDate.details}\n\n"

        response = openai.ChatCompletion.create(
            model=self.model_name, messages=[{"role": "user", "content": prompt}]
        )

        return response.choices[0].message["content"].strip()


# Initialize the OpenAIHandler with the desired model
llm_handler = OpenAIHandler(
    api_key="sk-XysyZtmVqlQayx6tD75eBc6705B5426fA9F422Ad2a38D44c",
    api_base="https://api.openai-hub.com/v1",
    model_name="gpt-3.5-turbo",
)


# Define FastAPI route
@app.post("/generate_summary", response_model=str)
async def generate_summary(event_datas: list[EventData]):
    # if len(event_data.titles) != len(event_data.categories) or len(event_data.categories) != len(event_data.details):
    #     raise HTTPException(status_code=400, detail="Input arrays lengths are not consistent")

    # Generate the summary and suggestions using the OpenAIHandler
    output = llm_handler.generate_summary(event_datas)

    # Return the entire output without splitting
    return output


# 加载Excel文件
restaurants_df = pd.read_excel("restaurants.xlsx")

# 配置OpenAI API
openai.api_key = api_key


# 定义用户输入的数据模型
class UserQuery(BaseModel):
    question: str


class Document:
    def __init__(self, page_content):
        self.page_content = page_content


# 定义文档加载逻辑
def load_documents_from_df(df):
    documents = []
    for _, row in df.iterrows():
        doc = Document(
            page_content=f"Name: {str(row['Name'])}, Recommended Dishes: {str(row['Recommend'])}, Location: {str(row['Location'])}, Rating: {str(row['Rating'])}, Business Hours: {str(row['Business Hours'])}"
        )
        documents.append(doc)
        print("Loaded document:", doc)  # 调试信息
    return documents


documents = load_documents_from_df(restaurants_df)

# 使用 OpenAI 的嵌入模型来生成嵌入
embedding_model = OpenAIEmbeddings()

# 提取文档内容
texts = [doc.page_content for doc in documents]

# 创建向量存储并添加嵌入
vector_store = FAISS.from_texts(texts, embedding_model)

# 创建 OpenAI LLM
llm2 = ChatOpenAI(api_key=api_key, model_name="gpt-3.5-turbo")

# 自定义提示模板
prompt = PromptTemplate(
    input_variables=["context", "question"],
    template="""
    Based on the following restaurant information:
    {context}

    And here is what the customer want to eat:
    {question}

    Recommend a restaurant in the following format:
    - Restaurant Name: 
    - Location: 
    - Recommended Dishes: 
    - Business Hours: 
    """,
)

# 创建文档检索器
retriever = vector_store.as_retriever()


# 定义格式化文档的函数
def format_docs(docs):
    formatted_docs = "\n\n".join(doc.page_content for doc in docs)
    print("Formatted Docs:", formatted_docs)  # 调试信息
    return formatted_docs


# 创建 RAG 链
rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm2
    | StrOutputParser()
)


@app.post("/restaurants")
async def ask_question(user_query: UserQuery):
    try:
        question = user_query.question
        if not isinstance(question, str):
            raise ValueError("The question must be a string")
        # 生成RAG链的输入

        # 调试信息
        # print("RAG Input:", rag_input)

        # 使用RAG链生成回答
        result = rag_chain.invoke(user_query.question)

        # 调试信息
        print("RAG Chain Result:", result)

        # 解析结果
        result_lines = result.split("\n")
        response = {}
        for line in result_lines:
            if line.startswith("- Restaurant Name:"):
                response["restaurant_name"] = line[len("- Restaurant Name:") :].strip()
            elif line.startswith("- Location:"):
                response["location"] = line[len("- Location:") :].strip()
            elif line.startswith("- Recommended Dishes:"):
                response["recommended_dishes"] = line[
                    len("- Recommended Dishes:") :
                ].strip()
            elif line.startswith("- Business Hours:"):
                response["business_hours"] = line[len("- Business Hours:") :].strip()

        return response
    except Exception as e:
        # 打印详细的错误信息
        import traceback

        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
