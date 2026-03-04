import { useQR, useGPS } from "bridge-kit/client";
import { useState } from "react";

const App = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const top = `${searchParams.get("top") || 0}px`;
  const bottom = `${searchParams.get("bottom") || 0}px`;
  const { scan } = useQR();
  const { getCurrentLocation } = useGPS();
  const [result, setResult] = useState("");
  const [location, setLocation] = useState<string>("");

  const handleScan = async () => {
    const res = await scan();
    setResult(res || "");
  };

  const handleGetLocation = async () => {
    setLocation("위치 가져오는 중...");
    const res = await getCurrentLocation({ accuracy: "high" });
    if (res) {
      setLocation(
        `위도: ${res.coords.latitude}, 경도: ${res.coords.longitude}`,
      );
    } else {
      setLocation("위치 가져오기 실패");
    }
  };

  return (
    <div style={{ paddingTop: top, paddingBottom: bottom }}>
      <button onClick={handleScan}>Scan QR</button>
      {result && <p>{result}</p>}
      <hr />
      <button onClick={handleGetLocation}>Get GPS Location</button>
      {location && <p>{location}</p>}
    </div>
  );
};

export default App;
