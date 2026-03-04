import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Camera } from "react-native-vision-camera";

export const Container = styled(View)`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

export const FullCamera = styled(Camera)`
  flex: 1;
  width: 100%;
`;

export const ExitButton: any = styled(TouchableOpacity)<{ $top: number }>`
  position: absolute;
  top: ${({ $top }) => $top + 4}px;
  left: 20px;
  padding: 10px;
  z-index: 10;
`;

export const CaptureButtonContainer = styled(View)<{ $bottom: number }>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${({ $bottom }) => $bottom + 20}px;
  align-items: center;
`;

export const CaptureButton: any = styled(TouchableOpacity)`
  width: 78px;
  height: 78px;
  border-radius: 39px;
  border-width: 4px;
  border-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

export const CaptureInner = styled(View)`
  width: 62px;
  height: 62px;
  border-radius: 31px;
  background-color: #ffffff;
`;
