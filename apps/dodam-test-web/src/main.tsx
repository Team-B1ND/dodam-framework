import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BridgeProvider } from "@b1nd/aid-kit/bridge-kit/web";
import { SafeAreaProvider } from "@b1nd/aid-kit/safe-area-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SafeAreaProvider>
      <BridgeProvider>
        <App />
      </BridgeProvider>
    </SafeAreaProvider>
  </StrictMode>,
);
