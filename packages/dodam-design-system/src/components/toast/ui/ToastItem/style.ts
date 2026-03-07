import { colors } from "@/colors";
import { typoCss } from "@/typography";
import styled from "@emotion/styled";

export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: ${colors.fill.primary};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  pointer-events: auto;
  cursor: grab;
  user-select: none;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
`;

export const Message = styled.span`
  ${typoCss("Body2", "Medium")};
  color: ${colors.text.primary};
  white-space: nowrap;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
