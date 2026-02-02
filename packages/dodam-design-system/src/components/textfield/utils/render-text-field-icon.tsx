import React, { ChangeEvent } from "react";
import {
  XmarkCircle,
  Eye,
  EyeSlash,
  ExclamationmarkCircle,
} from "../../../icons/mono";
import { colors } from "../../../colors";

export interface RenderTextFieldIconParams {
  showIcon: boolean;
  value?: string | number | readonly string[];
  isError: boolean;
  type: "text" | "password";
  isShowValue: boolean;
  onToggleVisibility: () => void;
  onRemoveClick?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  IconWrapper: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
  eyeSlashColor?: string;
}

export const renderTextFieldIcon = ({
  showIcon,
  value,
  isError,
  type,
  isShowValue,
  onToggleVisibility,
  onRemoveClick,
  onChange,
  IconWrapper,
  eyeSlashColor = colors.text.tertiary,
}: RenderTextFieldIconParams): React.ReactNode => {
  const raw = value ?? "";
  const valueStr = Array.isArray(raw) ? raw.join("") : String(raw);

  if (!showIcon || valueStr.trim().length === 0) return null;

  if (isError) {
    return (
      <IconWrapper>
        <ExclamationmarkCircle size={24} color={colors.status.error} />
      </IconWrapper>
    );
  }

  if (type === "text") {
    const handleClear = () => {
      if (onChange) {
        const ev = {
          target: { value: "" },
        } as unknown as ChangeEvent<HTMLInputElement>;
        onChange(ev);
      }
      onRemoveClick?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClear();
      }
    };

    return (
      <IconWrapper
        onClick={handleClear}
        tabIndex={0}
        role="button"
        onKeyDown={handleKeyDown}
      >
        <XmarkCircle size={24} color={colors.text.tertiary} pointer />
      </IconWrapper>
    );
  }

  if (isShowValue) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggleVisibility();
      }
    };

    return (
      <IconWrapper
        onClick={onToggleVisibility}
        tabIndex={0}
        role="button"
        onKeyDown={handleKeyDown}
      >
        <Eye size={24} color={eyeSlashColor} pointer />
      </IconWrapper>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggleVisibility();
    }
  };

  return (
    <IconWrapper
      onClick={onToggleVisibility}
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyDown}
    >
      <EyeSlash size={24} color={eyeSlashColor} pointer />
    </IconWrapper>
  );
};
