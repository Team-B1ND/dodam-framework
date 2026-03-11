export const Actions = {
  CAMERA_CAPTURE: "CAMERA_CAPTURE",
  GPS_GET: "GPS_GET",
  OAUTH_GET_TOKEN: "OAUTH_GET_TOKEN",
  FILE_SELECT: "FILE_SELECT",
  FILE_SAVE: "FILE_SAVE",
  NFC_WRITE: "NFC_WRITE",
  NFC_READ: "NFC_READ",
  QR_SCAN: "QR_SCAN",
  SYNC: "SYNC",
  ACK: "ACK"
} as const;

export type Action = keyof typeof Actions;