import { ReactNode } from "react";
import { BridgeRequest } from "../../shared/types/dto/bridge-reqeust";
import { Action } from "../../shared/types/enums/actions";
import { Error } from "../../shared/types/enums/error";

export type Screens = Partial<Record<Action, ReactNode>>;

export type BridgeUi = Action | "NONE";

export interface BridgeUiContext {
  ui: BridgeUi;
  open: (bridgeUi: Action) => Promise<object | Error | null>;
  close: () => void;
  result: object | Error | null;
  setResult: (result: object | Error | null) => void;
}

export type Callback = () => Promise<object | Error | null>;

export type PushCallback = (send: (data: unknown) => void) => () => void;

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
