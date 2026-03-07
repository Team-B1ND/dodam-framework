import { createContext } from "react";
import type { BridgeContext as ContextType } from "../types/bridge-context";

export const BridgeContext = createContext<ContextType>({
  bridge: undefined,
  execute: async () => {
    throw new Error("Bridge not initialized");
  },
});
