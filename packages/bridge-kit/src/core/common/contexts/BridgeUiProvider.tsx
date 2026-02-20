import { PropsWithChildren, useEffect, useState } from "react";
import { BridgeUiContext } from "./bridge-ui-context";
import { BridgeUi } from "../types/bridge-ui";
import { BridgeUiSet } from "../models/BridgeUiSet";
import Modal from "../ui/Modal";

interface Props extends PropsWithChildren {
  top: number;
}

export const BridgeUiProvider = ({ children, top }: Props) => {
  const [ui, setUi] = useState<BridgeUi>("NONE");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (ui !== "NONE") {
      setIsActive(true);
    }
  }, [ui]);

  const open = (bridgeUi: Exclude<BridgeUi, "NONE">) => {
    setUi(bridgeUi);
  };

  const close = () => {
    setUi("NONE");
  };

  const handleAfterClose = () => {
    setIsActive(false);
  };

  return (
    <BridgeUiContext.Provider value={{ ui, open, close }}>
      {children}
      {isActive && (
        <Modal
          isVisible={ui !== "NONE"}
          onAfterClose={handleAfterClose}
          top={top}
          key={ui !== "NONE" ? ui : "closed"}
        >
          {BridgeUiSet[ui]}
        </Modal>
      )}
    </BridgeUiContext.Provider>
  );
};
