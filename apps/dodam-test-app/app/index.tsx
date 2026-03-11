import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useBridgeCore } from "@b1nd/aid-kit/bridge-kit/app";

const App = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { webViewProps } = useBridgeCore();
  const webUrl = "https://cf80-2a09-bac6-d76d-155-00-22-d9.ngrok-free.app";
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
