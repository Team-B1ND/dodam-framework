import { BridgeUi } from "./bridge-ui";

export interface BridgeUiContext {
  ui: BridgeUi;
  open: (bridgeUi: Exclude<BridgeUi, "NONE">) => void;
  close: () => void;
}