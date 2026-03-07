import { memo } from "react";
import { TitleProps } from "../../types/props";
import * as S from "./style";

export const Title = memo(({ children, hasBackButton = false }: TitleProps) => (
  <S.TitleText $hasBackButton={hasBackButton}>{children}</S.TitleText>
));
