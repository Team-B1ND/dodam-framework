"use client";

import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const TriggerWrapper = styled.div`
  display: inline-block;
`;

export const ContentWrapper = styled.div<{ $position?: "bottom" | "top" }>`
  position: absolute;
  ${({ $position }) =>
    $position === "top"
      ? `bottom: calc(100% + 8px);`
      : `top: calc(100% + 8px);`}
  left: 0;
  z-index: 1000;
`;
