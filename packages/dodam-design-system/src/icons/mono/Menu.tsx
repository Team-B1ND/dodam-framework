"use client";

import { IconWithColorProps } from "../types";

export const Menu = ({
  size = 24,
  onClick = () => {},
  color = "#0F0F10",
  pointer,
}: IconWithColorProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      onClick={onClick}
      style={{ cursor: pointer ? "pointer" : "default" }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.5 3H3.5C2.67157 3 2 3.67157 2 4.5C2 5.32843 2.67157 6 3.5 6H20.5C21.3284 6 22 5.32843 22 4.5C22 3.67157 21.3284 3 20.5 3Z"
        fill={color}
      />
      <path
        d="M20.5 10.5H3.5C2.67157 10.5 2 11.1716 2 12C2 12.8284 2.67157 13.5 3.5 13.5H20.5C21.3284 13.5 22 12.8284 22 12C22 11.1716 21.3284 10.5 20.5 10.5Z"
        fill={color}
      />
      <path
        d="M20.5 18H3.5C2.67157 18 2 18.6716 2 19.5C2 20.3284 2.67157 21 3.5 21H20.5C21.3284 21 22 20.3284 22 19.5C22 18.6716 21.3284 18 20.5 18Z"
        fill={color}
      />
    </svg>
  );
};
