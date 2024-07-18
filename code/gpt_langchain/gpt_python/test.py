import os
import openai
from langchain import hub
# from langchain.chains import RetrievalQA
# from langchain.chains.llm import LLMChain
from langchain_community.chat_models import ChatOpenAI
from langchain.document_loaders import TextLoader
from langchain.document_loaders import PyMuPDFLoader
# from langchain.vectorstores import DocArrayInMemorySearch
# from IPython.display import display, Markdown
# from langchain.indexes import VectorstoreIndexCreator
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.prompts import PromptTemplate

# 设置 OpenAI API 密钥
api_key = "sk-tcegYgeYLJyxYhzWRdPIxEvLqS8aotCcv35rASiIX79Ke368"
api_base = "https://api.chatanywhere.tech/v1"
os.environ["OPENAI_API_KEY"] = api_key
os.environ["OPENAI_API_BASE"] = api_base


def load_documents_from_path(path):
    documents = []
    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)
        if os.path.isfile(file_path) and file_path.endswith('.pdf'):
            loader = PyMuPDFLoader(file_path)
            documents.extend(loader.load())
    return documents


# 指定文件路径
path = "/Users/suntianran/Desktop/reference"
documents = load_documents_from_path(path)

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
    You are an AI assistant. Here is some context information:
    {context}

    Based on the above context, please answer the following question:
    {question}
    """
)

prompt = hub.pull("rlm/rag-prompt")
# 创建 LLMChain


# 创建文档检索器
retriever = vector_store.as_retriever()


# 定义格式化文档的函数
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


# 创建 RAG 链
rag_chain = (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
)


# 询问问题并生成回答
# result = rag_chain.invoke("Please give me three concise reviewing subtasks for the lesson with specific deadlines. Format: Simple Description (Text) - Deadline: yyyy-mm-dd\n for example(just for the format not the content) 1.xxxxxx - Deadline: 2024-03-22")


result = rag_chain.invoke("Please give me three concise reminders for the lesson test")

print(result)



