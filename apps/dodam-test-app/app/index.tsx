import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { useBridge } from "bridge-kit";
import { useRef } from "react";

const App = () => {
  const { top, bottom } = useSafeAreaInsets();
  const webUrl = "https://03e8-121-177-220-80.ngrok-free.app";
  const uri = `${webUrl}?top=${top}&bottom=${bottom}`;
  const handleMessage = useBridge();
  const ref = useRef<WebView>(null);

  return (
    <WebView
      ref={ref}
      source={{ uri }}
      scrollEnabled={false}
      onMessage={(event) => {
        handleMessage(event.nativeEvent.data, ref.current || undefined);
      }}
    />
  );
};

export default App;
