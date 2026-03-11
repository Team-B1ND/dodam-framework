import { useRouter, type RouteProps } from "@b1nd/aid-kit/navigation";
import { useSafeArea } from "@b1nd/aid-kit/safe-area-provider";

export const TabLayout = ({ outlet }: RouteProps) => {
  const { tab: { current, move } } = useRouter();
  const { bottom } = useSafeArea();

  const tabs = [
    { path: "/", label: "홈" },
    { path: "/settings", label: "설정" },
  ] as const;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh" }}>
      <div style={{ flex: 1, overflow: "auto" }}>{outlet}</div>

      <nav
        style={{
          display: "flex",
          borderTop: "1px solid #e5e5e5",
          paddingBottom: bottom,
          background: "#fff",
        }}
      >
        {tabs.map(({ path, label }) => {
          const active = current === path;
          return (
            <button
              key={path}
              onClick={() => move(path)}
              style={{
                flex: 1,
                padding: "12px 0",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontWeight: active ? 700 : 400,
                color: active ? "#1a1a1a" : "#999",
                fontSize: 14,
              }}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
