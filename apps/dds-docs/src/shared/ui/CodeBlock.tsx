"use client";

import { Highlight, themes, type Language } from "prism-react-renderer";
import { useEffect, useState } from "react";

const TERMINAL_LANGUAGES = ["bash", "shell", "terminal", "sh", "zsh"];

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

interface CodeBlockProps {
  children: string;
  language: string;
}

export default function CodeBlock({ children, language }: CodeBlockProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const isTerminal = TERMINAL_LANGUAGES.includes(language);
  const code = children.trim();

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.dataset.theme as "light" | "dark";
      setTheme(currentTheme || "light");
    };

    updateTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          updateTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const prismTheme = theme === "dark" ? themes.oneDark : themes.oneLight;

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
              {getLanguageDisplayName(language)}
            </span>
          </>
        )}
      </div>
      <div className="p-4 bg-background-surface overflow-x-auto">
        <Highlight theme={prismTheme} code={code} language={language as Language}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="text-sm font-mono">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {i === 0 && isTerminal && (
                    <span className="text-text-tertiary select-none">$ </span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
