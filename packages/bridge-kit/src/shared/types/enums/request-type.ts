export const RequestTypes = [
  // fire-and-forget
  "HAPTIC_TRIGGER",
  // request-response
  "CAMERA_CAPTURE",
  "GPS_GET",
  "OAUTH_GET_TOKEN",
  "FILE_SELECT",
  "FILE_SAVE",
  "NFC_WRITE",
  "QR_SCAN",
  // subscription
  "NFC_READ_START",
  "NFC_READ_STOP",
  "GPS_SUBSCRIBE",
  "GPS_UNSUBSCRIBE",
] as const;

export type RequestType = typeof RequestTypes[number];
