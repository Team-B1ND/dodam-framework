import { colors } from "@/colors";
import styled from "@emotion/styled";

export const Background = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.fill.primary};
  opacity: 0;
  transition: opacity 0.15s;
`;

export const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.button`
  all: unset;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: -8px;
  cursor: pointer;

  &:hover > div:first-of-type,
  &:active > div:first-of-type {
    opacity: 1;
  }
`;
