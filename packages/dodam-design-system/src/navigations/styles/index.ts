import { colors } from "@/colors";
import styled from "@emotion/styled";

export const Container = styled.div<{
  $isTop: boolean;
  $index: number;
  $isExiting: boolean;
  $isMounted: boolean;
  $top: number;
  $bottom: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100svh;
  background: ${colors.background.default};
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  will-change: transform, opacity;
  overflow: hidden;
  transition:
    transform 0.5s cubic-bezier(0.32, 0.72, 0, 1),
    filter 0.5s cubic-bezier(0.32, 0.72, 0, 1);
  display: block;
  z-index: ${({ $index }) => $index};
  pointer-events: ${({ $isTop }) => ($isTop ? "auto" : "none")};
  padding-top: ${({ $top }) => $top}px;
  padding-bottom: ${({ $bottom }) => $bottom}px;
  ${({ $isMounted, $isExiting, $isTop }) => {
    if ($isExiting) {
      return "transform: translateX(100%);";
    } else if ($isTop) {
      return $isMounted
        ? "transform: translateX(0);"
        : "transform: translateX(100%);";
    } else {
      return "transform: translateX(0); filter: none;";
    }
  }};
`;

export const SafeArea = styled.div<{
  $top: number;
  $bottom: number;
}>`
  padding-top: ${({ $top }) => $top}px;
  padding-bottom: ${({ $bottom }) => $bottom}px;
  box-sizing: border-box;
`;
