import React, { useContext, useEffect } from "react";
import { UserInputContext } from "@/contexts/useUserContext";
import Header from "./aiChatComponents/header";
import Footer from "./aiChatComponents/footer";
import UserChatBubble from "./aiChatComponents/userChatBubble";
import runChat from "@/config/gemini";
import AiChatBubble from "./aiChatComponents/aiChatBubble";

export default function AiChat() {
  const {
    userInput,
    aiResponse,
    setAiResponse,
    chatHistory,
    setChatHistory,
  } = useContext(UserInputContext);

  const fetchAIResponse = async () => {
    if (userInput) {
      const response = await runChat(userInput);

      // Update AI response
      setAiResponse(response);

      // Add to chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { user: userInput, ai: response },
      ]);
    }
  };

  useEffect(() => {
    fetchAIResponse();
  }, [userInput]);

  return (
    <main className="h-screen w-[25%] shadow-xl flex flex-col p-4">
      <Header />
      <section className="p-4 flex-grow h-auto overflow-y-auto">
        <h1>TITLE TEXT HERE</h1>

        {/* Render chat history */}
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <UserChatBubble message={chat.user} />
            <AiChatBubble message={chat.ai} />
          </div>
        ))}
      </section>
      <Footer />
    </main>
  );
}
