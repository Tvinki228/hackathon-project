from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.embeddings import OllamaEmbeddings
import os

# Ollama embeddings model (nomic-embed-text is good for vector stores)
embeddings = OllamaEmbeddings(model="nomic-embed-text")
VECTOR_DIR = "chroma_store"


# Temporary VectorStore (you can persist to disk by giving persist_directory param)
vectorstore = None


def get_vectorstore():
    """Load or initialize persistent Chroma vector DB."""
    global vectorstore
    if vectorstore is None:
        if os.path.exists(VECTOR_DIR):
            vectorstore = Chroma(
                persist_directory=VECTOR_DIR, embedding_function=embeddings
            )
        else:
            os.makedirs(VECTOR_DIR, exist_ok=True)
            vectorstore = Chroma(
                persist_directory=VECTOR_DIR, embedding_function=embeddings
            )

    return vectorstore


def ingest_pdf(path: str):
    """Load a PDF, split into chunks, and store in vector DB."""
    global vectorstore
    loader = PyPDFLoader(path)
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = splitter.split_documents(docs)

    vectorstore = get_vectorstore()
    vectorstore.add_documents(chunks)

    return {"status": "ingested", "chunks": len(chunks), "file": os.path.basename(path)}


def retrieve_context(query: str, k: int = 3):
    """Return top-k chunks for a query."""
    vectorstore = get_vectorstore()
    retriever = vectorstore.as_retriever(search_kwargs={"k": k})
    results = retriever.get_relevant_documents(query)
    return "\n\n".join([r.page_content for r in results])
