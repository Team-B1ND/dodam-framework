import { createContext } from "react";

export interface StackContextValue {
  push: (path: string) => void;
  back: () => void;
  path: string;
}

export const StackContext = createContext<StackContextValue | null>(null);
