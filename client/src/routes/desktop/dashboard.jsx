import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import AiChat from "@/components/features/aiChat";
import Desktop from "@/components/features/desktopComponents/desktopView";
import History from "@/components/features/history";

import { UserInputProvider } from "@/contexts/useUserContext";
import { useHistory } from "@/store/useHistory";

function Dashboard() {
  const menu = useHistory((state) => state.menu);

  return (
    <>
      <main
        className={`h-screen w-screen`}
      >
        <ResizablePanelGroup direction="horizontal" className='overflow-y-auto'> 
          <ResizablePanel defaultSize={23} maxSize={35}>
            <UserInputProvider>
              <AiChat />
            </UserInputProvider>
            {menu ? <History mobile={false} /> : ""}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel >
            <section className="flex relative h-full w-full items-center justify-center">
              <Desktop />
            </section>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </>
  );
}

export default Dashboard;
