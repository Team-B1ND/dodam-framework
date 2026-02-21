export const Errors = {
  TIMEOUT: "TIMEOUT",
  PERMISSION_DENIED: "PERMISSION_DENIED",
  NOT_SUPPORTED: "NOT_SUPPORTED",
  CANCELLED: "CANCELLED",
  UNKNOWN: "UNKNOWN",
} as const;

export type Error = typeof Errors[keyof typeof Errors];
