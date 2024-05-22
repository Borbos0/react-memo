import { createContext, useState } from "react";

export const ModeContext = createContext(null);

export const GameModeContext = ({ children }) => {
  const [isEasyMode, setIsEasyMode] = useState(false);

  const chooseMode = () => {
    setIsEasyMode(isEasyMode => !isEasyMode);
  };
  return <ModeContext.Provider value={{ isEasyMode, chooseMode }}>{children}</ModeContext.Provider>;
};
