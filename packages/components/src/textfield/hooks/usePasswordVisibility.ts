"use client";

import { useState } from "react";

export const usePasswordVisibility = () => {
  const [isShowValue, setIsShowValue] = useState(false);

  const toggleVisibility = () => {
    setIsShowValue((prev) => !prev);
  };

  return {
    isShowValue,
    toggleVisibility,
  };
};
