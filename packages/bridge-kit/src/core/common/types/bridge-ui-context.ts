import { BridgeUi } from "./bridge-ui";

export interface BridgeUiContext {
  ui: BridgeUi;
  open: (bridgeUi: Exclude<BridgeUi, "NONE">) => Promise<object | string | null>;
  close: () => void;
  result: object | string | null;
  setResult: (result: object | string | null) => void;
}