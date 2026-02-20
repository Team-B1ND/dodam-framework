import { Text } from "react-native";
let ScanQR: any = undefined;
try {
  ScanQR = require("../../features/qr/ui/ScanQR").default;
} catch (e) {
  // fallback for debugging import error
}

export const BridgeUiSet = {
  NONE: <></>,
  QR: ScanQR ? <ScanQR /> : <Text>QR</Text>,
  CAMERA: <></>,
};
