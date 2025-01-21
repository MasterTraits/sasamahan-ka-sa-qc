import React from "react";
import { UserInputProvider } from "@/contexts/useUserContext";
import AiChat from "@/components/features/aiChat";
import Desktop from "@/components/features/desktopComponents/desktopView";
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


            <section className="flex relative h-full w-full">
              <Desktop/>
            </section>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
}

export default Dashboard;
