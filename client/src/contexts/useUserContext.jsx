import { createContext, useContext, useState } from "react";

const UserInputContext = createContext();

export const UserInputProvider = ({ children }) => {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  return (
    <UserInputContext.Provider value={{ userInput, setUserInput, aiResponse, setAiResponse }}>
      {children}
    </UserInputContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserInputContext)
}
