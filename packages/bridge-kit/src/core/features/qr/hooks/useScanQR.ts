import { useBridgeUi } from "../../../common/hooks/useBridgeUi"

export const useScanQR = () => {
  const { open } = useBridgeUi();

  const scan = async () => {
    const result = await open("QR");
    return result;
  };

  return { scan };
}