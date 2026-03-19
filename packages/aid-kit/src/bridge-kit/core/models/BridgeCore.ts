import { Action, Actions } from "../../shared/types/enums/actions";
import {
  Callback,
  Handlers,
  PushCallback,
  PushHandlers,
  Tasks,
  WebViewBridge,
} from "../types/app";
import { BridgeRequest } from "../../shared/types/dto/bridge-reqeust";
import { Response } from "../../shared/builder/response";
import { Error, Errors } from "../../shared/types/enums/error";
import { BridgeResponse } from "../../shared/types/dto/bridge-response";
import { ACK } from "../../shared/types/payloads/ack";
import { filterExpiredTasks } from "../utils/filter-expired-tasks";

export class BridgeCore {
  private handlers: Handlers = new Map();
  private tasks: Tasks = new Map();
  private pushHandlers: PushHandlers = new Map();

  mount(action: Action, callback: Callback) {
    this.handlers.set(action, callback);
  }

  unmount(action: Action) {
    if (this.handlers.has(action)) this.handlers.delete(action);
  }

  mountPush(action: Action, handler: PushCallback) {
    this.pushHandlers.set(action, handler);
  }

  startPush(send: (action: Action, data: unknown) => void): (() => void)[] {
    return Array.from(this.pushHandlers.entries()).map(([action, handler]) => {
      return handler((data) => send(action, data));
    });
  }

  async receive(ref: WebViewBridge, req: BridgeRequest) {
    const callback = this.handlers.get(req.type);
    if (callback) {
      if (req.type === Actions.ACK) {
        return this.tasks.delete((req.payload as ACK).id);
      }
      if (req.type === Actions.SYNC) {
        const activeTasks = filterExpiredTasks(this.tasks);
        const res = Response(req.id, req.type, true, activeTasks);
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
    } else {
      return this.send(
        ref,
        Response(req.id, req.type, false, undefined, "NOT_SUPPORT"),
      );
    }
  }

  send(ref: WebViewBridge, res: BridgeResponse) {
    const data = JSON.stringify(JSON.stringify(res));
    return ref.injectJavaScript(`
    window.dispatchEvent(new MessageEvent('message', {
      data: ${data}
    }));
    true;
  `);
  }
}
