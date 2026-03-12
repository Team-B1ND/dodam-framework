import { TTL } from "../constants/ttl";

export const isExpired = (data: unknown) => {
  if (typeof data === "object" && data !== null && "timestamp" in data) {
    return Date.now() - (data as any).timestamp > TTL;
  }
  return false;
};
