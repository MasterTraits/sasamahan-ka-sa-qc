import React, { useContext, useEffect, useState } from "react";
import { UserInputContext } from "@/contexts/useUserContext";
import Header from "../layout/header";
import Footer from "../layout/textarea";
import UserChatBubble from "./aiChatComponents/userChatBubble";
import AiChatBubble from "./aiChatComponents/aiChatBubble";
import runChat from "@/config/gemini";
import { dotStream } from 'ldrs';
import toast from "../layout/toast";
dotStream.register();

export default function AiChat() {
  const {
    userInput,
    aiResponse,
    setAiResponse,
    chatHistory,
    setChatHistory,
  } = useContext(UserInputContext);

  const [loadingMessageId, setLoadingMessageId] = useState(null);

  const fetchAIResponse = async () => {
    if (!userInput || userInput.trim() === "") return; // Ensure userInput is valid

    const messageId = Date.now().toString();
    setLoadingMessageId(messageId);

    try {
      const response = await runChat(userInput);

      // Ensure the response is valid before updating the state
      if (!response || typeof response !== 'string') {
        throw new Error("Invalid response from the API");
      }

      // Update chatHistory with the new message
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { id: messageId, user: userInput, ai: response },
      ]);

      setAiResponse(response); // Update aiResponse
    } catch (error) {
      console.error(error);

      // Add an error message to chatHistory if the API call fails
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { id: messageId, user: userInput, ai: "Sorry, there was an error generating the response." },
      ]);
    } finally {
      setLoadingMessageId(null); // Reset loading state
    }
  };

  useEffect(() => {
    if (userInput && userInput.trim() !== "") {
      fetchAIResponse();
    }
  }, [userInput]);

  return (
    <>
      <main className="h-screen shadow-xl flex flex-col p-4">
        <Header text="AI Chat Interface" />
        <section className="p-4 flex-grow h-auto overflow-y-auto">
          {chatHistory.map((chat) => (
            <div key={chat.id} className="space-y-4 mb-6">
              <UserChatBubble message={chat.user} />
              {chat.id === loadingMessageId ? (
                <div className="flex justify-start p-4">
                  <l-dot-stream
                    size="60"
                    speed="2.5"
                    color="black"
                  ></l-dot-stream>
                </div>
              ) : (
                chat.ai && <AiChatBubble message={chat.ai} />
              )}
            </div>
          ))}
        </section>
        <Footer />
      </main>
    </>
  );
}