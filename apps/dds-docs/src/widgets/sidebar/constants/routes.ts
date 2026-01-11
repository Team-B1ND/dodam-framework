import { COMPONENTS, INDEXES } from "@/shared/constants/indexes";

export const ROUTES = [
  { name: "시작하기", description: "시작하기 페이지", title: "시작하기", href: "/" },
  ...INDEXES
] as const;

export const COMPONENT_ROUTES = [
  { name: "MDX 예시", description: "MDX 예시 페이지", href: "/components/example" },
  { name: "문서 템플릿", description: "문서 템플릿 페이지", href: "/components/template" },
  ...COMPONENTS
]