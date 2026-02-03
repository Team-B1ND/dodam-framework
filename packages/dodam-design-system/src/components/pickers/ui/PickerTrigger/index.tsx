"use client";

import {
  ReactNode,
  useState,
  useCallback,
  useRef,
  cloneElement,
  isValidElement,
  ReactElement,
  memo,
} from "react";
import * as S from "./style";
import { useClickOutside } from "../../hooks/useClickOutside";

export interface PickerTriggerProps {
  children: ReactElement;
  content: (props: { onClose: () => void }) => ReactNode;
  position?: "bottom" | "top";
}

export const PickerTrigger = memo(
  ({ children, content, position = "bottom" }: PickerTriggerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const close = useCallback(() => setIsOpen(false), []);
    const containerRef = useClickOutside<HTMLDivElement>(close);

    const handleTriggerClick = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    const trigger = isValidElement(children)
      ? cloneElement(children as ReactElement<{ onClick?: () => void }>, {
          onClick: handleTriggerClick,
        })
      : children;

    return (
      <S.Container ref={containerRef}>
        <S.TriggerWrapper>{trigger}</S.TriggerWrapper>
        {isOpen && (
          <S.ContentWrapper $position={position}>
            {content({ onClose: close })}
          </S.ContentWrapper>
        )}
      </S.Container>
    );
  }
);

PickerTrigger.displayName = "PickerTrigger";
