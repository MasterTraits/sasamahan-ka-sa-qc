import React from "react";
import { UserInputProvider } from "@/contexts/useUserContext"; 
import AiChat from "@/components/features/aiChat"; 

function Dashboard() {
  return (
    <>
    <main className="h-screen w-screen flex relative">
    <UserInputProvider>
      <AiChat />     
    </UserInputProvider>

    <section>
      <h1>Dashboard</h1>
    </section>
    </main>
    </>
  );
}



export default Dashboard;
