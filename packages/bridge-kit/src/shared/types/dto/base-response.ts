export interface BaseResponse<T> {
  id: string;
  timestamp: number;
  success: boolean;
  data?: T;
  error?: Error;
}
