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
          role: chat.ai ? "assistant" : "user", // Determine role based on whether it's an AI response
          content: chat.ai ? chat.ai : chat.user, // Use AI response or user input
        })),
      };

      const response = await axios.post(
        "http://localhost:8000/api/title",
        payload, // Send the transformed payload
        {
          headers: {
            "Content-Type": "application/json", // Set headers
          },
        }
      );
      console.log("API Response:", response.data); // Log the response
      setGeneratedTitle(response.data.title);
    } catch (error) {
      console.error("Error generating title:", error.message); // Log the specific error
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

      await api.put(`/history/${id}`, {
        ...chatData,
        messages: [
          ...(chatData.messages || []),
          { id: messageId, user: userInput, ai: response },
        ],
      });

      fetchData();
    } catch (error) {
      await api.put(`/history/${id}`, {
        ...chatData,
        messages: [
          ...(chatData.messages || []),
          {
            id: messageId,
            user: userInput,
            ai: "An error occurred, please try again.",
          },
        ],
      });

      fetchData();
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