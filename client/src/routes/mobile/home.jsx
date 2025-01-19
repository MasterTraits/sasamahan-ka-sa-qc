// shad@cn
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Paperclip,
  Send,
  LucideTelescope,
  XIcon,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

// Project Components
import Footer_Navigator from "@/components/layout/nav";
import Header from "@/components/layout/header";
import AI_MIC from "@/assets/mic";

// Utilities
import History from "@/components/features/history";
import { useState } from "react";
import { useHistory } from "@/store/useHistory";

export default function Home() {
  const menu = useHistory((state) => state.menu);
  const [cardAppear, setCardAppear] = useState(true);
  const [textContent, setTextContent] = useState({
    text: "",
    textLength: "",
  });

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
      ) : (
        <Card className="relative h-[calc(100%-160px)] bg-white rounded-t-2xl rounded-b-3xl mx-3 mt-2 border border-neutral-200">
          <CardHeader className="flex flex-row items-center justify-between px-4 py-5 leading-tight">
            <p className="leading-3 text-sm text-[#030303] font-medium">
              {messageData.title}
              <br />
              <span className="text-xl font-semibold tracking-tight leading-tight">
                {messageData.subtitle}
              </span>
            </p>
            <Button className="text-md rounded-3xl px-6 bg-[#F4BE37] text-white hover:bg-[#F4BE37]/90">
              + New
            </Button>
          </CardHeader>

          <hr />

          <main className="relative h-[calc(100%-90px)] p-4 flex flex-col justify-end">
            <aside className="absolute top-3 w-[calc(100%-30px)] flex items-center justify-between rounded-2xl text-white bg-[#1774FF] opacity-85 backdrop-blur-sm px-5 py-3">
              <div className="flex items-center gap-4">
                <LucideTelescope className="size-8" />
                <div className="text-sm font-medium leading-tight">
                  <span className="text-base">Visuals Generated</span>
                  <br />
                  Session 01
                </div>
              </div>
              <XIcon />
            </aside>

            <div className="h-full overflow-y-auto">
            <section className="w-full px-1 py-2 pr-2">
                <p className="tracking-tight pb-3 border-b-2 border-b-neutral-200 mb-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse ac neque a purus venenatis iaculis. Nulla dapibus
                  ultricies est, sed fermentum leo. Morbi laoreet ac est
                  consectetur mollis. Integer ullamcorper aliquet fermentum. Ut
                  dictum, justo vitae viverra dignissim, ipsum orci pellentesque
                  ex, ac consectetur eros nunc at nisi. Etiam id finibus enim.
                  Vivamus id eleifend ipsum, quis dignissim ex. Nam massa lorem,
                  tincidunt a maximus finibus, porta in quam.
                </p>
                <div className="flex items-center gap-3 text-sm tracking-tight font-semibold text-[#686868]">
                  <Button variant="ghost" size="sm" className="gap-2 px-1">
                    <Copy className="h-4 w-4" /> Copy
                  </Button>
                  <div className="flex gap-1 border-r-2 border-r-neutral-400 *:size-4 pr-4">
                    <Button variant="ghost">
                      <ThumbsUp />
                    </Button>
                    <Button variant="ghost">
                      <ThumbsDown />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2 px-1">
                    Generate again
                  </Button>
                </div>
              </section>  
                <p className="my-4 ml-10 p-3 bg-[#F4BE37] text-white tracking-tight shadow-md rounded-tl-xl rounded-b-xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse ac neque a purus venenatis iaculis. Nulla dapibus
                  ultricies est, sed fermentum leo. Morbi laoreet ac est
                  consectetur mollis. Integer ullamcorper aliquet fermentum.
                </p>
              <section className="w-full px-1 py-2 pr-2">
                <p className="tracking-tight pb-3 border-b-2 border-b-neutral-200 mb-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse ac neque a purus venenatis iaculis. Nulla dapibus
                  ultricies est, sed fermentum leo. Morbi laoreet ac est
                  consectetur mollis. Integer ullamcorper aliquet fermentum. Ut
                  dictum, justo vitae viverra dignissim, ipsum orci pellentesque
                  ex, ac consectetur eros nunc at nisi. Etiam id finibus enim.
                  Vivamus id eleifend ipsum, quis dignissim ex. Nam massa lorem,
                  tincidunt a maximus finibus, porta in quam.
                </p>
                <div className="flex items-center gap-3 text-sm tracking-tight font-semibold text-[#686868]">
                  <Button variant="ghost" size="sm" className="gap-2 px-1">
                    <Copy className="h-4 w-4" /> Copy
                  </Button>
                  <div className="flex gap-1 border-r-2 border-r-neutral-400 *:size-4 pr-4">
                    <Button variant="ghost">
                      <ThumbsUp />
                    </Button>
                    <Button variant="ghost">
                      <ThumbsDown />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2 px-1">
                    Generate again
                  </Button>
                </div>
              </section>
            </div>

            <CardContent className="p-3 rounded-2xl shadow-lg border border-neutral-150">
              <div className="flex flex-col gap-4">
                <Textarea
                  placeholder="Write here"
                  className="font-medium text-neutral-600 tracking-tight rounded-xl "
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
          </main>
        </Card>
      )}

      {menu ? <History /> : ""}
      <Footer_Navigator page="home" />
    </div>
  );
}
