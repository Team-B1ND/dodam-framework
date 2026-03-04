import { useBridgeUi } from "../../../common/hooks/useBridgeUi";

export const useCaptureCamera = () => {
  const { open } = useBridgeUi();

  const capture = async () => {
    const result = await open("CAMERA");
    return result;
  };

  return { capture };
};
