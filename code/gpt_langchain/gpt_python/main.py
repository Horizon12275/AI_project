from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging
from langchain_community.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
import os

app = FastAPI()

# Set OpenAI API key and base URL

api_key = "sk-tcegYgeYLJyxYhzWRdPIxEvLqS8aotCcv35rASiIX79Ke368"
api_base = "https://api.chatanywhere.tech/v1"
os.environ["OPENAI_API_KEY"] = api_key
os.environ["OPENAI_API_BASE"] = api_base
logging.basicConfig(level=logging.INFO)

class UserDetails(BaseModel):
    identity: str
    sleep_schedule: str
    time_management_challenges: str

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
        "time_management_challenges": user.time_management_challenges
    }
    memory.save_context({"user_input": "User details set."}, {"assistant_output": "User details saved."})
    return {"message": "User details set successfully"}

@app.post("/generate_priority")
async def generate_priority(event: EventDetails):
    user_details = user_memory.get("user_details")
    if not user_details:
        raise HTTPException(status_code=400, detail="User details not set")

    prompt_template = (
        "Given that I am a {identity} with the following sleep schedule: {sleep_schedule}, "
        "and my main challenges with time management are {time_management_challenges}, generate a priority level, please just answer in a word (high, medium or low) "
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
        "time_management_challenges": user_details["time_management_challenges"],
        "title": event.title,
        "category": event.category,
        "location": event.location,
        "details": event.details,
        "ddl": event.ddl
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

    priority_level = result.strip()
    return {"priority_level": priority_level}

@app.post("/generate_reminders")
async def generate_reminders(event: EventDetails):
    user_details = user_memory.get("user_details")
    if not user_details:
        raise HTTPException(status_code=400, detail="User details not set")

    prompt_template = (
        "I'm a {identity}, and my sleep schedule is {sleep_schedule}. "
        "The main challenges I face with time management are {time_management_challenges}.\n\n"
        "Generate three concise reminders for the following event:\n"
        "Title: {title}\n"
        "Category: {category}\n"
        "Location: {location}\n"
        "Details: {details}\n"
        "Deadline: {ddl}\n\n"
        "Reminders can include:\n"
        "- Things to bring\n"
        "- Appropriate attire\n"
        "- Important things to note\n\n"
        "Reminders:"
    )

    combined_input = {
        "identity": user_details["identity"],
        "sleep_schedule": user_details["sleep_schedule"],
        "time_management_challenges": user_details["time_management_challenges"],
        "title": event.title,
        "category": event.category,
        "location": event.location,
        "details": event.details,
        "ddl": event.ddl
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
    return {"reminders": formatted_reminders[:3]}

@app.post("/generate_subtasks")
async def generate_subtasks(event: EventDetails):
    user_details = user_memory.get("user_details")
    if not user_details:
        raise HTTPException(status_code=400, detail="User details not set")

    prompt_template = (
        "I am a {identity}, and my sleep schedule is {sleep_schedule}. "
        "The main challenges I face with time management are {time_management_challenges}.\n\n"
        "Generate three specific subtasks for the following event. Each subtask should include a simple description and a deadline:\n"
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
        "time_management_challenges": user_details["time_management_challenges"],
        "title": event.title,
        "category": event.category,
        "location": event.location,
        "details": event.details,
        "ddl": event.ddl
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
    formatted_subtasks = [subtask.strip() for subtask in subtasks if subtask]
    return {"subtasks": formatted_subtasks[:3]}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
