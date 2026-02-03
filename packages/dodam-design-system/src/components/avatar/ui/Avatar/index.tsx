"use client"

import { Person } from "@/icons/mono"
import { colors } from "@/colors"
import { AvatarProps } from "../../index"
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
