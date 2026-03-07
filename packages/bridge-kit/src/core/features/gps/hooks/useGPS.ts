import { useCallback } from "react";
import { Alert, Linking } from "react-native";
import * as Location from "expo-location";
import {
  GPSGetRequest,
  GPSGetResponse,
  GPSCoordinates,
} from "../../../../shared/types/dto/gps";
import { Error } from "../../../../shared/types/enums/error";

const mapAccuracy = (accuracy?: "low" | "balanced" | "high"): Location.Accuracy => {
  switch (accuracy) {
    case "low":
      return Location.Accuracy.Low;
    case "balanced":
      return Location.Accuracy.Balanced;
    case "high":
      return Location.Accuracy.High;
    default:
      return Location.Accuracy.Balanced;
  }
};

const mapCoordinates = (location: Location.LocationObject): GPSCoordinates => ({
  latitude: location.coords.latitude,
  longitude: location.coords.longitude,
  altitude: location.coords.altitude,
  accuracy: location.coords.accuracy,
  altitudeAccuracy: location.coords.altitudeAccuracy,
  heading: location.coords.heading,
  speed: location.coords.speed,
});

export const useGPS = () => {
  const showPermissionAlert = () => {
    Alert.alert(
      "위치 정보 접근 거부",
      "위치 권한이 필요합니다.",
      [
        { text: "취소", style: "cancel" },
        {
          text: "설정으로 이동",
          onPress: () => {
            Linking.openURL("app-settings:");
          },
        },
      ],
      { cancelable: false }
    );
  };

  const requestPermission = async (): Promise<boolean> => {
    try {
      const { status: currentStatus } = await Location.getForegroundPermissionsAsync();

      if (currentStatus === "granted") {
        return true;
      }

      if (currentStatus === "denied") {
        showPermissionAlert();
        return false;
      }

      const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
      if (newStatus !== "granted") {
        showPermissionAlert();
        return false;
      }
      return true;
    } catch (error) {
      showPermissionAlert();
      return false;
    }
  };

  const getCurrentLocation = useCallback(
    async (payload: GPSGetRequest): Promise<GPSGetResponse | Error> => {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        return "PERMISSION_DENIED";
      }

      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: mapAccuracy(payload.accuracy),
        });

        return {
          coords: mapCoordinates(location),
          timestamp: location.timestamp,
        };
      } catch (error) {
        return "UNKNOWN";
      }
    },
    [],
  );

  return {
    getCurrentLocation,
  };
};
