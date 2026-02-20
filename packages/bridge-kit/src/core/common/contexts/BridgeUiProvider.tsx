import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { BridgeUiContext } from "./bridge-ui-context";
import { BridgeUi } from "../types/bridge-ui";
import { BridgeUiSet } from "../models/BridgeUiSet";
import Modal from "../ui/Modal";

interface Props extends PropsWithChildren {
  top: number;
  bottom: number;
}

export const BridgeUiProvider = ({ children, top, bottom }: Props) => {
  const [ui, setUi] = useState<BridgeUi>("NONE");
  const [lastUi, setLastUi] = useState<BridgeUi>("NONE");
  const [isActive, setIsActive] = useState(false);
  const [result, setResultState] = useState<object | null>(null);
  const resolveRef = useRef<((value: object | null) => void) | null>(null);

  useEffect(() => {
    if (ui !== "NONE") {
      setIsActive(true);
      setLastUi(ui);
    }
  }, [ui]);

  const open = (bridgeUi: Exclude<BridgeUi, "NONE">): Promise<object | null> => {
    setUi(bridgeUi);
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const close = () => {
    if (resolveRef.current) {
      resolveRef.current(null);
      resolveRef.current = null;
    }
    setUi("NONE");
  };

  const setResult = (res: object | null) => {
    if (resolveRef.current) {
      resolveRef.current(res);
      resolveRef.current = null;
    }
    setResultState(res);
    setUi("NONE");
  };

  const handleAfterClose = () => {
    setIsActive(false);
    setResultState(null);
  };

  return (
    <BridgeUiContext.Provider
      value={{ ui, open, close, result, setResult }}>
      {children}
      {isActive && lastUi !== "NONE" && (
        <Modal
          isVisible={ui !== "NONE"}
          onAfterClose={handleAfterClose}
          top={top}
          bottom={bottom}
          key={lastUi}>
          {BridgeUiSet[lastUi]}
        </Modal>
      )}
    </BridgeUiContext.Provider>
  );
};
