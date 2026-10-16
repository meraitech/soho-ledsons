"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const softEase = [0.22, 1, 0.36, 1] as const;
const KEY = "ledsons-pause-motion";
const EVENT = "ledsons:motion";
let fallback = false;

function subscribe(callback: () => void): () => void {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
  return () => {
    query.removeEventListener("change", callback);
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

function snapshot(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return true;
  try {
    return localStorage.getItem(KEY) === "true";
  } catch {
    return fallback;
  }
}

export function toggleMotion(): void {
  fallback = !snapshot();
  try {
    localStorage.setItem(KEY, String(fallback));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

const Context = createContext(false);
export function useReducedMotion(): boolean {
  return useContext(Context);
}

export function ReducedMotionProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const reduced = useSyncExternalStore(subscribe, snapshot, () => false);
  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reduced);
    return () => {
      delete document.documentElement.dataset.reducedMotion;
    };
  }, [reduced]);
  return <Context.Provider value={reduced}>{children}</Context.Provider>;
}
