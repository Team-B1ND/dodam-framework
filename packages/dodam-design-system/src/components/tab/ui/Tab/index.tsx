"use client";

import { Children, cloneElement, isValidElement, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePressAnimation } from "@/animations";
import { TabProps, TabItemProps } from "../../types/props";
import * as S from "./style";

const MotionIndicator = motion.create(S.Indicator);
const MotionItem = motion.create(S.Item);

interface InternalItemProps extends TabItemProps {
  _flex?: boolean;
}

const TabItem = ({ children, selected, onClick, _flex }: InternalItemProps) => {
  const { whileTap, transition } = usePressAnimation({ scale: 0.95 });

  return (
    <MotionItem
      $selected={!!selected}
      $flex={!!_flex}
      onClick={onClick}
      whileTap={whileTap}
      transition={transition}>
      {children}
    </MotionItem>
  );
};

const INDICATOR_TRANSITION = { type: "spring", stiffness: 300, damping: 30 } as const;

export const Tab = ({ children, itemGap, fluid = false, onChange, customStyle = {} }: TabProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      const container = containerRef.current;
      if (!container) return;

      const buttons = container.querySelectorAll("button");
      const selectedIndex = Children.toArray(children).findIndex(
        (child) => isValidElement<TabItemProps>(child) && child.props.selected
      );

      if (selectedIndex >= 0 && buttons[selectedIndex]) {
        const btn = buttons[selectedIndex];
        setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [children]);

  const renderChildren = () =>
    Children.map(children, (child, index) =>
      isValidElement<InternalItemProps>(child)
        ? cloneElement(child, { onClick: () => onChange?.(index), _flex: !itemGap })
        : child
    );

  return (
    <S.Container ref={containerRef} $fluid={fluid} $itemGap={itemGap} $customStyle={customStyle}>
      {renderChildren()}
      <MotionIndicator initial={false} animate={indicator} transition={INDICATOR_TRANSITION} />
    </S.Container>
  );
};

Tab.Item = TabItem;
