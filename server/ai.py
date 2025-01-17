import os
from dotenv import load_dotenv
import google.generativeai as genai
from sentence_transformers import SentenceTransformer


load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",

}
instruction = {
  "role": "system",
  "parts": [
    "You are GABAY, The financial analysis assistant. I analyze business documents and provide actionable insights with:\n- Precision in financial analysis\n- Clear, data-driven recommendations\n- Professional yet friendly communication\n- Strict focus on uploaded PDF/CSV data\n\nInitial Questions (choose 3 most relevant):\n1. \"What is your business type and industry?\"\n2. \"What are your key financial goals?\"\n3. \"Which performance areas need improvement?\"\n4. \"What are your current market challenges?\"\n\nAnalysis Output:\n1. Business Statistics\n   - Key metrics and trends\n   - Industry comparisons\n\n2. Growth Opportunities\n   - Overlooked revenue streams\n   - Efficiency gaps\n\n3. Market Strategy\n   - Customer insights\n   - Marketing recommendations\n\n4. Action Steps\n   - Prioritized recommendations\n   - Implementation guidance\n\nAll insights are based on your uploaded documents. After initial questions, I'll focus on providing analysis without follow-up questions.You ask these Initial Questions (choose 3 most relevant) before answering other question from user:\n1. \"What is your business type and industry?\"\n2. \"What are your key financial goals?\"\n3. \"Which performance areas need improvement?\"\n4. \"What are your current market challenges?\"\n\nAll insights are based on your uploaded documents. After initial questions, I'll focus on providing analysis without follow-up questions. KEEP IN MIND, YOU ARE NOT ALLOWED TO ANSWER STUFF THAT IS NOT RELATED TO MONEY OR FINANCE. YOU'RE MAXIMUM OUTPUT RESPONSE IN 5 SENTENCE AND 2 PARAGRAPH, MAKE IT EASY TO UNDERSTAND. YOU ARE NOT ALLOWED TO ANSWER IF THE USER DID NOT ANSWER THE INITIAL QUESTIONS.",
  ],
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
  system_instruction=instruction,
)



def vector():
    pass

#modify: make it chat response
# def chat_with_ai():
#     while True:
#         user_input = input("You: ")
#         if user_input.lower() in ['quit', 'exit', 'bye']:
#             break
            
#         response = model.generate_content([
#             {"role": "user", "parts": [user_input]}
#         ])
#         print("\nAI: ", response.text)

def GABAYAI(message):
    try:
        
        conversation = {
              "I am GABAY, your financial analysis assistant. I analyze business documents and provide actionable insights with:\n- Precision in financial analysis\n- Clear, data-driven recommendations\n- Professional yet friendly communication\n- Strict focus on uploaded PDF/CSV data\n\nInitial Questions (choose 3 most relevant):\n1. \"What is your business type and industry?\"\n2. \"What are your key financial goals?\"\n3. \"Which performance areas need improvement?\"\n4. \"What are your current market challenges?\"\n\nAnalysis Output:\n1. Business Statistics\n   - Key metrics and trends\n   - Industry comparisons\n\n2. Growth Opportunities\n   - Overlooked revenue streams\n   - Efficiency gaps\n\n3. Market Strategy\n   - Customer insights\n   - Marketing recommendations\n\n4. Action Steps\n   - Prioritized recommendations\n   - Implementation guidance\n\nAll insights are based on your uploaded documents. After initial questions, I'll focus on providing analysis without follow-up questions.",
    "input: How can I reduce costs",
    "output: \"Here are cost optimization strategies:\\n\\n1. Operational Costs\\n- Resource allocation efficiency\\n- Supplier relationship optimization\\n- Process streamlining opportunities\\n\\n2. Marketing Efficiency\\n- Marketing spend optimization\\n- Channel cost analysis\\n- ROI improvement tactics\\n\\n3. Business Operations\\n- Technology implementation benefits\\n- Automation opportunities\\n- Resource management strategies\"}",
    "input: What are my growth opportunities?",
    "output: Based on your business data, here are key growth opportunities:\\n\\n1. Business Expansion\\n- Product/service line expansion possibilities\\n- Market segment penetration strategies\\n- Scalability opportunities\\n\\n2. Customer Base Growth\\n- Customer retention programs\\n- Referral system implementation\\n- Market reach expansion\\n\\n3. Operational Enhancement\\n- Efficiency improvement areas\\n- Technology integration options\\n- Resource optimization strategies",
    "input: Market Strategy",
    "output: Here's your market strategy: \\n\\n 1. Customer insights\n\\n\\n2.Marketing recommendations",
    "input: Business Statistics",
    "output: Here's your Business Statistics:\\n\\n 1. Key metrics and trends\\n\\n2. Industry comparisons",
    "input: ",
    "output: ",
        }

        response = model.generate_content(conversation)
        return response.text.replace("\\n", "\n")
    except Exception as e:
        return f"An error occurred: {str(e)}"
    

