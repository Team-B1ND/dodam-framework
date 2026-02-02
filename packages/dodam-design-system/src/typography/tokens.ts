export type TypographyLevel =
  | "Title1"
  | "Title2"
  | "Title3"
  | "Heading1"
  | "Heading2"
  | "Headline"
  | "Body1"
  | "Body2"
  | "Label"
  | "Caption1"
  | "Caption2";

export type TypographyWeight = "Regular" | "Medium" | "Bold";

export const weightTokens = {
  ExtraBold: 800,
  Bold: 700,
  SemiBold: 600,
  Medium: 500,
  Regular: 400,
} as const;

export const typographyTokens = {
  Title1: {
    size: "36px",
    lineHeight: "130%",
    letterSpacing: "-0.03em",
    weights: ["ExtraBold", "Medium", "Regular"] as const,
  },
  Title2: {
    size: "28px",
    lineHeight: "130%",
    letterSpacing: "-0.03em",
    weights: ["ExtraBold", "Medium", "Regular"] as const,
  },
  Title3: {
    size: "24px",
    lineHeight: "130%",
    letterSpacing: "-0.03em",
    weights: ["ExtraBold", "Medium", "Regular"] as const,
  },
  Heading1: {
    size: "22px",
    lineHeight: "130%",
    letterSpacing: "-0.02em",
    weights: ["ExtraBold", "Medium", "Regular"] as const,
  },
  Heading2: {
    size: "20px",
    lineHeight: "140%",
    letterSpacing: "-0.01em",
    weights: ["ExtraBold", "Medium", "Regular"] as const,
  },
  Headline: {
    size: "18px",
    lineHeight: "150%",
    letterSpacing: "0em",
    weights: ["Bold", "Medium", "Regular"] as const,
  },
  Body1: {
    size: "16px",
    lineHeight: "150%",
    letterSpacing: "0.01em",
    weights: ["SemiBold", "Medium", "Regular"] as const,
  },
  Body2: {
    size: "15px",
    lineHeight: "140%",
    letterSpacing: "0.01em",
    weights: ["SemiBold", "Medium", "Regular"] as const,
  },
  Label: {
    size: "14px",
    lineHeight: "140%",
    letterSpacing: "0.02em",
    weights: ["SemiBold", "Medium", "Regular"] as const,
  },
  Caption1: {
    size: "13px",
    lineHeight: "130%",
    letterSpacing: "0.03em",
    weights: ["SemiBold", "Medium", "Regular"] as const,
  },
  Caption2: {
    size: "12px",
    lineHeight: "130%",
    letterSpacing: "0.03em",
    weights: ["SemiBold", "Medium", "Regular"] as const,
  },
}