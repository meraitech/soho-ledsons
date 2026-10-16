import type { ReactNode } from "react";

export function Logo({ markOnly = false }: { markOnly?: boolean }): ReactNode {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="4"
          width="23"
          height="23"
          rx="8"
          stroke="currentColor"
          strokeWidth="2"
        />
        <rect
          x="13"
          y="13"
          width="23"
          height="23"
          rx="8"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M17 20.5h6M20 17.5v6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span className="text-[19px] font-semibold tracking-[-0.5px]">
            LEDSONS
          </span>
          <span className="text-[10px] font-medium tracking-[0.08em] text-muted-foreground">
            SOLUSI BISNIS • KJA
          </span>
        </span>
      )}
    </span>
  );
}
