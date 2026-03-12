"use client";

import { IconButton, IconButtonProps } from "@b1nd/dodam-design-system/components";
import { Heart } from "lucide-react";

const TestIconButton = ({ size, iconSize, disabled }: Partial<IconButtonProps>) => {
  return (
    <IconButton
      icon={<Heart />}
      size={size}
      iconSize={iconSize}
      disabled={disabled}
      onClick={() => {}}
    />
  );
};

export default TestIconButton;
