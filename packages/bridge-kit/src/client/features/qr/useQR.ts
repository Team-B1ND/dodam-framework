import { useBridge } from "../../common/hooks/useBridge";

export const useQR = () => {
  const execute = useBridge();

  const scan = async () => {
    const response = await execute<{ qrData: string }>("QR_SCAN", {}, 120000);
    if (response.success) {
      return response.data?.qrData;
    } else {
      console.error("QR Scan Error:", response.error);
      throw new Error("QR Scan failed");
    }
  };

  return { scan };
};
