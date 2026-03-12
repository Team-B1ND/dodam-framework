import { Action } from "../enums/actions";
import { Error } from "../enums/error";

export interface BridgeResponse {
  id: string;
  type: Action;
  timestamp: number;
  success: boolean;
  data?: unknown;
  error?: Error;
};
