"use client";

import { Switch, SwitchProps } from "@b1nd/dodam-design-system/components";
import { useState } from "react";

const TestSwitch = ({
  disabled,
  size,
  customStyle,
}: Partial<SwitchProps>) => {
  const [checked, setChecked] = useState(false);
  return (
    <Switch
      checked={checked}
      onChange={() => setChecked((prev) => !prev)}
      disabled={disabled}
      size={size}
      customStyle={customStyle}
    />
  );
};

export default TestSwitch;
