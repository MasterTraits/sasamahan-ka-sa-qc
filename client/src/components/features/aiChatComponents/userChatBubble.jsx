import { useUserContext } from "@/contexts/useUserContext";
import { CheckCheck } from 'lucide-react';

export default function UserChatBubble({message}) {
  const { userInput } = useUserContext();

return (
    <main className="flex justify-end items-center gap-2">
        <CheckCheck color="blue"/>
        <div className="bg-yellow shadow-md rounded-lg rounded-tr-none p-2 inline-block max-w-[60%]">    
            <p className="text-white">{message}</p>
        </div>
    </main>
);
}