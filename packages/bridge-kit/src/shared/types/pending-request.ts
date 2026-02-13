import { BaseRequest } from "src/shared/types/dto/base-reqeust";

export interface PendingRequest<T = unknown> {
  request: BaseRequest<T>;
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
  timeoutId?: number;
}