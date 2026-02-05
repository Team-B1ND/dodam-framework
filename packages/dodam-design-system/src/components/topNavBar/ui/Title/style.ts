import { colors } from "@/colors";
import { typoCss } from "@/typography";
import styled from "@emotion/styled";

export const TitleText = styled.h1<{ $hasBackButton: boolean }>`
  margin: 0;
  ${({ $hasBackButton }) => ($hasBackButton ? typoCss("Headline", "Bold") : typoCss("Title3", "Bold"))};
  color: ${colors.text.primary};
`;
