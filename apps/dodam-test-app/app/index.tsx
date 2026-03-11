import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useBridgeCore } from "@b1nd/aid-kit/bridge-kit";

const App = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { webViewProps } = useBridgeCore();
  const webUrl = "https://db50-121-177-220-80.ngrok-free.app";
  const uri = `${webUrl}?top=${top}&bottom=${bottom}`;

  return (
    <WebView
      {...webViewProps}
      source={{ uri }}
      scrollEnabled={false}
    />
  );
};

export default App;
