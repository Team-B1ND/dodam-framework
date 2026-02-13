export interface BridgeResponse<T> {
  id: string;
  timestamp: number;
  success: boolean;
  data?: T;
  error?: Error;
}
