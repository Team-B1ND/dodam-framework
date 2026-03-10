import { BridgeRequest } from "src/shared/types/dto/bridge-reqeust";
import { Action } from "src/shared/types/enums/actions";

export type Handlers = Map<Action, () => unknown>;

export type Tasks = Map<
  string,
  {
    flag: "pending" | "completed";
    req: BridgeRequest;
    data?: unknown;
  }
>;

export interface WebViewBridge {
  postMessage(message: string): void;
}
