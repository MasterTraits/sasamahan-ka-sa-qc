import { UserInputContext } from '@/contexts/useUserContext';
import React, { useContext, useEffect} from 'react';
import { Copy } from 'lucide-react';
import ThumbsButton from './thumbsButton';
import runChat from '@/config/gemini';

export default function AiChatBubble() {
  const { userInput, aiResponse, setUserInput, setAiResponse } = useContext(UserInputContext);

  const handleCopy = () => {
    if (aiResponse) {
      navigator.clipboard.writeText(aiResponse);
    }
  };

  const handleGenerateAgain = async () => {
    if (userInput) {
      const response = await runChat(userInput);
      setAiResponse(response);
    }
  };

  useEffect(() => {
    (async () => {
      await handleGenerateAgain();
    })();
  }, [userInput]);
  
  return (
    <main className="relative flex-col justify-start items-center">
      <div className="p-2 border-b-2 border-b-neutral-200">
        <p>{aiResponse}</p>
      </div>

      <section className='flex gap-1 items-center'>
        <button
          onClick={handleCopy}
          className="mt-1 ml-1 rounded p-1 text-sm "
        >
          <span className='flex gap-1 items-center text-grayText '>
            <Copy color="grayText" size={18} />
            Copy
          </span>
        </button>

          
        <ThumbsButton />
        <button className='mt-1 ml-1 rounded p-1 text-sm'
        onClick={handleGenerateAgain}>  
          <span className='flex gap-3 items-center justify-center'>
            <p className='text-lg'>|</p>
            <p className='text-grayText'>Generate again</p>
          </span>
        </button>
      </section>
    </main>
  );
}