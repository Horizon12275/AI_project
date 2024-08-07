import time
import nacos

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging
from langchain_community.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
import os
from typing import List
import openai

app = FastAPI()

SERVER_ADDRESSES = "192.168.0.106:8848"
NAMESPACE = "public"

client = nacos.NacosClient(SERVER_ADDRESSES, namespace=NAMESPACE)
client.add_naming_instance(
    service_name="AI-service", port="8000", cluster_name="DEFAULT", heartbeat_interval=5
)

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

class EventData(BaseModel):
    titles: List[str]
    categories: List[str]
    details: List[str]


# Define response data model
class SummaryResponse(BaseModel):
    result: str



# Define a class for OpenAI interaction
class OpenAIHandler:

    def __init__(self, api_key: str, api_base: str, model_name: str):
        self.api_key = api_key
        self.api_base = api_base
        self.model_name = model_name
        openai.api_key = self.api_key
        openai.api_base = self.api_base

    def generate_summary(self, titles: List[str], categories: List[str], details: List[str]) -> str:
        prompt = "I have the following event data during this time period, Please evaluate and summarize my recent time allocation across various categories based on the provided information. Also make suggestionsfor improving my time management moving forward.\n"
        for title, category, detail in zip(titles, categories, details):
            prompt += f"Event Title: {title}\nCategory: {category}\nDetails: {detail}\n\n"

        response = openai.ChatCompletion.create(
            model=self.model_name,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message['content'].strip()


# Initialize the OpenAIHandler with the desired model
llm_handler = OpenAIHandler(api_key="sk-XysyZtmVqlQayx6tD75eBc6705B5426fA9F422Ad2a38D44c", api_base="https://api.openai-hub.com/v1", model_name="gpt-3.5-turbo")


# Define FastAPI route

@app.post("/generate_summary", response_model=SummaryResponse)
async def generate_summary(event_data: EventData):
    if len(event_data.titles) != len(event_data.categories) or len(event_data.categories) != len(event_data.details):
        raise HTTPException(status_code=400, detail="Input arrays lengths are not consistent")

    # Generate the summary and suggestions using the OpenAIHandler
    output = llm_handler.generate_summary(event_data.titles, event_data.categories, event_data.details)

    # Return the entire output without splitting
    return SummaryResponse(result=output.strip())


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
