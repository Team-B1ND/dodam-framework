"use client";

import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { RequestType } from "../../../shared/types/enums/request-type";
import { BridgeResponse } from "../../../shared/types/dto/bridge-response";
import { PendingRequest } from "../../../shared/types/pending-request";
import { BridgeContext } from "./bridge-context";
import { execute } from "./execute";
import { parseBridgeResponse } from "src/shared/utils/parse-bridge-response";

export const BridgeProvider = ({ children }: PropsWithChildren) => {
  const queueRef = useRef<Record<string, PendingRequest>>({});

  const addToQueue = useCallback((id: string, pending: PendingRequest) => {
    queueRef.current[id] = pending;
  }, []);

  const removeFromQueue = useCallback((id: string) => {
    const pending = queueRef.current[id];
    if (pending?.timeoutId) {
      clearTimeout(pending.timeoutId);
    }
    delete queueRef.current[id];
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);
        const response = parseBridgeResponse(parsed);
        const { id, success, error } = response;

        const pending = queueRef.current[id];

        if (!pending) {
          console.warn("No pending request found for id:", id);
          return;
        }

        if (pending.timeoutId) {
          clearTimeout(pending.timeoutId);
        }

        if (success) {
          pending.resolve(response);
        } else {
          pending.reject(error || "NOT_SUPPORTED");
        }

        removeFromQueue(id);
      } catch (err) {
        console.error("Failed to handle message:", err);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [removeFromQueue]);

  const executeWithQueue = useCallback(
    function <TResponse = unknown>(
      action: RequestType,
      payload: unknown,
      timeout?: number,
    ): Promise<BridgeResponse<TResponse>> {
      return execute(
        window.ReactNativeWebView,
        queueRef.current,
        addToQueue,
        removeFromQueue,
        action,
        payload,
        timeout,
      );
    },
    [addToQueue, removeFromQueue],
  );

  const value = useMemo(
    () => ({
      bridge: window.ReactNativeWebView,
      execute: executeWithQueue,
    }),
    [executeWithQueue],
  );

  return (
    <BridgeContext.Provider value={value}>{children}</BridgeContext.Provider>
  );
};
