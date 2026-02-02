import { colors } from "../../../../colors";
import styled from "@emotion/styled";

export const Container = styled.div<{
  $size: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $size }) => `${$size}px`};
  min-width: ${({ $size }) => `${$size}px`};
  aspect-ratio: 1 / 1;
  border-radius: 100%;
  background-color: ${colors.fill.primary};
`;
