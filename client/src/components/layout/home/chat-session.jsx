import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputArea from "../textarea";
import Notification from "@/components/layout/toast";
import UserChatBubble from "@/components/features/aiChatComponents/userChatBubble";
import AiChatBubble from "@/components/features/aiChatComponents/aiChatBubble";

import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import runChat from "@/config/gemini";
import api from "@/config/axios";
import { useUserContext } from "@/contexts/useUserContext";
import { dotStream } from "ldrs";
dotStream.register();

export default function ChatSession() {
  const {
    userInput,
    setUserInput,
    setAiResponse,
    chatHistory,
    setChatHistory,
  } = useUserContext();

  const [chatData, setChatData] = useState({});
  const { id } = useParams();
  const [loadingMessageId, setLoadingMessageId] = useState(null);


  const fetchData = async () => {
    try {
      const response = await api.get(`/history/${id}`);
      setChatData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAIResponse = async () => {
    if (!userInput) return;
    const messageId = Date.now().toString();
    
    try {
      const response = await runChat(userInput);
      setAiResponse(response);

      // Prepare new chat history data
      const newChatData = [
        ...(chatData.messages || []),
        {
          id: messageId,
          user: userInput,
          ai: response,
        },
      ];

      await api
        .put(`/history/${id}`, {
          ...chatData,
          messages: newChatData,
        })
        .catch((err) => {
          console.error("Failed to post chat history:", err);
        });
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoadingMessageId(null);
    }
  };

  // POST THE DATA 
  const postData = async () => {
    if (!userInput) return;

  }

  useEffect(() => {
    fetchData();
    // if (!id)
    fetchAIResponse(); // Put data
  }, [userInput]);

  return (
    <Card className="relative h-[calc(100%-160px)] bg-white rounded-t-2xl rounded-b-3xl mx-3 mt-2 border border-neutral-200">
      <CardHeader className="flex flex-row items-center justify-between px-4 py-5 leading-tight">
        <p className="leading-3 text-sm text-[#030303] font-medium">
          {chatData.category}
          <br />
          <span className="text-xl font-semibold tracking-tight leading-tight">
            {chatData.title}
          </span>
        </p>
        <Link 
          reloadDocument
          to="/home"
        >
          <Button className="text-md rounded-3xl px-6 bg-[#F4BE37] text-white hover:bg-[#F4BE37]/90">
            + New
          </Button>
        </Link>
      </CardHeader>
      <hr />
      <main className="relative h-[calc(100%-90px)] p-4 flex flex-col justify-end">
        <Notification success={true} />
        <div className="h-full overflow-y-auto">
          {chatData.messages && chatData.messages.map((chat, index) => (
            <div key={index}>
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
          <div></div>
        </div>
        <InputArea />
      </main>
    </Card>
  );
}
