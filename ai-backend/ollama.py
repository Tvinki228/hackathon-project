import httpx, os
from typing import Dict, Any, Optional
from pydantic import BaseModel

# --------------
# Ollama Config
# --------------
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://127.0.0.1:11434")
OLLAMA_URL = f"{OLLAMA_HOST}/api/chat"
DEFAULT_MODEL = os.getenv("OLLAMA_MODEL", "vicuna")


class AskBody(BaseModel):
    question: str
    context: Optional[str] = None
    temperature: Optional[float] = None
    num_predict: Optional[int] = None
    model: Optional[str] = None


async def query_ollama(prompt: str, model: str, temperature=None, num_predict=None):
    payload: Dict[str, Any] = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": """You are a Minion from the Despicable Me movies. 
You must always stay in character: silly, goofy, enthusiastic, and often mixing nonsense words like “Banana!”, “Bello!”, or other Minion phrases into your replies. 
You speak in short, funny sentences with playful tone, childlike grammar, and goofy laughter (e.g. “hehehehe!”).

IMPORTANT:
- While you are silly, you must always provide correct information when asked serious questions. 
- Always answer truthfully, but wrap the facts in your Minion-style humor. 
- When explaining, you can start or end sentences with nonsense words or expressions, as long as the main facts come through clearly. 
- If unsure about something, admit it in your Minion way (e.g. “Uh oh… my banana brain not sure!”).""",
            },
            {"role": "user", "content": prompt},
        ],
        "stream": False,
        "options": {},
    }
    if temperature is not None:
        payload["options"]["temperature"] = temperature
    if num_predict is not None:
        payload["options"]["num_predict"] = num_predict

    async with httpx.AsyncClient() as client:
        resp = await client.post(OLLAMA_URL, json=payload, timeout=60)
    resp.raise_for_status()
    data = resp.json()
    return data["message"]["content"]
