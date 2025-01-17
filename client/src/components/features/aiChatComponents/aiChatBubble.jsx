import { UserInputContext } from '@/contexts/UserInputContext';
import React, {useContext}from 'react'

export default function AiChatBubble() {
  const {aiResponse } = useContext(UserInputContext);
  return (
    <main className="flex justify-start">
    <div className="bg-blue-300 shadow-md rounded-lg rounded-t-none p-2 inline-block max-w-[60%] ">    
        <p>{aiResponse}</p>
    </div>
</main>
  )
}
