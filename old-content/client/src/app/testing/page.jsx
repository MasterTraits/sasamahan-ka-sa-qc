'use client'
import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [myState, setMyState] = useState('Initial State');

  return (
    <MyContext.Provider value={{ myState, setMyState }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};

const ComponentA = () => {
  const { myState } = useMyContext();
  return <p>Component A: {myState}</p>;
};

const ComponentB = () => {
  const { myState, setMyState } = useMyContext();

  const updateState = () => {
    setMyState('Updated by Component B');
  };

  return (
    <div>
      <p>Component B: {myState}</p>
      <button onClick={updateState}>Update State in Component B</button>
    </div>
  );
};

const page = () => (
  <MyProvider>
    <ComponentA />
    <ComponentB />
  </MyProvider>
);

export default page;
