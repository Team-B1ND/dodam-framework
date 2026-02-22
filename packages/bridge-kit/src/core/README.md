# bridge-kit/core 사용 가이드

간단 설명
- `core`는 React Native(또는 WebView 호스트) 쪽에서 요청을 수신하고 도메인 핸들러를 실행해 `BridgeResponse`로 응답을 반환하는 경량 라이브러리입니다.

주요 API
- `createBridgeCore()` — `BridgeCore` 인스턴스 생성
- `bridge.register(type, handler)` — `RequestType`에 대해 핸들러 등록
- `bridge.unregister(type)` — 등록 해제
- `bridge.handleMessage(raw, webview?)` — WebView의 `onMessage`에서 받은 raw payload를 처리하고 (옵션) `webview.postMessage`로 응답을 보냅니다.

핸들러 규약
- 핸들러 시그니처: `(payload) => T | Promise<T>`
- 정상 반환값은 `data`로 응답됩니다. 예외가 발생하면 내부에서 shared `Error` enum 값으로 정규화되어 클라이언트에 반환됩니다.

예제 (RN WebView에서 사용)
```tsx
const bridge = createBridgeCore();

// 도메인 핸들러 등록
bridge.register(RequestType.QR_SCAN, async (payload) => {
  // 네이티브 로직 수행
  return { qrData: "..." };
});

// React Native WebView 연동 예
<WebView
  ref={webviewRef}
  onMessage={(event) => bridge.handleMessage(event.nativeEvent.data, webviewRef.current)}
/>
```

에러 처리
- core는 모든 실패 케이스를 shared `Error` enum 값으로 변환해서 `BridgeResponse.error`에 담아 전송합니다. 클라이언트는 이 enum을 기준으로 분기 처리해야 합니다.

권장
- 중요 도메인 핸들러는 가능한 한 예외 대신 명시적인 실패 코드를 반환하거나(enum) 던지도록 구현하세요. 이렇게 하면 core가 정확히 enum으로 정규화합니다。

## DTO 및 빌더

- `BridgeRequest<T>`: core가 수신하는 요청 객체입니다. 주요 필드:
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

- `BridgeResponse<T>`: core가 클라이언트로 반환하는 응답 객체입니다. 주요 필드:
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

두 빌더는 `src/shared/builder/request.ts` 및 `src/shared/builder/response.ts`에 구현되어 있으므로 core 구현에서는 이 빌더를 재사용하세요。
