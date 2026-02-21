import { RequestTypes } from "../../../shared/types/enums/request-type";
import { useBridge } from "../../common/hooks/useBridge";

export const useQR = () => {
  const execute = useBridge();

  const scan = async () => {
    const response = await execute<{ qrData: string }>(RequestTypes.QR_SCAN, {});
    return JSON.stringify(response);
  };

  return { scan };
};
