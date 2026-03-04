import { useBridge } from "../../common/hooks/useBridge";

interface CameraCaptureResult {
  url: string;
}

export const useCamera = () => {
  const execute = useBridge();

  const capture = async () => {
    const response = await execute<CameraCaptureResult>("CAMERA_CAPTURE", {});
    return response.data?.url ?? null;
  };

  return { capture };
};
