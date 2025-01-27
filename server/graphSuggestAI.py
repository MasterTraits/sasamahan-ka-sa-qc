import os
import google.generativeai as genai
import logging
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY_GRAPH"))
model = genai.GenerativeModel('gemini-pro')

def suggest_graph(csv_data, x_axis_column, y_axis_column):
    """
    Analyze the dataset using Gemini API and suggest the best graph type along with insights.

    Args:
        csv_data (list): The dataset in CSV format.
        x_axis_column (str): The column to be used for the X-axis.
        y_axis_column (str): The column to be used for the Y-axis.

    Returns:
        dict: A dictionary containing the suggested graph type and insights.
    """
    try:
        # Prepare the data for AI analysis
        data_summary = f"""
        The dataset contains {len(csv_data)} rows.
        The X-axis column is '{x_axis_column}' and the Y-axis column is '{y_axis_column}'.
        Here are the first 5 rows of data:
        {csv_data[:5]}
        """

        # Create the prompt for Gemini
        prompt = f"""
        You are a data visualization expert. Analyze the provided dataset and suggest the best type of graph to use. Also, provide insights, recommendations, and predictions based on the data.
       make it 2 to 3 sentences long. 

        Dataset Summary:
        {data_summary}

        Questions:
        1. What type of graph would best represent this data? (Choose from: line, bar, pie, doughnut, polarArea, radar) explain why.     
        2. What insights or trends can you derive from the data?
        3. What recommendations can you provide based on the data?
        3. What predictions can you make based on the data?

        Provide the response in the following format:
        - Suggested Graph Type: <graph_type>
        - Insights: <insights_or_recommendations>
        - Recommendations: <recommendations>
        - Predictions: <predictions>


        Do not include any additional text or explanations outside this format.
        """

        # Call the Gemini API
        response = model.generate_content(prompt)

        # Parse the response
        response_text = response.text.strip()
        logger.info(f"Raw Gemini Response: {response_text}")  # Log the raw response

        # Parse the plain text response
        suggested_graph_type = "line"  # Default fallback
        insights = "No insights available."

        # Extract the suggested graph type and insights
        lines = response_text.split("\n")
        for line in lines:
            if line.startswith("- Suggested Graph Type:"):
                suggested_graph_type = line.replace("- Suggested Graph Type:", "").strip().lower()
            elif line.startswith("- Insights:"):
                insights = line.replace("- Insights:", "").strip()
            elif line.startswith("- Recommendations:"):
                recommendations = line.replace("- Recommendations:", "").strip()
            elif line.startswith("- Predictions:"):
                predictions = line.replace("- Predictions:", "").strip()

        return {
            "suggestedGraphType": suggested_graph_type,
            "insights": insights,
            "recommendations": recommendations,
            "predictions": predictions
        }

    except Exception as e:
        logger.error(f"Error generating AI suggestions: {e}")
        return {
            "suggestedGraphType": "line",
            "insights": "Failed to generate insights. Please try again.",
            "recommendations": "Failed to generate recommendations. Please try again.",
            "predictions": "Failed to generate predictions. Please try again."
        }