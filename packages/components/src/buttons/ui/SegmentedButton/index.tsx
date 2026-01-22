"use client"

import { SegmentedButtonProps } from "../../types/props"
import * as S from "./style"

export const SegmentedButton = ({
  data,
  setData,
  onBlockClick,
  width = "400px",
  containerCustomStyle = {},
  itemCustomStyle = {}
}: SegmentedButtonProps) => {
  const onClick = (value: string) => {
    onBlockClick?.(value);
    setData((prev) => 
      prev.map((item) => ({...item, isActive: item.value === value}))
    );
  }
  return (
    <S.Container
      $width={width}
      $containerCustomStyle={containerCustomStyle}
    >
      {data.map((item) => (
        <S.Item 
          $isActive={item.isActive.toString()}
          $itemCustomStyle={itemCustomStyle}
          onClick={() => onClick(item.value)}
          key={item.text}
        >
          {item.text}
        </S.Item>
      ))}
    </S.Container>
  )
}
