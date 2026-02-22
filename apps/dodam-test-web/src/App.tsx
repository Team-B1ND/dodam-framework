import { useQR } from "bridge-kit/client";
import { useState } from "react";

const App = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const top = `${searchParams.get("top") || 0}px`;
  const bottom = `${searchParams.get("bottom") || 0}px`;
  const { scan } = useQR();
  const [result, setResult] = useState("");

  const handleScan = async () => {
    const res = await scan();
    setResult(res || "");
  };

  return (
    <div style={{ paddingTop: top, paddingBottom: bottom }}>
      <button onClick={handleScan}>Scan QR</button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default App;
