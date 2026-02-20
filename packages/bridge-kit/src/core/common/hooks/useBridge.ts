import { useScanQR } from "../../features/qr/hooks/useScanQR";
import { createBridgeCore } from "../models/BridgeCore";

export const useBridge = () => {
  const bridge = createBridgeCore();
  const { scan } = useScanQR();
  // bridge.register("QR_SCAN", scanQRCode);
  bridge.register("QR_SCAN", scan);
  // TODO: features 폴더에 네이티브 모듈 실행 함수를 추가 후 등록하기 (features/qr을 참고하세요.)

  return bridge.handleMessage;
};
