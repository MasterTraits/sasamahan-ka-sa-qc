import React from "react";
<<<<<<< HEAD
import { UserInputProvider } from "@/contexts/useUserContext"; 
import AiChat from "@/components/features/aiChat"; 
import Desktop from "@/components/features/desktopComponents/desktopView"; 
=======
import { UserInputProvider } from "@/contexts/useUserContext";
import AiChat from "@/components/features/aiChat";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

>>>>>>> f2b11af23012bf0b1396bab9b256866affaa337e
function Dashboard() {
  return (
    <>
      <main className="h-screen w-screen relative">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={25}>

<<<<<<< HEAD
    <section className="h-screen flex-grow">
      <Desktop />
    </section>
    </main>
=======
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
>>>>>>> f2b11af23012bf0b1396bab9b256866affaa337e
    </>
  );
}

export default Dashboard;
