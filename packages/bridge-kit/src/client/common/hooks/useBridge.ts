import { useContext } from "react";
import { BridgeContext } from "../contexts/bridge-context";

export const useBridge = () => {
  const context = useContext(BridgeContext);
  
  if (!context) {
    throw new Error("useBridge must be used within a BridgeProvider");
  }

  return context.execute;
};
