import { createContext } from "react";
import { BridgeContextType } from "../types/bridge-context";

export const BridgeContext = createContext<BridgeContextType>({
  bridge: undefined,
  execute: async () => {
    throw new Error("Bridge not initialized");
  },
});
