import { RequestType } from "../enums/request-type";

export interface BridgeRequest<T> {
  id: string;
  type: RequestType;
  timestamp: number;
  timeout: number;
  payload: T;
}