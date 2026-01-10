import Link from "next/link";

const components = [
  {
    name: "Avatar",
    description: "사용자 프로필 이미지나 이니셜을 표시하는 컴포넌트",
    href: "/components/avatar",
  },
  {
    name: "Badge",
    description: "상태나 카운트를 표시하는 작은 라벨 컴포넌트",
    href: "/components/badge",
  },
  {
    name: "Button",
    description: "클릭 가능한 버튼 컴포넌트",
    href: "/components/button",
  },
  {
    name: "Checkbox",
    description: "선택/해제 상태를 토글하는 체크박스 컴포넌트",
    href: "/components/checkbox",
  },
  {
    name: "Dialog",
    description: "모달 다이얼로그 컴포넌트",
    href: "/components/dialog",
  },
  {
    name: "Dropdown",
    description: "옵션 목록을 표시하는 드롭다운 컴포넌트",
    href: "/components/dropdown",
  },
  {
    name: "Indicator",
    description: "상태를 시각적으로 표시하는 인디케이터 컴포넌트",
    href: "/components/indicator",
  },
  {
    name: "Picker",
    description: "날짜, 시간 등을 선택하는 피커 컴포넌트",
    href: "/components/picker",
  },
  {
    name: "Table",
    description: "데이터를 테이블 형태로 표시하는 컴포넌트",
    href: "/components/table",
  },
  {
    name: "Tag",
    description: "카테고리나 키워드를 표시하는 태그 컴포넌트",
    href: "/components/tag",
  },
  {
    name: "TextField",
    description: "텍스트 입력 필드 컴포넌트",
    href: "/components/textfield",
  },
];

export default function ComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Components</h1>
        <p className="text-text-secondary">
          DDS에서 제공하는 UI 컴포넌트 목록입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {components.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="group p-4 rounded-lg border border-border-normal bg-background-normal hover:bg-fill-primary hover:border-brand-primary transition-colors"
          >
            <h2 className="text-lg font-semibold text-text-primary group-hover:text-brand-primary transition-colors">
              {component.name}
            </h2>
            <p className="mt-1 text-sm text-text-tertiary">
              {component.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
