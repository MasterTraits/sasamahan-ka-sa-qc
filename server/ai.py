# D:\CODE\qc\sasamahan-ka-sa-qc\server\ai.py
import os
from dotenv import load_dotenv
import google.generativeai as genai
from sentence_transformers import SentenceTransformer

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Model Configuration
generation_config = {
    "temperature": 0.8,  # Adjust for creativity (lower = more focused)
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 1024,  # Adjust based on desired response length
    "response_mime_type": "text/plain",
}

# System Instruction (Prompt Engineering)
instruction = {
    "role": "system",
    "parts": [
        """You are GABAY, a financial analysis expert. Your goal is to assist users by providing insights from business documents. 
        You should prioritize information from the provided context over any pre-existing knowledge. 
        Respond conversationally, but keep your answers concise (around 3-5 sentences).

        **Guidelines:**
        - Focus on financial analysis and related topics.
        - Provide clear, data-driven recommendations when possible.
        - If a user question isn't related to finance or the provided context, politely inform them that it's outside your expertise.
        """
    ],
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
    system_instruction=instruction,
)

def GABAYAI(message: str, context: str = "") -> str:
    """
    Interacts with the Gemini AI model, providing context from uploaded files.

    Args:
        message (str): The user's question or message.
        context (str, optional): The content extracted from uploaded files. 
                                  Defaults to "".

    Returns:
        str: The AI's response.
    """
    try: 
        # Combine user message and context 
        if context:
            complete_prompt = f"{context}\n\nUser Question: {message}"
        else:
            complete_prompt = message

        response = model.generate_content([
            {"role": "user", "parts": [complete_prompt]}
        ])
        return response.text.replace("\\n", "\n")
    except Exception as e:
        return f"An error occurred: {str(e)}"

