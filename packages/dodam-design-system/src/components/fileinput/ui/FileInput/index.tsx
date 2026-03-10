"use client";

import { useRef, useCallback } from "react";
import { FileInputProps } from "../../types/props";
import { XmarkCircle } from "@/icons/mono";
import { colors } from "@/colors";
import * as S from "./style";

export const FileInput = ({
  label,
  supportingText,
  isError = false,
  isDisabled = false,
  accept,
  value,
  onChange,
  width,
  customStyle,
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    if (!isDisabled) {
      inputRef.current?.click();
    }
  }, [isDisabled]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onChange(files[0]);
      } else {
        onChange(null);
      }
      e.target.value = "";
    },
    [onChange],
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(null);
    },
    [onChange],
  );

  return (
    <S.Container $width={width} $customStyle={customStyle}>
      <S.Label $isError={isError} $isDisabled={isDisabled}>
        {label}
      </S.Label>
      <S.InputWrapper
        $isError={isError}
        $isDisabled={isDisabled}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={isDisabled}
          style={{ display: "none" }}
        />
        <S.FileName $hasFile={!!value}>
          {value ? value.name : "파일을 선택하세요."}
        </S.FileName>
        {value && (
          <S.IconWrapper
            onClick={handleRemove}
            role="button"
            aria-label="파일 제거"
          >
            <XmarkCircle size={24} color={colors.text.tertiary} />
          </S.IconWrapper>
        )}
      </S.InputWrapper>
      {supportingText && (
        <S.SupportingText $isError={isError} $isDisabled={isDisabled}>
          {supportingText}
        </S.SupportingText>
      )}
    </S.Container>
  );
};
