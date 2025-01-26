// shad@cn
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputArea from "../textarea";
import UserChatBubble from "@/components/features/aiChatComponents/userChatBubble";
import AiChatBubble from "@/components/features/aiChatComponents/aiChatBubble";
import LdotStream from "../../ui/loading/dotStream";

// Utilities
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import runChat from "@/config/gemini";
import api from "@/config/jsonserver";
import { useUserContext } from "@/contexts/useUserContext";
import { formattedDate, randomId, messageId } from "@/lib/extraData";

export default function ChatSession({ textValue }) {
  const { id } = useParams();
  const { userInput, aiResponse, setAiResponse } = useUserContext();
  const [chatData, setChatData] = useState({});
  const ENDPOINT = 'http://localhost:8000/api/title' || 
                    "http://127.0.0.1:8000/api/title"

  const [loadingMessageId, setLoadingMessageId] = useState(null);
  const [generatedTitle, setGeneratedTitle] = useState("");
  
  useEffect(() => {
    if (textValue)
      postData(textValue)
    else {
      fetchData();
      putData();
    }
  }, [userInput]);


  // FETCH DATA FROM JSON
  const fetchData = async () => {
    try {
      const response = await api.get(`/history/${id}`);
      setChatData(response.data);
    } catch (err) {
      console.error(err);
    }   
  };

  // Originally: fetchAIResponse
  const putData = async () => {
    if (!userInput || userInput.trim() === "") return;
    setLoadingMessageId(messageId)

    try {
      const response = await runChat(userInput);
      if (!response || typeof response !== "string") 
        throw new Error("Invalid response from the API");
      
      await api
        .put(`/history/${id}`, {
          ...chatData,
          messages: [
            ...(chatData.messages || []),
            {
              id: messageId,
              user: userInput,
              ai: response,
            },
          ],
        })
        .catch((err) => {
          console.error("Failed to post chat history:", err);
        });

      fetchData();
      
    } catch (error) {
      await api
        .put(`/history/${id}`, {
          ...chatData,
          messages: [
            ...(chatData.messages || []),
            {
              id: messageId,
              user: userInput,
              ai: "An error occured please try again.",
            },
          ],
        })
        .catch((err) => {
          console.error("Failed to post chat history:", err);
        });
        
      fetchData();

    } finally {
      setLoadingMessageId(null);
    }
  };

  // POST DATA
  const postData = async (initialData) => {
    if (!initialData || initialData.trim() === "") return; 
    setLoadingMessageId(messageId)
    
    try {
      // const response = await runChat(initialData);
      // if (!response || typeof response !== "string") 
      //   throw new Error("Invalid response from the API");

      await api.post("/history", {
        id: randomId,
        title: title || "New Chat",
        date: formattedDate,
        messages: [
          {
          id: messageId,
          user: initialData,
          ai: "response",
          graphs: ``
          },
        ],
      }).catch((err) => {
        console.error("Failed to post chat history:", err);
      }); 

      window.location.href = `/home/${randomId}`
    } catch (err) {
      console.error("Error fetching AI response:", err);
    }
  };

  return (
    <Card className="relative h-[calc(100%-160px)] bg-white rounded-t-2xl rounded-b-3xl mx-3 mt-2 border border-neutral-200">
      <CardHeader className="flex flex-row items-center justify-between px-4 py-5 leading-tight">
        <p className="leading-3 text-sm text-[#030303] font-medium">
          {chatData.date}
          <br />
          <span className="text-xl font-semibold tracking-tight leading-tight">
            {chatData.title}
          </span>
        </p>
        <Link reloadDocument to="/home">
          <Button className="text-md rounded-3xl px-6 bg-[#F4BE37] text-white hover:bg-[#F4BE37]/90">
            + New
          </Button>
        </Link>
      </CardHeader>
      <hr />
      <main className="relative h-[calc(100%-90px)] p-4 flex flex-col justify-end">

        <div className="h-full overflow-y-auto">
          {chatData.messages &&
            chatData.messages.map((chat, index) => (
              <div key={index}>
                <UserChatBubble message={chat.user} />
                {chat.id === loadingMessageId ? (
                  <div className="flex justify-start p-4">
                    <LdotStream
                      size="60"
                      speed="2.5"
                      color="black"
                    ></LdotStream>
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
