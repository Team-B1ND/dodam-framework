import { createContext } from "react";
import { SafeAreaContext as ContextType } from "../types/safearea-context";

export const SafeAreaContext = createContext<ContextType>({
  top: 0,
  bottom: 0,
});
