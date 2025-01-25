const API_ENDPOINT = "http://localhost:8000/api/chat";

const runChat = async (userInput) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userInput }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.message; 
  } catch (error) {
    throw new Error(error.message || "An error occurred"); S
  }
};

export default runChat;