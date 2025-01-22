// shad@cn
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Paperclip,
  Send,
} from "lucide-react";

// Project Components
import Footer_Navigator from "@/components/layout/nav";
import Header from "@/components/layout/header";
import AI_MIC from "@/assets/mic";
import ChatSession from "@/components/layout/home/chat-session";
import History from "@/components/features/history";

// Utilities
import { useState } from "react";
import { useHistory } from "@/store/useHistory";
import { UserInputProvider } from "@/contexts/useUserContext";

export default function Home() {
  const menu = useHistory((state) => state.menu);

  const [cardAppear, setCardAppear] = useState(true);
  const [textContent, setTextContent] = useState({
    text: "",
    textLength: "",
  });

  return (
    <div className="relative gradient-custom h-screen w-full overflow-hidden">
      <Header text="Menu" />

      {!cardAppear ? (
        <main className="flex flex-col gap-7 justify-center items-start mx-7 h-full pb-32">
          <h1 className="font-normal text-4xl text-[#383838] tracking-tighter font-montserrat mx-2">
            Harness the Power
            <br /> of Data with
            <span
              className="font-jost text-4xl font-semibold bg-gradient-to-l tracking-tighter
                  from-[#F4BE37] to-[#3F55FF] bg-clip-text text-transparent text-center mt-2"
            >
              &nbsp;GABAY
            </span>
          </h1>

          <Card className="*:bg-white w-full rounded-2xl bg-white shadow-lg">
            <CardContent className="p-3 rounded-2xl">
              <div className="flex flex-col gap-4">
                <Textarea
                  placeholder="Write here"
                  className="font-medium text-neutral-600 tracking-tight rounded-xl"
                  rows="1"
                  value={textContent.text}
                  onChange={(e) =>
                    setTextContent({ ...textContent, text: e.target.value })
                  }
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
                    className="size-10 rounded-full bg-[#1774FF] hover:bg-[#1774FF]/90"
                  >
                    <Send className="h-6 w-6 text-white" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      ) 
      : (
        <UserInputProvider>
          <ChatSession/>
        </UserInputProvider>
      )}

      {menu ? <History /> : ""}
      <Footer_Navigator page="home" />
    </div>
  );
}
