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
  Check,
  MessageCircle,
  MousePointer2,
  PanelsTopLeft,
  Users,
} from "lucide-react";
import { SignupForm } from "@/components/signup-form";
import { softEase, useReducedMotion } from "@/lib/motion";
import { images } from "@/lib/images";

const PROJECTS = [
  {
    image: images.chair,
    title: "Pembukuan rapi tiap bulan.",
    category: "LEDSONS / Pembukuan",
    note: "Rapi dan akurat, siap laporan.",
    author: "Tim LEDSONS",
    color: "stone",
    version: "Layanan 01",
  },
  {
    image: images.corridor,
    title: "Pajak patuh tepat waktu.",
    category: "LEDSONS / Perpajakan",
    note: "Didampingi sampai beres.",
    author: "Konsultan",
    color: "sand",
    version: "Layanan 02",
  },
  {
    image: images.courtyard,
    title: "Laporan siap untuk keputusan.",
    category: "LEDSONS / Laporan",
    note: "Jelas dan sesuai standar.",
    author: "Tim LEDSONS",
    color: "sage",
    version: "Layanan 03",
  },
] as const;

export function Hero(): ReactNode {
  const [selected, setSelected] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [resolved, setResolved] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(box, { amount: 0.2 });
  const reduced = useReducedMotion();
  const project = PROJECTS[selected]!;
  useEffect(() => {
    if (reduced || interacted || hovered || !inView) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = (): void => {
      clearTimeout(timer);
      if (!document.hidden)
        timer = setTimeout(
          () => setSelected((index) => (index + 1) % PROJECTS.length),
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
    setResolved(false);
  }
  function keydown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ): void {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % PROJECTS.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + PROJECTS.length) % PROJECTS.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = PROJECTS.length - 1;
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
            href="#features"
            className="mb-9 inline-flex items-center gap-2 rounded-[100px] bg-muted px-3.5 py-2 text-sm leading-normal font-medium transition-[background,transform,translate] duration-200 hover:-translate-y-0.5 hover:bg-border max-[992px]:mb-7 max-[992px]:text-[11px] max-[768px]:text-[13px] max-[480px]:px-3 max-[480px]:text-[11px]"
          >
            <PanelsTopLeft size={16} strokeWidth={1.5} /> Kantor Jasa Akuntan
            (KJA) <ArrowUpRight size={13} strokeWidth={1.5} />
          </a>
          <h1
            id="hero-heading"
            className="mb-7 text-[clamp(44px,4.15vw,60px)] leading-[1.12] font-normal tracking-[-0.045em] whitespace-nowrap max-[1200px]:text-5xl max-[992px]:text-[39px] max-[768px]:text-[clamp(40px,7.5vw,56px)] max-[480px]:text-[clamp(31px,8.5vw,40px)]"
          >
            Rapi. Patuh. Tumbuh.
            <br />
            Bersama LEDSONS.
          </h1>
          <p className="mb-12 max-w-[400px] text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[992px]:mb-7 max-[992px]:text-base max-[768px]:max-w-[390px] max-[768px]:text-base">
            Jasa pembukuan, laporan keuangan, pajak, dan konsultasi untuk bisnis
            Anda.
          </p>
          <SignupForm />
          <div className="mt-[26px] flex items-center gap-3 text-[13px] leading-normal tracking-[-0.025em] text-muted-foreground max-[992px]:items-start max-[992px]:text-[11px] max-[768px]:items-center max-[768px]:text-xs max-[480px]:justify-center max-[480px]:gap-2 max-[480px]:text-[10px] [&_strong]:font-medium [&_strong]:text-foreground">
            <span className="flex shrink-0 items-center [&_span]:grid [&_span]:place-items-center [&_span]:bg-[#c9d6ef] [&_span]:font-sans [&_span]:text-[9px] [&_span]:leading-[normal] [&_span]:text-[#1e3a8a] [&>*]:h-8 [&>*]:w-[30px] [&>*]:rounded-lg [&>*]:border-2 [&>*]:border-background [&>*]:object-cover [&>*+*]:-ml-2.5">
              <Image
                src={images.portraitOne.src}
                alt=""
                width={30}
                height={30}
                sizes="30px"
              />
              <Image
                src={images.portraitTwo.src}
                alt=""
                width={30}
                height={30}
                sizes="30px"
              />
              <span>klien</span>
            </span>
            <span>
              <strong>Objektif dan profesional.</strong> UMKM hingga korporasi.
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
              backgroundImage: `url("${project.image.src}?auto=format&fit=crop&w=400&q=40")`,
            }}
          />
          <div
            className="relative isolate aspect-[1/1.01] w-full overflow-hidden rounded-[32px] bg-[#ccd7ec] shadow-[2px_7px_15px_#0000001a,8px_27px_28px_#00000017] max-[992px]:min-h-[430px] max-[768px]:aspect-square max-[768px]:min-h-[460px] max-[768px]:rounded-[28px] max-[480px]:aspect-[4/5] max-[480px]:min-h-[380px]"
            role="tabpanel"
            id="project-preview"
            aria-labelledby={`project-tab-${selected}`}
          >
            <span className="sr-only">
              {project.title} {project.image.alt}
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
                  src={project.image.src}
                  alt=""
                  fill
                  className="object-cover"
                  preload={selected === 0}
                  sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1440px) 44vw, 624px"
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#00000088_0%,#00000077_35%,transparent_70%,#00000033)] max-[480px]:bg-[linear-gradient(180deg,#00000088_0%,#00000077_42%,transparent_72%)]" />
                <div className="absolute inset-x-7 top-[26px] flex justify-between gap-3 text-[11px] tracking-[0.01em] text-[#222] max-[992px]:top-5 max-[992px]:left-5 max-[480px]:top-4 max-[480px]:left-4 [&_span]:rounded-[100px] [&_span]:bg-[#ffffffdb] [&_span]:px-2.5 [&_span]:py-2 [&_span]:backdrop-blur-[12px] max-[1200px]:[&_span:last-child]:hidden">
                  <span>{project.category}</span>
                  <span>{project.version}</span>
                </div>
                <div className="absolute inset-x-8 top-[84px] max-w-[330px] text-[39px] leading-[1.1] font-normal tracking-[-0.04em] max-[1200px]:text-[32px] max-[992px]:top-16 max-[992px]:left-6 max-[992px]:text-[26px] max-[768px]:top-[76px] max-[768px]:max-w-[300px] max-[768px]:text-[34px] max-[480px]:top-16 max-[480px]:bottom-auto max-[480px]:max-w-[210px] max-[480px]:text-[28px]">
                  {project.title}
                </div>
                <div className="absolute top-[42%] right-[18%] -rotate-8 text-[#1e3a8a] drop-shadow-[0_2px_3px_#00000022] max-[480px]:top-[28%] max-[480px]:right-[14%] [&_span]:block [&_span]:translate-x-[19px] [&_span]:-translate-y-0.5 [&_span]:rotate-8 [&_span]:rounded-[4px_9px_9px] [&_span]:bg-[#1e3a8a] [&_span]:px-2.5 [&_span]:py-1 [&_span]:text-xs [&_span]:leading-normal [&_span]:text-white">
                  <MousePointer2
                    size={24}
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                  <span>{project.author}</span>
                </div>
              </motion.div>
            </AnimatePresence>
            <span className="absolute bottom-7 left-8 inline-flex items-center gap-[7px] rounded-[100px] border border-[#ffffff22] bg-[#00000088] px-2.5 py-1.5 text-xs leading-normal text-white max-[1200px]:hidden max-[992px]:bottom-6 max-[992px]:left-6 max-[768px]:bottom-10 [&>span]:size-1.5 [&>span]:rounded-full [&>span]:bg-white">
              <span /> Bersama Anda
            </span>
          </div>
          <motion.div
            className="absolute top-[54%] -left-[54px] z-3 w-[266px] rounded-[18px] border border-border bg-card p-[18px] text-foreground shadow-[0_8px_28px_#00000010] max-[1200px]:top-[48%] max-[1200px]:-left-6 max-[1200px]:w-[230px] max-[992px]:top-[40%] max-[992px]:w-[200px] max-[992px]:p-3 max-[768px]:top-[45%] max-[768px]:-left-4 max-[768px]:w-60 max-[768px]:p-4 max-[480px]:top-auto max-[480px]:bottom-[76px] max-[480px]:-left-1 max-[480px]:w-[206px] max-[480px]:p-3"
            animate={{ y: reduced || !hovered ? 0 : -4 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: softEase }}
          >
            <div className="flex items-center gap-2 text-xs leading-normal [&_img]:size-7 [&_img]:rounded-lg [&_img]:object-cover [&_small]:ml-1 [&_small]:text-[10px] [&_small]:text-muted-foreground [&>svg]:ml-auto [&>svg]:text-muted-foreground">
              <Image
                src={images.portraitOne.src}
                alt=""
                width={28}
                height={28}
                sizes="28px"
              />
              <span>
                {project.author} <small>baru saja</small>
              </span>
              <MessageCircle size={15} strokeWidth={1.5} />
            </div>
            <p className="mt-3 min-h-[38px] text-[13px] leading-[1.45] max-[992px]:text-xs max-[768px]:text-[13px] max-[480px]:text-xs">
              {resolved ? "Beres. Satu urusan selesai." : project.note}
            </p>
            <button
              type="button"
              onClick={() => {
                setResolved((value) => !value);
                setInteracted(true);
              }}
              className="mt-2.5 mb-[-4px] -ml-2 inline-flex items-center gap-[5px] rounded-[100px] px-2 py-[5px] text-[10px] text-muted-foreground transition-[background] duration-200 hover:bg-muted hover:text-foreground"
              aria-pressed={resolved}
            >
              <Check size={14} strokeWidth={1.5} />
              {resolved ? "Selesai · ulangi" : "Tandai selesai"}
            </button>
          </motion.div>
          <div className="absolute right-[-18px] bottom-14 z-4 flex items-center gap-[9px] rounded-xl border border-border bg-card px-4 py-3 text-[11px] text-foreground shadow-(--soft-shadow) max-[1200px]:right-[-10px] max-[1200px]:bottom-[38px] max-[992px]:bottom-6 max-[992px]:p-2.5 max-[992px]:text-[10px] max-[768px]:-right-3 max-[768px]:bottom-[26px] max-[480px]:-right-1 max-[480px]:bottom-5">
            <Users size={16} strokeWidth={1.5} />
            <span>Tim ahli pendamping Anda.</span>
            <span className="ml-3 flex gap-[3px] text-muted-foreground max-[1200px]:hidden">
              <Check size={12} strokeWidth={1.5} /> Rapi
            </span>
          </div>
          <div
            className="absolute inset-x-0 -bottom-11 flex items-center justify-center gap-0"
            role="tablist"
            aria-label="Pilih contoh layanan"
          >
            {PROJECTS.map((item, index) => (
              <button
                className="group grid h-7 w-5 place-items-center rounded-lg"
                key={item.category}
                id={`project-tab-${index}`}
                ref={(element) => {
                  dots.current[index] = element;
                }}
                role="tab"
                type="button"
                aria-selected={selected === index}
                aria-controls="project-preview"
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
