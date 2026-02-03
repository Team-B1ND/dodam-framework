"use client";

import { TagProps } from "../../index";
import * as S from "./style";

export const Tag = ({
  text,
  color = "default",
  onClick,
  customStyle,
}: TagProps) => {
  return (
    <S.Container $color={color} onClick={onClick} $customStyle={customStyle}>
      <S.Text $color={color}>{text}</S.Text>
    </S.Container>
  );
};
