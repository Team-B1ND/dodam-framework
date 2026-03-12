import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import {
  CreateApiClientOptions,
  QueuedRequest,
  RetryableRequestConfig,
} from "./types";
import { REFRESH_PATH } from "./constants";

export const createApiClient = (
  baseURL: string,
  options: CreateApiClientOptions = {},
): AxiosInstance => {
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

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as
        | RetryableRequestConfig
        | undefined;
      const status = error.response?.status;

      if (!originalRequest) {
        return Promise.reject(error);
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
        return Promise.reject(error);
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

  return client;
};

export default createApiClient;
