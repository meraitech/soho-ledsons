"use client";
import { Moon, Sun, Pause, Play } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore, type ReactNode } from "react";
import { toggleMotion, useReducedMotion } from "@/lib/motion";

const subscribe = (): (() => void) => () => {};
export function ThemeSwitch(): ReactNode {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const { setTheme, resolvedTheme } = useTheme();
  const reduced = useReducedMotion();
  const dark = mounted && resolvedTheme === "dark";
  return (
    <div
      className="fixed right-4 bottom-4 z-45 flex gap-0.5 rounded-full border border-border bg-card p-1 shadow-(--soft-shadow)"
      role="group"
      aria-label="Appearance preferences"
    >
      <button
        className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
        type="button"
        onClick={toggleMotion}
        aria-label={reduced ? "Resume animations" : "Pause animations"}
        aria-pressed={reduced}
        title={
          reduced
            ? "Resume animations (system preference takes precedence)"
            : "Pause animations"
        }
      >
        {reduced ? (
          <Play size={15} strokeWidth={1.5} />
        ) : (
          <Pause size={15} strokeWidth={1.5} />
        )}
      </button>
      <button
        className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
        type="button"
        disabled={!mounted}
        onClick={() => setTheme(dark ? "light" : "dark")}
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={dark}
      >
        {dark ? (
          <Sun size={16} strokeWidth={1.5} />
        ) : (
          <Moon size={16} strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}
