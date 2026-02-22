import {
  BridgeRequest,
  BridgeRequestSchema,
} from "../types/dto/bridge-reqeust";

export const parseBridgeRequest = <T>(obj: T) =>
  BridgeRequestSchema.parse(obj) as BridgeRequest<T>;
