import { useContext } from "react";
import { BridgeUiContext } from "../models/bridge-ui-context";

export const useBridgeUi = () => {
  const ctx = useContext(BridgeUiContext);
  if (!ctx) throw new Error("BridgeUiContext 밖에서 사용되고 있어요.");
  return ctx;
};
