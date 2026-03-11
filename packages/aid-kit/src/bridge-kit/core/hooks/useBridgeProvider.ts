import { useContext } from "react";
import { BridgeContext } from "../models/BridgeContext";

export const useBridgeProvider = () => {
  const ctx = useContext(BridgeContext);
  if (!ctx) throw new Error("BridgeProvider 밖에서 사용되고 있어요.");
  return ctx;
};
