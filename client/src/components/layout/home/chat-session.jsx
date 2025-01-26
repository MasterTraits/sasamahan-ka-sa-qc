import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputArea from "../textarea";
import UserChatBubble from "@/components/features/aiChatComponents/userChatBubble";
import AiChatBubble from "@/components/features/aiChatComponents/aiChatBubble";
import { dotStream } from "ldrs"; dotStream.register();

import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import runChat from "@/config/gemini";
import axios from 'axios'
import api from "@/config/jsonserver";
import { useUserContext } from "@/contexts/useUserContext";
import { formattedDate, randomId, messageId } from "@/lib/extraData";
import { useId } from "@/store/useId";

export default function ChatSession({ textValue }) {
  const { id } = useParams(),
    setId = useId((state) => state.setPassedId);
  const { userInput } = useUserContext();
  const [chatData, setChatData] = useState({});
  const [loadingMessageId, setLoadingMessageId] = useState(null);
  const [generatedTitle, setGeneratedTitle] = useState("");
  const referenceMainRef = useRef(null);
  const [referenceHeight, setReferenceHeight] = useState(0);

  // GET, POST, PUT Request
  useEffect(() => {
    if (textValue) {
      postData(textValue);
    } else {
      fetchData();
      putData();
    }
  }, [userInput]);

  // Dynamite(Dynamic) height skibidi
  useEffect(() => {
    const updateHeight = () => {
      if (referenceMainRef.current) {
        setReferenceHeight(referenceMainRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    updateID();

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  useEffect(()=> {
    generateTitle(chatData)
  }, [chatData])

  const fetchData = async () => {
    try {
      const response = await api.get(`/history/${id}`);
      setChatData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  function updateID() {
    setId(id);
  }

  const generateTitle = async (chatData) => {
    if (chatData.length === 0) {
      setGeneratedTitle("New Conversation");
      return; // Exit early
    } else if (chatData.length < 3) {
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

  const postData = async (initialData) => {
    if (!initialData?.trim()) return;
    setLoadingMessageId(messageId);

    try {
      const response = await runChat(userInput);
      if (!response || typeof response !== "string")
        throw new Error("Invalid response from the API");

      await api.post("/history", {
        id: randomId,
        title: chatData.title || "New Chat",
        date: formattedDate,
        messages: [
          { id: messageId, user: initialData, ai: response },
        ],
      });

      window.location.href = `/home/${randomId}`;
    } catch (err) {
      console.error("Error posting chat history:", err);
    }
  };

  return (
    <Card className="relative h-[calc(100%-160px)] bg-white rounded-t-2xl rounded-b-3xl mx-3 mt-2 border border-neutral-200">
      <CardHeader
        ref={referenceMainRef}
        className="flex flex-row items-center justify-between px-4 py-5 leading-tight gap-2"
      >
        <p className="leading-3 text-sm text-[#030303] font-medium">
          {chatData.date}
          <br />
          <span className="text-xl font-semibold tracking-tight leading-tight">
            {(generatedTitle.title
              ? generatedTitle.title.slice(0, 30) +
                (generatedTitle.title.length < 30 ? "" : "...")
              : "") || chatData.title}
          </span>
        </p>
        <Link reloadDocument to="/home">
          <Button className="text-md rounded-3xl px-6 bg-[#F4BE37] text-white hover:bg-[#F4BE37]/90">
            + New
          </Button>
        </Link>
      </CardHeader>
      <hr />
      <main
        className="relative px-4 flex flex-col justify-end"
        style={{ height: `calc(95% - ${referenceHeight}px)` }}
      >
        <div className="overflow-y-auto mb-2">
          {chatData.messages?.map((chat, index) => (
            <div key={index}>
              <UserChatBubble message={chat.user} />
              {chat.id === loadingMessageId ? (
                <div className="flex justify-start p-4">
                  <l-dot-stream
                    size="70"
                    speed="2.5"
                    color="black"
                  ></l-dot-stream>
                </div>
              ) : (
                chat.ai && <AiChatBubble message={chat.ai} />
              )}
            </div>
          ))}
        </div>
        <InputArea />
      </main>
    </Card>
  );
}
