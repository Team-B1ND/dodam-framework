export const Errors = {
  TIMEOUT: "TIMEOUT",
  PREMISSION_DENIED: "PERMISSION_DENIED",
  NOT_SUPPORT: "NOT_SUPPORTED",
  CANCELLED: "CANCELLED",
  UNKNOWN: "UNKNOWN",
};

export type Error = keyof typeof Errors;
