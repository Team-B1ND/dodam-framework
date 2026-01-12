import { CalendarCell } from "../types/calendar-cell";

export const getMonthCalendar = (year: number, month: number): CalendarCell[] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const startWeekDay = firstDayOfMonth.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: CalendarCell[] = [];

  for (let i = 0; i < startWeekDay; i++) {
    cells.push({ date: null, day: null });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      date: new Date(year, month, day),
      day,
    });
  }

  return cells;
}
