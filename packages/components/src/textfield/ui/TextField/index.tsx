"use client";

import { TextFieldProps } from "../../types/textfield-props";
import { usePasswordVisibility } from "../../hooks/usePasswordVisibility";
import { renderTextFieldIcon } from "../../utils/render-text-field-icon";
import * as S from "./style";

export const TextField = ({
  id,
  name,
  type,
  value,
  width,
  label = "텍스트를 입력하세요.",
  showIcon = true,
  onChange,
  onKeyDown,
  isDisabled = false,
  labelStyle,
  isError = false,
  supportingText,
  customStyle,
  onRemoveClick,
}: TextFieldProps) => {
  const { isShowValue, toggleVisibility } = usePasswordVisibility();

  const inputType = type === "password" && !isShowValue ? "password" : "text";

  return (
    <div style={{ position: "relative" }}>
      <S.Container $width={width} $isError={isError} $customStyle={customStyle}>
        <S.Input
          required
          disabled={isDisabled}
          id={id}
          name={name}
          type={inputType}
          $isError={isError}
          onChange={onChange}
          value={value}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onKeyDown?.(e);
            }
          }}
        />
        <label style={labelStyle}>{label}</label>
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
        {supportingText && (
          <S.SupportingText $isError={isError}>
            {supportingText}
          </S.SupportingText>
        )}
      </S.Container>
    </div>
  );
};
