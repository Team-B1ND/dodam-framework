import { ReactNode, useEffect, useRef, useState } from "react";
import { Phase } from "../types/phase";
import { FADE_IN_MS, FADE_OUT_MS } from "../constants";

export const useTransition = (pages: ReactNode[], current: number, animated: boolean) => {
  const [rendered, setRendered] = useState<ReactNode>(pages[current] ?? null);
  const [phase, setPhase] = useState<Phase>("idle");
  const lastIndexRef = useRef<number>(current);
  const isFirstRef = useRef(true);

  useEffect(() => {
    const next = pages[current] ?? null;

    if (isFirstRef.current) {
      isFirstRef.current = false;
      lastIndexRef.current = current;
      setRendered(next);
      setPhase("idle");
      return;
    }

    if (lastIndexRef.current === current) {
      setRendered(next);
      return;
    }

    lastIndexRef.current = current;
    setPhase("out");

    const outTimer = window.setTimeout(() => {
      setRendered(next);
      setPhase("in");

      const inTimer = window.setTimeout(() => {
        setPhase("idle");
      }, animated ? FADE_IN_MS : 0);

      return () => window.clearTimeout(inTimer);
    }, animated ? FADE_OUT_MS : 0);

    return () => window.clearTimeout(outTimer);
  }, [current, pages, animated]);

  return { phase, rendered };
};
