import { colors } from "@/colors";
import styled, { CSSObject } from "@emotion/styled";

export const Container = styled.nav<{ $customStyle: CSSObject }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: ${colors.background.surface};
  ${({ $customStyle }) => $customStyle};
`;

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MainContainer = styled.div<{ $hasLeft: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: ${({ $hasLeft }) => ($hasLeft ? "8px" : "0")};
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;
