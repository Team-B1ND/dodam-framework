import type { MDXComponents } from "mdx/types";
import { Children, isValidElement, ReactNode } from "react";

function omitRef<P extends { ref?: unknown }>(props: P): Omit<P, "ref"> {
  // MDX can provide legacy string refs; drop them to satisfy React/TS typings.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ref, ...rest } = props;
  return rest;
}

const TERMINAL_LANGUAGES = ["bash", "shell", "terminal", "sh", "zsh"];

function getLanguageFromChildren(children: ReactNode): string | null {
  const child = Children.toArray(children)[0];
  if (isValidElement<{ className?: string }>(child) && typeof child.props.className === "string") {
    const match = child.props.className.match(/language-(\w+)/);
    return match ? match[1] : null;
  }
  return null;
}

function getLanguageDisplayName(lang: string): string {
  const displayNames: Record<string, string> = {
    bash: "Terminal",
    shell: "Terminal",
    terminal: "Terminal",
    sh: "Terminal",
    zsh: "Terminal",
  };
  return displayNames[lang] || lang;
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
    const language = getLanguageFromChildren(props.children);
    const isTerminal = language && TERMINAL_LANGUAGES.includes(language);

    return (
      <div className="my-4 rounded-xl border border-border-subtle overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-fill-primary border-b border-border-subtle">
          {isTerminal ? (
            <>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-status-error opacity-80" />
                <span className="w-3 h-3 rounded-full bg-status-warning opacity-80" />
                <span className="w-3 h-3 rounded-full bg-status-success opacity-80" />
              </div>
              <span className="text-xs text-text-tertiary font-medium">Terminal</span>
            </>
          ) : (
            <>
              <span />
              <span className="text-xs text-text-tertiary font-medium">
                {language ? getLanguageDisplayName(language) : "Code"}
              </span>
            </>
          )}
        </div>
        <div className="p-4 bg-background-surface">
          <pre
            {...omitRef(props)}
            className={`overflow-x-auto ${props.className ?? ""}`}
          />
        </div>
      </div>
    );
  },
  code: (props) => {
    const className = props.className ?? "";
    const isBlockCode = className.includes("language-");

    if (isBlockCode) {
      const language = className.match(/language-(\w+)/)?.[1];
      const isTerminal = language && TERMINAL_LANGUAGES.includes(language);

      return (
        <code {...omitRef(props)} className={`text-sm font-mono text-text-primary ${className}`}>
          {isTerminal && <span className="text-text-tertiary select-none">$ </span>}
          {props.children}
        </code>
      );
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