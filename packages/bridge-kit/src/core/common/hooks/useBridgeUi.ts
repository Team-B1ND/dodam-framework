import { useContext } from "react";
import { BridgeUiContext } from "../contexts/bridge-ui-context";

export const useBridgeUi = () => {
  const { open, close } = useContext(BridgeUiContext);

  return {
    open,
    close,
  };
};
