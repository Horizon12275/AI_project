from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import openai
import os
# Initialize FastAPI application
app = FastAPI()


os.environ["OPENAI_API_KEY"] = "sk-XysyZtmVqlQayx6tD75eBc6705B5426fA9F422Ad2a38D44c"
os.environ["OPENAI_API_BASE"] = "https://api.openai-hub.com/v1"


# Define request data model
class EventData(BaseModel):
    title: str
    category: str
    details: str


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

    def generate_summary(self, eventDatas:list[EventData]) -> str:
        prompt = "I have the following event data during this time period, Please evaluate and summarize my recent time allocation across various categories based on the provided information. Also make suggestionsfor improving my time management moving forward.\n"
        for eventDate in eventDatas:
            prompt += f"Title: {eventDate.title}\n"
            prompt += f"Category: {eventDate.category}\n"
            prompt += f"Details: {eventDate.details}\n\n"

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

@app.post("/generate_summary", response_model=str)
async def generate_summary(event_datas: list[EventData]):
    # if len(event_data.titles) != len(event_data.categories) or len(event_data.categories) != len(event_data.details):
    #     raise HTTPException(status_code=400, detail="Input arrays lengths are not consistent")

    # Generate the summary and suggestions using the OpenAIHandler
    output = llm_handler.generate_summary(event_datas)

    # Return the entire output without splitting
    return output


# Run the application (only when running this script directly)
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
