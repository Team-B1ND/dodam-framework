import { useCameraPermission } from "react-native-vision-camera";
import { useBridgeUi } from "../../../common/hooks/useBridgeUi"
import { Errors } from "../../../../shared/types/enums/error";

export const useScanQR = () => {
  const { open } = useBridgeUi();
  const { hasPermission, requestPermission } = useCameraPermission();

  const scan = async () => {
    if (!hasPermission) {
      const permission = await requestPermission();
      if (!permission) {
        return Errors.PERMISSION_DENIED;
      }
    }
    const result = await open("QR");
    return result;
  };

  return { scan };
}