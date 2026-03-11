import { createContext } from "react";
import { ContextType } from "../types";

export const SafeAreaContext = createContext<ContextType>({
  top: 0,
  bottom: 0,
});
