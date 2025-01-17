import React, { useContext, useState, useEffect } from "react";
import { UserInputContext } from "@/contexts/UserInputContext";
import Header from "./aiChatComponents/header";
import Footer from "./aiChatComponents/footer";
import UserChatBubble from "./aiChatComponents/userChatBubble";
import runChat from "@/config/gemini";
import AiChatBubble from "./aiChatComponents/aiChatBubble";

export default function AiChat() {
  const { userInput } = useContext(UserInputContext);
  const { aiResponse, setAiResponse } = useContext(UserInputContext);

  
  const fetchAIResponse = async () => {
    if (userInput) {
      const response = await runChat(userInput);
      setAiResponse(response);
    }
  };

  useEffect(() => {
    fetchAIResponse();
  }, [userInput]);

  return (
    <main className="h-screen w-[25%] shadow-xl flex flex-col">
      <Header />
      <section className="p-4 flex-grow">
        <h1>TITLE TEXT HERE</h1>
        {userInput && <UserChatBubble />}
        {aiResponse && (
          <AiChatBubble />
        )}
      </section>
      <Footer />
    </main>
  );
}
