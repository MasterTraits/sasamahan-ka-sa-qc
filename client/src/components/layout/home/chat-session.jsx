import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputArea from "../textarea";
import UserChatBubble from "@/components/features/aiChatComponents/userChatBubble";
import AiChatBubble from "@/components/features/aiChatComponents/aiChatBubble";
import { dotStream } from "ldrs"; dotStream.register();

import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import runChat from "@/config/gemini";
import api from "@/config/jsonserver";
import { useUserContext } from "@/contexts/useUserContext";
import { formattedDate, randomId, messageId } from "@/lib/extraData";
import { useId } from '@/store/useId'

const ENDPOINT = "http://localhost:8000/api/title";

export default function ChatSession({ textValue }) {
  const { id } = useParams();
  const setId = useId((state) => state.setPassedId)
  const { userInput } = useUserContext();
  const [chatData, setChatData] = useState({});
  const [loadingMessageId, setLoadingMessageId] = useState(null);
  const [generatedTitle, setGeneratedTitle] = useState("");
  const referenceMainRef = useRef(null);
  const [referenceHeight, setReferenceHeight] = useState(0);

  useEffect(() => {
    if (textValue) {
      postData(textValue);
    } else {
      fetchData();
      putData();
    }
  }, [userInput]);

  useEffect(() => {
    const updateHeight = () => {
      if (referenceMainRef.current) {
        setReferenceHeight(referenceMainRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    updateID()

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get(`/history/${id}`);
      setChatData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  function updateID() {
    setId(id)
  }

  const putData = async () => {
    if (!userInput?.trim()) return;
    setLoadingMessageId(messageId);

    try {
      const response = await runChat(userInput);
      if (!response || typeof response !== "string") throw new Error("Invalid response from the API");

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
          { id: messageId, user: userInput, ai: "An error occurred, please try again." },
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
      await api.post("/history", {
        id: randomId,
        title: chatData.title || "New Chat",
        date: formattedDate,
        messages: [{ id: messageId, user: initialData, ai: "response", graphs: `` }],
      });

      window.location.href = `/home/${randomId}`;
    } catch (err) {
      console.error("Error posting chat history:", err);
    }
  };

  return (
    <Card className="relative h-[calc(100%-160px)] bg-white rounded-t-2xl rounded-b-3xl mx-3 mt-2 border border-neutral-200">
      <CardHeader ref={referenceMainRef} className="flex flex-row items-center justify-between px-4 py-5 leading-tight">
        <p className="leading-3 text-sm text-[#030303] font-medium">
          {chatData.date}
          <br />
          <span className="mr-4 text-xl font-semibold tracking-tight leading-tight">
            {chatData.title ? chatData.title.slice(0, 30) + (chatData.title.length < 30 ? "" : "...") : ""}
          </span>
        </p>
        <Link reloadDocument to="/home">
          <Button className="text-md rounded-3xl px-6 bg-[#F4BE37] text-white hover:bg-[#F4BE37]/90">
            + New
          </Button>
        </Link>
      </CardHeader>
      <hr />
      <main className="relative px-4 flex flex-col justify-end" style={{ height: `calc(95% - ${referenceHeight}px)` }}>
        <div className="overflow-y-auto mb-2">
          {chatData.messages?.map((chat, index) => (
            <div key={index}>
              <UserChatBubble message={chat.user} />
              {chat.id === loadingMessageId ? (
                <div className="flex justify-start p-4">
                  <l-dot-stream size="70" speed="2.5" color="black"></l-dot-stream>
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
