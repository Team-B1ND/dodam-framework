"use client";

import { colors } from "../../../../colors";
import { IndicatorProps } from "../../types/props";
import * as S from "./style";

export const Indicator = ({
  size = 10,
  color = colors.brand.primary,
  current = 0,
  total = 0,
  onChangePage = () => {},
}: IndicatorProps) => {
  return (
    <S.Container $gap={size}>
      {Array.from({ length: total }).map((_, index) => (
        <S.Dot
          key={index}
          $size={size}
          $color={color}
          $isActive={index === current}
          onClick={() => onChangePage(index)}
        />
      ))}
    </S.Container>
  );
};
