import styled from "@emotion/styled";
import { FADE_IN_MS, FADE_OUT_MS } from "../../constants";
import { Phase } from "../../types/phase";

export const Container = styled.div<{ $phase: Phase }>`
  opacity: ${({ $phase }) => ($phase === "idle" ? 1 : 0)};
  transition-property: opacity, transform;
  transition-duration: ${({ $phase }) =>
    $phase === "out" ? `${FADE_OUT_MS}ms` : `${FADE_IN_MS}ms`};
  transition-timing-function: ease;
  will-change: opacity, transform;
`;