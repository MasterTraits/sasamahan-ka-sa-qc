import React, { useContext } from 'react';
import { UserInputContext } from '@/contexts/UserInputContext';

export default function UserChatBubble() {
  const { userInput } = useContext(UserInputContext);

return (
    <main className="flex justify-end">
        <div className="bg-gray-300 rounded-lg rounded-tr-none p-2 inline-block max-w-[60%] ">    
            <p>{userInput}</p>
        </div>
    </main>
);
}