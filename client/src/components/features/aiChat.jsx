import React, { useContext } from "react";
import { UserInputContext } from "@/contexts/UserInputContext"; // Import context
import Header from "./aiChatComponents/header";
import Footer from "./aiChatComponents/footer";
import UserChatBubble from "./aiChatComponents/userChatBubble";
export default function AiChat() {
  const { userInput } = useContext(UserInputContext); 

  return (
    <main className="h-screen w-[25%] shadow-xl flex flex-col">
      <Header />
      <section className="p-4 flex-grow">
        <h1>TITLE TEXT HERE</h1>
        {userInput &&(
          <UserChatBubble/>
        )}
      </section>
      <Footer />
    </main>
  );
}
