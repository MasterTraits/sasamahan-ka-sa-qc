import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

import AI_MIC from "@/assets/mic";
import AiChat from "@/components/features/aiChat";
import Desktop from "@/components/features/desktopComponents/desktopView";
import History from "@/components/features/history";
import GraphGenerator from "@/components/features/graphs/graph";

import { UserInputProvider } from "@/contexts/useUserContext";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "@/store/useHistory";

function Dashboard() {
  const { id } = useParams();
  const menu = useHistory((state) => state.menu);

  const [cardAppear, setCardAppear] = useState(false);
  const [textContent, setTextContent] = useState("");

  return (
    <>
      <main
        className={`h-screen w-screen relative ${
          cardAppear || id
            ? ``
            : `flex justify-center items-center gradient-custom overflow-hidden`
        }`}
      >
        {cardAppear || id ? (
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={23} maxSize={35}>

              <UserInputProvider>
                <AiChat />
              </UserInputProvider>
              {menu ? <History mobile={false} /> : ""}
              
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="">

              <section className="flex relative h-full w-full items-center justify-center">
                <Desktop />
              </section>

            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <main className="ml-80 flex flex-col gap-10 justify-center items-center mx-7 mt-24 h-full w-[calc(50%-100px)] pb-32">
            <h1 className="text-center font-normal text-4xl text-[#383838] tracking-tighter font-montserrat mx-2">
              Harness the Power of Data
              <br /> with
              <span
                className="font-jost text-4xl font-semibold bg-gradient-to-l tracking-tighter
                  from-[#F4BE37] to-[#3F55FF] bg-clip-text text-transparent text-center mt-2"
              >
                &nbsp;GABAY
              </span>
            </h1>

            <Card className="*:bg-white w-full rounded-3xl bg-white shadow-lg">
              <CardContent className="p-3 rounded-3xl">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCardAppear(true);
                  }}
                  className="flex flex-col gap-4"
                >
                  <Textarea
                    placeholder="Write here"
                    className="font-medium text-lg text-neutral-600 tracking-tight rounded-xl"
                    rows="1"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3.5">
                      <Button
                        size="icon"
                        className="size-10 rounded-full bg-stone-200 *:text-stone-700
                          hover:bg-stone-300"
                      >
                        <Paperclip />
                      </Button>
                      <Button
                        size="icon"
                        className="size-10 rounded-full bg-stone-200 *:text-stone-700
                          hover:bg-stone-300"
                      >
                        <AI_MIC />
                      </Button>
                    </div>
                    <Button
                      size="icon"
                      type="submit"
                      className="size-10 rounded-full bg-[#1774FF] hover:bg-[#1774FF]/90"
                    >
                      <Send className="h-6 w-6 text-white" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <History mobile={false} />
          </main>
        )}
      </main>
    </>
  );
}

export default Dashboard;
