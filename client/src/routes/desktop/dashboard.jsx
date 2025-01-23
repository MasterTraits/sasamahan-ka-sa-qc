import React from "react";
import { UserInputProvider } from "@/contexts/useUserContext";
import AiChat from "@/components/features/aiChat";
import Desktop from "@/components/features/desktopComponents/desktopView";
import GraphGenerator from "@/components/features/graphs/graph";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function Dashboard() {
  return (
    <>
      <main className="h-screen w-screen relative">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25}>

            <UserInputProvider>
              <AiChat />
            </UserInputProvider>
            
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>

            <section>
              <h1>Dashboard</h1>
              </section>
            <section className="h-full w-full p-4">
              <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
              <GraphGenerator />
            </section>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
}

export default Dashboard;
