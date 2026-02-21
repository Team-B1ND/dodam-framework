export const RequestTypes = {
  // fire-and-forget
  HAPTIC_TRIGGER: "HAPTIC_TRIGGER",
  // request-response
  CAMERA_CAPTURE: "CAMERA_CAPTURE",
  GPS_GET: "GPS_GET",
  OAUTH_GET_TOKEN: "OAUTH_GET_TOKEN",
  FILE_SELECT: "FILE_SELECT",
  FILE_SAVE: "FILE_SAVE",
  NFC_WRITE: "NFC_WRITE",
  QR_SCAN: "QR_SCAN",
  NFC_READ: "NFC_READ",
  GET_GPS: "GET_GPS",
} as const;

export type RequestType = typeof RequestTypes[keyof typeof RequestTypes];
