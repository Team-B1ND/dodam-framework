import { Action } from "../enums/actions";

export interface BridgeRequest {
  id: string;
  type: Action;
  timestamp: number;
  payload: unknown;
};