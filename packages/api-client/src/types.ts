import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
};

export interface CreateApiClientOptions {
  onRefreshFailed?: () => void | Promise<void>;
}

export interface QueuedRequest {
  resolve: (value: AxiosResponse | PromiseLike<AxiosResponse>) => void;
  reject: (reason?: unknown) => void;
  config: RetryableRequestConfig;
}