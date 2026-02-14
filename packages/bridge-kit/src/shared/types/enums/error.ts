export const Errors = [
  "TIMEOUT",
  "PERMISSION_DENIED",
  "NOT_SUPPORTED",
  "CANCELLED",
  "UNKNOWN",
] as const;

export type Error = typeof Errors[number];
