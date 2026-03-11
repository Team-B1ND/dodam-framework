import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BridgeProvider } from "@b1nd/aid-kit/bridge-kit/web";
import { SafeAreaProvider } from "@b1nd/aid-kit/safe-area-provider";
import { AppStateProvider } from "@b1nd/aid-kit/app-state";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppStateProvider>
      <SafeAreaProvider>
        <BridgeProvider>
          <App />
        </BridgeProvider>
      </SafeAreaProvider>
    </AppStateProvider>
  </StrictMode>,
);
