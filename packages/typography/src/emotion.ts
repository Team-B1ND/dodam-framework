import { css } from '@emotion/react'
import {
  typographyTokens,
  TypographyLevel,
  TypographyWeight,
  weightTokens,
} from './tokens'
import { getWeightKey } from './get-weight-key';

export const typoCss = (
  level: TypographyLevel,
  weight: TypographyWeight,
) => {
  const weightKey = getWeightKey(weight);
  

  const token = {
    fontSize: typographyTokens[level].size,
    lineHeight: typographyTokens[level].lineHeight,
    letterSpacing: typographyTokens[level].letterSpacing,
    fontWeight: weightTokens[typographyTokens[level].weights[weightKey]]
  }

  return css`
    font-size: ${token.fontSize};
    line-height: ${token.lineHeight};
    letter-spacing: ${token.letterSpacing};
    font-weight: ${token.fontWeight};
  `
}
