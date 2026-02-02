"use client";

import type { IconProps } from "../types";

const globeSrc = new URL("./assets/globe.svg", import.meta.url).toString();

export const Globe = ({
  size = 24,
  onClick = () => {},
  pointer,
}: IconProps) => {
  return (
    <img
      src={globeSrc}
      width={size}
      height={size}
      alt=""
      onClick={onClick}
      style={{ cursor: pointer ? "pointer" : "default", userSelect: "none" }}
      draggable={false}
    />
  );
};