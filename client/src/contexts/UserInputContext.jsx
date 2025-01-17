import React, { createContext, useState } from "react";

export const UserInputContext = createContext();

export const UserInputProvider = ({ children }) => {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  return (
    <UserInputContext.Provider value={{ userInput, setUserInput, aiResponse, setAiResponse }}>
      {children}
    </UserInputContext.Provider>
  );
};
