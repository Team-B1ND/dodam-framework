import type { MDXComponents } from "mdx/types";
import { Children, isValidElement, ReactNode } from "react";
import CodeBlock from "@/shared/ui/CodeBlock";

function omitRef<P extends { ref?: unknown }>(props: P): Omit<P, "ref"> {
  // MDX can provide legacy string refs; drop them to satisfy React/TS typings.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ref, ...rest } = props;
  return rest;
}

function getCodeFromChildren(children: ReactNode): { code: string; language: string } | null {
  const child = Children.toArray(children)[0];
  if (isValidElement<{ className?: string; children?: ReactNode }>(child)) {
    const className = child.props.className ?? "";
    const match = className.match(/language-(\w+)/);
    const language = match ? match[1] : "plaintext";
    const code = typeof child.props.children === "string" ? child.props.children : "";
    return { code, language };
  }
  return null;
}

const components: MDXComponents = {
  wrapper: ({ children }) => (
    <div className="text-text-secondary leading-7 [&>*:first-child]:mt-0">
      {children}
    </div>
  ),
  h1: (props) => (
    <h1
      {...omitRef(props)}
      className={`text-text-primary text-3xl font-bold mt-8 mb-4 scroll-mt-24 ${props.className ?? ""}`}
    />
  ),
  h2: (props) => (
    <h2
      {...omitRef(props)}
      className={`text-text-primary text-2xl font-semibold mt-10 mb-4 scroll-mt-24 ${props.className ?? ""}`}
    />
  ),
  h3: (props) => (
    <h3
      {...omitRef(props)}
      className={`text-text-primary text-xl font-semibold mt-8 mb-3 scroll-mt-24 ${props.className ?? ""}`}
    />
  ),
  p: (props) => <p {...omitRef(props)} className={`my-4 ${props.className ?? ""}`} />,
  a: (props) => (
    <a
      {...omitRef(props)}
      className={`text-brand-primary hover:text-brand-secondary ${props.className ?? ""}`}
    />
  ),
  strong: (props) => (
    <strong
      {...omitRef(props)}
      className={`text-text-primary font-bold ${props.className ?? ""}`}
    />
  ),
  ul: (props) => (
    <ul
      {...omitRef(props)}
      className={`list-none pl-0 my-4 space-y-3 ${props.className ?? ""}`}
    />
  ),
  ol: (props) => <ol {...omitRef(props)} className={`list-decimal pl-6 my-4 ${props.className ?? ""}`} />,
  li: (props) => (
    <li {...omitRef(props)} className={`flex items-baseline gap-3 ${props.className ?? ""}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0 translate-y-[-2px]" />
      <span>{props.children}</span>
    </li>
  ),
  hr: (props) => <hr {...omitRef(props)} className={`border-border-subtle my-8 ${props.className ?? ""}`} />,
  blockquote: (props) => (
    <blockquote
      {...omitRef(props)}
      className={`border-l-4 border-brand-primary pl-4 text-text-tertiary my-4 ${props.className ?? ""}`}
    />
  ),
  pre: (props) => {
    const codeData = getCodeFromChildren(props.children);
    if (codeData) {
      return <CodeBlock language={codeData.language}>{codeData.code}</CodeBlock>;
    }
    return (
      <pre
        {...omitRef(props)}
        className={`bg-background-surface p-4 rounded-xl overflow-x-auto my-4 ${props.className ?? ""}`}
      />
    );
  },
  code: (props) => {
    const className = props.className ?? "";
    const isBlockCode = className.includes("language-");

    // Block code is handled by pre component with CodeBlock
    if (isBlockCode) {
      return <>{props.children}</>;
    }

    return (
      <code
        {...omitRef(props)}
        className={`text-sm bg-fill-secondary border border-border-subtle rounded px-1.5 py-0.5 ${className}`}
      />
    );
  },
  table: (props) => (
    <div className="overflow-x-auto my-6 rounded-lg border border-border-normal">
      <table
        {...omitRef(props)}
        className={`w-full text-sm border-collapse ${props.className ?? ""}`}
      />
    </div>
  ),
  thead: (props) => (
    <thead
      {...omitRef(props)}
      className={`bg-fill-primary text-text-primary border-b border-border-normal ${props.className ?? ""}`}
    />
  ),
  tbody: (props) => (
    <tbody
      {...omitRef(props)}
      className={`divide-y divide-border-normal ${props.className ?? ""}`}
    />
  ),
  tr: (props) => (
    <tr
      {...omitRef(props)}
      className={`hover:bg-fill-primary transition-colors ${props.className ?? ""}`}
    />
  ),
  th: (props) => (
    <th
      {...omitRef(props)}
      className={`px-4 py-3 text-left font-semibold border-r border-border-normal last:border-r-0 ${props.className ?? ""}`}
    />
  ),
  td: (props) => (
    <td
      {...omitRef(props)}
      className={`px-4 py-3 text-text-secondary border-r border-border-normal last:border-r-0 ${props.className ?? ""}`}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}