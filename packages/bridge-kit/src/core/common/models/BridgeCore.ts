import { RequestType } from "../../../shared/types/enums/request-type";
import { BridgeRequest } from "../../../shared/types/dto/bridge-reqeust";
import { Response } from "../../../shared/builder/response";
import { parseBridgeRequest } from "../../../shared/utils/parse-bridge-request";
import { Handler } from "../types/handler";
import { BridgeHandlerMap } from "../types/bridge-handler-map";
import { WebViewBridge } from "../types/webview-bridge";
import { executeHandler } from "../utils/execute-handler";
import { Error, Errors } from "../../../shared/types/enums/error";
import { BridgeResponse } from "../../../shared/types/dto/bridge-response";

class BridgeCore {
  private handlers: BridgeHandlerMap = new Map();

  register = <TPayload = unknown, TResponse = unknown>(
    type: RequestType,
    handler: Handler<TPayload, TResponse>,
  ) => {
    this.handlers.set(type, handler as Handler);
  };

  unregister = (type: RequestType) => {
    this.handlers.delete(type);
  };

  handleMessage = async (raw: string, webview?: WebViewBridge) => {
    let request: BridgeRequest<unknown>;
    try {
      const parsed = JSON.parse(raw);
      request = parseBridgeRequest(parsed);
    } catch (err) {
      return;
    }

    const handler = this.handlers.get(request.type as RequestType);

    if (!handler) {
      const response = Response(request.id, false, undefined, Errors.NOT_SUPPORTED);
      if (webview) webview.postMessage(JSON.stringify(response));
      return response;
    }

    const result = await executeHandler(
      Promise.resolve(handler(request.payload)),
      request.timeout,
    );

    let response: BridgeResponse<unknown>;

    if (
      typeof result === "string" &&
      Object.values(Errors).includes(result as Error)
    ) {
      response = Response(request.id, false, undefined, result as Error);
    } else if (result) {
      response = Response(request.id, true, result);
    } else if (result === null) {
      response = Response(request.id, false, undefined, Errors.CANCELLED);
    } else {
      response = Response(request.id, false, undefined, Errors.UNKNOWN);
    }

    if (webview) webview.postMessage(JSON.stringify(response));
    return response;
  };
}

export const createBridgeCore = () => new BridgeCore();
