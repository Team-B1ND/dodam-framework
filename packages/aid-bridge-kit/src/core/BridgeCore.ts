import { Action } from "src/shared/types/enums/actions";
import { Handlers, Tasks, WebViewBridge } from "./types";
import { BridgeRequest } from "../shared/types/dto/bridge-reqeust";
import { Response } from "../shared/builder/response";
import { Error, Errors } from "../shared/types/enums/error";
import { BridgeResponse } from "src/shared/types/dto/bridge-response";

export class BridgeCore {
  private handlers: Handlers = new Map();
  private tasks: Tasks = new Map();

  mount(action: Action, callback: () => unknown) {
    this.handlers.set(action, callback);
  }

  unmount(action: Action) {
    if (this.handlers.has(action)) this.handlers.delete(action);
  }

  async receive(ref: WebViewBridge, req: BridgeRequest) {
    const callback = this.handlers.get(req.type);
    if (callback) {
      if (req.type === "ACK") {
        return this.tasks.delete(req.id);
      }
      if (req.type === "SYNC") {
        const res = Response("sync-res", req.type, true, this.tasks);
        return this.send(ref, res);
      }
      this.tasks.set(req.id, { flag: "pending", req });
      const result = await callback();
      this.tasks.set(req.id, { flag: "completed", req, data: result });
      let res: BridgeResponse;
      const error = Errors[result as Error] as Error | undefined;
      if (error) {
        res = Response(req.id, req.type, false, undefined, error);
      } else {
        res = Response(req.id, req.type, true, result);
      }
      return this.send(ref, res);
    }
  }

  send(ref: WebViewBridge, res: BridgeResponse) {
    return ref.postMessage(JSON.stringify(res));
  }
}
