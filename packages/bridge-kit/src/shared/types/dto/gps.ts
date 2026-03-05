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
