import { Animated } from "react-native";
import styled from "styled-components/native";

export const Modal = styled(Animated.View)<{ $top: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-end;
  align-items: center;
  padding-top: ${({ $top }) => $top}px;
`;

export const Backdrop = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled(Animated.View)`
  width: 100%;
  height: 95%;
  background-color: #ffffff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;
