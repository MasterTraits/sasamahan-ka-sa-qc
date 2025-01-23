import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Plus, Search } from "lucide-react";
import { jellyTriangle } from "ldrs"; jellyTriangle.register();

import api from "@/config/axios";
import { useState, useEffect } from "react";
import { useHistory } from "@/store/useHistory";
import { Link } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);
  const [searchData, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHistoryData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/history");
      setHistory(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const closeMenu = useHistory((state) => state.closeMenu);

  return (
    <Card className="absolute left-0 top-0 w-80 h-full backdrop-blur bg-neutral-800 border-none rounded-none opacity-90 z-50">
      <CardContent className="flex flex-col gap-8 p-[18px] pt-8">
        <div className="flex flex-col gap-[15px]">
          <div className="flex items-center gap-[31px]">
            <Link
              reloadDocument
              to="/home"
            >
              <Button
                variant="ghost"
                className="flex items-center gap-2 w-[217px] h-[53px] bg-[#33363f] rounded-3xl text-[#afafaf]"
              >
                <span className="font-semibold">New Advice</span>
                <Plus className="w-[18px] h-[18px]" />
              </Button>
            </Link>
            <button onClick={closeMenu}>
              <ArrowRight className="size-7 text-[#afafaf]" />
            </button>
          </div>

          <div className="relative w-full">
            <Input
              className="h-[53px] bg-[#55575ee6] border-none rounded-3xl px-6 text-[#afafaf] placeholder:text-[#afafaf] placeholder:font-semibold"
              placeholder="Search"
              value={searchData}
              onChange={(e) => setData(e.target.value)}
            />
            <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#959595]" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <Separator className="mb-5 bg-[#959595] h-[3px] opacity-20" />
          {loading ? (
            <div className="w-full h-[55vh] flex justify-center items-center">
              <l-jelly-triangle
                size="40"
                speed="2"
                color="white"
              ></l-jelly-triangle>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-xs font-semibold text-[#959595] tracking-[-0.24px]">
                Previous 7 days
              </div>
              {history.map((session) => (
                <Link
                  reloadDocument
                  key={session.id}
                  to={`/home/${session.id}`}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start p-0 h-auto font-medium text-base text-[#959595] tracking-[-0.32px] hover:bg-transparent hover:text-white"
                  >
                    {session.title || "No Title"}
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
