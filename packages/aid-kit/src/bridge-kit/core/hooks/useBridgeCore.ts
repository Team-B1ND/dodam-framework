import { useRef, useCallback, useEffect } from "react";
import { WebView, WebViewMessageEvent, WebViewProps } from "react-native-webview";
import { BridgeCore } from "../models/BridgeCore";
import { Response } from "../../shared/builder/response";

const core = new BridgeCore();

export const useBridgeCore = () => {
  const instanceRef = useRef<WebView<WebViewProps> | null>(null);

  const webViewRef = useCallback((node: WebView<WebViewProps> | null) => {
    instanceRef.current = node;
  }, []);

  const onMessage = useCallback((event: WebViewMessageEvent) => {
    const req = JSON.parse(event.nativeEvent.data);
    if (instanceRef.current) {
      core.receive(instanceRef.current, req);
    }
  }, []);

  useEffect(() => {
    const cleanups = core.startPush((action, data) => {
      if (instanceRef.current) {
        const res = Response(action, action, true, data);
        core.send(instanceRef.current, res);
      }
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  return {
    webViewProps: {
      ref: webViewRef,
      onMessage,
    },
  };
};

export { core };