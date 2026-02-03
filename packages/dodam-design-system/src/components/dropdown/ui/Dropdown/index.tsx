"use client";

import { useState, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown } from "../../../../icons/mono";
import { colors } from "../../../../colors";
import { DropdownProps } from "../../types/props";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useDropdownPosition } from "../../hooks/useDropdownPosition";
import * as S from "./style";

const MotionOptionWrap = motion.create(S.OptionWrap);

const iconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
} as const;

const iconTransition = { duration: 0.2 } as const;

const optionTransition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
} as const;

export const Dropdown = memo(
  ({ items, value, onSelectedItemChange, customStyle }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useOutsideClick(isOpen, () => setIsOpen(false));
    const { dropUp, calculatePosition } = useDropdownPosition(
      containerRef,
      items.length
    );

    const handleToggle = useCallback(() => {
      if (!isOpen) {
        calculatePosition();
      }
      setIsOpen((prev) => !prev);
    }, [isOpen, calculatePosition]);

    const handleItemClick = useCallback(
      (item: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onSelectedItemChange(item);
        setIsOpen(false);
      },
      [onSelectedItemChange]
    );

    const optionVariants = useMemo<Variants>(
      () => ({
        initial: { opacity: 0, y: dropUp ? 8 : -8, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: dropUp ? 8 : -8, scale: 0.96 },
      }),
      [dropUp]
    );

    return (
      <S.Container
        ref={containerRef}
        onClick={handleToggle}
        $customStyle={customStyle}
      >
        <p>{value}</p>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={iconTransition}
          style={iconStyle}
        >
          <ChevronDown size={16} color={colors.text.primary} />
        </motion.div>
        <AnimatePresence>
          {isOpen && (
            <MotionOptionWrap
              $dropUp={dropUp}
              variants={optionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={optionTransition}
            >
              {items.map((item) => (
                <S.Option key={item} onClick={(e) => handleItemClick(item, e)}>
                  {item}
                </S.Option>
              ))}
            </MotionOptionWrap>
          )}
        </AnimatePresence>
      </S.Container>
    );
  }
);

Dropdown.displayName = "Dropdown";
