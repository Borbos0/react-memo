import { useContext } from "react";
import { ModeContext } from "./gameModeContext";

export function useModeContext() {
  return useContext(ModeContext);
}
