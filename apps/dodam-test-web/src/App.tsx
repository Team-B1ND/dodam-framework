import { useQR } from "bridge-kit/client";
import { useCamera } from "bridge-kit/client";
import { useState } from "react";

const App = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const top = `${searchParams.get("top") || 0}px`;
  const bottom = `${searchParams.get("bottom") || 0}px`;
  const { scan } = useQR();
  const { capture } = useCamera();
  const [result, setResult] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");

  const hasBridge =
    typeof window !== "undefined" && !!window.ReactNativeWebView;

  const handleScan = async () => {
    setError("");
    try {
      const res = await scan();
      setResult(res || "");
    } catch (err) {
      setError(String(err));
    }
  };

  const handleCapture = async () => {
    setError("");
    try {
      const url = await capture();
      setPhotoUrl(url || "");
    } catch (err) {
      setError(String(err));
    }
  };

  return (
    <div style={{ paddingTop: top, paddingBottom: bottom }}>
      <p>Bridge: {hasBridge ? "connected" : "missing"}</p>
      <button onClick={handleScan}>Scan QR</button>
      <button onClick={handleCapture}>Capture Camera</button>
      {result && <p>{result}</p>}
      {photoUrl && <p>{photoUrl}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default App;
