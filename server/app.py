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
        # Access the uploaded file content (if available)
        relContext = ""
        if pdf_storage.currentText:
            relContext += "\n".join(pdf_storage.chunks)
        if csv_storage.currentText:
            relContext += "\n".join(csv_storage.chunks)

        # Include file content only if available
        if relContext:
            context = f"Using this document content as reference:\n\n{relContext}\n\nUser Question: {request.message}"
        else:
            context = request.message  # Use only the user message if no files

        response = GABAYAI(context)
        return {"message": response}
    except Exception as e:
        logger.error(f"Error in chat-with-context endpoint: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/upload") 
async def upload_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        if file.filename.endswith(".pdf"):
            pdf_reader = PDFReader(contents)
            pdf_storage.currentText = pdf_reader.extract_text()
            pdf_storage.chunks = split_text_into_chunks(pdf_storage.currentText)
            for i, chunk in enumerate(pdf_storage.chunks):
                vector_storage.store_vector(chunk)
                logger.debug(f"Stored vector for chunk {i+1}/{len(pdf_storage.chunks)}")
        elif file.filename.endswith(".csv"):
            csv_reader = CSVReader(contents)
            extracted_data = csv_reader.extract_text()
            csv_storage.currentText = str(extracted_data)
            csv_storage.chunks = split_text_into_chunks(csv_storage.currentText)
            for i, chunk in enumerate(csv_storage.chunks):
                vector_storage.store_vector(chunk)
                logger.debug(f"Stored vector for chunk {i+1}/{len(csv_storage.chunks)}")
        else:
            return JSONResponse({"message": "Invalid file type. Please upload a PDF or CSV."}, status_code=400)
        
        return JSONResponse({"message": "File uploaded and processed successfully!"}, status_code=200)

    except Exception as e:
        logger.error(f"Error uploading or processing file: {str(e)}", exc_info=True)
        return JSONResponse({"message": f"An error occurred: {str(e)}"}, status_code=500)



