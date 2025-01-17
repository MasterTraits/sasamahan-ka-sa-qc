import { useState } from "react";
import { BsPaperclip, BsSendArrowDown } from "react-icons/bs";
import { useUserContext } from "@/contexts/useUserContext";

export default function Footer() {
  const { setUserInput } = useUserContext(); 
  const [inputValue, setInputValue] = useState(""); 

  // Handle input submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUserInput(inputValue); 
      setInputValue(""); 
    }
  };

  return (
    <footer>
      <form onSubmit={handleSubmit} className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <input
          type="text"
          placeholder="Type a message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
          className="w-[80%] h-10 bg-gray-700 p-2 rounded-lg"
        />
        <button className="bg-gray-700 p-2 rounded-lg" type="submit">
          <BsPaperclip className="text-2xl" />
        </button>
        <button
          className="bg-gray-700 p-2 rounded-lg"
          type="submit" 
        >
          <BsSendArrowDown className="text-2xl" />
        </button>
        
      </form>
    </footer>
  );
}
