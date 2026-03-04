import { useCallback, useRef } from "react";
import * as Location from "expo-location";
import {
  GPSGetRequest,
  GPSGetResponse,
  GPSSubscribeRequest,
  GPSSubscribeResponse,
  GPSUnsubscribeRequest,
  GPSUnsubscribeResponse,
  GPSCoordinates,
} from "../../../../shared/types/dto/gps";

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
  const subscriptionsRef = useRef<Map<string, Location.LocationSubscription>>(new Map());

  const requestPermission = async (): Promise<boolean> => {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus !== "granted") {
      return false;
    }
    return true;
  };

  const getCurrentLocation = useCallback(
    async (payload: GPSGetRequest): Promise<GPSGetResponse | null> => {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: mapAccuracy(payload.accuracy),
      });

      return {
        coords: mapCoordinates(location),
        timestamp: location.timestamp,
      };
    },
    [],
  );

  const subscribe = useCallback(
    async (
      payload: GPSSubscribeRequest,
      onUpdate: (data: GPSGetResponse) => void,
    ): Promise<GPSSubscribeResponse | null> => {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        return null;
      }

      const subscriptionId = `gps_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: mapAccuracy(payload.accuracy),
          distanceInterval: payload.distanceInterval,
          timeInterval: payload.timeInterval,
        },
        (location: Location.LocationObject) => {
          onUpdate({
            coords: mapCoordinates(location),
            timestamp: location.timestamp,
          });
        },
      );

      subscriptionsRef.current.set(subscriptionId, subscription);

      return {
        subscriptionId,
        status: "SUBSCRIBED",
      };
    },
    [],
  );

  const unsubscribe = useCallback(
    async (payload: GPSUnsubscribeRequest): Promise<GPSUnsubscribeResponse | null> => {
      const subscription = subscriptionsRef.current.get(payload.subscriptionId);
      
      if (subscription) {
        subscription.remove();
        subscriptionsRef.current.delete(payload.subscriptionId);
      }

      return {
        status: "UNSUBSCRIBED",
      };
    },
    [],
  );

  return {
    getCurrentLocation,
    subscribe,
    unsubscribe,
  };
};
