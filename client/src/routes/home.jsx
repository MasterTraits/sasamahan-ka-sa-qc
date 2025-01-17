import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  Menu,
  Paperclip,
  Send,
  LucideUserCircle2,
} from "lucide-react";

import Footer_Navigator from '@/components/layout/nav'
import AI_MIC from "@/assets/mic";

import { useState } from "react";
import History from "@/components/features/history";

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [textContent, setTextContent] = useState({
    text: "",
    textLength: "",
  });

  return (
    <div className="relative gradient-custom h-screen w-full overflow-hidden">
      <header className="flex items-center justify-between mx-4 mt-6">
        <button
          onClick={()=> setMenu(true)} 
          className="flex items-center gap-3 py-1 px-3 hover:bg-white rounded-3xl"
        >
          <Menu className="h-5 w-5 text-neutral-600" />
          <span className="font-bold text-lg text-neutral-600 tracking-tight">
            Menu
          </span>
        </button>

        <div className="flex items-center mx-2 gap-5 pr-2 *:p-1 *:rounded-full">
          <div className="hover:bg-white text-center">
            <Bell className="text-neutral-600" />
          </div>
          <div className="hover:bg-white text-center">
            <LucideUserCircle2 className="text-neutral-600" />
          </div>
        </div>
      </header>

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

      {menu ? <History/> : ''}
      <Footer_Navigator page="home"/>
    </div>
  );
}
