import { BridgeRequest } from "src/shared/types/dto/bridge-reqeust";
import { BridgeResponse } from "./dto/bridge-response";
import { Error as BridgeError } from "./enums/error";

export interface PendingRequest<T = unknown> {
  request: BridgeRequest<T>;
  resolve: (value: BridgeResponse<T>) => void;
  reject: (error: BridgeError | globalThis.Error) => void;
  timeoutId?: number;
}
