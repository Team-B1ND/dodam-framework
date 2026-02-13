import { useBridge } from "src/client/common/hooks/useBridge";

export const useQR = () => {
  const execute = useBridge();

  const scan = async () => {
    const response = await execute<{ qrData: string }>("QR_SCAN", {}, 120000);
    console.log("QR Scan response:", response.data?.qrData);
  };

  return { scan };
};
