import { BaseResponse } from "../types/dto/base-response";
import { Error } from "../types/enums/error";

export const Response = <T>(
  id: string,
  success: boolean,
  data?: T,
  error?: Error,
) => {
  return {
    id,
    timestamp: Date.now(),
    success,
    data,
    error,
  } as BaseResponse<T>;
};
