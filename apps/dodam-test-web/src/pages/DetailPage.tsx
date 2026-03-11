import { useRouter } from "@b1nd/aid-kit/navigation";
import { useSafeArea } from "@b1nd/aid-kit/safe-area-provider";

export const DetailPage = () => {
  const { top, bottom } = useSafeArea();
  const { stack: { pop } } = useRouter();

  return (
    <div
      style={{
        padding: `${top}px 16px ${bottom}px 16px`,
        background: "#fff",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h2>Detail Screen</h2>
      <p style={{ color: "#666" }}>← Swipe or flick right to go back</p>
      <button onClick={() => pop()} style={{ marginTop: "16px" }}>
        ← Back
      </button>
    </div>
  );
};
