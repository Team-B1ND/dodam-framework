import { useCallback, useMemo } from "react";
import { useScanQR } from "../../features/qr/hooks/useScanQR";
import { useGPS } from "../../features/gps/hooks/useGPS";
import { createBridgeCore } from "../models/BridgeCore";
import { useBridgeUi } from "./useBridgeUi";
import { WebViewBridge } from "../types/webview-bridge";

export const useBridge = () => {
  const { scan } = useScanQR();
  const { getCurrentLocation } = useGPS();
  const { close } = useBridgeUi();

  const bridge = useMemo(() => {
    const core = createBridgeCore();
    core.register("QR_SCAN", scan);
    core.register("GPS_GET", getCurrentLocation);
    return core;
  }, [scan, getCurrentLocation]);

  return useCallback(
    async (raw: string, webview?: WebViewBridge) => {
      const response = await bridge.handleMessage(raw, webview);
      close();
      return response;
    },
    [bridge, close],
  );
};
