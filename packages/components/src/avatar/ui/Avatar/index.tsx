"use client"

import { Person } from "@dds-web/iconography/mono"
import { colors } from "@dds-web/colors"
import { AvatarProps } from "../../types/props"
import * as S from "./style"

export const Avatar = ({
  size = 24
}: AvatarProps) => {
  return (
    <S.Container $size={size}>
      <Person size={size * 0.6} color={colors.fill.secondary}/>
    </S.Container>
  )
}
