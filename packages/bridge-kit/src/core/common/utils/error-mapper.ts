const KNOWN_ERRORS = [
  "TIMEOUT",
  "PERMISSION_DENIED",
  "NOT_SUPPORTED",
  "CANCELLED",
  "UNKNOWN",
] as const;

export const errorMapper = (err: unknown) => {
  if (
    typeof err === "string" &&
    (KNOWN_ERRORS as readonly string[]).includes(err)
  ) {
    return err;
  }
  if (err instanceof Error) {
    const msg = err.message;
    if ((KNOWN_ERRORS as readonly string[]).includes(msg)) return msg;
  }
  return "NOT_SUPPORTED" as const;
};
