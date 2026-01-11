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

  return css`
    font-size: ${typographyTokens[level].size};
    line-height: ${typographyTokens[level].lineHeight};
    letter-spacing: ${typographyTokens[level].letterSpacing};
    font-weight: ${weightTokens[typographyTokens[level].weights[weightKey]]};
  `
}
