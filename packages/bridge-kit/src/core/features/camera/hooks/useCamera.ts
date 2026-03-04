import { useEffect, useRef, useState } from "react";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import { useBridgeUi } from "../../../common/hooks/useBridgeUi";

export const useCamera = () => {
  const { setResult } = useBridgeUi();
  const cameraRef = useRef<Camera>(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const capture = async () => {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);

    try {
      const photo = await cameraRef.current.takePhoto();
      const url = photo.path.startsWith("file://")
        ? photo.path
        : `file://${photo.path}`;

      setResult({ url });
    } catch {
      setResult(null);
    } finally {
      setIsCapturing(false);
    }
  };

  return {
    cameraRef,
    hasPermission,
    device,
    isCapturing,
    capture,
    setResult,
  };
};
