import { z } from "zod";

export const GPSCoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number().nullable(),
  accuracy: z.number().nullable(),
  altitudeAccuracy: z.number().nullable(),
  heading: z.number().nullable(),
  speed: z.number().nullable(),
});

export type GPSCoordinates = z.infer<typeof GPSCoordinatesSchema>;

export const GPSGetRequestSchema = z.object({
  accuracy: z.enum(["low", "balanced", "high"]).optional(),
});

export type GPSGetRequest = z.infer<typeof GPSGetRequestSchema>;

export type GPSGetResponse = {
  coords: GPSCoordinates;
  timestamp: number;
};

export const GPSSubscribeRequestSchema = z.object({
  accuracy: z.enum(["low", "balanced", "high"]).optional(),
  distanceInterval: z.number().optional(), 
  timeInterval: z.number().optional(), 
});

export type GPSSubscribeRequest = z.infer<typeof GPSSubscribeRequestSchema>;

export type GPSSubscribeResponse = {
  subscriptionId: string;
  status: "SUBSCRIBED";
};

export const GPSUnsubscribeRequestSchema = z.object({
  subscriptionId: z.string(),
});

export type GPSUnsubscribeRequest = z.infer<typeof GPSUnsubscribeRequestSchema>;
export type GPSUnsubscribeResponse = {
  status: "UNSUBSCRIBED";
};

export type GPSLocationUpdate = {
  subscriptionId: string;
  coords: GPSCoordinates;
  timestamp: number;
};
