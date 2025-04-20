from flask import Flask, request, jsonify
import os
import time
import tempfile
import json
from pypdf import PdfReader
import camelot
import chromadb
from chromadb import PersistentClient
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted
from tiktoken import get_encoding
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables 
load_dotenv()

app = Flask(__name__)
CORS(app)

# --- Load static chart data ---
SEGO_DATA_PATH = os.path.join(os.path.dirname(__file__), 'sego_output.json')
with open(SEGO_DATA_PATH, 'r') as f:
    sego_data = json.load(f)

# Configure constants and settings
CHROMA_DIR = "./chromadb_dir"
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
EMBED_MODEL = "gemini-embedding-exp-03-07"
CHAT_MODEL = "gemini-2.0-flash"
BATCH_SIZE = 32
CHUNK_TOKENS = 800

# Configure Google Generative AI
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    raise ValueError("GEMINI_API_KEY environment variable not set")

# Initialize tokenizer
enc = get_encoding("cl100k_base")

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Create ChromaDB directory if it doesn't exist
if not os.path.exists(CHROMA_DIR):
    os.makedirs(CHROMA_DIR)

# Helper: single-string embed → flat vector
def embed(text: str) -> list[float]:
    r = genai.embed_content(model=EMBED_MODEL, content=text)
    return r["embedding"]

# Build RAG prompt
def build_prompt(question: str, k: int = 5) -> str:
    client = PersistentClient(path=CHROMA_DIR)
    collection = client.get_collection(name="annual_report")
    q_vec = embed(question)
    res = collection.query(query_embeddings=[q_vec], n_results=k)
    docs, metas = res["documents"][0], res["metadatas"][0]
    prompt = (
        "You are an expert on the Annual Report.\n"
        "Use *only* these excerpts (cite pages) to answer:\n\n"
    )
    for d, m in zip(docs, metas):
        prompt += f"(p.{m['page']}) \"{d}\"\n\n"
    return prompt + f"Question: {question}\nAnswer:"

# Process PDF function
def process_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    raw_pages = [p.extract_text() for p in reader.pages]
    chunks, metadatas = [], []
    for page_num, page in enumerate(raw_pages, start=1):
        token_ids = enc.encode(page)
        for idx in range(0, len(token_ids), CHUNK_TOKENS):
            chunk = enc.decode(token_ids[idx : idx + CHUNK_TOKENS])
            chunks.append(chunk)
            metadatas.append({"page": page_num, "chunk_id": idx // CHUNK_TOKENS})

    embeddings = []
    for i in range(0, len(chunks), BATCH_SIZE):
        batch = chunks[i : i + BATCH_SIZE]
        while True:
            try:
                resp = genai.embed_content(model=EMBED_MODEL, content=batch)
                batch_embs = resp.get("embeddings") or resp.get("embedding")
                embeddings.extend(batch_embs)
                break
            except ResourceExhausted:
                print("Quota hit—sleeping 60s…")
                time.sleep(60)
            time.sleep(1.0)

    client = PersistentClient(path=CHROMA_DIR)
    collection = client.get_or_create_collection(
        name="annual_report",
        metadata={"hnsw:space": "cosine"}
    )

    for idx, (chunk, emb, meta) in enumerate(zip(chunks, embeddings, metadatas)):
        collection.add(
            ids=[str(idx)],
            documents=[chunk],
            embeddings=[emb],
            metadatas=[meta]
        )

    try:
        tables = camelot.read_pdf(pdf_path, pages="all", flavor="stream")
        table_dict = {f"table_{i+1}": t.df.to_dict() for i, t in enumerate(tables)}
    except Exception as e:
        print(f"Error extracting tables: {e}")
        table_dict = {}

    return {
        "num_chunks": len(chunks),
        "num_pages": len(raw_pages),
        "num_tables": len(table_dict),
        "collection_name": "annual_report",
        "tables": table_dict
    }

@app.route('/api/process-pdf', methods=['POST'])
def process_pdf_api():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and file.filename.endswith('.pdf'):
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        try:
            results = process_pdf(file_path)
            return jsonify({"success": True, "data": results, "file_path": file_path})
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "File must be a PDF"}), 400

@app.route('/api/query-pdf', methods=['POST'])
def query_pdf():
    data = request.json
    if not data or 'query' not in data:
        return jsonify({"error": "Missing query"}), 400
    try:
        prompt = build_prompt(data['query'])
        chat_model = genai.GenerativeModel(model_name=CHAT_MODEL)
        chat = chat_model.start_chat()
        reply = chat.send_message(prompt)
        return jsonify({"answer": reply.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ─── New Chart.js data routes ───────────────────────────────────────────────────

@app.route('/api/forecast', methods=['GET'])
def get_forecast():
    """
    Energy Forecasting:
    Returns { labels: [0,1,…], data: […] } for predicted_demand_kW
    """
    forecast = sego_data.get('forecast', {})
    data = forecast.get('predicted_demand_kW', [])
    labels = list(range(len(data)))
    return jsonify({"labels": labels, "data": data})

@app.route('/api/optimizer', methods=['GET'])
def get_optimizer():
    """
    Smart Grid Optimizer:
    Returns full per-hour array with demand, renewable vs non-renewable, cost, emissions, etc.
    """
    optimizer = sego_data.get('optimizer', [])
    return jsonify(optimizer)

@app.route('/api/emissions', methods=['GET'])
def get_emissions():
    """
    Emissions Estimator:
    Returns summary: baseline_CO2_kg, optimized_CO2_kg, saved_CO2_kg, percent_saved, etc.
    """
    emissions = sego_data.get('emissions', {})
    return jsonify(emissions)

# Add karthik's AI stuff
if __name__ == '__main__':
    app.run(debug=True, port=5000)
