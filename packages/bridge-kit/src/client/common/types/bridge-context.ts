import { RequestType } from "../../../shared/types/enums/request-type";

export interface BridgeContextType {
  bridge?: Window["ReactNativeWebView"];
  execute: <TPayload, TResponse = unknown>(
    action: RequestType,
    payload: TPayload,
    timeout?: number,
  ) => Promise<TResponse>;
}
