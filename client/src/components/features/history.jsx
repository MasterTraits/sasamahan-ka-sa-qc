import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Plus, Search } from "lucide-react";

import api from "@/config/axios";
import { useState, useEffect } from "react";
import { useHistory } from "@/store/useHistory";
import { Link } from 'react-router-dom'

export default function History() {
  const [history, setHistory] = useState([]);
  const [searchData, setData] = useState("");

  const historyData = async () => {
    try {
      const response = await api.get("/history");
      setHistory(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    historyData();
    () => console.log(history);
  });

  const closeMenu = useHistory((state) => state.closeMenu);

  return (
    <Card className="absolute left-0 top-0 w-80 h-full bg-stone-700 border-none rounded-none backdrop-blur opacity-95 z-50">
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
            <button onClick={closeMenu}>
              <ArrowRight className="size-7 text-[#afafaf]" />
            </button>
          </div>

          <div className="relative w-full">
            <Input
              className="h-[53px] bg-[#55575ee6] border-none rounded-3xl px-6 text-[#afafaf] placeholder:text-[#afafaf]"
              placeholder="Search"
              value={searchData}
              onChange={(e) => setData(e.target.value)}
            />
            <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#959595]" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-5">
            <Separator className="bg-[#959595] h-[3px] opacity-20" />
            <div className="text-xs font-semibold text-[#959595] tracking-[-0.24px]">
              Previous 7 days
            </div>
            <Link
              to="/:id"
            >
              <Button
                variant="ghost"
                className="w-full justify-start p-0 h-auto font-medium text-base text-[#959595] tracking-[-0.32px] hover:bg-transparent hover:text-white"
              >
                Example
              </Button>
            </Link>
          </div>
          {/* {history.map(({ id, title, messages = [] }, index) => (
              <div key={id} className="flex flex-col gap-5">
                {index > 0 && (
                  <Separator className="bg-[#959595] h-[3px] opacity-20" />
                )}
                <div className="text-xs font-semibold text-[#959595] tracking-[-0.24px]">
                  {title}
                </div>
                {messages.map(({ id, message }) => (
                  <Button
                    key={id}
                    variant="ghost"
                    className="w-full justify-start p-0 h-auto font-medium text-base text-[#959595] tracking-[-0.32px] hover:bg-transparent hover:text-white"
                  >
                    {message}
                  </Button>
                ))}
              </div>
            ))} */}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
