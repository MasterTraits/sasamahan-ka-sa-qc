import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputArea from "../textarea";
import Notification from "@/components/layout/toast";
import UserChatBubble from "@/components/features/aiChatComponents/userChatBubble";
import AiChatBubble from "@/components/features/aiChatComponents/aiChatBubble";
import { useState, useEffect, useRef } from "react";
import runChat from "@/config/gemini";
import { useUserContext } from "@/contexts/useUserContext";
import { useParams, Link } from "react-router-dom";
import api from "@/config/axios";

export default function ChatSession() {
  const { userInput, aiResponse, setAiResponse, chatHistory, setChatHistory } =
    useUserContext();
  const [chatData, setChatData] = useState({});
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await api.get(`/history/${id}`);
      setChatData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAIResponse = async () => {
    if (userInput) {
      try {
        // Fetch AI response based on user input
        const response = await runChat(userInput);
        setAiResponse(response);

        // Prepare new chat history data
        const newChatData = [
          ...(chatData.messages || []),
          {
            user: userInput,
            ai: response
          }
        ];

        await api
          .put(`/history/${id}`, {
            ...chatData,
            messages: newChatData
          })
          .catch((err) => {
            console.error("Failed to post chat history:", err);
          });
      } catch (error) {
        console.error("Error fetching AI response:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    fetchAIResponse();
  }, [userInput]);

  return (
    <Card className="relative h-[calc(100%-160px)] bg-white rounded-t-2xl rounded-b-3xl mx-3 mt-2 border border-neutral-200">
      <CardHeader className="flex flex-row items-center justify-between px-4 py-5 leading-tight">
        <p className="leading-3 text-sm text-[#030303] font-medium">
          CATEGORY
          <br />
          <span className="text-xl font-semibold tracking-tight leading-tight">
            {chatData.title}
          </span>
        </p>
        <Link to="/home">
          <Button className="text-md rounded-3xl px-6 bg-[#F4BE37] text-white hover:bg-[#F4BE37]/90">
            + New
          </Button>
        </Link>
      </CardHeader>
      <hr />
      <main className="relative h-[calc(100%-90px)] p-4 flex flex-col justify-end">
        <Notification success={true} />
        <div className="h-full overflow-y-auto">
          {chatData.messages &&
            chatData.messages.map((chat, index) => (
              <div key={index}>
                <UserChatBubble message={chat.user} />
                <AiChatBubble message={chat.ai} />
              </div>
            ))}
          <div></div>
        </div>
        <InputArea />
      </main>
    </Card>
  );
}
