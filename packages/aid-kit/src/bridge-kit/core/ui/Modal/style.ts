import { View } from "react-native";
import styled from "styled-components/native";

export const Modal = styled(View)<{ $top: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-end;
  align-items: center;
  padding-top: ${({ $top }) => $top + 16}px;
`;

export const Backdrop = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled(View)`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
`;
