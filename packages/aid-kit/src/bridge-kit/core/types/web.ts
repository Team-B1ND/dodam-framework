import { BridgeRequest } from "../../shared/types/dto/bridge-reqeust";
import { Action } from "../../shared/types/enums/actions";

export type Tasks = Record<
  string,
  {
    flag: "pending" | "completed";
    req: BridgeRequest;
    data?: unknown;
  }
>;

export type Callback = (data: unknown) => Promise<object | Error>;

export type Handlers = Map<Action, Callback>;

export type Handler = (data: unknown) => void;
export type Queue = Map<string, unknown[]>;

export interface BridgeContextValue {
  send: (type: Action, payload?: unknown) => void;
  subscribe: (type: Action, handler: Callback) => () => void;
}
