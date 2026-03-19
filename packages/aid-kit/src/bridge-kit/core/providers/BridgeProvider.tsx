import { useEffect, useRef } from "react";
import { BridgeResponse } from "../../shared/types/dto/bridge-response";
import { Action, Actions } from "../../shared/types/enums/actions";
import { Callback, Handlers, Queue, Tasks } from "../types/web";
import { Request } from "../../shared/builder/request";
import { BridgeContext } from "../models/BridgeContext";
import { isExpired } from "../utils/is-expired";

export const BridgeProvider = ({ children }: { children: React.ReactNode }) => {
  const queue = useRef<Queue>(new Map());
  const handlers = useRef<Handlers>(new Map());

  const send = (type: Action, payload?: unknown) => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify(Request(type, payload)),
    );
  };

  const enqueue = (type: Action, data: unknown) => {
    if (isExpired(data)) {
      send(Actions.ACK, { id: (data as any).id });
      return;
    }
    const handler = handlers.current.get(type);
    if (handler) {
      handler(data);
      send(Actions.ACK, { id: (data as any).id });
    } else {
      const q = queue.current.get(type) ?? [];
      queue.current.set(type, [...q, data]);
    }
  };

  const subscribe = (type: Action, handler: Callback) => {
    handlers.current.set(type, handler);

    const q = queue.current.get(type);
    if (q && q.length > 0) {
      q.forEach((data) => {
        if (isExpired(data)) {
          send(Actions.ACK, { id: (data as any).id });
          return;
        }
        handler(data);
        send(Actions.ACK, { id: (data as any).id });
      });
      queue.current.delete(type);
    }

    return () => handlers.current.delete(type);
  };

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const res: BridgeResponse = JSON.parse(event.data);

      if (res.type === Actions.SYNC) {
        Object.values(res.data as Tasks).forEach((task) => {
          if (task.flag === "completed") {
            enqueue(task.req.type, task);
          }
        });
        return;
      }

      enqueue(res.type, res);
    };

    const isAndroid = /android/i.test(navigator.userAgent);
    const target = isAndroid ? document : window;

    target.addEventListener("message", onMessage as EventListener);
    return () =>
      target.removeEventListener("message", onMessage as EventListener);
  }, []);

  useEffect(() => {
    send(Actions.SYNC);
  }, []);

  return (
    <BridgeContext.Provider value={{ send, subscribe }}>
      {children}
    </BridgeContext.Provider>
  );
};
