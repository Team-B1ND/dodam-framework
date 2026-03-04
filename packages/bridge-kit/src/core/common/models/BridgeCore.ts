import { RequestType } from "../../../shared/types/enums/request-type";
import { BridgeRequest } from "../../../shared/types/dto/bridge-reqeust";
import { Response } from "../../../shared/builder/response";
import { parseBridgeRequest } from "../../../shared/utils/parse-bridge-request";
import { Handler } from "../types/handler";
import { BridgeHandlerMap } from "../types/bridge-handler-map";
import { WebViewBridge } from "../types/webview-bridge";
import { executeHandler } from "../utils/execute-handler";
import { errorMapper } from "../utils/error-mapper";

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
      const response = Response(request.id, false, undefined, "NOT_SUPPORTED");
      if (webview) webview.postMessage(JSON.stringify(response));
      return response;
    }

    try {
      const result = await executeHandler(
        Promise.resolve(handler(request.payload)),
        request.timeout,
      );

      const response = result
        ? Response(request.id, true, result)
        : Response(request.id, false, undefined, "CANCELLED");

      if (webview) webview.postMessage(JSON.stringify(response));
      return response;
    } catch (err) {
      const bridgeErr = errorMapper(err);
      const response = Response(request.id, false, undefined, bridgeErr as any);
      if (webview) webview.postMessage(JSON.stringify(response));
      return response;
    }
  };
}

export const createBridgeCore = () => new BridgeCore();
