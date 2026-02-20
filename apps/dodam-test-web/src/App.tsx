import { useQR } from "bridge-kit/client";

const App = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const top = `${searchParams.get("top") || 0}px`;
  const bottom = `${searchParams.get("bottom") || 0}px`;
  const { scan } = useQR();

  return (
    <div style={{ paddingTop: top, paddingBottom: bottom }}>
      <button onClick={() => scan()}>Scan QR</button>
    </div>
  )
}

export default App