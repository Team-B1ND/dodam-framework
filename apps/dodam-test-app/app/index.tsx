import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import {
  Actions,
  core,
  useBridgeCore,
  useBridgeUi,
} from "@b1nd/aid-kit/bridge-kit/app";

const App = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { webViewProps } = useBridgeCore();
  const { open } = useBridgeUi();
  core.mount(Actions.QR_SCAN, async () => {
    const result = await open("QR_SCAN");
    return result;
  });
  core.mountPush(Actions.GPS_GET, (send) => {
    const interval = setInterval(() => {
      send({ position: "dgsw", timestamp: Date.now() });
    }, 3000);

    return () => clearInterval(interval);
  });
  const webUrl = "https://47f6-2a09-bac1-3f20-518-00-20b-7b.ngrok-free.app";
  const uri = `${webUrl}?top=${top}&bottom=${bottom}`;

  return <WebView {...webViewProps} source={{ uri }} scrollEnabled={false} />;
};

export default App;
