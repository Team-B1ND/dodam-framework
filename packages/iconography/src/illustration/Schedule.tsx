"use client";

import type { IconProps } from "../types";

const scheduleSrc = new URL(
  "./assets/schedule.svg",
  import.meta.url
).toString();

export const Schedule = ({
  size = 24,
  onClick = () => {},
  pointer,
}: IconProps) => {
  return (
    <img
      src={scheduleSrc}
      width={size}
      height={size}
      alt=""
      onClick={onClick}
      style={{ cursor: pointer ? "pointer" : "default", userSelect: "none" }}
      draggable={false}
    />
  );
};

export default Schedule;
