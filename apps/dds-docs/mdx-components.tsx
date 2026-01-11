import type { MDXComponents } from "mdx/types";

function omitRef<P extends { ref?: unknown }>(props: P): Omit<P, "ref"> {
  // MDX can provide legacy string refs; drop them to satisfy React/TS typings.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ref, ...rest } = props;
  return rest;
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
  ul: (props) => <ul {...omitRef(props)} className={`list-disc pl-6 my-4 ${props.className ?? ""}`} />,
  ol: (props) => <ol {...omitRef(props)} className={`list-decimal pl-6 my-4 ${props.className ?? ""}`} />,
  li: (props) => <li {...omitRef(props)} className={`my-1 ${props.className ?? ""}`} />,
  hr: (props) => <hr {...omitRef(props)} className={`border-border-subtle my-8 ${props.className ?? ""}`} />,
  blockquote: (props) => (
    <blockquote
      {...omitRef(props)}
      className={`border-l-4 border-brand-primary pl-4 text-text-tertiary my-4 ${props.className ?? ""}`}
    />
  ),
  pre: (props) => (
    <pre
      {...omitRef(props)}
      className={`bg-background-surface text-text-secondary border border-border-normal rounded-lg p-4 overflow-x-auto my-4 ${props.className ?? ""}`}
    />
  ),
  code: (props) => {
    const className = props.className ?? "";
    const isBlockCode = className.includes("language-");
    if (isBlockCode) {
      return <code {...omitRef(props)} className={`text-sm ${className}`} />;
    }
    return (
      <code
        {...omitRef(props)}
        className={`text-sm bg-fill-secondary border border-border-subtle rounded px-1.5 py-0.5 ${className}`}
      />
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}