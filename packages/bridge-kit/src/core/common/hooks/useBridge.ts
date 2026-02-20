import { useMemo } from "react";
import { useScanQR } from "../../features/qr/hooks/useScanQR";
import { createBridgeCore } from "../models/BridgeCore";

export const useBridge = () => {
  const { scan } = useScanQR();

  const bridge = useMemo(() => {
    const core = createBridgeCore();
    core.register("QR_SCAN", scan);
    return core;
  }, [scan]);

  return bridge.handleMessage;
};
