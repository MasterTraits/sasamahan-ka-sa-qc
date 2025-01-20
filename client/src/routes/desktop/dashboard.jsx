import React from "react";
import { UserInputProvider } from "@/contexts/useUserContext"; 
import AiChat from "@/components/features/aiChat"; 
import Desktop from "@/components/features/desktopComponents/desktopView"; 
function Dashboard() {
  return (
    <>
    <main className="h-screen w-screen flex relative">
    <UserInputProvider>
      <AiChat />     
    </UserInputProvider>

    <section className="h-screen flex-grow">
      <Desktop />
    </section>
    </main>
    </>
  );
}



export default Dashboard;
