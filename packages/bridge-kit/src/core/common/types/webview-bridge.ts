export interface WebViewBridge {
  postMessage(message: string): void;
}