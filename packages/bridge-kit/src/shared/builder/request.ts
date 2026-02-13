import { BaseRequest } from "../types/dto/base-reqeust";
import { RequestType } from "../types/enums/request-type";

export const Request = <T>(
  action: RequestType,
  payload: T,
  timeout: number,
) => {
  return {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    timeout,
    type: action,
    payload,
  } as BaseRequest<T>;
};
