import { Layers3, MessageCircle, ScanLine } from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { ReactNode } from "react";

const BENEFITS = [
  {
    Icon: Layers3,
    title: "Pembukuan yang tertib",
    text: "Catat dan kelola rutin, laporan rapi dan akurat.",
  },
  {
    Icon: MessageCircle,
    title: "Pajak yang patuh",
    text: "Didampingi agar patuh, efisien, dan tepat waktu.",
  },
  {
    Icon: ScanLine,
    title: "Siap bertumbuh",
    text: "Keuangan terstruktur untuk keputusan yang tepat.",
  },
] as const;

export function Benefits(): ReactNode {
  return (
    <section
      id="why"
      className={`mx-auto w-full max-w-360 px-14 pt-32 pb-18 max-[992px]:px-8 max-[992px]:pt-22 max-[992px]:pb-14 max-[768px]:px-6 max-[768px]:pt-18 max-[768px]:pb-10 max-[480px]:px-5`}
      aria-labelledby="why-heading"
    >
      <Reveal className="mb-12 grid grid-cols-2 items-end gap-18 max-[992px]:gap-8 max-[768px]:mb-8 max-[768px]:grid-cols-1 max-[768px]:gap-6 [&_p]:max-w-112">
        <h2
          id="why-heading"
          className="text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
        >
          Rapi sejak awal.
          <br />
          Tenang jalankan bisnis.
        </h2>
        <p className="text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[768px]:text-base">
          Pembukuan, pajak, dan laporan keuangan ditangani profesional.
        </p>
      </Reveal>
      <div className="grid grid-cols-3 gap-5 max-[992px]:gap-4 max-[768px]:grid-cols-1 [&>div]:h-full">
        {BENEFITS.map(({ Icon, title, text }, index) => (
          <Reveal key={title} delay={index * 0.1}>
            <article className="h-full rounded-3xl border border-border p-8 transition-[background,transform,translate,border-color] duration-250 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--foreground)_20%,var(--border))] hover:bg-[color-mix(in_srgb,var(--muted)_40%,var(--background))] max-[992px]:p-6 max-[768px]:p-7 [&_h3]:mb-2.5 [&_h3]:text-xl [&_h3]:leading-[1.35] [&_h3]:font-medium [&_h3]:tracking-[-0.04em] [&_p]:text-base [&_p]:leading-normal [&_p]:tracking-[-0.025em] [&_p]:text-muted-foreground">
              <span className="mb-5 grid size-12 place-items-center rounded-[14px] bg-muted">
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
