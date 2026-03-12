import { IconWithColorProps } from "../types";

export const Moon = ({ color, onClick, pointer, size }: IconWithColorProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: pointer ? "pointer" : "default" }}>
      <path
        d="M10.3775 20C14.6969 20 18.2699 17.7623 19.86 14.0281C20.066 13.5417 20.0448 13.1224 19.7954 12.8808C19.5885 12.6739 19.2018 12.6465 18.7919 12.8092C17.8195 13.2058 16.6667 13.4243 15.3748 13.4243C10.1522 13.4243 6.7386 10.1287 6.7386 5.0541C6.7386 3.71905 7.00824 2.21988 7.43124 1.35039C7.66054 0.872335 7.65214 0.46974 7.43659 0.228095C7.20939 -0.0367502 6.7878 -0.0735602 6.26045 0.1313C2.52774 1.60596 0 5.4518 0 9.79445C0 15.6323 4.3275 20 10.3775 20Z"
        fill={color}
      />
    </svg>
  );
};
