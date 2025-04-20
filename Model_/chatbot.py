import os
import google.generativeai as genai
from chromadb import PersistentClient
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# 1) API key & model names
EMBED_MODEL = "gemini-embedding-exp-03-07"
CHAT_MODEL  = "gemini-2.0-flash"          # or "gemini-pro", etc.

# 2) Re‑open Chroma store
store      = PersistentClient(path="./chromadb_dir")
collection = store.get_collection(name="annual_report")

# 3) Helper: single‑string embed  → flat vector
def embed(text: str) -> list[float]:
    r = genai.embed_content(model=EMBED_MODEL, content=text)  # pass *string*
    return r["embedding"]                                     # list[float]

# 4) Build RAG prompt
def build_prompt(question: str, k: int = 5) -> str:
    q_vec = embed(question)
    res   = collection.query(query_embeddings=[q_vec], n_results=k)
    docs, metas = res["documents"][0], res["metadatas"][0]

    prompt = (
        "You are an expert on the LTIMindtree Annual Report.\n"
        "Use *only* these excerpts (cite pages) to answer:\n\n"
    )
    for d, m in zip(docs, metas):
        prompt += f"(p.{m['page']}) \"{d}\"\n\n"
    return prompt + f"Question: {question}\nAnswer:"

# 5) Ask Gemini via GenerativeModel
chat_model = genai.GenerativeModel(model_name=CHAT_MODEL)

def answer(question: str) -> str:
    prompt = build_prompt(question)
    chat   = chat_model.start_chat()
    reply  = chat.send_message(prompt)
    return reply.text
