# bridge-kit/client 사용 가이드

간단 설명
- `client`는 웹뷰(브라우저) 쪽에서 `execute`를 통해 브릿지 요청을 보내고, `BridgeProvider`가 응답을 수신해 반환하는 역할을 합니다.

주요 구성
- `BridgeProvider` — 앱 루트(또는 WebView 내부)에 배치. 내부에서 요청 큐를 관리하고 `window.postMessage`/`message` 이벤트로 통신합니다.
- `useBridge()` — 훅으로 `execute(action, payload, timeout?)` 함수를 반환합니다.

execute 시그니처
- `execute<TResponse = unknown>(action: RequestType, payload: unknown, timeout?: number): Promise<BridgeResponse<TResponse>>`
- 반환된 `Promise`는 성공 시 `BridgeResponse` 전체를, 실패 시 `reject`로 shared `Error` enum 값을 받습니다.

예제 (사용자 컴포넌트)
```tsx
import { useBridge } from "src/client/common/hooks/useBridge";

function ScannerButton() {
  const execute = useBridge();

  const onClick = async () => {
    try {
      const res = await execute<{ qrData: string }>(RequestType.QR_SCAN, {}, 120000);
      console.log(res.data?.qrData);
    } catch (err) {
      // err는 shared Error enum 값 (예: "PERMISSION_DENIED", "NOT_SUPPORTED")
      if (err === "PERMISSION_DENIED") {
        // 권한 요청 UI
      }
    }
  };

  return <button onClick={onClick}>Scan</button>;
}
```

카메라 캡처 예시 (url만 반환)
```tsx
import { useCamera } from "bridge-kit/client";

function CameraButton() {
  const { capture } = useCamera();

  const onClick = async () => {
    const url = await capture();
    console.log(url); // file://...
  };

  return <button onClick={onClick}>Capture</button>;
}
```

에러 규약
- core → client 응답의 `error` 필드는 `undefined`(성공) 또는 shared `Error` enum 값(실패)입니다.
- client 내부의 타임아웃/브리지 미존재 등의 경우도 enum 값으로 reject 됩니다 (`TIMEOUT`, `NOT_SUPPORTED` 등).

주의
- `useBridge()`는 `BridgeProvider` 내부에서 사용되어야 합니다. 컨텍스트 밖에서 호출하면 예외가 발생합니다.
- 클라이언트는 `BridgeResponse.data` 타입을 안전하게 사용하도록 제네릭을 지정하세요.

## DTO 및 빌더

- `BridgeRequest<T>`: client가 송신하는 요청 객체입니다. 주요 필드:
  - `id: string` — 요청 식별자
  - `type: RequestType` — 요청 종류
  - `timestamp: number` — 생성 시간
  - `timeout: number` — 타임아웃 밀리초
  - `payload: T` — 페이로드

- `Request(action, payload, timeout)` 빌더: 요청을 생성하는 유틸입니다.
```ts
const req = Request(RequestType.QR_SCAN, { /* payload */ }, 5000);
// req: BridgeRequest<typeof payload>
```

- `BridgeResponse<T>`: client가 core로 부터 수신하는 응답 객체입니다. 주요 필드:
  - `id: string` — 대응하는 요청 id
  - `timestamp: number` — 응답 시간
  - `success: boolean` — 성공 여부
  - `data?: T` — 성공일 때의 데이터
  - `error?: Error` — 실패일 때 shared `Error` enum 값

- `Response(id, success, data?, error?)` 빌더: 응답을 생성합니다.
```ts
// 성공 응답
const res = Response(req.id, true, { qrData: 'abc' });

// 실패 응답 (공유된 enum 사용)
const resErr = Response(req.id, false, undefined, 'PERMISSION_DENIED');
```

두 빌더는 `src/shared/builder/request.ts` 및 `src/shared/builder/response.ts`에 구현되어 있으므로 client 구현에서는 이 빌더를 재사용하세요。