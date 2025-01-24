import { UserInputContext } from "@/contexts/useUserContext";
import React, { useContext } from "react";
import { Copy } from "lucide-react";
import ThumbsButton from "./thumbsButton";
import runChat from "@/config/gemini";
import { useTypingAnimation } from "./useTypingAnim";
import Markdown from "react-markdown";

export default function AiChatBubble({ message }) {
  const { userInput, setAiResponse } = useContext(UserInputContext);

  // Ensure message is valid
  if (!message || typeof message !== 'string') {
    return null; // or return a fallback UI
  }

  // Use the typing animation hook
  const displayedText = useTypingAnimation(message, 25);

  const handleCopy = () => {
    if (message) {
      navigator.clipboard.writeText(message);
    }
  };

  const handleGenerateAgain = async () => {
    if (userInput) {
      try {
        const response = await runChat(userInput);
        setAiResponse(response);
      } catch (error) {
        console.error("Error regenerating response:", error);
      }
    }
  };

  return (
    <main className="relative flex-col justify-start items-center">
      <div className="p-2 border-b-2 border-b-neutral-200">
        <Markdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-blue">{children}</h1>
            ),
            p: ({ children }) => (
              <p className="text-black">{children}</p>
            ),
          }}
        >
          {displayedText}
        </Markdown>
      </div>

      <section className="flex gap-1 items-center">
        <button onClick={handleCopy} className="mt-1 ml-1 rounded p-1 text-sm">
          <span className="flex gap-1 items-center text-grayText">
            <Copy color="grayText" size={18} />
            Copy
          </span>
        </button>
        <ThumbsButton />
        <button
          className="mt-1 ml-1 rounded p-1 text-sm"
          onClick={handleGenerateAgain}
        >
          <span className="flex gap-3 items-center justify-center">
            <p className="text-lg">|</p>
            <p className="text-grayText">Generate again</p>
          </span>
        </button>
      </section>
    </main>
  );
}
