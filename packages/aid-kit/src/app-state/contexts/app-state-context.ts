import { createContext } from "react";
import { ContextType } from "../types";

export const AppStateContext = createContext<ContextType | null>(null);
