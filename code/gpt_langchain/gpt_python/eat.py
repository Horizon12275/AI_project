import os
import openai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
from langchain import hub
from langchain_community.chat_models import ChatOpenAI
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# 设置 OpenAI API 密钥
api_key = "sk-XysyZtmVqlQayx6tD75eBc6705B5426fA9F422Ad2a38D44c"
api_base = "https://api.openai-hub.com/v1"
os.environ["OPENAI_API_KEY"] = api_key
os.environ["OPENAI_API_BASE"] = api_base

app = FastAPI()

# 加载Excel文件
restaurants_df = pd.read_excel('restaurants.xlsx')

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
        doc = Document(page_content=f"Name: {str(row['Name'])}, Recommended Dishes: {str(row['Recommend'])}, Location: {str(row['Location'])}, Rating: {str(row['Rating'])}, Business Hours: {str(row['Business Hours'])}")
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
llm = ChatOpenAI(api_key=api_key, model_name="gpt-3.5-turbo")

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
    """
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
        | llm
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
        result_lines = result.split('\n')
        response = {}
        for line in result_lines:
            if line.startswith("- Restaurant Name:"):
                response['restaurant_name'] = line[len("- Restaurant Name:"):].strip()
            elif line.startswith("- Location:"):
                response['location'] = line[len("- Location:"):].strip()
            elif line.startswith("- Recommended Dishes:"):
                response['recommended_dishes'] = line[len("- Recommended Dishes:"):].strip()
            elif line.startswith("- Business Hours:"):
                response['business_hours'] = line[len("- Business Hours:"):].strip()

        return response
    except Exception as e:
        # 打印详细的错误信息
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
