import { useBridgeUi } from "../../../common/hooks/useBridgeUi"

export const useScanQR = () => {
  // const { readQR } = useQR();
  // return readQR;
  // 참고: 예시코드 입니다. 네이티브 모듈이 훅으로 구현되어 있는 경우, 해당 훅을 호출하여 반환합니다.

  const { open } = useBridgeUi();

  const scan = () => {
    open("QR");
  };

  return { scan };
}