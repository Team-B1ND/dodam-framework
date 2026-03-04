import { BridgeRequest } from "../types/dto/bridge-reqeust";
import { RequestType } from "../types/enums/request-type";

const createRequestId = () => {
  const randomUUID = globalThis.crypto?.randomUUID;

  if (typeof randomUUID === "function") {
    return randomUUID.call(globalThis.crypto);
  }

  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
};

export const Request = <T>(
  action: RequestType,
  payload: T,
  timeout?: number,
) => {
  return {
    id: createRequestId(),
    timestamp: Date.now(),
    timeout,
    type: action,
    payload,
  } as BridgeRequest<T>;
};
