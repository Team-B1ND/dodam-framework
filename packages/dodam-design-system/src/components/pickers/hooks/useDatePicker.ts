"use client";

import { useCallback, useState } from "react";
import { getMonthCalendar } from "../utils/get-month-calendar";
import { useClickOutside } from "./useClickOutside";

export const useDatePicker = (date: Date) => {
  const [isOpen, setIsOpen] = useState(false);

  const [current, setCurrent] = useState(
    () => new Date(date.getFullYear(), date.getMonth())
  );
  const [selected, setSelected] = useState<Date>(date);

  const year = current.getFullYear();
  const month = current.getMonth();

  const calendar = getMonthCalendar(year, month);

  const goPrevMonth = () => setCurrent(new Date(year, month - 1, 1));

  const goNextMonth = () => setCurrent(new Date(year, month + 1, 1));

  const close = useCallback(() => setIsOpen(false), []);
  const containerRef = useClickOutside<HTMLDivElement>(close);

  return {
    isOpen,
    setIsOpen,
    current,
    goPrevMonth,
    goNextMonth,
    selected,
    setSelected,
    calendar,
    containerRef,
  };
};
