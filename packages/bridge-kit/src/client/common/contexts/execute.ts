import { RequestType } from "../../../shared/types/enums/request-type";
import { Request } from "../../../shared/builder/request";
import { PendingRequest } from "../../../shared/types/pending-request";
import { Error as BridgeError } from "../../../shared/types/enums/error";
import { BridgeResponse } from "../../../shared/types/dto/bridge-response";

export const execute = <TResponse = unknown>(
  bridge: Window["ReactNativeWebView"],
  queue: Record<string, PendingRequest>,
  addToQueue: (id: string, pending: PendingRequest) => void,
  removeFromQueue: (id: string) => void,
  action: RequestType,
  payload: unknown,
  timeout = 5000,
): Promise<BridgeResponse<TResponse>> => {
  return new Promise((resolve, reject) => {
    const request = Request(action, payload, timeout);

    if (!bridge) {
      reject("NOT_SUPPORTED" as BridgeError);
      return;
    }

    const timeoutId = setTimeout(() => {
      const pending = queue[request.id];
      if (pending) {
        pending.reject("TIMEOUT" as BridgeError);
        removeFromQueue(request.id);
      }
    }, timeout);

    const pendingRequest = {
      request,
      resolve: resolve as (value: BridgeResponse<TResponse>) => void,
      reject,
      timeoutId,
    } as PendingRequest;

    addToQueue(request.id, pendingRequest);

    bridge.postMessage(JSON.stringify(request));
  });
};
