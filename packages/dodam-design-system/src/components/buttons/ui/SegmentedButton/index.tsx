"use client"

import { SegmentedButtonProps } from "../../types/props"
import * as S from "./style"
import { motion } from "framer-motion"
import { useMemo } from "react"
import { usePressAnimation } from "../../../../animations"

const MotionIndicator = motion.create(S.Indicator);
const MotionItem = motion.create(S.Item);

export const SegmentedButton = ({
  data,
  setData,
  onBlockClick,
  width = "400px",
  containerCustomStyle = {},
  itemCustomStyle = {}
}: SegmentedButtonProps) => {
  const { whileTap, transition: itemTransition } = usePressAnimation();

  const selectedIndex = useMemo(
    () => data.findIndex((item) => item.isActive),
    [data]
  );

  const onClick = (value: string) => {
    onBlockClick?.(value);
    setData((prev) =>
      prev.map((item) => ({ ...item, isActive: item.value === value }))
    );
  };

  const itemCount = data.length;
  const indicatorWidth = `calc((100% - 8px) / ${itemCount})`;

  return (
    <S.Container $width={width} $containerCustomStyle={containerCustomStyle}>
      <MotionIndicator
        initial={false}
        animate={{
          left: `calc(4px + (100% - 8px) / ${itemCount} * ${selectedIndex})`,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 1,
        }}
        style={{ width: indicatorWidth }}
      />
      {data.map((item) => (
        <MotionItem
          key={item.value}
          $isActive={item.isActive.toString()}
          $itemCustomStyle={itemCustomStyle}
          onClick={() => onClick(item.value)}
          whileTap={whileTap}
          transition={itemTransition}
        >
          {item.text}
        </MotionItem>
      ))}
    </S.Container>
  );
}
