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
  const webUrl = "http://localhost:5174";
  const uri = `${webUrl}?top=${top}&bottom=${bottom}`;

  return <WebView {...webViewProps} source={{ uri }} scrollEnabled={false} />;
};

export default App;
