import { BridgeUi } from "./bridge-ui";

export interface BridgeUiContext {
  ui: BridgeUi;
  open: (bridgeUi: Exclude<BridgeUi, "NONE">) => Promise<object | null>;
  close: () => void;
  result: object | null;
  setResult: (result: object | null) => void;
}