from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv

load_dotenv()

def LlamaInstance():
    groq_llama70b = ChatOpenAI(
        openai_api_key=os.getenv("GROQ_API_KEY"),
        base_url="https://api.groq.com/openai/v1",
        model="llama3-70b-8192",
        temperature=0.7,
        max_tokens=500
    )
    return groq_llama70b
