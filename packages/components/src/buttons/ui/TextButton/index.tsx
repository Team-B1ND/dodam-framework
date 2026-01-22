"use client"

import * as S from "./style"
import { TextButtonProps } from "../../types/props"
import { PropsWithChildren } from "react"

export const TextButton = ({
  size = "mideum",
  onClick = () => {},
  buttonCustomStyle = {},
  disabled = false,
  children
}: PropsWithChildren<Partial<TextButtonProps>>) => {
  return (
    <S.Container
      $buttonCustomStyle={buttonCustomStyle}
      $disabled={disabled.toString()}
      $size={size}
      onClick={onClick}
    >
      {children ?? "버튼"}
    </S.Container>
  );
}
