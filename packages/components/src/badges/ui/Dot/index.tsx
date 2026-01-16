"use client"

import { colors } from "@dds-web/colors"
import styled, { CSSObject } from "@emotion/styled"
import { DotProps } from "../../types/props"

export const Dot = ({
  size = 8,
  backgroundColor = colors.status.error,
  dotCustomStyle = {}
}: Partial<DotProps>) => {
  return (
    <Container $dotCustomStyle={dotCustomStyle} $backgroundColor={backgroundColor} $size={size}/>
  )
}

const Container = styled.div<{
  $size: number;
  $backgroundColor: string;
  $dotCustomStyle: CSSObject
}>`
  ${({ $dotCustomStyle }) => $dotCustomStyle}
  width: ${({ $size }) => `${$size}px`};
  min-width: ${({ $size }) => `${$size}px`};
  aspect-ratio: 1 / 1;
  border-radius: 100%;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`;