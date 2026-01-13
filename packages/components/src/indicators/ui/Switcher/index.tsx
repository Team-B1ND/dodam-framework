"use client";

import { useTransition } from "../../hooks/useTransition";
import { SwitcherProps } from "../../types/props";
import { Container } from "./style";

export const Switcher = ({ pages = [], current = 0, animated = true }: SwitcherProps) => {
  const { phase, rendered } = useTransition(pages, current, animated);

  return (
    <Container
      data-dds-switcher
      data-phase={phase}
      $phase={phase}>
      {rendered}
    </Container>
  );
};
