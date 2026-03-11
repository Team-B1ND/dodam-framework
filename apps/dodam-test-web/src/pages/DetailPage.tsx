import { useRouter } from "@b1nd/aid-kit/navigation";

export const DetailPage = () => {
  const { stack: { pop } } = useRouter();

  return (
    <div
      style={{
        padding: "24px",
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
