import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  BaseResponse,
  CreateApiClientOptions,
  ErrorResponse,
  QueuedRequest,
  RetryableRequestConfig,
  ApiClient,
} from "./types";
import { REFRESH_PATH } from "./constants";

export const createApiClient = (
  baseURL: string,
  options: CreateApiClientOptions = {},
): ApiClient => {
  const client = axios.create({
    baseURL,
    withCredentials: true,
  });

  let isRefreshing = false;
  let requestQueue: QueuedRequest[] = [];

  const processQueue = async (error?: unknown) => {
    const queuedRequests = [...requestQueue];
    requestQueue = [];

    await Promise.all(
      queuedRequests.map(async ({ resolve, reject, config }) => {
        if (error) {
          reject(error);
          return;
        }

        try {
          resolve(await client(config));
        } catch (requestError) {
          reject(requestError);
        }
      }),
    );
  };

  const rejectWithErrorResponse = (error: AxiosError<ErrorResponse>) =>
    Promise.reject(error.response?.data ?? error);

  client.interceptors.response.use(
    (response: AxiosResponse<BaseResponse<unknown>>) =>
      response.data.data as never,
    async (error: AxiosError<ErrorResponse>) => {
      const originalRequest = error.config as
        | RetryableRequestConfig
        | undefined;
      const status = error.response?.status;

      if (!originalRequest) {
        return rejectWithErrorResponse(error);
      }

      const requestUrl = originalRequest.url ?? "";
      const isRefreshRequest =
        requestUrl === REFRESH_PATH || requestUrl.endsWith(REFRESH_PATH);

      const shouldRefresh =
        status === 401 &&
        !originalRequest._retry &&
        !originalRequest.skipAuthRefresh &&
        !isRefreshRequest;

      if (!shouldRefresh) {
        return rejectWithErrorResponse(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          requestQueue.push({
            resolve,
            reject,
            config: originalRequest,
          });
        });
      }

      isRefreshing = true;

      try {
        await client.post(REFRESH_PATH, undefined, {
          skipAuthRefresh: true,
        } as RetryableRequestConfig);

        await processQueue();
        return client(originalRequest);
      } catch (refreshError) {
        await processQueue(refreshError);
        await options.onRefreshFailed?.();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );

  return {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
      client.get<BaseResponse<T>>(url, config) as Promise<T>,
    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      client.post<BaseResponse<T>>(url, data, config) as Promise<T>,
    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      client.put<BaseResponse<T>>(url, data, config) as Promise<T>,
    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
      client.patch<BaseResponse<T>>(url, data, config) as Promise<T>,
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
      client.delete<BaseResponse<T>>(url, config) as Promise<T>,
  };
};

export default createApiClient;
