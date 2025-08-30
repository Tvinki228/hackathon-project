from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from ollama import AskBody, query_ollama, DEFAULT_MODEL
from rag_utils import ingest_pdf, retrieve_context


app = FastAPI(title="LLM Backend (Ollama)")

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)


@app.get("/health")
def health():
    return {"ok": True}


# receices pdf and stores it
@app.post("/rag/ingest")
async def rag_ingest(file: UploadFile = File(...)):
    """Upload and ingest a PDF into the vector database."""
    import os

    os.makedirs("pdf_test", exist_ok=True)
    path = f"pdf_test/{file.filename}"
    with open(path, "wb") as f:
        f.write(await file.read())
    return ingest_pdf(path)


# receices question
# looks into pdfs
# returns answer
@app.post("/rag/ask")
async def rag_ask(body: AskBody):
    """Retrieve relevant document context + ask Ollama."""
    try:
        context = retrieve_context(body.question)
    except RuntimeError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Inject retrieved context into the system prompt
    prompt = f"Use the following context to answer:\n\n{context}\n\nQuestion: {body.question}"

    answer = await query_ollama(
        prompt=prompt,
        model=body.model or DEFAULT_MODEL,
        temperature=body.temperature,
        num_predict=body.num_predict,
    )

    return {"answer": answer}

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(app, host="0.0.0.0", port=8000)