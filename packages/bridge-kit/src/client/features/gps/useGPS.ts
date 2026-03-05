import { useBridge } from "../../common/hooks/useBridge";
import { GPSGetRequest, GPSGetResponse } from "../../../shared/types/dto/gps";
import { Error as BridgeError } from "../../../shared/types/enums/error";

export const useGPS = () => {
  const execute = useBridge();

  const getCurrentLocation = async (
    options?: GPSGetRequest,
    timeout: number = 10000,
  ): Promise<GPSGetResponse | BridgeError> => {
    const response = await execute<GPSGetResponse>(
      "GPS_GET",
      options ?? {},
      timeout,
    );

    if (!response.success) {
      console.error("[GPS] getCurrentLocation failed:", response.error);
      return response.error ?? "UNKNOWN";
    }

    return response.data!;
  };

  return {
    getCurrentLocation,
  };
};
