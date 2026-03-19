export const ImpactFeedbackStyle = {
  Light: "light",
  Medium: "medium",
  Heavy: "heavy",
  Soft: "soft",
  Rigid: "rigid",
} as const;

export type ImpactFeedbackStyle =
  (typeof ImpactFeedbackStyle)[keyof typeof ImpactFeedbackStyle];

export const NotificationFeedbackType = {
  Success: "success",
  Warning: "warning",
  Error: "error",
} as const;

export type NotificationFeedbackType =
  (typeof NotificationFeedbackType)[keyof typeof NotificationFeedbackType];

export type HapticStyle = ImpactFeedbackStyle | NotificationFeedbackType | "selection";

export interface HapticRequest {
  style: HapticStyle;
}