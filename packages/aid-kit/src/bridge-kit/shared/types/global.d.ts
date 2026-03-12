declare global {
  interface Window {
    ReactNativeWebView?: {
      /**
       * Send a message to React Native
       * @param message - JSON string to send
       */
      postMessage(message: string): void;
    };
  }
}

export {};