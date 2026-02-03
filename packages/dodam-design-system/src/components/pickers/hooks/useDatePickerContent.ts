"use client";

import { useState, useCallback, useMemo } from "react";
import { getMonthCalendar } from "../utils/get-month-calendar";

export const useDatePickerContent = (initialDate: Date = new Date()) => {
  const [current, setCurrent] = useState(
    () => new Date(initialDate.getFullYear(), initialDate.getMonth())
  );
  const [selected, setSelected] = useState<Date>(initialDate);

  const year = current.getFullYear();
  const month = current.getMonth();

  const calendar = useMemo(
    () => getMonthCalendar(year, month),
    [year, month]
  );

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

  return {
    current,
    selected,
    calendar,
    goPrevMonth,
    goNextMonth,
    handleDayClick,
  };
};
