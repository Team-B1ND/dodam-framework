import { colors } from "../../../colors";
import { CheckboxType } from "../types/checkboxType";
import { CheckboxVariant } from "../types/props";

interface GetCheckmarkColorParams {
  variant: CheckboxVariant;
  selected: boolean;
  disabled: boolean;
  type: CheckboxType;
}

export const getCheckmarkColor = ({
  variant,
  selected,
  disabled,
  type,
}: GetCheckmarkColorParams): string => {
  if (variant === "filled") {
    return colors.static.white;
  }
  if (selected) {
    return type === "primary" ? colors.brand.primary : colors.status.error;
  }
  return disabled ? colors.border.disabled : colors.border.normal;
};
