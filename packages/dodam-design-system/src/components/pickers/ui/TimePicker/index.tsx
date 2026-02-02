"use client";

import { memo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Time } from "../../types/time";
import * as S from "./style";
import { HOURS, MINUTES } from "../../constants";
import { pad } from "../../utils/pad";
import { useTimePickerContent } from "../../hooks/useTimePickerContent";
import { FilledButton } from "../../../buttons";

const MotionContainer = motion.create(S.Container);
const MotionPopupContainer = motion.create(S.PopupContainer);

export interface TimePickerContentProps {
  title?: string;
  time: Time;
  onChangeTime: (time: Time) => void;
  onClose?: () => void;
}

const TimePickerContent = memo(
  ({
    title = "시간 선택",
    time,
    onChangeTime,
    onClose,
  }: TimePickerContentProps) => {
    const {
      selected,
      hourRef,
      minuteRef,
      handleScroll,
      infiniteHours,
      infiniteMinutes,
    } = useTimePickerContent(time, true);

    const handleConfirm = useCallback(() => {
      onChangeTime(selected);
      onClose?.();
    }, [onChangeTime, selected, onClose]);

    return (
      <MotionPopupContainer
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.15 }}
      >
        <S.Title>{title}</S.Title>

        <S.Picker>
          <S.Wheel
            ref={hourRef}
            onScroll={handleScroll(hourRef, HOURS, infiniteHours, "hour")}
          >
            {infiniteHours.map((h, i) => (
              <S.Item key={i} active={h === selected.hour}>
                {pad(h)}
              </S.Item>
            ))}
          </S.Wheel>

          <S.Colon>:</S.Colon>

          <S.Wheel
            ref={minuteRef}
            onScroll={handleScroll(minuteRef, MINUTES, infiniteMinutes, "minute")}
          >
            {infiniteMinutes.map((m, i) => (
              <S.Item key={i} active={m === selected.minute}>
                {pad(m)}
              </S.Item>
            ))}
          </S.Wheel>

          <S.Highlight />
        </S.Picker>

        <FilledButton size="large" display="fill" onClick={handleConfirm}>
          선택
        </FilledButton>
      </MotionPopupContainer>
    );
  }
);

TimePickerContent.displayName = "TimePickerContent";

export interface TimePickerProps {
  open: boolean;
  title?: string;
  time: Time;
  onChangeTime: (time: Time) => void;
  onClose?: () => void;
  onExited?: () => void;
  setDimClickHandler?: (handler: () => void) => void;
}

const TimePickerBase = memo(
  ({
    open,
    title = "시간 선택",
    time,
    onChangeTime,
    onClose,
    onExited,
    setDimClickHandler,
  }: TimePickerProps) => {
    const {
      selected,
      hourRef,
      minuteRef,
      handleScroll,
      infiniteHours,
      infiniteMinutes,
    } = useTimePickerContent(time, open);

    const handleConfirm = useCallback(() => {
      onChangeTime(selected);
      onClose?.();
    }, [onChangeTime, selected, onClose]);

    useEffect(() => {
      if (onClose) {
        setDimClickHandler?.(onClose);
      }
    }, [setDimClickHandler, onClose]);

    return (
      <AnimatePresence onExitComplete={onExited}>
        {open && (
          <MotionContainer
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <S.Title>{title}</S.Title>

            <S.Picker>
              <S.Wheel
                ref={hourRef}
                onScroll={handleScroll(hourRef, HOURS, infiniteHours, "hour")}
              >
                {infiniteHours.map((h, i) => (
                  <S.Item key={i} active={h === selected.hour}>
                    {pad(h)}
                  </S.Item>
                ))}
              </S.Wheel>

              <S.Colon>:</S.Colon>

              <S.Wheel
                ref={minuteRef}
                onScroll={handleScroll(minuteRef, MINUTES, infiniteMinutes, "minute")}
              >
                {infiniteMinutes.map((m, i) => (
                  <S.Item key={i} active={m === selected.minute}>
                    {pad(m)}
                  </S.Item>
                ))}
              </S.Wheel>

              <S.Highlight />
            </S.Picker>

            <FilledButton size="large" display="fill" onClick={handleConfirm}>
              선택
            </FilledButton>
          </MotionContainer>
        )}
      </AnimatePresence>
    );
  }
);

TimePickerBase.displayName = "TimePicker";

export const TimePicker = Object.assign(TimePickerBase, {
  Content: TimePickerContent,
});
