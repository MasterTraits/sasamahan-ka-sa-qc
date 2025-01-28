import AIHeader from "./aiChatComponents/aiHeader";
import Footer from "../layout/textarea";
import UserChatBubble from "./aiChatComponents/userChatBubble";
import AiChatBubble from "./aiChatComponents/aiChatBubble";
import LdotStream from "@/components/ui/loading/dotStream";
import Form from "@/components/features/form";

import { UserInputContext } from "@/contexts/useUserContext";
import runChat from "@/config/gemini";
import api from "@/config/jsonserver";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { formattedDate, randomId, messageId } from "@/lib/extraData";

export default function AiChat() {
  const { id } = useParams();
  const { userInput } = useContext(UserInputContext);
  const [chatData, setChatData] = useState({});

  const [loadingMessageId, setLoadingMessageId] = useState(null);
  const [generatedTitle, setGeneratedTitle] = useState("");

  

  useEffect(() => {
      fetchData();
      putData();
  }, [userInput]);

  useEffect(() => {
    generateTitle(chatData);
  }, [chatData]);

  const fetchData = async () => {
    try {
      const response = await api.get(`/history/${id}`);
      setChatData(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const generateTitle = async (chatData) => {
    console.log("chatData:", chatData); // Log chatData to debug
  
    if (!chatData.title || chatData.title.length === 0) {
      setGeneratedTitle("New Conversation");
      return; // Exit early
    } else if (chatData.messages?.length < 3) {
      setGeneratedTitle("Generating Title...");
      return; // Exit early
    }
  
    try {
      const payload = {
        chat_history: chatData.messages?.map((chat) => ({
          role: chat.ai ? "assistant" : "user",
          content: chat.ai ? chat.ai : chat.user,
        })),
      };
  
      console.log("Payload:", payload); // Log payload to debug
  
      const response = await axios.post(
        "http://localhost:8000/api/title",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("API Response:", response.data); // Log API response to debug
  
      if (!response.data || !response.data.title) {
        throw new Error("Invalid title response from server");
      }
  
      const newTitle = response.data.title;
      setGeneratedTitle(newTitle);
  
      // Update chatData with the new title
      const updatedChatData = { ...chatData, title: newTitle };
      setChatData(updatedChatData);
  
      // Save the updated chatData back to the server
      await api.put(`/history/${id}`, updatedChatData);
  
    } catch (error) {
      console.error("Error generating title:", error); // Log the entire error object
      setGeneratedTitle("Error generating title");
    }
  };
  const putData = async () => {
    if (!userInput?.trim()) return;
    setLoadingMessageId(messageId);
  
    try {
      const response = await runChat(userInput);
      if (!response || typeof response !== "string")
        throw new Error("Invalid response from the API");
  
      const updatedChatData = {
        ...chatData,
        messages: [
          ...(chatData.messages || []),
          { id: messageId, user: userInput, ai: response },
        ],
      };
  
      // Save the updated chatData back to the server
      await api.put(`/history/${id}`, updatedChatData);
  
      setChatData(updatedChatData);
    } catch (error) {
      const updatedChatData = {
        ...chatData,
        messages: [
          ...(chatData.messages || []),
          {
            id: messageId,
            user: userInput,
            ai: "An error occurred, please try again.",
          },
        ],
      };
  
      // Save the updated chatData back to the server
      await api.put(`/history/${id}`, updatedChatData);
  
      setChatData(updatedChatData);
    } finally {
      setLoadingMessageId(null);
    }
  };



return (
<>
  <main className="h-screen shadow-xl flex flex-col p-4">
    <AIHeader title={generatedTitle} />
    <section className="px-2 py-4 flex flex-col flex-grow overflow-y-auto">
      {chatData.messages?.map((chat) => (
        <div key={chat.id} className="space-y-4 mb-6">
          <UserChatBubble message={chat.user} />
          {chat.id === loadingMessageId ? (
            <div className="flex justify-start p-4">
              <LdotStream size="60" speed="2.5" color="black" />
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