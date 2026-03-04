import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Camera } from "react-native-vision-camera";
import { SCAN_SIZE } from "../../constants/scan-size";

export const Container = styled(View)`
  flex: 1;
  background-color: black;
`;

export const FullCamera = styled(Camera)`
  flex: 1;
`;

export const Overlay = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const ScanArea = styled(View)`
  width: ${SCAN_SIZE}px;
  height: ${SCAN_SIZE}px;
  border-width: 4px;
  border-color: white;
  border-radius: 24px;
`;

export const ExitButton: any = styled(TouchableOpacity)`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px;
  z-index: 10;
`;
