"use client";

import styled from "@emotion/styled";
import { colors } from "@/colors";

export const Dim = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${colors.overlay.dim};
  z-index: 10000;
`;

export const Container = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;
