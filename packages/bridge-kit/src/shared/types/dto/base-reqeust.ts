import { RequestType } from "../enums/request-type";

export interface BaseRequest<T> {
  id: string;
  type: RequestType;
  timestamp: number;
  timeout: number;
  payload: T;
}