import {
  BookOpenCheck,
  Calculator,
  FileSpreadsheet,
  LineChart,
  MonitorCog,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { ReactNode } from "react";

const SERVICES = [
  {
    Icon: BookOpenCheck,
    title: "Jasa Pembukuan",
    text: "Menyusun dan mengelola pembukuan secara sistematis untuk mendukung laporan keuangan yang rapi dan akurat.",
  },
  {
    Icon: Calculator,
    title: "Jasa Perpajakan",
    text: "Pendampingan pengelolaan pajak perusahaan secara patuh, efisien, dan tepat waktu.",
  },
  {
    Icon: FileSpreadsheet,
    title: "Penyusunan & Kompilasi Laporan Keuangan",
    text: "Penyajian laporan keuangan yang jelas, terstruktur, dan sesuai standar untuk kebutuhan internal maupun eksternal.",
  },
  {
    Icon: MonitorCog,
    title: "Jasa Teknologi Informasi Akuntansi",
    text: "Implementasi sistem akuntansi berbasis teknologi untuk meningkatkan efisiensi pencatatan dan pelaporan.",
  },
  {
    Icon: LineChart,
    title: "Konsultasi Manajemen & Keuangan",
    text: "Memberikan solusi strategis untuk meningkatkan efektivitas pengelolaan bisnis dan keuangan perusahaan.",
  },
] as const;

export function Features(): ReactNode {
  return (
    <section
      className="mx-auto w-full max-w-360 px-14 pt-24 pb-16 max-[992px]:px-8 max-[992px]:py-[72px] max-[768px]:px-6 max-[481px]:py-14 max-[480px]:px-5"
      id="layanan"
      aria-labelledby="layanan-heading"
    >
      <Reveal>
        <header className="mb-10 text-center">
          <p className="mb-3 text-[12px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            Layanan kami
          </p>
          <h2
            className="text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
            id="layanan-heading"
          >
            Solusi terpadu
            <br />
            untuk bisnis Anda.
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[768px]:text-base max-[481px]:mt-5">
            Dari pembukuan hingga konsultasi manajemen — dirancang terukur,
            terstruktur, dan sesuai tujuan jangka panjang bisnis Anda.
          </p>
        </header>
      </Reveal>

      <div className="grid grid-cols-3 gap-5 max-[992px]:grid-cols-2 max-[992px]:gap-4 max-[768px]:grid-cols-1">
        {SERVICES.map(({ Icon, title, text }, index) => (
          <Reveal key={title} delay={(index % 3) * 0.08}>
            <article className="flex h-full flex-col rounded-3xl border border-border p-8 transition-[background,transform,translate,border-color] duration-250 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--foreground)_20%,var(--border))] hover:bg-[color-mix(in_srgb,var(--muted)_40%,var(--background))] max-[992px]:p-6 max-[768px]:p-7 [&_h3]:mb-2.5 [&_h3]:text-xl [&_h3]:leading-[1.35] [&_h3]:font-medium [&_h3]:tracking-[-0.04em] [&_p]:text-base [&_p]:leading-normal [&_p]:tracking-[-0.025em] [&_p]:text-muted-foreground">
              <span className="mb-5 grid size-12 place-items-center rounded-[14px] bg-muted">
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="mt-5 text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                0{index + 1} / 05
              </span>
            </article>
          </Reveal>
        ))}
        <Reveal delay={0.16}>
          <article className="flex h-full flex-col justify-between rounded-3xl bg-foreground p-8 text-background max-[992px]:p-6 max-[768px]:p-7">
            <div>
              <h3 className="text-xl leading-[1.35] font-medium tracking-[-0.04em]">
                Butuh diskusi kebutuhan Anda?
              </h3>
              <p className="mt-2.5 text-base leading-normal opacity-80">
                Ceritakan kondisi keuangan dan target bisnis Anda. Kami bantu
                petakan layanan yang paling tepat.
              </p>
            </div>
            <a
              href="#kontak"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Konsultasi sekarang
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
