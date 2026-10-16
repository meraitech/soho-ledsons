"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { useReducedMotion } from "@/lib/motion";

const firstRow = [
  "Pertanian",
  "Otomotif",
  "Jasa",
  "Konstruksi",
  "IT & Telekomunikasi",
  "Hotel & Properti",
] as const;

const secondRow = [
  "Kimia",
  "Energi & SDA",
  "Tekstil",
  "Manufaktur",
  "Perikanan",
  "UMKM & Korporasi",
] as const;

function IndustryItems({
  items,
  reduced,
}: {
  items: readonly string[];
  reduced: boolean;
}): ReactNode {
  return (reduced ? [0] : [0, 1]).flatMap((copy) =>
    items.map((label) => (
      <li
        key={`${copy}-${label}`}
        className="flex flex-none items-center gap-4 rounded-full border border-border bg-card px-6 py-3 text-lg leading-[1.4] font-medium tracking-[-0.02em] whitespace-nowrap text-foreground motion-reduce:data-[copy=true]:hidden max-[768px]:px-5 max-[768px]:text-base max-[480px]:text-[15px]"
        aria-hidden={copy > 0 ? true : undefined}
        data-copy={copy > 0 ? "true" : undefined}
      >
        <span
          className="size-2 rounded-full bg-foreground/60"
          aria-hidden="true"
        />
        <span>{label}</span>
      </li>
    ))
  );
}

export function Audience(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const firstX = useTransform(scrollYProgress, [0, 1], ["-6%", "-18%"]);
  const secondX = useTransform(scrollYProgress, [0, 1], ["-18%", "-6%"]);

  return (
    <section
      ref={sectionRef}
      id="industri"
      className="group/audience overflow-hidden pt-20 pb-16 max-[992px]:py-16 max-[768px]:py-12"
      data-static={reduced ? "true" : undefined}
      aria-labelledby="industri-heading"
    >
      <div className="mx-auto w-full max-w-360 px-14 max-[992px]:px-8 max-[768px]:px-6 max-[480px]:px-5">
        <Reveal>
          <p className="mb-3 text-center text-[12px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            Pengalaman lintas industri
          </p>
          <h2
            id="industri-heading"
            className={`mx-auto mb-10 max-w-142 text-center text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:mb-8 max-[768px]:text-[38px] max-[480px]:text-[34px]`}
          >
            Dipercaya berbagai sektor usaha.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-360 gap-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] group-data-[static=true]/audience:[mask-image:none] group-data-[static=true]/audience:px-14 motion-reduce:[mask-image:none] motion-reduce:px-[clamp(16px,4vw,56px)] max-[992px]:group-data-[static=true]/audience:px-8 max-[768px]:gap-3 max-[768px]:[mask-image:none] max-[768px]:group-data-[static=true]/audience:px-6 max-[480px]:group-data-[static=true]/audience:px-4">
        <div className="min-w-0 overflow-hidden">
          <motion.ul
            className="m-0 flex w-max list-none items-center gap-4 py-2 group-data-[static=true]/audience:w-auto group-data-[static=true]/audience:transform-none! group-data-[static=true]/audience:flex-wrap group-data-[static=true]/audience:justify-center motion-reduce:w-auto motion-reduce:transform-none! motion-reduce:flex-wrap motion-reduce:justify-center max-[768px]:gap-3"
            style={{ x: reduced ? 0 : firstX }}
            role="list"
            aria-label="Sektor industri yang dilayani"
          >
            <IndustryItems items={firstRow} reduced={reduced} />
          </motion.ul>
        </div>
        <div className="min-w-0 overflow-hidden">
          <motion.ul
            className="m-0 flex w-max list-none items-center gap-4 py-2 group-data-[static=true]/audience:w-auto group-data-[static=true]/audience:transform-none! group-data-[static=true]/audience:flex-wrap group-data-[static=true]/audience:justify-center motion-reduce:w-auto motion-reduce:transform-none! motion-reduce:flex-wrap motion-reduce:justify-center max-[768px]:gap-3"
            style={{ x: reduced ? 0 : secondX }}
            role="list"
            aria-label="Sektor industri lainnya"
          >
            <IndustryItems items={secondRow} reduced={reduced} />
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
