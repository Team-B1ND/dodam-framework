import { BridgeRequest } from "../types/dto/bridge-reqeust";
import { Action } from "../types/enums/actions";

export const Request = (action: Action, payload: unknown): BridgeRequest => {
  return {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    type: action,
    payload,
  };
};
