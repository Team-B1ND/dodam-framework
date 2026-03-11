import { BridgeResponse } from "../types/dto/bridge-response";
import { Action } from "../types/enums/actions";
import { Error } from "../types/enums/error";

export const Response = (
  id: string,
  type: Action,
  success: boolean,
  data?: unknown,
  error?: Error,
): BridgeResponse => {
  return {
    id,
    type,
    timestamp: Date.now(),
    success,
    data,
    error,
  };
};
