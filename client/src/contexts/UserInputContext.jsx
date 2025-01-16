import React, { createContext, useState } from "react";

export const UserInputContext = createContext();

export const UserInputProvider = ({ children }) => {
  const [userInput, setUserInput] = useState("");

  return (
    <UserInputContext.Provider value={{ userInput, setUserInput }}>
      {children}
    </UserInputContext.Provider>
  );
};
