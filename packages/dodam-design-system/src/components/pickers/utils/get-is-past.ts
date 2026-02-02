export const getIsPast = (date: Date | null): boolean => {
  if (!date) return false;
  return Number(date) < Number(new Date(new Date().setHours(0, 0, 0, 0)))
}