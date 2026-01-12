"use client";

import { TimePickerProps } from "../../types/props";
import * as S from "./style";
import { HOURS, MINUTES } from "../../constants";
import { pad } from "../../utils/pad";
import { useTimePicker } from "../../hooks/useTimePicker";
import { colors } from "@dds-web/colors";
import { Clock } from "@dds-web/iconography/mono";

export const TimePicker = ({
  title = "시간 선택",
  time,
  onChangeTime,
}: TimePickerProps) => {
  const {
    isOpen,
    setIsOpen,
    selected,
    hourRef,
    minuteRef,
    handleScroll,
    containerRef,
    infiniteHours,
    infiniteMinutes,
  } = useTimePicker(time);

  return (
    <S.Container ref={containerRef} onClick={() => setIsOpen((prev) => !prev)}>
      <S.DateText>
        {pad(time.hour)}:{pad(time.minute)}
      </S.DateText>
      <Clock size={16} color={colors.text.primary} pointer />
      {isOpen && (
        <S.Timer $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
          <S.Title>{title}</S.Title>

          <S.Picker>
            <S.Wheel
              ref={hourRef}
              onScroll={handleScroll(hourRef, HOURS, infiniteHours, "hour")}>
              {infiniteHours.map((h, i) => (
                <S.Item key={i} active={h === selected.hour}>
                  {pad(h)}
                </S.Item>
              ))}
            </S.Wheel>

            <S.Colon>:</S.Colon>

            <S.Wheel
              ref={minuteRef}
              onScroll={handleScroll(
                minuteRef,
                MINUTES,
                infiniteMinutes,
                "minute"
              )}>
              {infiniteMinutes.map((m, i) => (
                <S.Item key={i} active={m === selected.minute}>
                  {pad(m)}
                </S.Item>
              ))}
            </S.Wheel>

            <S.Highlight />
          </S.Picker>
          <S.Button
            onClick={() => {
              onChangeTime(selected);
              setIsOpen(false);
            }}>
            선택
          </S.Button>
        </S.Timer>
      )}
    </S.Container>
  );
};
