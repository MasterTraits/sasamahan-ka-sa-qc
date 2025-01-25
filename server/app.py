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
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist
from collections import OrderedDict


# Load the model

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
nltk.download('punkt')
nltk.download('stopwords')

app = FastAPI()

# CORS
origins = ["*"]

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


# @app.post("/api/graph")
# async def suggest_graph(request: Request):
#     pass
user_context = {}

class ContextRequest(BaseModel):
    business_type: str
    monthly_revenue: str
    business_placement: str
    finance_understanding: str
    comfort_with_graphs: str

@app.post("/api/set-context")
async def set_context(request: ContextRequest = None):
    global user_context
    if request:
        user_context = {
            "business_type": request.business_type,
            "monthly_revenue": request.monthly_revenue,
            "business_placement": request.business_placement,
            "finance_understanding": request.finance_understanding,
            "comfort_with_graphs": request.comfort_with_graphs,
        }
    else:
        user_context = {}  # No context provided
    return {"message": "Context set successfully"}

@app.get("/api/get-context")
async def get_context():
    global user_context
    if not user_context:
        raise HTTPException(status_code=404, detail="Context not set")
    return user_context

@app.post("/api/title")
async def generate_title(request: Request):
    try:
        data = await request.json()
        chat_history = data.get("chat_history", [])

        title = generate_title_from_chat(chat_history)
        return {"title": title}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating title: {e}")
    
def generate_title_from_chat(chat_history):
    all_words = []
    for message in chat_history:
        words = word_tokenize(message["content"])
        all_words.extend(word for word in words if word.isalnum() and word.lower() not in stopwords.words('english'))

    word_frequencies = FreqDist(all_words)
    most_frequent_words = list(OrderedDict.fromkeys(word_frequencies.most_common(5)))
    title = " ".join([word[0] for word in most_frequent_words]).title()
    return title

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        # Check if any documents are uploaded
        if not (pdf_storage.currentText or csv_storage.currentText):
            return {"message": "Please upload a PDF or CSV file first."}
        
        logger.debug(f"Received chat request: {request.message}")
        
        # Combine relevant chunks from both PDF and CSV
        relevant_chunks = []
        if pdf_storage.chunks:
            relevant_chunks.extend(pdf_storage.chunks[:3])
        if csv_storage.chunks:
            relevant_chunks.extend(csv_storage.chunks[:3])
            
        # Create focused context from relevant chunks
        relContext = "\n".join(relevant_chunks)
        
        # Add user context to the prompt
        global user_context
        if user_context:
            user_context_str = f"""
            Business Type: {user_context["business_type"]}
            Average Monthly Revenue: {user_context["monthly_revenue"]}
            Business Placement: {user_context["business_placement"]}
            Understanding of Business Finances (1-10): {user_context["finance_understanding"]}
            Comfort with Financial Graphs (1-10): {user_context["comfort_with_graphs"]}
            """
            relContext = f"{user_context_str}\n\n{relContext}"
        
        # Build prompt with focused context
        context = f"Using this document content as reference:\n\n{relContext}\n\nUser Question: {request.message}"
        
        logger.debug(f"Context length: {len(context)}")
        response = GABAYAI(request.message, context = relContext)
        
        return {"message": response}
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}", exc_info=True)
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

