"use client";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { Reveal } from "@/components/reveal";
import { images } from "@/lib/images";
import { useReducedMotion } from "@/lib/motion";
import { siteConfig } from "@/lib/metadata";

const TILES = [
  { photo: images.desk, depth: 22, tilt: 1.2 },
  { photo: images.process, depth: 28, tilt: -1.4 },
  { photo: images.chair, depth: 14, tilt: -1.1 },
  { photo: images.portraitTwo, depth: 18, tilt: 1.2 },
  { photo: images.corridor, depth: 36, tilt: 1.6 },
  { photo: images.courtyard, depth: 32, tilt: -1.5 },
] as const;

const POINTER_SPRING = {
  stiffness: 110,
  damping: 24,
  mass: 0.8,
  restDelta: 0.001,
  restSpeed: 0.005,
};

function PhotoTile({
  index,
  tile,
  pointerX,
  pointerY,
}: {
  index: number;
  tile: (typeof TILES)[number];
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}): ReactNode {
  const x = useTransform(pointerX, (value) => value * tile.depth);
  const y = useTransform(pointerY, (value) => value * tile.depth * 0.72);
  const rotate = useTransform(pointerX, (value) => value * tile.tilt);
  return (
    <div
      className="pointer-events-none absolute h-30.5 w-29 rounded-[18px] opacity-88 data-[tile=0]:top-0 data-[tile=0]:left-[7%] data-[tile=0]:-rotate-5 data-[tile=1]:top-8.5 data-[tile=1]:right-[7%] data-[tile=1]:rotate-5 data-[tile=2]:top-[56%] data-[tile=2]:left-[13%] data-[tile=2]:h-23.5 data-[tile=2]:w-21.5 data-[tile=3]:top-[53%] data-[tile=3]:right-[13%] data-[tile=3]:h-23.5 data-[tile=3]:w-21.5 data-[tile=4]:-bottom-17 data-[tile=4]:left-0 data-[tile=4]:h-33 data-[tile=4]:w-32.5 data-[tile=5]:right-0 data-[tile=5]:-bottom-10 data-[tile=5]:h-34.5 data-[tile=5]:w-33 max-[1200px]:h-23.5 max-[1200px]:w-22.5 max-[1200px]:data-[tile=0]:left-[5%] max-[1200px]:data-[tile=1]:right-[5%] max-[1200px]:data-[tile=2]:left-[3%] max-[1200px]:data-[tile=2]:h-18 max-[1200px]:data-[tile=2]:w-16.25 max-[1200px]:data-[tile=3]:right-[3%] max-[1200px]:data-[tile=3]:h-18 max-[1200px]:data-[tile=3]:w-16.25 max-[768px]:h-15 max-[768px]:w-14 max-[768px]:rotate-0! max-[768px]:rounded-[10px] max-[768px]:opacity-65 max-[768px]:data-[tile=0]:-top-4 max-[768px]:data-[tile=0]:left-[8%] max-[768px]:data-[tile=1]:-top-2 max-[768px]:data-[tile=1]:right-[8%] max-[768px]:data-[tile=2]:hidden max-[768px]:data-[tile=3]:hidden max-[768px]:data-[tile=4]:-bottom-6 max-[768px]:data-[tile=4]:left-[8%] max-[768px]:data-[tile=4]:h-17.25 max-[768px]:data-[tile=4]:w-16.25 max-[768px]:data-[tile=5]:right-[8%] max-[768px]:data-[tile=5]:-bottom-10 max-[768px]:data-[tile=5]:h-17.25 max-[768px]:data-[tile=5]:w-16.25 [&_img]:object-cover"
      data-tile={index}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[inherit] shadow-[0_5px_14px_#00000014] max-[768px]:transform-none!"
        style={{ x, y, rotate }}
      >
        <Image
          src={tile.photo.src}
          alt=""
          fill
          sizes="(max-width:767px) 60px, 130px"
        />
      </motion.div>
    </div>
  );
}
export function FinalCta(): ReactNode {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, POINTER_SPRING);
  const smoothY = useSpring(pointerY, POINTER_SPRING);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    function reset(immediate = false): void {
      pointerX.set(0);
      pointerY.set(0);
      if (immediate) {
        smoothX.jump(0);
        smoothY.jump(0);
      }
    }

    if (reduced) {
      reset(true);
      return;
    }

    const query = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine)"
    );
    const bounds = { left: 0, top: 0, width: 0, height: 0 };
    let inView = false;
    let focused = document.hasFocus();
    let tracking = false;
    let lastX = 0;
    let lastY = 0;
    let measureFrame = 0;

    function enabled(): boolean {
      return query.matches && inView && focused && !document.hidden;
    }

    function updatePointer(): void {
      if (!tracking || !enabled() || !bounds.width || !bounds.height) return;
      const x = (lastX - bounds.left) / bounds.width;
      const y = (lastY - bounds.top) / bounds.height;
      if (x < 0 || x > 1 || y < 0 || y > 1) {
        tracking = false;
        reset();
        return;
      }
      pointerX.set(Math.max(-1, Math.min(1, x * 2 - 1)));
      pointerY.set(Math.max(-1, Math.min(1, y * 2 - 1)));
    }

    function measure(): void {
      measureFrame = 0;
      if (!enabled()) return;
      const rect = section!.getBoundingClientRect();
      bounds.left = rect.left;
      bounds.top = rect.top;
      bounds.width = rect.width;
      bounds.height = rect.height;
      updatePointer();
    }

    function scheduleMeasure(): void {
      if (enabled() && !measureFrame) {
        measureFrame = requestAnimationFrame(measure);
      }
    }

    function suspend(): void {
      tracking = false;
      cancelAnimationFrame(measureFrame);
      measureFrame = 0;
      reset(true);
    }

    function onPointerMove(event: PointerEvent): void {
      if (event.pointerType !== "mouse" || !enabled()) return;
      tracking = true;
      lastX = event.clientX;
      lastY = event.clientY;
      updatePointer();
    }

    function onPointerEnter(event: PointerEvent): void {
      if (event.pointerType !== "mouse" || !enabled()) return;
      cancelAnimationFrame(measureFrame);
      measure();
      onPointerMove(event);
    }

    function onPointerLeave(): void {
      tracking = false;
      reset();
    }

    function onBlur(): void {
      focused = false;
      onPointerLeave();
    }

    function onFocus(): void {
      focused = true;
      scheduleMeasure();
    }

    function onAvailabilityChange(): void {
      if (!enabled()) suspend();
      else scheduleMeasure();
    }

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      onAvailabilityChange();
    });
    const resizeObserver = new ResizeObserver(scheduleMeasure);
    intersectionObserver.observe(section);
    resizeObserver.observe(section);
    query.addEventListener("change", onAvailabilityChange);
    section.addEventListener("pointerenter", onPointerEnter, { passive: true });
    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", onPointerLeave);
    section.addEventListener("pointercancel", onPointerLeave);
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onAvailabilityChange);

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      query.removeEventListener("change", onAvailabilityChange);
      section.removeEventListener("pointerenter", onPointerEnter);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      section.removeEventListener("pointercancel", onPointerLeave);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onAvailabilityChange);
      suspend();
    };
  }, [pointerX, pointerY, reduced, smoothX, smoothY]);

  return (
    <section
      ref={ref}
      id="mulai"
      className="relative overflow-clip pt-24 pb-43 max-[768px]:pt-18 max-[768px]:pb-25"
      aria-labelledby="closing-heading"
    >
      <div
        className={`relative mx-auto min-h-107.5 w-full max-w-360 px-14 max-[992px]:px-8 max-[768px]:px-6 max-[480px]:px-5`}
      >
        {TILES.map((tile, index) => (
          <PhotoTile
            key={tile.photo.src}
            index={index}
            tile={tile}
            pointerX={smoothX}
            pointerY={smoothY}
          />
        ))}
        <Reveal className="relative z-2 m-auto flex max-w-175 flex-col items-center py-10 text-center max-[1200px]:max-w-155 max-[768px]:py-14 [&_h2]:max-w-160 max-[768px]:[&_h2]:max-w-110 [&>div]:mt-10 [&>div]:max-w-120 [&>p]:mt-6">
          <span className="mb-8 grid size-19 place-items-center rounded-3xl border border-border bg-muted shadow-[0_6px_12px_#00000008] max-[768px]:size-16 max-[768px]:rounded-[18px]">
            <Logo markOnly />
          </span>
          <h2
            id="closing-heading"
            className="text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
          >
            LEDSONS siap menjadi mitra solusi bisnis terpercaya Anda.
          </h2>
          <p className="text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[768px]:text-base">
            Mari tumbuh bersama, dengan pondasi yang lebih kuat dan arah yang
            lebih jelas.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#kontak"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-transparent bg-foreground px-6 py-3.25 text-base leading-5 font-medium whitespace-nowrap text-background transition-[background,transform,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_12px_#00000014] active:translate-y-0 active:scale-98 max-[480px]:text-sm"
            >
              Hubungi kami <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3.25 text-base leading-5 font-medium whitespace-nowrap text-foreground transition-[background,transform,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-muted active:translate-y-0 active:scale-98 max-[480px]:text-sm"
            >
              {siteConfig.contact.email}
            </a>
          </div>
          <p className="mt-6 text-xs leading-normal text-muted-foreground">
            {siteConfig.contact.address} • {siteConfig.contact.phone2}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
