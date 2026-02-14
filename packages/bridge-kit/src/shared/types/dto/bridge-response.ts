import { z } from "zod";
import { Errors, Error as BridgeError } from "../enums/error";

export const BridgeResponseSchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  success: z.boolean(),
  data: z.optional(z.unknown()),
  error: z.optional(z.enum(Errors as unknown as [string, ...string[]])),
});

export type BridgeResponseRaw = z.infer<typeof BridgeResponseSchema>;

export type BridgeResponse<T> = Omit<BridgeResponseRaw, "data"> & {
  data?: T;
  error?: BridgeError;
};
