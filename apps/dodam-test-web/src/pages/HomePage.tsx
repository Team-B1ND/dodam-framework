import {
  useBridgeProvider,
  useBridgeResponse,
  Actions,
} from "@b1nd/aid-kit/bridge-kit/web";
import type { BridgeResponse } from "@b1nd/aid-kit/bridge-kit/web";
import { useSafeArea } from "@b1nd/aid-kit/safe-area-provider";
import { useRouter } from "@b1nd/aid-kit/navigation";
import { useState } from "react";

export const HomePage = () => {
  const { top, bottom } = useSafeArea();
  const { send } = useBridgeProvider();
  const {
    stack: { push },
  } = useRouter();
  const [qrResult, setQrResult] = useState("");
  const [location, setLocation] = useState("");

  useBridgeResponse(Actions.QR_SCAN, async (data) => {
    const res = data as BridgeResponse;
    if (res.success) {
      setQrResult(JSON.stringify(res.data));
    } else {
      setQrResult(res.error as string);
    }
    return res;
  });

  useBridgeResponse(Actions.GPS_GET, async (data) => {
    const res = data as BridgeResponse;
    const coords = JSON.stringify(res.data);
    if (res.success && coords) {
      setLocation(JSON.stringify(res));
    } else {
      setLocation("위치 가져오기 실패");
    }
    return res;
  });

  return (
    <div
      style={{
        padding: "16px",
        paddingTop: top + 16,
        paddingBottom: bottom + 16,
      }}>
      <h3 style={{ margin: "0 0 12px" }}>Bridge Test (aid-kit)</h3>

      <button onClick={() => send(Actions.QR_SCAN)}>Scan QR</button>
      {qrResult && <p>QR: {qrResult}</p>}

      <hr />

      <button
        onClick={() => {
          setLocation("위치 가져오는 중...");
          send(Actions.GPS_GET, { accuracy: "high" });
        }}>
        Get GPS Location
      </button>
      {location && <p>{location}</p>}

      <hr />

      <button onClick={() => push("/detail")}>Push Detail Screen →</button>
    </div>
  );
};
