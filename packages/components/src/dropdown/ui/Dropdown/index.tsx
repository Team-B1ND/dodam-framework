"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "@dds-web/iconography/mono";
import { colors } from "@dds-web/colors";
import { DropdownProps } from "../../types/props";
import * as S from "./style";

export const Dropdown = ({
  items,
  value,
  onSelectedItemChange,
  customStyle,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleItemClick = (item: string) => {
    onSelectedItemChange(item);
    setIsOpen(false);
  };

  return (
    <S.Container
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
            <S.Option key={idx} onClick={() => handleItemClick(item)}>
              {item}
            </S.Option>
          ))}
        </S.OptionWrap>
      )}
    </S.Container>
  );
};
