"use client";

import { memo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "../../../../icons";
import * as S from "./style";
import { colors } from "../../../../colors";
import { DAYS } from "../../constants";
import { getIsPast } from "../../utils/get-is-past";
import { useDatePickerContent } from "../../hooks/useDatePickerContent";
import { FilledButton } from "../../../buttons";

const MotionContainer = motion.create(S.Container);
const MotionPopupContainer = motion.create(S.PopupContainer);

const OVERLAY_ANIMATION = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { type: "spring", stiffness: 300, damping: 25 },
} as const;

const POPUP_ANIMATION = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.15 },
} as const;

interface CalendarGridProps {
  calendar: ReturnType<typeof useDatePickerContent>["calendar"];
  selected: Date;
  disablePast: boolean;
  onDayClick: (date: Date) => void;
}

const CalendarGrid = memo(
  ({ calendar, selected, disablePast, onDayClick }: CalendarGridProps) => (
    <S.Grid>
      {calendar.map((cell, i) => {
        if (!cell.day) return <div key={i} />;
        const isPast = disablePast && getIsPast(cell.date);
        return (
          <S.Day
            key={i}
            $selected={selected?.toDateString() === cell.date?.toDateString()}
            $isPast={isPast}
            disabled={isPast}
            onClick={isPast ? undefined : () => onDayClick(cell.date!)}
          >
            {cell.day}
          </S.Day>
        );
      })}
    </S.Grid>
  )
);

CalendarGrid.displayName = "CalendarGrid";

interface DatePickerHeaderProps {
  current: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const DatePickerHeader = memo(
  ({ current, onPrevMonth, onNextMonth }: DatePickerHeaderProps) => (
    <S.Header>
      <S.MonthText>
        {current.getFullYear()}년 {current.getMonth() + 1}월
      </S.MonthText>
      <S.Arrows>
        <S.Arrow onClick={onPrevMonth}>
          <ChevronLeft color={colors.brand.primary} size={20} pointer />
        </S.Arrow>
        <S.Arrow onClick={onNextMonth}>
          <ChevronRight color={colors.brand.primary} size={20} pointer />
        </S.Arrow>
      </S.Arrows>
    </S.Header>
  )
);

DatePickerHeader.displayName = "DatePickerHeader";

const WeekRow = memo(() => (
  <S.WeekRow>
    {DAYS.map((day) => (
      <S.Week key={day}>{day}</S.Week>
    ))}
  </S.WeekRow>
));

WeekRow.displayName = "WeekRow";

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
    const { current, selected, calendar, goPrevMonth, goNextMonth, handleDayClick } =
      useDatePickerContent(date);

    const handleConfirm = useCallback(() => {
      onChangeDate?.(selected);
      onClose?.();
    }, [onChangeDate, selected, onClose]);

    return (
      <MotionPopupContainer {...POPUP_ANIMATION}>
        <S.Title>{title}</S.Title>
        <DatePickerHeader
          current={current}
          onPrevMonth={goPrevMonth}
          onNextMonth={goNextMonth}
        />
        <div>
          <WeekRow />
          <CalendarGrid
            calendar={calendar}
            selected={selected}
            disablePast={disablePast}
            onDayClick={handleDayClick}
          />
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
    const { current, selected, calendar, goPrevMonth, goNextMonth, handleDayClick } =
      useDatePickerContent(date);

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
          <MotionContainer {...OVERLAY_ANIMATION}>
            <S.Title>{title}</S.Title>
            <DatePickerHeader
              current={current}
              onPrevMonth={goPrevMonth}
              onNextMonth={goNextMonth}
            />
            <div>
              <WeekRow />
              <CalendarGrid
                calendar={calendar}
                selected={selected}
                disablePast={disablePast}
                onDayClick={handleDayClick}
              />
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
