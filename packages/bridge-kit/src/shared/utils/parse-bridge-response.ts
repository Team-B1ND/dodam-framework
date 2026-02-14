import {
  BridgeResponse,
  BridgeResponseSchema,
} from "../types/dto/bridge-response";

export const parseBridgeResponse = <T = unknown>(obj: T) =>
  BridgeResponseSchema.parse(obj) as BridgeResponse<T>;
