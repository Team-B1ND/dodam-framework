export const Errors = {
  TIMEOUT: "TIMEOUT",
  PREMISSION_DENIED: "PERMISSION_DENIED",
  NOT_SUPPORT: "NOT_SUPPORTED",
  CANCELLED: "CANCELLED",
  UNKNOWN: "UNKNOWN",
} as const;

export type Error = keyof typeof Errors;
