import { createContext, useContext, useState } from "react";

const UserInputContext = createContext();

export const UserInputProvider = ({ children }) => {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <UserInputContext.Provider 
      value={{
        userInput,
        setUserInput,
        aiResponse,
        setAiResponse,
        chatHistory,
        setChatHistory
      }}
    >
      {children}
    </UserInputContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserInputContext);
}

export { UserInputContext };