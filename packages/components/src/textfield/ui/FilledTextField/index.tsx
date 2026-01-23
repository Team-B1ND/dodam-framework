"use client";

import { useState } from "react";
import { FilledTextFieldProps } from "../../types/filledtextfield-props";
import { usePasswordVisibility } from "../../hooks/usePasswordVisibility";
import { renderTextFieldIcon } from "../../utils/render-text-field-icon";
import * as S from "./style";

export const FilledTextField = ({
  type,
  label,
  isError = false,
  width,
  name,
  value,
  isDisabled = false,
  supportingText,
  placeholder,
  showIcon = true,
  customStyle,
  onChange,
  onKeyDown,
  onRemoveClick,
}: FilledTextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const { isShowValue, toggleVisibility } = usePasswordVisibility();

  const inputType = type === "password" && !isShowValue ? "password" : "text";

  return (
    <div style={{ position: "relative" }}>
      <S.Container $width={width} $customStyle={customStyle}>
        <S.Label
          $isFocused={isFocused}
          $isDisabled={isDisabled}
          $isError={isError}
        >
          {label}
        </S.Label>
        <S.InputWrapper
          $isFocused={isFocused}
          $isDisabled={isDisabled}
          $isError={isError}
        >
          <input
            name={name}
            type={inputType}
            disabled={isDisabled}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {renderTextFieldIcon({
            showIcon,
            value,
            isError,
            type,
            isShowValue,
            onToggleVisibility: toggleVisibility,
            onRemoveClick,
            onChange,
            IconWrapper: S.IconWrapper,
          })}
        </S.InputWrapper>
      </S.Container>
      {supportingText && (
        <S.SupportingText $isDisabled={isDisabled} $isError={isError}>
          {supportingText}
        </S.SupportingText>
      )}
    </div>
  );
};
