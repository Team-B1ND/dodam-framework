import { Text } from "react-native";
import { useSafeArea } from "../../../../common/hooks/useSafeArea";
import { useCamera } from "../../hooks/useCamera";
import * as S from "./style";

const CaptureCamera = () => {
  const { top, bottom } = useSafeArea();
  const { hasPermission, device, cameraRef, isCapturing, capture, setResult } =
    useCamera();

  if (!hasPermission) {
    return (
      <S.Container>
        <Text style={{ color: "white" }}>카메라 권한이 필요해요</Text>
        <S.ExitButton $top={top} onPress={() => setResult(null)}>
          <Text style={{ color: "white", fontSize: 24 }}>✕</Text>
        </S.ExitButton>
      </S.Container>
    );
  }

  if (!device) {
    return (
      <S.Container>
        <Text style={{ color: "white" }}>카메라를 찾을 수 없어요</Text>
        <S.ExitButton $top={top} onPress={() => setResult(null)}>
          <Text style={{ color: "white", fontSize: 24 }}>✕</Text>
        </S.ExitButton>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.FullCamera
        ref={cameraRef}
        device={device}
        isActive={!isCapturing}
        photo
        enableZoomGesture
      />

      <S.ExitButton $top={top} onPress={() => setResult(null)}>
        <Text style={{ color: "white", fontSize: 24 }}>✕</Text>
      </S.ExitButton>

      <S.CaptureButtonContainer $bottom={bottom}>
        <S.CaptureButton disabled={isCapturing} onPress={capture}>
          <S.CaptureInner />
        </S.CaptureButton>
      </S.CaptureButtonContainer>
    </S.Container>
  );
};

export default CaptureCamera;
