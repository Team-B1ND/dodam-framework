export const getCurrentTime = () => {
  const now = new Date();
  return {
    hour: now.getHours(),
    minute: now.getMinutes(),
  };
}