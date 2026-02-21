import { Text, View } from "react-native";
import { useScanner } from "../../hooks/useScanner";
import * as S from "./style";

const ScanQR = () => {
  const {
    hasPermission,
    device,
    scanned,
    codeScanner,
    handleLayout,
    setResult,
  } = useScanner();

  if (!hasPermission) {
    return (
      <S.Container onLayout={handleLayout}>
        <S.ErrorContainer>
          <S.ErrorText>카메라 권한이 필요합니다.</S.ErrorText>
        </S.ErrorContainer>
      </S.Container>
    );
  }

  if (!device) {
    return (
      <S.Container onLayout={handleLayout}>
        <S.ErrorContainer>
          <S.ErrorText>카메라를 찾을 수 없습니다.</S.ErrorText>
        </S.ErrorContainer>
      </S.Container>
    );
  }

  return (
    <S.Container onLayout={handleLayout}>
      <S.FullCamera
        device={device}
        isActive={!scanned}
        codeScanner={codeScanner}
        enableZoomGesture
      />

      <S.ExitButton onPress={() => setResult(null)}>
        <Text style={{ color: "white", fontSize: 24 }}>✕</Text>
      </S.ExitButton>

      <S.Overlay pointerEvents="none">
        <S.ScanArea />
      </S.Overlay>
    </S.Container>
  );
};

export default ScanQR;
