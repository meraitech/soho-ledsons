"use client";
import { motion } from "motion/react";
import { softEase, useReducedMotion } from "@/lib/motion";
import type { ReactNode } from "react";
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string | undefined;
  delay?: number;
}): ReactNode {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      {...(reduced
        ? { animate: { opacity: 1, y: 0 } }
        : {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.12 },
          })}
      transition={{
        duration: reduced ? 0 : 0.75,
        delay: reduced ? 0 : delay,
        ease: softEase,
      }}
    >
      {children}
    </motion.div>
  );
}
