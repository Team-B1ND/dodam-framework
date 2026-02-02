"use client";

import { Calendar, ChevronLeft, ChevronRight } from "../../../../icons/mono";
import * as S from "./style";
import { colors } from "../../../../colors";
import { parseDate } from "../../utils/parse-date";
import { DAYS } from "../../constants";
import { getIsPast } from "../../utils/get-is-past";
import { useDatePicker } from "../../hooks/useDatePicker";
import { DatePickerProps } from "../../types/props";

export const DatePicker = ({
  date = new Date(),
  onChangeDate = () => {},
  disablePast = false,
  title = "날짜 선택",
}: DatePickerProps) => {
  const {
    isOpen,
    setIsOpen,
    current,
    goPrevMonth,
    goNextMonth,
    selected,
    setSelected,
    calendar,
    containerRef,
  } = useDatePicker(date);

  return (
    <S.Container
      ref={containerRef}
      onClick={() => setIsOpen((prev) => !prev)}>
      <S.DateText>{parseDate(date)}</S.DateText>
      <Calendar size={16} color={colors.text.primary} pointer />
      {isOpen && (
        <S.Calender $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
          <S.Title>{title}</S.Title>

          <S.Header>
            <S.MonthText>
              {current.getFullYear()}년 {current.getMonth() + 1}월
            </S.MonthText>
            <S.Arrows>
              <S.Arrow>
                <ChevronLeft
                  color={colors.brand.primary}
                  size={20}
                  onClick={goPrevMonth}
                  pointer
                />
              </S.Arrow>
              <S.Arrow>
                <ChevronRight
                  color={colors.brand.primary}
                  size={20}
                  onClick={goNextMonth}
                  pointer
                />
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
              {calendar.map((cell, i) =>
                cell.day ? (
                  <S.Day
                    key={i}
                    $selected={
                      selected?.toDateString() === cell.date?.toDateString()
                    }
                    $isPast={disablePast && getIsPast(cell.date)}
                    onClick={() => setSelected(cell.date!)}>
                    {cell.day}
                  </S.Day>
                ) : (
                  <div key={i} />
                )
              )}
            </S.Grid>
          </div>

          <S.Button
            onClick={() => {
              onChangeDate(selected);
              setIsOpen(false);
            }}>
            선택
          </S.Button>
        </S.Calender>
      )}
    </S.Container>
  );
};
