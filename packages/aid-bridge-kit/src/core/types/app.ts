import { BridgeRequest } from "../../shared/types/dto/bridge-reqeust";
import { Action } from "../../shared/types/enums/actions";
import { Error } from "../../shared/types/enums/error";

export type Callback = () => Promise<object | Error>;

export type PushCallback = (
  send: (action: Action, data: unknown) => void,
) => () => void;

export type Handlers = Map<Action, Callback>;

export type PushHandlers = Map<Action, PushCallback>;

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
