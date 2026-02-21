import { useEffect, useMemo, useState } from "react";
import {
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { useBridgeUi } from "../../../common/hooks/useBridgeUi";
import { SCAN_SIZE } from "../constants/scan-size";
import { LayoutChangeEvent } from "react-native";
import { Errors } from "../../../../shared/types/enums/error";

export const useScanner = () => {
  const { setResult } = useBridgeUi();
  const { hasPermission, requestPermission } = useCameraPermission();
  const [scanned, setScanned] = useState(false);
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const device = useCameraDevice("back");

  const checkPermissions = async () => {
    if (!hasPermission) {
      const permission = await requestPermission();
      if (!permission) {
        setResult(Errors.PERMISSION_DENIED);
      }
    }
  };

  useEffect(() => {
    checkPermissions();
  }, [hasPermission, requestPermission]);

  const regionOfInterest = useMemo(() => {
    if (layout.width === 0 || layout.height === 0) return undefined;

    return {
      x: (layout.width - SCAN_SIZE) / 2 / layout.width,
      y: (layout.height - SCAN_SIZE) / 2 / layout.height,
      width: SCAN_SIZE / layout.width,
      height: SCAN_SIZE / layout.height,
    };
  }, [layout.width, layout.height]);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    regionOfInterest: regionOfInterest,
    onCodeScanned: (codes) => {
      if (scanned) return;
      if (codes.length > 0) {
        const value = codes[0].value;
        if (value) {
          setScanned(true);
          setResult({ qrData: value });
        }
      }
    },
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  return {
    device,
    hasPermission,
    scanned,
    codeScanner,
    handleLayout,
    setResult,
  };
};
