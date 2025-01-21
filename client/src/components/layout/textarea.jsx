import { useState } from "react";
import { useUserContext } from "@/contexts/useUserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import FileChecker from "../features/aiChatComponents/fileChecker";
import { Send } from "lucide-react";
import AI_MIC from "@/assets/mic";

export default function TextArea({extraClass}) {
  const { setUserInput } = useUserContext();
  const [inputValue, setInputValue] = useState(""); 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUserInput(inputValue); 
      setInputValue(""); 
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Card className={`${extraClass}*:bg-white w-full rounded-2xl bg-white border border-neutral-150 shadow-lg z-10`}>
      <CardContent className="p-3 rounded-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textarea
            placeholder="Write here"
            value={inputValue}
            onChange={handleInputChange} 
            className="font-medium text-neutral-600 tracking-tight rounded-xl"
            rows="1"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-3.5">
              <FileChecker />
              <Button
                size="icon"
                className="size-10 rounded-full bg-stone-200 *:text-stone-700 hover:bg-stone-300"
                type="button"
              >
                <AI_MIC />
              </Button>
            </div>
            <Button
              size="icon"
              className="size-10 rounded-full bg-[#1774FF] hover:bg-[#1774FF]/90"
              type="submit" 
            >
              <Send className="h-6 w-6 text-white" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
