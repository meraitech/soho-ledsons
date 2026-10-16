import type { ReactNode } from "react";

export function SkipToContent(): ReactNode {
  return (
    <a
      href="#main-content"
      className="fixed top-3 left-4 z-100 -translate-y-[150%] rounded-full bg-foreground px-5 py-3 text-background focus:translate-y-0"
    >
      Skip to main content
    </a>
  );
}
