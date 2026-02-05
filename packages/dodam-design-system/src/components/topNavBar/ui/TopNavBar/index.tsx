"use client";

import { cloneElement, isValidElement, memo, ReactElement } from "react";
import { TopNavBarProps } from "../../types/props";
import { BackButton } from "../BackButton";
import { Title } from "../Title";
import { Logo } from "../Logo";
import { IconButton as BaseIconButton, IconButtonProps } from "@/components/buttons";
import { colors } from "@/colors";
import * as S from "./style";

const ICON_SIZE = 24;
const DEFAULT_STYLE = {};

const TopNavBarComponent = memo(({ left, right, children, customStyle = DEFAULT_STYLE }: TopNavBarProps) => (
  <S.Container $customStyle={customStyle}>
    {left && <S.LeftContainer>{left}</S.LeftContainer>}
    <S.MainContainer $hasLeft={!!left}>{children}</S.MainContainer>
    <S.RightContainer>{right}</S.RightContainer>
  </S.Container>
));

const NavIconButton = memo(({ icon, iconSize: _, ...props }: IconButtonProps) => {
  const styledIcon = isValidElement<{ color?: string }>(icon)
    ? cloneElement(icon as ReactElement<{ color?: string }>, { color: colors.text.secondary })
    : icon;

  return <BaseIconButton icon={styledIcon} iconSize={ICON_SIZE} {...props} />;
});

export const TopNavBar = Object.assign(TopNavBarComponent, {
  BackButton,
  Title,
  Logo,
  IconButton: NavIconButton,
});
