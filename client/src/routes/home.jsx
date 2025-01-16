import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlignLeft,
  Bell,
  LineChart,
  Menu,
  Paperclip,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import React from "react";

const navigationItems = [
  { icon: <Sparkles className="h-8 w-8" />, label: "Generate" },
  { icon: <LineChart className="h-8 w-8" />, label: "Visuals" },
];

export default function Home() {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-gradient-to-b from-[#F4BE37] via-white via-[#F6F7FB] to-[#4690FF] h-screen w-full relative">
        <header className="flex items-center justify-between px-8 pt-6">
          <div className="flex items-center gap-3">
            <Menu className="h-5 w-5 text-gray-600" />
            <span className="font-extrabold text-lg text-gray-600 tracking-tight">
              Menu
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6 text-gray-600" />
            </Button>
          </div>
        </header>

        <div className="absolute w-[363px] h-[75px] top-[324px] left-[39px]">
          <h1 className="font-normal text-3xl text-[#383838] tracking-tight">
            Harness the Power of Data with
            <span className="block text-[35px] font-medium bg-gradient-to-b from-[#F4BE37] to-[#3F55FF] bg-clip-text text-transparent text-center mt-2">
              GABAY
            </span>
          </h1>
        </div>

        <Card className="absolute w-[348px] left-[27px] top-[431px]">
          <CardContent className="p-3">
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Write here"
                className="font-medium text-gray-600"
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-3.5">
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Paperclip className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <AlignLeft className="h-6 w-6" />
                  </Button>
                </div>
                <Button
                  size="icon"
                  className="h-10 w-10 bg-[#1774FF] hover:bg-[#1774FF]/90"
                >
                  <Send className="h-6 w-6 text-white" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <nav className="absolute bottom-0 w-full h-[75px] bg-white border-t border-[#DFDFDF]">
          <div className="relative h-full ml-10">
            <div className="absolute h-[74px] w-[171px] bg-[#DFDFDF] rounded-t-[30px]" />
            <div className="flex items-end gap-12 absolute top-3 left-[59px]">
              {navigationItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  {item.icon}
                  <span className="text-xs tracking-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}