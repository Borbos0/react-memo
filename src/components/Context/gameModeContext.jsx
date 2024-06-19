import { createContext, useState } from "react";

export const ModeContext = createContext(null);
export const GameModeContextProvider = ({ children }) => {
  const [isEasyMode, setIsEasyMode] = useState(false);

  const chooseMode = () => {
    setIsEasyMode(isEasyMode => !isEasyMode);
  };

  const [alahomoraMode, setAlahomoraMode] = useState(false);

  return (
    <ModeContext.Provider value={{ isEasyMode, chooseMode, alahomoraMode, setAlahomoraMode }}>
      {children}
    </ModeContext.Provider>
  );
};
