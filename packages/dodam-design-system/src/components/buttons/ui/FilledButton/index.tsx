"use client"

import * as S from './style';
import { FilledButtonProps } from "../../types/props";
import { PropsWithChildren } from "react";

export const FilledButton = ({
  role = "primary",
  size = "mideum",
  disabled = false,
  onClick = () => {},
  buttonCustomStyle = {},
  children,
}: PropsWithChildren<Partial<FilledButtonProps>>) => {
  return (
    <S.Container
      $buttonCustomStyle={buttonCustomStyle}
      $disabled={disabled.toString()}
      $role={role}
      $size={size}
      onClick={onClick}
    >
      {children ?? "버튼"}
    </S.Container>
  )
}
