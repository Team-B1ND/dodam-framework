"use client"

import { colors } from "@dds-web/colors"
import styled, { CSSObject } from "@emotion/styled"
import { BadgeProps } from "../../types/props"
import { typoCss } from "@dds-web/typography"

export const Badge = ({
  backgroundColor = colors.status.error,
  badgeCustomStyle = {},
  number,
  maxNumber = 999,
}: BadgeProps) => {
  return (
    <Container
      $backgroundColor={backgroundColor}
      $badgeCustomStyle={badgeCustomStyle}
    >
      {number > maxNumber ? `${maxNumber}+` : number}
    </Container>
  )
}

const Container = styled.div<{
  $backgroundColor: string;
  $badgeCustomStyle: CSSObject;
}>`
  ${({ $badgeCustomStyle }) => $badgeCustomStyle}

  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  padding: 8px;
  border-radius: 999px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  ${typoCss("Label", "Medium")};
  color: ${colors.static.white};
`