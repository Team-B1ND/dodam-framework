import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import { BridgeProvider } from "../../src/bridge-kit/core/providers/BridgeProvider";
import { useBridgeProvider } from "../../src/bridge-kit/core/hooks/useBridgeProvider";
import {
  RouteProvider,
  Router,
  type RouteProps,
  type Routes,
} from "../../src/navigation";
import { AppStateProvider } from "../../src/app-state/providers/AppStateProvider";

/**
 * 테스트용 내부 컴포넌트
 * window.bridge를 통해 Playwright가 send/subscribe를 제어
 */
function BridgeTestApp() {
  const { send, subscribe } = useBridgeProvider();

  useEffect(() => {
    (window as any).bridge = {
      send,
      subscribe,
    };
  }, []);

  return null;
}

const NavigationHome = () => <div data-testid="navigation-home">home</div>;
const NavigationSettings = () => (
  <div data-testid="navigation-settings">settings</div>
);
const NavigationDetail = () => (
  <div data-testid="navigation-detail">detail</div>
);
const NavigationLayout = ({ outlet }: RouteProps) => (
  <div data-testid="navigation-layout">{outlet}</div>
);

const navigationRoutes: Routes = {
  tabs: [
    {
      path: "/",
      element: NavigationLayout,
      children: [
        { path: "/", index: true, element: NavigationHome },
        { path: "/settings", element: NavigationSettings },
      ],
    },
  ],
  stacks: [{ path: "/detail", element: NavigationDetail }],
};

function NavigationTestApp() {
  return (
    <RouteProvider routes={navigationRoutes}>
      <Router routes={navigationRoutes} />
    </RouteProvider>
  );
}

// window.ReactNativeWebView mock — 웹→네이티브 메시지를 캡처
(window as any)._sentMessages = [];
(window as any).ReactNativeWebView = {
  postMessage(data: string) {
    const parsed = JSON.parse(data);
    (window as any)._sentMessages.push(parsed);
    if (typeof (window as any)._nativeHandler === "function") {
      (window as any)._nativeHandler(parsed);
    }
  },
};

// 테스트 헬퍼를 window에 노출
(window as any).bridgeTest = {
  getSentMessages: () => (window as any)._sentMessages,
  clearSentMessages: () => {
    (window as any)._sentMessages = [];
  },
  setNativeHandler: (fn: (req: unknown) => void) => {
    (window as any)._nativeHandler = fn;
  },
  clearNativeHandler: () => {
    (window as any)._nativeHandler = undefined;
  },
  /** 네이티브 → 웹으로 응답을 보내는 시뮬레이션 */
  simulateNativeResponse: (response: object) => {
    window.dispatchEvent(
      new MessageEvent("message", { data: JSON.stringify(response) })
    );
  },
};

createRoot(document.getElementById("root")!).render(
  <AppStateProvider>
    <BridgeProvider>
      <BridgeTestApp />
      <NavigationTestApp />
    </BridgeProvider>
  </AppStateProvider>
);
