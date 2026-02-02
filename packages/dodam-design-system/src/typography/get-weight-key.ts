import { TypographyWeight } from "./tokens";

export const getWeightKey = (weight: TypographyWeight) => {
  let weightKey: number;
  
  switch (weight) {
    case "Bold":
      weightKey = 0;
      break;
    case "Medium":
      weightKey = 1;
      break;
    case "Regular":
      weightKey = 2;
      break;
  }

  return weightKey;
}