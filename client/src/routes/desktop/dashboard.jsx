import React from "react";
import { UserInputProvider } from "@/contexts/useUserContext";
import AiChat from "@/components/features/aiChat";

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

          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
}

export default Dashboard;
