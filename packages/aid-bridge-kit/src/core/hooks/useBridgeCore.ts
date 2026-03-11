import { useRef, useCallback, useEffect } from "react";
import { WebView } from "react-native-webview";
import { BridgeCore } from "../models/BridgeCore";
import { Response } from "../../shared/builder/response";

const core = new BridgeCore();

export const useBridgeCore = () => {
  const webViewRef = useRef<WebView>(null);

  const onMessage = useCallback((event: any) => {
    const req = JSON.parse(event.nativeEvent.data);
    if (webViewRef.current) {
      core.receive(webViewRef.current, req);
    }
  }, []);

  useEffect(() => {
    const cleanups = core.startPush((action, data) => {
      if (webViewRef.current) {
        const res = Response(action, action, true, data);
        core.send(webViewRef.current, res);
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