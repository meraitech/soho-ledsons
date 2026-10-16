"use client";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import {
  ArrowUpRight,
  BadgeCheck,
  Calculator,
  FileText,
  MessagesSquare,
} from "lucide-react";
import { softEase, useReducedMotion } from "@/lib/motion";
import { images } from "@/lib/images";

const HIGHLIGHTS = [
  {
    image: images.desk,
    title: "Pembukuan rapi, laporan akurat.",
    category: "Jasa Pembukuan",
    note: "Pencatatan sistematis untuk keputusan yang lebih tepat.",
    badge: "Akuntansi",
  },
  {
    image: images.corridor,
    title: "Pajak patuh, tepat waktu.",
    category: "Jasa Perpajakan",
    note: "Pendampingan pajak perusahaan yang efisien dan patuh.",
    badge: "Perpajakan",
  },
  {
    image: images.courtyard,
    title: "Keuangan terstruktur, bisnis tumbuh.",
    category: "Konsultasi Manajemen",
    note: "Solusi strategis untuk pengelolaan bisnis dan keuangan.",
    badge: "Konsultasi",
  },
] as const;

export function Hero(): ReactNode {
  const [selected, setSelected] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(box, { amount: 0.2 });
  const reduced = useReducedMotion();
  const highlight = HIGHLIGHTS[selected]!;
  useEffect(() => {
    if (reduced || interacted || hovered || !inView) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = (): void => {
      clearTimeout(timer);
      if (!document.hidden)
        timer = setTimeout(
          () => setSelected((index) => (index + 1) % HIGHLIGHTS.length),
          5500
        );
    };
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [selected, reduced, interacted, hovered, inView]);
  function choose(index: number): void {
    setSelected(index);
    setInteracted(true);
  }
  function keydown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ): void {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % HIGHLIGHTS.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + HIGHLIGHTS.length) % HIGHLIGHTS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = HIGHLIGHTS.length - 1;
    else return;
    event.preventDefault();
    choose(next);
    dots.current[next]?.focus();
  }
  return (
    <section
      className="overflow-clip border-b border-border pt-[calc(var(--header-height)+96px)] pb-[108px] max-[992px]:pt-[136px] max-[992px]:pb-24 max-[768px]:pt-[124px] max-[480px]:pt-[116px]"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid w-full max-w-360 grid-cols-2 items-center gap-[72px] px-14 max-[1200px]:gap-12 max-[992px]:gap-8 max-[992px]:px-8 max-[768px]:grid-cols-1 max-[768px]:gap-[60px] max-[768px]:px-6 max-[480px]:gap-12 max-[480px]:px-5">
        <motion.div
          className="relative z-2 max-[768px]:max-w-[560px]"
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.85, ease: softEase }}
        >
          <a
            href="#tentang"
            className="mb-9 inline-flex items-center gap-2 rounded-[100px] bg-muted px-3.5 py-2 text-sm leading-normal font-medium transition-[background,transform,translate] duration-200 hover:-translate-y-0.5 hover:bg-border max-[992px]:mb-7 max-[992px]:text-[11px] max-[768px]:text-[13px] max-[480px]:px-3 max-[480px]:text-[11px]"
          >
            <BadgeCheck size={16} strokeWidth={1.5} /> Kantor Jasa Akuntan (KJA)
            Berizin <ArrowUpRight size={13} strokeWidth={1.5} />
          </a>
          <h1
            id="hero-heading"
            className="mb-7 text-[clamp(40px,4.15vw,60px)] leading-[1.1] font-normal tracking-[-0.045em] max-[1200px]:text-5xl max-[992px]:text-[39px] max-[768px]:text-[clamp(40px,7.5vw,56px)] max-[480px]:text-[clamp(31px,8.5vw,40px)]"
          >
            PT LEDSONS
            <br />
            SOLUSI BISNIS
          </h1>
          <p className="mb-6 max-w-[460px] text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[992px]:mb-7 max-[992px]:text-base max-[768px]:max-w-[480px] max-[768px]:text-base">
            Penyedia layanan profesional di bidang akuntansi — mencakup jasa
            pembukuan, kompilasi laporan keuangan, konsultasi manajemen,
            perpajakan, serta layanan teknologi informasi.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#layanan"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-transparent bg-foreground px-6 py-3.25 text-base leading-5 font-medium whitespace-nowrap text-background transition-[background,transform,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_12px_#00000014] active:translate-y-0 active:scale-98 max-[480px]:text-sm"
            >
              Lihat layanan <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
            <a
              href="#kontak"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3.25 text-base leading-5 font-medium whitespace-nowrap text-foreground transition-[background,transform,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-muted hover:shadow-[0_5px_12px_#00000014] active:translate-y-0 active:scale-98 max-[480px]:text-sm"
            >
              Hubungi kami
            </a>
          </div>
          <div className="mt-[26px] flex items-center gap-3 text-[13px] leading-normal tracking-[-0.025em] text-muted-foreground max-[992px]:items-start max-[992px]:text-[11px] max-[768px]:items-center max-[768px]:text-xs max-[480px]:justify-center max-[480px]:gap-2 max-[480px]:text-[10px] [&_strong]:font-medium [&_strong]:text-foreground">
            <span className="flex shrink-0 items-center gap-2">
              <FileText size={16} strokeWidth={1.5} />
              <Calculator size={16} strokeWidth={1.5} />
              <MessagesSquare size={16} strokeWidth={1.5} />
            </span>
            <span>
              <strong>Objektif, profesional, bernilai tambah</strong> — didukung
              partner dan tenaga ahli berpengalaman.
            </span>
          </div>
        </motion.div>
        <div
          ref={box}
          className="relative min-w-0 max-[768px]:mx-4 max-[480px]:mx-1"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setInteracted(true)}
        >
          <div
            className="pointer-events-none absolute inset-x-[-3%] top-[6%] bottom-[-3%] scale-[1.08] bg-cover bg-center opacity-18 blur-[64px]"
            aria-hidden="true"
            style={{
              backgroundImage: `url("${highlight.image.src}?auto=format&fit=crop&w=400&q=40")`,
            }}
          />
          <div
            className="relative isolate aspect-[1/1.01] w-full overflow-hidden rounded-[32px] bg-[#d9d8d4] shadow-[2px_7px_15px_#0000001a,8px_27px_28px_#00000017] max-[992px]:min-h-[430px] max-[768px]:aspect-square max-[768px]:min-h-[460px] max-[768px]:rounded-[28px] max-[480px]:aspect-[4/5] max-[480px]:min-h-[380px]"
            role="tabpanel"
            id="layanan-preview"
            aria-labelledby={`highlight-tab-${selected}`}
          >
            <span className="sr-only">
              {highlight.title} {highlight.image.alt}
            </span>
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                className="absolute inset-0 text-white"
                key={selected}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.35, ease: softEase }}
              >
                <Image
                  src={highlight.image.src}
                  alt=""
                  fill
                  className="object-cover"
                  priority={selected === 0}
                  sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1440px) 44vw, 624px"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#00000088_0%,#00000077_35%,transparent_70%,#00000033)] max-[480px]:bg-[linear-gradient(180deg,#00000088_0%,#00000077_42%,transparent_72%)]" />
                <div className="absolute inset-x-7 top-[26px] flex justify-between gap-3 text-[11px] tracking-[0.01em] text-[#222] max-[992px]:top-5 max-[992px]:left-5 max-[480px]:top-4 max-[480px]:left-4 [&_span]:rounded-[100px] [&_span]:bg-[#ffffffdb] [&_span]:px-2.5 [&_span]:py-2 [&_span]:backdrop-blur-[12px] max-[1200px]:[&_span:last-child]:hidden">
                  <span>{highlight.category}</span>
                  <span>{highlight.badge}</span>
                </div>
                <div className="absolute inset-x-8 top-[84px] max-w-[330px] text-[39px] leading-[1.1] font-normal tracking-[-0.04em] max-[1200px]:text-[32px] max-[992px]:top-16 max-[992px]:left-6 max-[992px]:text-[26px] max-[768px]:top-[76px] max-[768px]:max-w-[300px] max-[768px]:text-[34px] max-[480px]:top-16 max-[480px]:bottom-auto max-[480px]:max-w-[210px] max-[480px]:text-[28px]">
                  {highlight.title}
                </div>
                <div className="absolute right-8 bottom-8 left-8 rounded-2xl bg-[#00000088] p-4 text-sm leading-relaxed backdrop-blur-[12px] max-[992px]:right-6 max-[992px]:bottom-6 max-[992px]:left-6">
                  {highlight.note}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div
            className="absolute inset-x-0 -bottom-11 flex items-center justify-center gap-0"
            role="tablist"
            aria-label="Pilih sorotan layanan"
          >
            {HIGHLIGHTS.map((item, index) => (
              <button
                className="group grid h-7 w-5 place-items-center rounded-lg"
                key={item.category}
                id={`highlight-tab-${index}`}
                ref={(element) => {
                  dots.current[index] = element;
                }}
                role="tab"
                type="button"
                aria-selected={selected === index}
                aria-controls="layanan-preview"
                tabIndex={selected === index ? 0 : -1}
                aria-label={item.category}
                onKeyDown={(event) => keydown(event, index)}
                onClick={() => choose(index)}
              >
                <span className="size-[7px] rounded-full bg-foreground opacity-16 transition-[opacity,transform,scale] duration-200 group-hover:opacity-75 group-aria-selected:scale-[1.3] group-aria-selected:opacity-50 group-aria-selected:group-hover:opacity-75" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
