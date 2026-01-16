import { colors } from "@dds-web/colors";
import { TagColor } from "../types/props";

export const getBackgroundColor = (color: TagColor) => {
  switch (color) {
    case "red":
      return colors.status.error;
    case "blue":
      return colors.brand.primary;
    case "default":
      return colors.fill.secondary;
  }
};

export const getTextColor = (color: TagColor) => {
  switch (color) {
    case "red":
    case "blue":
      return colors.static.white;
    case "default":
      return colors.text.primary;
  }
};
