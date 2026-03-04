import { splitPath } from "./segments";

export const scoreRoute = (path: string): number => {
  if (path === "/") return 0;

  const segments = splitPath(path);
  let score = segments.length * 10;

  for (const seg of segments) {
    if (seg === "*") {
      score += 1;
    } else if (seg.startsWith(":")) {
      score += 2;
    } else {
      score += 3;
    }
  }

  return score;
}
