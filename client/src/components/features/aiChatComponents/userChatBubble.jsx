import { useUserContext } from "@/contexts/useUserContext";
import { CheckCheck, XCircle } from 'lucide-react';

export default function UserChatBubble({message}) {
  const { userInput } = useUserContext();

return (
    <main className="flex justify-end items-center gap-2">
        <CheckCheck color="blue"/>
        <div className="my-4 bg-yellow shadow-md rounded-xl rounded-tr-none p-2 inline-block max-w-[90%]">    
            <p className="text-white">{message}</p>
        </div>
    </main>
);
}