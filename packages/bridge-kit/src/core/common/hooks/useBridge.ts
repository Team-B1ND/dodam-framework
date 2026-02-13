import { scanQRCode } from "src/core/features/qr/scan-qr-code";
import { createBridgeCore } from "../models/BridgeCore";

export const useBridge = () => {
  const bridge = createBridgeCore();
  bridge.register("QR_SCAN", scanQRCode);
  // TODO: features 폴더에 네이티브 모듈 실행 함수를 추가 후 등록하기 (features/qr을 참고하세요.)

  return bridge.handleMessage;
};
