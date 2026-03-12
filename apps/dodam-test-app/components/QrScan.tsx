import { useBridgeUi } from "@b1nd/aid-kit/bridge-kit/app";
import { Button, View } from "react-native";

const QrScan = () => {
  const { setResult } = useBridgeUi();

  return (
    <View>
      <Button onPress={() => setResult("PREMISSION_DENIED")} title="리턴" />
    </View>
  );
};

export default QrScan;
