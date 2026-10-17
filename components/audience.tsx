"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { images } from "@/lib/images";
import { useReducedMotion } from "@/lib/motion";

const firstRow = [
  { label: "Pertanian", photo: images.portraitOne },
  { label: "Otomotif", photo: images.courtyard },
  { label: "Jasa", photo: images.desk },
  { label: "Konstruksi", photo: images.portraitTwo },
  { label: "IT & Telekomunikasi", photo: images.chair },
  { label: "Hotel & Properti", photo: images.process },
] as const;

const secondRow = [
  { label: "Kimia", photo: images.corridor },
  { label: "Energi & SDA", photo: images.portraitTwo },
  { label: "Tekstil", photo: images.process },
  { label: "Manufaktur", photo: images.chair },
  { label: "Perikanan", photo: images.portraitOne },
  { label: "UMKM", photo: images.desk },
] as const;

type AudienceRole = (typeof firstRow)[number] | (typeof secondRow)[number];

function RoleItems({
  roles,
  reduced,
}: {
  roles: readonly AudienceRole[];
  reduced: boolean;
}): ReactNode {
  return (reduced ? [0] : [0, 1]).flatMap((copy) =>
    roles.map(({ label, photo }) => (
      <li
        key={`${copy}-${label}`}
        className="group/role flex flex-none items-center gap-6 text-xl leading-[1.4] font-medium tracking-[-0.02em] whitespace-nowrap text-foreground motion-reduce:data-[copy=true]:hidden max-[768px]:gap-5 max-[768px]:text-lg max-[480px]:gap-4 max-[480px]:text-[17px]"
        aria-hidden={copy > 0 ? true : undefined}
        data-copy={copy > 0 ? "true" : undefined}
      >
        <span
          className="relative size-15 flex-none -rotate-8 overflow-hidden rounded-lg bg-muted group-[:nth-child(3n)]/role:-rotate-3 group-[:nth-child(3n+2)]/role:rotate-6 max-[768px]:size-14 max-[480px]:size-12"
          aria-hidden="true"
        >
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="(max-width: 479px) 48px, (max-width: 767px) 56px, 60px"
            className="object-cover"
          />
        </span>
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
      id="who"
      className="group/audience overflow-hidden pt-28 pb-24 max-[992px]:py-22 max-[768px]:py-18"
      data-static={reduced ? "true" : undefined}
      aria-labelledby="audience-heading"
    >
      <div className="mx-auto w-full max-w-360 px-14 max-[992px]:px-8 max-[768px]:px-6 max-[480px]:px-5">
        <Reveal>
          <h2
            id="audience-heading"
            className={`mx-auto mb-14 max-w-142 text-center text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:mb-10 max-[768px]:text-[38px] max-[480px]:text-[34px]`}
          >
            Untuk berbagai sektor usaha.
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-360 gap-6 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] group-data-[static=true]/audience:[mask-image:none] group-data-[static=true]/audience:px-14 motion-reduce:[mask-image:none] motion-reduce:px-[clamp(16px,4vw,56px)] max-[992px]:group-data-[static=true]/audience:px-8 max-[768px]:gap-4 max-[768px]:[mask-image:none] max-[768px]:group-data-[static=true]/audience:px-6 max-[480px]:group-data-[static=true]/audience:px-4">
        <div className="min-w-0 overflow-hidden">
          <motion.ul
            className="m-0 flex w-max list-none items-center gap-10 py-2 group-data-[static=true]/audience:w-auto group-data-[static=true]/audience:transform-none! group-data-[static=true]/audience:flex-wrap group-data-[static=true]/audience:justify-center group-data-[static=true]/audience:gap-x-10 group-data-[static=true]/audience:gap-y-7 motion-reduce:w-auto motion-reduce:transform-none! motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-7 max-[768px]:gap-8 max-[480px]:group-data-[static=true]/audience:gap-6"
            style={{ x: reduced ? 0 : firstX }}
            role="list"
            aria-label="Sektor usaha yang dilayani"
          >
            <RoleItems roles={firstRow} reduced={reduced} />
          </motion.ul>
        </div>
        <div className="min-w-0 overflow-hidden">
          <motion.ul
            className="m-0 flex w-max list-none items-center gap-10 py-2 group-data-[static=true]/audience:w-auto group-data-[static=true]/audience:transform-none! group-data-[static=true]/audience:flex-wrap group-data-[static=true]/audience:justify-center group-data-[static=true]/audience:gap-x-10 group-data-[static=true]/audience:gap-y-7 motion-reduce:w-auto motion-reduce:transform-none! motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-7 max-[768px]:gap-8 max-[480px]:group-data-[static=true]/audience:gap-6"
            style={{ x: reduced ? 0 : secondX }}
            role="list"
            aria-label="Sektor usaha lainnya"
          >
            <RoleItems roles={secondRow} reduced={reduced} />
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
