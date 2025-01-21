import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import InputArea from "../textarea";
import Notification from '@/components/layout/toast'
import UserChatBubble from "@/components/features/aiChatComponents/userChatBubble";
import AiChatBubble from "@/components/features/aiChatComponents/aiChatBubble";
import { useEffect } from 'react' 
import runChat from '@/config/gemini';

import { useUserContext } from "@/contexts/useUserContext";

export default function ChatSession() { 
  const { 
    userInput,
    aiResponse,
    setAiResponse,
    chatHistory,
    setChatHistory, 
  } = useUserContext();

  const fetchAIResponse = async () => {
    if (userInput) {
      const response = await runChat(userInput);

      // Update AI response
      setAiResponse(response);

      // Add to chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { user: userInput, ai: response },
      ]);
    }
  };

  useEffect(() => {
    fetchAIResponse();
  }, [userInput]);


  return (
    <Card className="relative h-[calc(100%-160px)] bg-white rounded-t-2xl rounded-b-3xl mx-3 mt-2 border border-neutral-200">
      <CardHeader className="flex flex-row items-center justify-between px-4 py-5 leading-tight">
        <p className="leading-3 text-sm text-[#030303] font-medium">
          CATEGORY
          <br />
          <span className="text-xl font-semibold tracking-tight leading-tight">
            TITLE
          </span>
        </p>
        <Button className="text-md rounded-3xl px-6 bg-[#F4BE37] text-white hover:bg-[#F4BE37]/90">
          + New
        </Button>
      </CardHeader>

      <hr />

      <main className="relative h-[calc(100%-90px)] p-4 flex flex-col justify-end">

        {/* Create  statement for */}
        <Notification success={false}/>

        <div className="h-full overflow-y-auto">
          {chatHistory.map((chat, index) => (
            <div key={index}>
              <UserChatBubble message={chat.user} />
              <AiChatBubble message={chat.ai} />
            </div>
          ))}
        </div>

        <InputArea />
      </main>
    </Card>
  );
}
