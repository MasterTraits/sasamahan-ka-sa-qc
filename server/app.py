import os
from fastapi import FastAPI, HTTPException, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import logging
from vector import vectorize_conversation
from filereader import PDFReader, split_text_into_chunks, CSVReader
from sklearn.metrics.pairwise import cosine_similarity
from ai import GABAYAI


# Load the model

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS
origins = [
    "http://localhost:5173", # Add your React app's port if different
    "http://localhost:8000",
    "http://127.0.0.1:8000" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)
#storage

class PDFStorage():
    def __init__(self):
        self.currentText = " "
        self.chunks = []

class CSVStorage():
    def __init__(self):
        self.currentText = " "
        self.chunks = []

class VectorStorage():
    def __init__(self):
        self.question_vectors = {}  # Initialize empty dict
        self.transformer_model = SentenceTransformer('all-MiniLM-L6-v2')

    def store_vector(self, question: str):
        self.question_vectors[question] = self.transformer_model.encode([question])[0]
        logger.debug(f"Stored vector for question: {question[:50]}...")

    def get_vector(self, question: str):
        if question not in self.question_vectors:
            raise KeyError(f"No vector found for question: {question[:50]}...")
        return self.question_vectors[question]


pdf_storage = PDFStorage()
csv_storage = CSVStorage()
vector_storage = VectorStorage()
transformer_model = SentenceTransformer('all-MiniLM-L6-v2')
#CORS

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        if not pdf_storage.currentText or not csv_storage.currentText:
            raise HTTPException(status_code=400, detail="Please upload a PDF and CSV file first.")
        
        relContext = "\n".join(pdf_storage.chunks + csv_storage.chunks)
        context = f"Using this document content as reference:\n\n{relContext}\n\nUser Question: {request.message}"

        response = GABAYAI(context)
        return {"message": response}
    except Exception as e:
        logger.error(f"Error in chat-with-context endpoint: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type.startswith('application/pdf'):
        pdf_content = await file.read()
        try:
            pdf_reader = PDFReader(pdf_content)
            pdf_storage.currentText = pdf_reader.extract_text()
            pdf_storage.chunks = split_text_into_chunks(pdf_storage.currentText)

            for i, chunk in enumerate(pdf_storage.chunks):
                vector_storage.store_vector(chunk)
                logger.debug(f"Stored vector for chunk {i+1}/{len(pdf_storage.chunks)}")

            return JSONResponse({"message": "PDF uploaded and processed successfully"})
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error processing PDF: {e}")
    else:
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF.")

@app.post("/api/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    if file.content_type.startswith('text/csv'):
        csv_content = await file.read()
        try:
            csv_reader = CSVReader(csv_content)
            extracted_data = csv_reader.extract_text()
            csv_storage.currentText = str(extracted_data)  # Convert list to string
            csv_storage.chunks = split_text_into_chunks(csv_storage.currentText)

            for i, chunk in enumerate(csv_storage.chunks):
                vector_storage.store_vector(chunk)
                logger.debug(f"Stored vector for chunk {i+1}/{len(csv_storage.chunks)}")

            return JSONResponse({"message": "CSV uploaded and processed successfully"})
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error processing CSV: {e}")
    else:
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a CSV.")



@app.get("/api/search-pdf/{query}")
async def search_pdf(query: str):
    query_vector = transformer_model.encode([query])[0]
    similarities = []

    for i, chunk in enumerate(pdf_storage.chunks):
        chunk_vector = vector_storage.get_vector(chunk)
        similarity = cosine_similarity([query_vector], [chunk_vector])[0][0]
        similarities.append((i, similarity))

    similarities = sorted(similarities, key=lambda x: x[1], reverse=True)

    top_results = []
    for i, similarity in similarities[:3]:  # Return top 3 results
        top_results.append({"chunk": pdf_storage.chunks[i], "similarity": similarity})
    
    return JSONResponse({"results": top_results})


@app.get("/api/search-csv/{query}")
async def search_csv(query: str):
    query_vector = transformer_model.encode([query])[0]
    similarities = []

    for i, chunk in enumerate(csv_storage.chunks):
        chunk_vector = vector_storage.get_vector(chunk)
        similarity = cosine_similarity([query_vector], [chunk_vector])[0][0]
        similarities.append((i, similarity))

    similarities = sorted(similarities, key=lambda x: x[1], reverse=True)

    top_results = []
    for i, similarity in similarities[:3]:  # Return top 3 results
        top_results.append({"chunk": csv_storage.chunks[i], "similarity": similarity})
    
    return JSONResponse({"results": top_results})

