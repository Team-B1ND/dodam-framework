import { useCallback, useMemo } from "react";
import { useScanQR } from "../../features/qr/hooks/useScanQR";
import { createBridgeCore } from "../models/BridgeCore";
import { useBridgeUi } from "./useBridgeUi";
import { WebViewBridge } from "../types/webview-bridge";

export const useBridge = () => {
  const { scan } = useScanQR();
  const { close } = useBridgeUi();

  const bridge = useMemo(() => {
    const core = createBridgeCore();
    core.register("QR_SCAN", scan);
    return core;
  }, [scan]);

  return useCallback(
    async (raw: string, webview?: WebViewBridge) => {
      const response = await bridge.handleMessage(raw, webview);
      close();
      return response;
    },
    [bridge, close],
  );
};
