"use client"

import { Person } from "@dds-web/iconography/mono"
import styled from "@emotion/styled"
import { AvatarProps } from "../../types/props"
import { colors } from "@dds-web/colors"

export const Avatar = ({
  size = 24
}: AvatarProps) => {
  return (
    <Container $size={size}>
      <Person size={size * 0.6} color={colors.fill.secondary}/>
    </Container>
  )
}

const Container = styled.div<{
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