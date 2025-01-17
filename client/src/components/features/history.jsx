import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Plus, Search } from "lucide-react";

const historyData = {
  "Previous 7 days": [
    "Business Insights for ...",
    "Suggestion in creating...",
    "Policy Adaptation to...",
  ],
  "Previous 30 days": [
    "Business Insights for ...",
    "Suggestion in creating...",
    "Policy Adaptation to...",
  ],
  August: [
    "Business Insights for ...",
    "Suggestion in creating...",
    "Policy Adaptation to...",
  ],
};

export default function History() {
  return (
    <Card className="absolute left-0 top-0 w-80 h-full bg-stone-700 border-none rounded-none backdrop-blur z-50">
      <CardContent className="flex flex-col gap-8 p-[18px] pt-8">
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-[31px]">
            <Button
              variant="ghost"
              className="flex items-center gap-2 w-[217px] h-[53px] bg-[#33363f] rounded-3xl text-[#afafaf]"
            >
              <span className="font-semibold">New Advice</span>
              <Plus className="w-[18px] h-[18px]" />
            </Button>
            <button >
              <ArrowRight className="size-7 text-[#afafaf]" />
            </button>
          </div>
          
          <div className="relative w-full">
            <Input
              className="h-[53px] bg-[#55575ee6] border-none rounded-3xl px-6 text-[#afafaf] placeholder:text-[#afafaf]"
              placeholder="Search"
            />
            <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#959595]" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-5">
            {Object.entries(historyData).map(([title, items], index) => (
              <div key={title} className="flex flex-col gap-5">
                {index > 0 && (
                  <Separator className="bg-[#959595] h-[3px] opacity-20" />
                )}
                <div className="text-xs font-semibold text-[#959595] tracking-[-0.24px]">
                  {title}
                </div>
                {items.map((item, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="w-full justify-start p-0 h-auto font-medium text-base text-[#959595] tracking-[-0.32px] hover:bg-transparent hover:text-white"
                  >
                    {item}
                  </Button>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}