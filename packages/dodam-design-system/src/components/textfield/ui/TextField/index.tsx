"use client";

import { TextFieldProps } from "../../index";
import { usePasswordVisibility } from "../../hooks/usePasswordVisibility";
import { renderTextFieldIcon } from "../../utils/render-text-field-icon";
import * as S from "./style";

export const TextField = ({
  label = "텍스트를 입력하세요.",
  showIcon = true,
  labelStyle,
  isError = false,
  supportingText,
  customStyle,
  onRemoveClick,
  type,
  width,
  ...props
}: TextFieldProps) => {
  const { isShowValue, toggleVisibility } = usePasswordVisibility();

  const inputType = type === "password" && !isShowValue ? "password" : "text";
  const disabled = props.disabled ?? false;

  return (
    <div style={{ position: "relative" }}>
      <S.Container $width={width} $isError={isError} $customStyle={customStyle}>
        <S.Input
          {...props}
          required
          disabled={disabled}
          type={inputType}
          $isError={isError}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.onKeyDown?.(e);
            }
          }}
        />
        <label style={labelStyle}>{label}</label>
        {renderTextFieldIcon({
          showIcon,
          value: props.value,
          isError,
          type,
          isShowValue,
          onToggleVisibility: toggleVisibility,
          onRemoveClick,
          onChange: props.onChange,
          IconWrapper: S.IconWrapper,
        })}
        {supportingText && (
          <S.SupportingText $isError={isError}>
            {supportingText}
          </S.SupportingText>
        )}
      </S.Container>
    </div>
  );
};
