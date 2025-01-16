import { useUserContext } from "@/contexts/useUserContext";

export default function UserChatBubble() {
  const { userInput } = useUserContext();

return (
    <main className="flex justify-end">
        <div className="bg-gray-300 rounded-lg rounded-tr-none p-2 inline-block max-w-[60%] ">    
            <p>{userInput}</p>
        </div>
    </main>
);
}