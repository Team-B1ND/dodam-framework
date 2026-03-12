import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { BridgeUiContext } from "../models/bridge-ui-context";
import Modal from "../ui/Modal";
import { BridgeUi, Screens } from "../types/app";
import { Action, Error } from "../../../bridge-kit/shared";

interface Props extends PropsWithChildren {
  top: number;
  screens: Screens;
}

export const BridgeUiProvider = ({ children, top, screens }: Props) => {
  const [ui, setUi] = useState<BridgeUi>("NONE");
  const [lastUi, setLastUi] = useState<BridgeUi>("NONE");
  const [isActive, setIsActive] = useState(false);
  const [result, setResultState] = useState<object | Error | null>(null);
  const resolveRef = useRef<((value: object | Error | null) => void) | null>(
    null,
  );

  useEffect(() => {
    if (ui !== "NONE") {
      setIsActive(true);
      setLastUi(ui);
    }
  }, [ui]);

  const open = (
    bridgeUi: Action,
  ): Promise<object | Error | null> => {
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

  const setResult = (res: object | Error | null) => {
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
    <BridgeUiContext.Provider value={{ ui, open, close, result, setResult }}>
      {children}
      {isActive && lastUi !== "NONE" && lastUi in screens && (
        <Modal
          isVisible={ui !== "NONE"}
          onAfterClose={handleAfterClose}
          key={lastUi}
          top={top}>
          {screens[lastUi]}
        </Modal>
      )}
    </BridgeUiContext.Provider>
  );
};
