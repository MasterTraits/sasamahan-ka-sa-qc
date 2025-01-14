'use client';

import { createContext, useState, useContext } from "react"; 


const MyContext = createContext();
export default function QueryContext({children}) {
  const [query, setQuery] = useState("");

  return (
    <MyContext.Provider value={{ query, setQuery }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
}
