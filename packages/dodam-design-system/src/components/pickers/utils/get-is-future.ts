export const getIsFuture = (date: Date | null, days = 0) => {
  if (!date) return false;

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setHours(0, 0, 0, 0);
  maxDate.setDate(maxDate.getDate() + days);

  return targetDate > maxDate;
};