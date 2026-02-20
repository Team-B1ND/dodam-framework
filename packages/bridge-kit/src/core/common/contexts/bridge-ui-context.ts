import { createContext } from "react";
import type { BridgeUiContext as ContextType } from "../types/bridge-ui-context";

export const BridgeUiContext = createContext<ContextType>({
  ui: "NONE",
  open: () => {
    throw new Error("Bridge UI context not initialized");
  },
  close: () => {
    throw new Error("Bridge UI context not initialized");
  },
});
