"use client";

import { memo, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "../../../../icons";
import * as S from "./style";
import { colors } from "../../../../colors";
import { DAYS } from "../../constants";
import { getIsPast } from "../../utils/get-is-past";
import { getMonthCalendar } from "../../utils/get-month-calendar";
import { FilledButton } from "../../../buttons";

const MotionContainer = motion.create(S.Container);
const MotionPopupContainer = motion.create(S.PopupContainer);

export interface DatePickerContentProps {
  date?: Date;
  onChangeDate?: (date: Date) => void;
  disablePast?: boolean;
  title?: string;
  onClose?: () => void;
}

const DatePickerContent = memo(
  ({
    date = new Date(),
    onChangeDate,
    disablePast = false,
    title = "날짜 선택",
    onClose,
  }: DatePickerContentProps) => {
    const [current, setCurrent] = useState(
      () => new Date(date.getFullYear(), date.getMonth())
    );
    const [selected, setSelected] = useState<Date>(date);

    const year = current.getFullYear();
    const month = current.getMonth();
    const calendar = getMonthCalendar(year, month);

    const goPrevMonth = useCallback(
      () => setCurrent(new Date(year, month - 1, 1)),
      [year, month]
    );

    const goNextMonth = useCallback(
      () => setCurrent(new Date(year, month + 1, 1)),
      [year, month]
    );

    const handleDayClick = useCallback((cellDate: Date) => {
      setSelected(cellDate);
    }, []);

    const handleConfirm = useCallback(() => {
      onChangeDate?.(selected);
      onClose?.();
    }, [onChangeDate, selected, onClose]);

    return (
      <MotionPopupContainer
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.15 }}
      >
        <S.Title>{title}</S.Title>

        <S.Header>
          <S.MonthText>
            {current.getFullYear()}년 {current.getMonth() + 1}월
          </S.MonthText>
          <S.Arrows>
            <S.Arrow onClick={goPrevMonth}>
              <ChevronLeft color={colors.brand.primary} size={20} pointer />
            </S.Arrow>
            <S.Arrow onClick={goNextMonth}>
              <ChevronRight color={colors.brand.primary} size={20} pointer />
            </S.Arrow>
          </S.Arrows>
        </S.Header>

        <div>
          <S.WeekRow>
            {DAYS.map((day) => (
              <S.Week key={day}>{day}</S.Week>
            ))}
          </S.WeekRow>

          <S.Grid>
            {calendar.map((cell, i) => {
              const isPast = disablePast && getIsPast(cell.date);
              return cell.day ? (
                <S.Day
                  key={i}
                  $selected={
                    selected?.toDateString() === cell.date?.toDateString()
                  }
                  $isPast={isPast}
                  disabled={isPast}
                  onClick={isPast ? undefined : () => handleDayClick(cell.date!)}
                >
                  {cell.day}
                </S.Day>
              ) : (
                <div key={i} />
              );
            })}
          </S.Grid>
        </div>

        <FilledButton size="large" display="fill" onClick={handleConfirm}>
          선택
        </FilledButton>
      </MotionPopupContainer>
    );
  }
);

DatePickerContent.displayName = "DatePickerContent";

export interface DatePickerProps {
  open: boolean;
  date?: Date;
  onChangeDate?: (date: Date) => void;
  disablePast?: boolean;
  title?: string;
  onClose?: () => void;
  onExited?: () => void;
  setDimClickHandler?: (handler: () => void) => void;
}

const DatePickerBase = memo(
  ({
    open,
    date = new Date(),
    onChangeDate,
    disablePast = false,
    title = "날짜 선택",
    onClose,
    onExited,
    setDimClickHandler,
  }: DatePickerProps) => {
    const [current, setCurrent] = useState(
      () => new Date(date.getFullYear(), date.getMonth())
    );
    const [selected, setSelected] = useState<Date>(date);

    const year = current.getFullYear();
    const month = current.getMonth();
    const calendar = getMonthCalendar(year, month);

    const goPrevMonth = useCallback(
      () => setCurrent(new Date(year, month - 1, 1)),
      [year, month]
    );

    const goNextMonth = useCallback(
      () => setCurrent(new Date(year, month + 1, 1)),
      [year, month]
    );

    const handleDayClick = useCallback((cellDate: Date) => {
      setSelected(cellDate);
    }, []);

    const handleConfirm = useCallback(() => {
      onChangeDate?.(selected);
      onClose?.();
    }, [onChangeDate, selected, onClose]);

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

            <S.Header>
              <S.MonthText>
                {current.getFullYear()}년 {current.getMonth() + 1}월
              </S.MonthText>
              <S.Arrows>
                <S.Arrow onClick={goPrevMonth}>
                  <ChevronLeft color={colors.brand.primary} size={20} pointer />
                </S.Arrow>
                <S.Arrow onClick={goNextMonth}>
                  <ChevronRight color={colors.brand.primary} size={20} pointer />
                </S.Arrow>
              </S.Arrows>
            </S.Header>

            <div>
              <S.WeekRow>
                {DAYS.map((day) => (
                  <S.Week key={day}>{day}</S.Week>
                ))}
              </S.WeekRow>

              <S.Grid>
                {calendar.map((cell, i) => {
                  const isPast = disablePast && getIsPast(cell.date);
                  return cell.day ? (
                    <S.Day
                      key={i}
                      $selected={
                        selected?.toDateString() === cell.date?.toDateString()
                      }
                      $isPast={isPast}
                      disabled={isPast}
                      onClick={isPast ? undefined : () => handleDayClick(cell.date!)}
                    >
                      {cell.day}
                    </S.Day>
                  ) : (
                    <div key={i} />
                  );
                })}
              </S.Grid>
            </div>

            <FilledButton size="large" display="fill" onClick={handleConfirm}>
              선택
            </FilledButton>
          </MotionContainer>
        )}
      </AnimatePresence>
    );
  }
);

DatePickerBase.displayName = "DatePicker";

export const DatePicker = Object.assign(DatePickerBase, {
  Content: DatePickerContent,
});
