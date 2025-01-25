import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Model Configuration
generation_config = {
    "temperature": 0,  # Adjust for creativity (lower = more focused)
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 1024,  # Adjust based on desired response length
    "response_mime_type": "text/plain",
}

# System Instruction (Prompt Engineering)
instruction = {
    "role": "system",
    "parts": [
        """You are GABAY, a financial analysis expert. Your goal is to assist users by providing insights into their business. 
            You should prioritize information from the provided context over any pre-existing knowledge but don't restrict yourself. 
            Respond conversationally, but keep your answers concise (around 3-5 sentences). Be curious and ask a question.

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
    try: 
        # Combine the user's context with their question
        complete_prompt = f"{context}\n\nUser Question: {message}"

        # Generate a response using the AI model
        response = model.generate_content([
            {"role": "user", "parts": [complete_prompt]}
        ])
        
        # Return the AI's response, replacing escaped newlines with actual newlines
        return response.text.replace("\\n", "\n\n")
            
    except Exception as e:
        # Handle any errors that occur during the process
        return f"An error occurred: {str(e)}"