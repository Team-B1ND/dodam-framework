import { BridgeRequest } from "src/shared/types/dto/bridge-reqeust";
import { BridgeResponse } from "./dto/bridge-response";

export interface PendingRequest<T = unknown> {
  request: BridgeRequest<T>;
  resolve: (value: BridgeResponse<T>) => void;
  reject: (error: Error) => void;
  timeoutId?: number;
}
