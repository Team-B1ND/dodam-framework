"use client";

import { IconWithColorProps } from "../types";

export const Close = ({
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
        d="M4.92888 19.071C5.44785 19.59 6.29955 19.5846 6.81309 19.071L12.0015 13.8826L17.1899 19.071C17.702 19.5831 18.5522 19.59 19.071 19.0711C19.59 18.5522 19.5915 17.6935 19.0795 17.1815L13.8911 11.9931L19.0725 6.81161C19.5846 6.29956 19.59 5.44785 19.071 4.92888C18.5522 4.41002 17.6935 4.4085 17.1815 4.92055L12 10.102L6.82001 4.92203C6.30647 4.40849 5.44785 4.41002 4.92888 4.92898C4.41002 5.44785 4.41693 6.29803 4.93047 6.81158L10.1105 11.9916L4.92203 17.18C4.40849 17.6935 4.41002 18.5522 4.92888 19.071Z"
        fill={color}
      />
    </svg>
  );
};
