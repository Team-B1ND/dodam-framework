"use client";

import { useState } from "react";
import { FilledTextFieldProps } from "../../index";
import { usePasswordVisibility } from "../../hooks/usePasswordVisibility";
import { renderTextFieldIcon } from "../../utils/render-text-field-icon";
import * as S from "./style";

export const FilledTextField = ({
  label,
  isError = false,
  width,
  supportingText,
  showIcon = true,
  customStyle,
  onRemoveClick,
  type,
  ...props
}: FilledTextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const { isShowValue, toggleVisibility } = usePasswordVisibility();

  const { disabled, value } = props;
  const isDisabled = disabled ?? false;

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
            {...props}
            type={inputType}
            disabled={isDisabled}
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
            onChange: props.onChange,
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
