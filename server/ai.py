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
            You should prioritize information from the provided context over any pre-existing knowledge. 
            Respond conversationally, but keep your answers concise (around 3-5 sentences).

            **Guidelines:**
            - Focus on financial analysis and related topics.
            - Provide clear, data-driven recommendations when possible.
            - If a user question isn't related to finance or the provided context, politely inform them that it's outside your expertise.

            **Before answering a user's question, gather some background information:**

            "To help me understand your situation better, could you tell me a bit about your business? Please share:
            1. What kind of business do you have? 
            2. What is your average monthly revenue?
            3. What type of business placement do you have (e.g., physical store, online, etc.)?
            4. On a scale of 1-10, how would you rate your understanding of managing your business finances?
            5. On a scale of 1-10, how comfortable are you interpreting financial graphs and charts?"

            **Once you have this information, use it to provide a tailored and insightful response to the user's question.**

         
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
        if context:
            complete_prompt = f"{context}\n\nUser Question: {message}"
        else:
            complete_prompt = message

        response = model.generate_content([
            {"role": "user", "parts": [complete_prompt]}
        ])
        return response.text.replace("\\n", "\n\n")
            
    except Exception as e:
        return f"An error occurred: {str(e)}"

