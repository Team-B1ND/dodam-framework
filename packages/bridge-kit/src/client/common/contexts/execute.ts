import { RequestType } from "../../../shared/types/enums/request-type";
import { Request } from "../../../shared/builder/request";
import { PendingRequest } from "../../../shared/types/pending-request";
import { Error } from "../../../shared/types/enums/error";

export const execute = <TPayload, TResponse = unknown>(
  bridge: Window["ReactNativeWebView"],
  queue: Record<string, PendingRequest>,
  addToQueue: (id: string, pending: PendingRequest) => void,
  removeFromQueue: (id: string) => void,
  action: RequestType,
  payload: TPayload,
  timeout = 5000,
): Promise<TResponse> => {
  return new Promise((resolve, reject) => {
    const request = Request(action, payload, timeout);

    if (!bridge) {
      reject(new Error("Webview Client is not found"));
      return;
    }

    const timeoutId = setTimeout(() => {
      const pending = queue[request.id];
      if (pending) {
        pending.reject(new Error("TIMEOUT" as Error));
        removeFromQueue(request.id);
      }
    }, timeout);

    const pendingRequest: PendingRequest<TPayload> = {
      request,
      resolve: resolve as (value: unknown) => void,
      reject,
      timeoutId,
    };

    addToQueue(request.id, pendingRequest);

    bridge.postMessage(JSON.stringify(request));
  });
};
