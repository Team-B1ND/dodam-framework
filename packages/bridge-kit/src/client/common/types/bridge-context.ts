import { BridgeResponse } from "../../../shared/types/dto/bridge-response";
import { RequestType } from "../../../shared/types/enums/request-type";

export interface BridgeContext {
  bridge?: Window["ReactNativeWebView"];
  execute: <TResponse = unknown>(
    action: RequestType,
    payload: unknown,
    timeout?: number,
  ) => Promise<BridgeResponse<TResponse>>;
}
