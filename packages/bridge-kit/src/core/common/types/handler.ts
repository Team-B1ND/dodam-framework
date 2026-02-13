export interface Handler<TPayload = unknown, TResponse = unknown> {
  (payload: TPayload): Promise<TResponse> | TResponse;
}