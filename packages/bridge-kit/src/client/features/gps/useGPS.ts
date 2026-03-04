import { useBridge } from "../../common/hooks/useBridge";
import {
  GPSGetRequest,
  GPSGetResponse,
  GPSSubscribeRequest,
  GPSSubscribeResponse,
  GPSUnsubscribeRequest,
  GPSUnsubscribeResponse,
} from "../../../shared/types/dto/gps";

export const useGPS = () => {
  const execute = useBridge();

  const getCurrentLocation = async (
    options?: GPSGetRequest,
    timeout: number = 10000,
  ): Promise<GPSGetResponse | null> => {
    const response = await execute<GPSGetResponse>(
      "GPS_GET",
      options ?? {},
      timeout,
    );

    if (!response.success) {
      console.error("[GPS] getCurrentLocation failed:", response.error);
      return null;
    }

    return response.data ?? null;
  };

  const subscribeLocation = async (
    options?: GPSSubscribeRequest,
    timeout: number = 10000,
  ): Promise<GPSSubscribeResponse | null> => {
    const response = await execute<GPSSubscribeResponse>(
      "GPS_SUBSCRIBE",
      options ?? {},
      timeout,
    );

    if (!response.success) {
      console.error("[GPS] subscribeLocation failed:", response.error);
      return null;
    }

    return response.data ?? null;
  };

  const unsubscribeLocation = async (
    subscriptionId: string,
    timeout: number = 5000,
  ): Promise<GPSUnsubscribeResponse | null> => {
    const payload: GPSUnsubscribeRequest = { subscriptionId };
    const response = await execute<GPSUnsubscribeResponse>(
      "GPS_UNSUBSCRIBE",
      payload,
      timeout,
    );

    if (!response.success) {
      console.error("[GPS] unsubscribeLocation failed:", response.error);
      return null;
    }

    return response.data ?? null;
  };

  return {
    getCurrentLocation,
    subscribeLocation,
    unsubscribeLocation,
  };
};
