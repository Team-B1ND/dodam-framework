import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { BridgeUiProvider } from "bridge-kit";

const App = () => {
  const { top, bottom } = useSafeAreaInsets();
  const webUrl = "https://03e8-121-177-220-80.ngrok-free.app";
  const uri = `${webUrl}?top=${top}&bottom=${bottom}`;

  return (
    <>
      <WebView source={{ uri }} scrollEnabled={false} />
      <BridgeUiProvider />
    </>
  );
};

export default App;
