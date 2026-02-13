"use client";

import {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { BridgeContext } from "./bridge-context";
import { execute } from "./execute";
import { RequestType } from "../../../shared/types/enums/request-type";
import { PendingRequest } from "../../../shared/types/pending-request";
import { BaseResponse } from "src/shared/types/dto/base-response";

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
        const response = JSON.parse(event.data) as BaseResponse<unknown>;
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
          const errorText = error ? `: ${error}` : "";
          pending.reject(new Error(errorText));
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
    <TPayload, TResponse = unknown>(
      action: RequestType,
      payload: TPayload,
      timeout?: number,
    ): Promise<TResponse> => {
      return execute<TPayload, TResponse>(
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
