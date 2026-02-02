"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "../../../../icons/mono";
import { colors } from "../../../../colors";
import { DropdownProps } from "../../types/props";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import * as S from "./style";

export const Dropdown = ({
  items,
  value,
  onSelectedItemChange,
  customStyle,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useOutsideClick(isOpen, () => setIsOpen(false));

  const handleItemClick = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectedItemChange(item);
    setIsOpen(false);
  };

  return (
    <S.Container
      ref={containerRef}
      onClick={() => setIsOpen((prev) => !prev)}
      $customStyle={customStyle}
    >
      <p>{value}</p>
      <S.Icon>
        {isOpen ? (
          <ChevronUp size={16} color={colors.text.primary} />
        ) : (
          <ChevronDown size={16} color={colors.text.primary} />
        )}
      </S.Icon>
      {isOpen && (
        <S.OptionWrap>
          {items.map((item, idx) => (
            <S.Option key={idx} onClick={(e) => handleItemClick(item, e)}>
              {item}
            </S.Option>
          ))}
        </S.OptionWrap>
      )}
    </S.Container>
  );
};
