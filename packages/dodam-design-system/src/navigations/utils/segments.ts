export const splitPath = (path: string) => {
  if (path === "/") return [];
  return path.split("/").filter(Boolean);
}