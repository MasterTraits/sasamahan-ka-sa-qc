import { UserInputContext } from '@/contexts/useUserContext';
import React, { useContext } from 'react';
import { Copy } from 'lucide-react';
import ThumbsButton from './thumbsButton';
import runChat from '@/config/gemini';
import { useTypingAnimation } from './useTypingAnim';

export default function AiChatBubble({ message }) {
  const { userInput, setAiResponse } = useContext(UserInputContext);
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
        setChatHistory(prevHistory =>
          prevHistory.map(chat =>
            chat.id === messageId
              ? { ...chat, ai: response }
              : chat
          )
        );
      } catch (error) {
        console.error("Error regenerating response:", error);
      }
    }
  };

  return (
    <main className="relative flex-col justify-start items-center">
      <div className="p-2 border-b-2 border-b-neutral-200">
        <p>{displayedText}</p>
      </div>
      
      <section className='flex gap-1 items-center'>
        <button
          onClick={handleCopy}
          className="mt-1 ml-1 rounded p-1 text-sm"
        >
          <span className='flex gap-1 items-center text-grayText'>
            <Copy color="grayText" size={18} />
            Copy
          </span>
        </button>
        <ThumbsButton />
        <button 
          className='mt-1 ml-1 rounded p-1 text-sm'
          onClick={handleGenerateAgain}
        >
          <span className='flex gap-3 items-center justify-center'>
            <p className='text-lg'>|</p>
            <p className='text-grayText'>Generate again</p>
          </span>
        </button>
      </section>
    </main>
  );
}