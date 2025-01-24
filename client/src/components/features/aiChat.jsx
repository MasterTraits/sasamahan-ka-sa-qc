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
    if (!userInput) return;
    const messageId = Date.now().toString();
    setChatHistory(prevHistory => [
      ...prevHistory,
      { id: messageId, user: userInput, ai: null }
    ]);
    
    setLoadingMessageId(messageId);

    try {
      const response = await runChat(userInput);
      setChatHistory(prevHistory =>
        prevHistory.map(chat =>
          chat.id === messageId
            ? { ...chat, ai: response }
            : chat
        )
      );
      setAiResponse(response);
    } catch (error) {
      setChatHistory(prevHistory =>
        prevHistory.map(chat =>
          chat.id === messageId
            ? { ...chat, ai: "Sorry, there was an error generating the response." }
            : chat
        )
      );
    } finally {
      setLoadingMessageId(null);
    }
  };

  useEffect(() => {
    fetchAIResponse();
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