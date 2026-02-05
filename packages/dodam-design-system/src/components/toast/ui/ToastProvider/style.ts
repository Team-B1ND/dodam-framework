import styled from "@emotion/styled";
import { ToastPosition } from "../../index";

export const Container = styled.div<{ $position: ToastPosition }>`
  position: fixed;
  left: 0;
  right: 0;
  ${({ $position }) => ($position === "top" ? "top: 16px;" : "bottom: 16px;")}
  display: flex;
  flex-direction: ${({ $position }) => ($position === "top" ? "column" : "column-reverse")};
  align-items: center;
  gap: 8px;
  pointer-events: none;
  z-index: 9999;
`;
