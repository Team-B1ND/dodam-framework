import { INDEXES } from "@/shared/constants/indexes";
import { Link } from "@cher1shrxd/loading";

const INSTALL_COMMAND =
  "pnpm add dodam-design-system";

const USAGE_EXAMPLE = `import { Button } from "dodam-design-system/components";
import { ArrowRight } from "dodam-design-system/icons/mono";

export default function App() {
  return (
    <div>
      <Button>
        시작하기 <ArrowRight />
      </Button>
    </div>
  );
}`;

export default function GettingStartedPage() {
  return (
    <article className="w-full pb-16">
      <header className="pb-8 border-b border-border-subtle">
        <span className="inline-block px-2.5 py-1 mb-4 text-xs font-medium rounded-full bg-brand-secondary text-static-white">
          Guide
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-text-primary">
          Getting Started
        </h1>
        <p className="mt-3 text-lg text-text-secondary leading-relaxed">
          DDS 디자인 시스템을 프로젝트에 설치하고 시작하는 방법을 안내합니다.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-text-primary">Packages</h2>
        <p className="mt-2 text-text-secondary">
          DDS는 6개의 독립적인 패키지로 구성되어 있어, 필요한 것만 선택해서
          사용할 수 있습니다.
        </p>

        <ul className="mt-6 space-y-2">
          {INDEXES.map((idx) => (
            <li key={idx.package} className="flex items-baseline gap-3">
              <a href={`https://www.npmjs.com/package/${idx.package}`} target="_blank" className="text-sm font-mono text-brand-primary">
                {idx.package}
              </a>
              <span className="text-sm text-text-tertiary">
                — {idx.description}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-text-primary">
          Installation
        </h2>
        <p className="mt-2 text-text-secondary">
          아래 명령어로 모든 패키지를 한 번에 설치할 수 있습니다.
        </p>

        <div className="mt-6 rounded-xl border border-border-subtle overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-fill-primary border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-status-error opacity-80" />
              <span className="w-3 h-3 rounded-full bg-status-warning opacity-80" />
              <span className="w-3 h-3 rounded-full bg-status-success opacity-80" />
            </div>
            <span className="text-xs text-text-tertiary font-medium">
              Terminal
            </span>
          </div>
          <div className="p-4 bg-background-surface">
            <pre className="overflow-x-auto">
              <code className="text-sm text-text-primary font-mono">
                <span className="text-text-tertiary select-none">$ </span>
                {INSTALL_COMMAND}
              </code>
            </pre>
          </div>
        </div>

        <p className="mt-4 text-sm text-text-tertiary">
          또는 필요한 패키지만 개별 설치할 수도 있습니다.
        </p>
      </section>

      {/* Usage */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-text-primary">Usage</h2>
        <p className="mt-2 text-text-secondary">
          설치 후 아래처럼 컴포넌트를 import해서 사용할 수 있습니다.
        </p>

        <div className="mt-6 rounded-xl border border-border-subtle overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-fill-primary border-b border-border-subtle">
            <span className="text-xs text-text-tertiary font-medium">
              App.tsx
            </span>
          </div>
          <div className="p-4 bg-background-surface">
            <pre className="overflow-x-auto">
              <code className="text-sm text-text-primary font-mono whitespace-pre">
                {USAGE_EXAMPLE}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-text-primary">
          Requirements
        </h2>
        <p className="mt-2 text-text-secondary">
          DDS 패키지를 사용하기 위한 환경 요구사항입니다.
        </p>

        <div className="mt-6 p-5 rounded-xl border border-border-subtle bg-background-surface">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
              <span className="text-text-secondary">
                <strong className="text-text-primary">React 19+</strong> 환경을
                전제로 합니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
              <span className="text-text-secondary">
                <strong className="text-text-primary">TypeScript</strong> 지원이
                포함되어 있습니다.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
              <span className="text-text-secondary">
                Next.js, Vite 등 주요 번들러/프레임워크와 호환됩니다.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Next Steps */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-text-primary">Next Steps</h2>
        <p className="mt-2 text-text-secondary">
          설치가 완료되었다면 아래 문서를 참고해서 DDS를 활용해보세요.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {
            INDEXES.map((idx) => (
              <Link
                key={idx.package}
                href={idx.href}
                className="p-4 rounded-xl border border-border-subtle bg-background-surface"
              >
                <h3 className="font-semibold text-text-primary">{idx.title}</h3>
                <p className="mt-1 text-sm text-text-tertiary">
                  {idx.description}
                </p>
              </Link>
            ))
          }
        </div>
      </section>
    </article>
  );
}
