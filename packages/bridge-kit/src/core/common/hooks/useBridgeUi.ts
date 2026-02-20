import { useContext } from "react";
import { BridgeUiContext } from "../contexts/bridge-ui-context";

export const useBridgeUi = () => {
  const { open, close, result, setResult } = useContext(BridgeUiContext);

  return {
    open,
    close,
    result,
    setResult,
  };
};
