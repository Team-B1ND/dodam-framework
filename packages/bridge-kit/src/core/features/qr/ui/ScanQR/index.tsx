import { Button, Text } from "react-native";
import * as S from "./style";
import { useBridgeUi } from "../../../../common/hooks/useBridgeUi";

const ScanQR = () => {
  const { setResult } = useBridgeUi();

  return (
    <S.Container>
      <Text>Scan QR Code</Text>
      <Button title="Scan QR" onPress={() => setResult({ qrData: `sample-qr-data-${Date.now()}` })} />
      <Button title="Cancel" onPress={() => setResult(null)} />
    </S.Container>
  );
};

export default ScanQR;
