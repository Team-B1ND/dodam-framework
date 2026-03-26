"use client";

import { TextareaProps } from "../../types/props";
import * as S from "./style";

export const Textarea = ({
  isError = false,
  supportingText,
  width,
  customStyle,
  height,
  placeholder = "학습 내용을 입력해주세요.",
  ...props
}: TextareaProps) => {
  const isDisabled = props.disabled ?? false;

  return (
    <S.Container $width={width} $customStyle={customStyle}>
      <S.Textarea
        {...props}
        placeholder={placeholder}
        disabled={isDisabled}
        $isError={isError}
        $height={height}
      />
      {supportingText && (
        <S.SupportingText $isError={isError} $isDisabled={isDisabled}>
          {supportingText}
        </S.SupportingText>
      )}
    </S.Container>
  );
};
