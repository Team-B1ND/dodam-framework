import styled from "@emotion/styled";
import { colors } from "@dds-web/colors";
import { typoCss } from "@dds-web/typography";

export const Wrapper = styled.div`
  width: 100%;
  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
`;

export const Thead = styled.thead`
  tr {
    height: 32px;
  }
`;
export const Tbody = styled.tbody``;

export const Tr = styled.tr<{ $clickable?: boolean }>`
  vertical-align: middle;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  &:hover {
    background-color: ${({ $clickable }) =>
      $clickable ? colors.fill.hover : "transparent"};
  }
`;

export const Th = styled.th<{ $width: string }>`
  text-align: left;
  padding: 0 12px;
  color: ${colors.text.secondary};
  border-top: 1px solid ${colors.border.normal};
  height: 32px;
  vertical-align: middle;
  box-sizing: border-box;
  ${typoCss("Caption1", "Medium")};
  ${({ $width }) =>
    $width === "FULL"
      ? `min-width: 96px;`
      : `width: ${$width}; min-width: ${$width};`}
`;

export const Td = styled.td<{ $width: string }>`
  padding: 0 12px;
  border-top: 1px solid ${colors.border.normal};
  color: ${colors.text.primary};
  height: 48px;
  vertical-align: middle;
  box-sizing: border-box;
  ${typoCss("Body1", "Bold")};
  ${({ $width }) =>
    $width === "FULL"
      ? `min-width: 96px;`
      : `width: ${$width}; min-width: ${$width};`}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BlankContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  color: ${colors.text.secondary};
  ${typoCss("Label", "Medium")};
`;
