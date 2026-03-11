import { useRouter, type RouteProps } from "@b1nd/aid-kit/navigation";
import { useSafeArea } from "@b1nd/aid-kit/safe-area-provider";

export const SettingsPage = (_: RouteProps) => {
  const { stack: { push } } = useRouter();
  const { top } = useSafeArea();

  return (
    <div style={{ padding: "16px", paddingTop: top + 16 }}>
      <h3 style={{ margin: "0 0 12px" }}>Settings</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li
          style={{
            padding: "14px 0",
            borderBottom: "1px solid #f0f0f0",
            cursor: "pointer",
            color: "#333",
          }}
          onClick={() => push("/detail")}
        >
          Detail 화면 테스트 →
        </li>
        <li style={{ padding: "14px 0", borderBottom: "1px solid #f0f0f0", color: "#999" }}>
          앱 버전: 0.0.0
        </li>
      </ul>
    </div>
  );
};
