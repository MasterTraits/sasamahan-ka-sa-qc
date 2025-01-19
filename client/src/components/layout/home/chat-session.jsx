import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XIcon, 
  Copy, 
  ThumbsDown, 
  ThumbsUp,
} from "lucide-react";
import InputArea from "../textarea";
import { useUserContext } from "@/contexts/useUserContext";
import Notification from '@/components/layout/toast'

export default function ChatSession() { 

  return (
    <Card className="relative h-[calc(100%-160px)] bg-white rounded-t-2xl rounded-b-3xl mx-3 mt-2 border border-neutral-200">
      <CardHeader className="flex flex-row items-center justify-between px-4 py-5 leading-tight">
        <p className="leading-3 text-sm text-[#030303] font-medium">
          Business Insights
          <br />
          <span className="text-xl font-semibold tracking-tight leading-tight">
            How to Generate Revenue
          </span>
        </p>
        <Button className="text-md rounded-3xl px-6 bg-[#F4BE37] text-white hover:bg-[#F4BE37]/90">
          + New
        </Button>
      </CardHeader>

      <hr />

      <main className="relative h-[calc(100%-90px)] p-4 flex flex-col justify-end">

        <Notification/>       

        <div className="h-full overflow-y-auto">
          <section className="w-full px-1 py-2 pr-2">
            <p className="tracking-tight pb-3 border-b-2 border-b-neutral-200 mb-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse ac neque a purus venenatis iaculis. Nulla dapibus
              ultricies est, sed fermentum leo. Morbi laoreet ac est consectetur
              mollis. Integer ullamcorper aliquet fermentum. Ut dictum, justo
              vitae viverra dignissim, ipsum orci pellentesque ex, ac
              consectetur eros nunc at nisi. Etiam id finibus enim. Vivamus id
              eleifend ipsum, quis dignissim ex. Nam massa lorem, tincidunt a
              maximus finibus, porta in quam.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            ac neque a purus venenatis iaculis. Nulla dapibus ultricies est, sed
            fermentum leo. Morbi laoreet ac est consectetur mollis. Integer
            ullamcorper aliquet fermentum.
          </p>
          <section className="w-full px-1 py-2 pr-2">
            <p className="tracking-tight pb-3 border-b-2 border-b-neutral-200 mb-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse ac neque a purus venenatis iaculis. Nulla dapibus
              ultricies est, sed fermentum leo. Morbi laoreet ac est consectetur
              mollis. Integer ullamcorper aliquet fermentum. Ut dictum, justo
              vitae viverra dignissim, ipsum orci pellentesque ex, ac
              consectetur eros nunc at nisi. Etiam id finibus enim. Vivamus id
              eleifend ipsum, quis dignissim ex. Nam massa lorem, tincidunt a
              maximus finibus, porta in quam.
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

        {/* <InputArea /> */}
      </main>
    </Card>
  );
}
