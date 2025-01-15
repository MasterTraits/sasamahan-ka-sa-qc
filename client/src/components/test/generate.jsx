import {
  AlignLeft,
  Bell,
  Check,
  Copy,
  LineChart,
  Menu as MenuIcon,
  Paperclip,
  Send,
  Telescope,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const messageData = {
  title: "Business Insights:",
  subtitle: "How to Generate Revenue",
  visualContent: {
    title: "Visuals Generated",
    subtitle: "Session 01 - Line Chart",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac neque a purus venenatis iaculis. Nulla dapibus ultricies est, sed fermentum leo. Morbi laoreet ac est consectetur mollis. Integer ullamcorper aliquet fermentum. Ut dictum, justo vitae viverra dignissim, ipsum orci pellentesque ex, ac consectetur eros nunc at nisi. Etiam id finibus enim. Vivamus id eleifend ipsum, quis dignissim ex. Nam massa lorem, tincidunt a maximus finibus, porta in quam.",
  },
  userMessage:
    "Generate data sheet that determines the sum of this and that and what not.",
  aiResponse:
    "Okay! here's what you request for blah blah lorem ipsum dolor et amet so niyahaha:\n\naospdiaspd\n...",
};

const navigationItems = [
  { icon: Bell, label: "Generate" },
  { icon: LineChart, label: "Visuals" },
];

export default function Dashboard() {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-gradient-to-b from-[#5388D8] via-[#F7F7F7] to-[#F4BE37] w-[402px] h-[874px] relative">
        <header className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-3">
            <MenuIcon className="h-5 w-5 text-[#686868]" />
            <span className="font-extrabold text-[#686868] text-lg tracking-tight">
              Menu
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Bell className="h-6 w-6 text-[#686868]" />
            <div className="h-8 w-8 rounded-full bg-[#686868]" />
          </div>
        </header>

        <Card className="mx-3 h-[721px] rounded-[20px_20px_30px_30px] border-[#dfdfdf]">
          <CardHeader className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-sm text-[#030303] font-medium">
                {messageData.title}
              </p>
              <CardTitle className="text-lg font-semibold tracking-tight">
                {messageData.subtitle}
              </CardTitle>
            </div>
            <Button className="bg-[#F4BE37] text-white hover:bg-[#F4BE37]/90">
              + New
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <Card className="bg-[#1774ffcc] backdrop-blur-sm p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <Telescope className="h-6 w-6" />
                  <div>
                    <h3 className="font-semibold">
                      {messageData.visualContent.title}
                    </h3>
                    <p className="text-sm">
                      {messageData.visualContent.subtitle}
                    </p>
                  </div>
                </div>
                <X className="h-5 w-5" />
              </div>
            </Card>

            <p className="text-sm text-[#4C4C4C]">
              {messageData.visualContent.description}
            </p>

            <div className="flex items-center gap-3 text-xs text-[#686868]">
              <Button variant="ghost" size="sm" className="gap-1">
                <Copy className="h-4 w-4" /> Copy
              </Button>
              <div className="flex gap-2">
                <ThumbsUp className="h-4 w-4" />
                <ThumbsDown className="h-4 w-4" />
              </div>
              <Separator orientation="vertical" className="h-4" />
              <span>Generate again</span>
            </div>

            <div className="flex items-start gap-4">
              <Check className="h-6 w-6 text-white bg-[#F4BE37] rounded-full p-1" />
              <div className="bg-[#F4BE37] text-white p-3 rounded-[10px_0px_10px_10px] shadow-md">
                {messageData.userMessage}
              </div>
            </div>

            <p className="text-sm text-[#4C4C4C]">{messageData.aiResponse}</p>

            <p className="text-sm text-[#B3B3B3] font-semibold">Generating..</p>

            <Card className="mt-auto">
              <CardContent className="p-4">
                <p className="text-[#686868] mb-4">Write here</p>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <AlignLeft className="h-5 w-5" />
                  </Button>
                  <Button size="icon" className="ml-auto bg-[#1774FF]">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <nav className="absolute bottom-0 w-full bg-white border-t border-[#dfdfdf] h-[75px]">
          <div className="flex justify-center gap-12 py-3">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex flex-col items-center gap-1"
              >
                <item.icon className="h-8 w-8" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}