"use client";

import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { chooseWorkspace, type WorkspaceKind } from "@/lib/workspace-choice";

const PLANS = [
  {
    name: "Konsultasi Awal",
    kind: "solo",
    description: "Diskusikan kebutuhan pembukuan, pajak, dan laporan Anda.",
    price: "Gratis",
    period: "Penjajakan awal",
    action: "Minta konsultasi",
  },
  {
    name: "Pendampingan Rutin",
    kind: "together",
    description: "Pembukuan, pajak, dan laporan ditangani berkelanjutan.",
    price: "Sesuai",
    period: "Kebutuhan usaha",
    action: "Hubungi kami",
  },
] as const satisfies readonly {
  name: string;
  kind: WorkspaceKind;
  description: string;
  price: string;
  period: string;
  action: string;
}[];

export function Plans(): ReactNode {
  return (
    <section
      id="plans"
      className={`mx-auto w-full max-w-360 px-14 pt-16 pb-10 max-[992px]:px-8 max-[768px]:px-6 max-[768px]:pt-11 max-[768px]:pb-6 max-[480px]:px-5`}
      aria-labelledby="plans-heading"
    >
      <Reveal className="mb-12 flex items-end justify-between gap-12 max-[992px]:mb-9 max-[992px]:block max-[768px]:mb-8 max-[992px]:[&_br]:hidden [&_h2]:max-w-167.5 [&_p]:max-w-77.5 [&_p]:shrink-0 [&_p]:pb-0.75 [&_p]:text-base max-[992px]:[&_p]:mt-5.5 max-[992px]:[&_p]:max-w-none max-[992px]:[&_p]:p-0">
        <h2
          id="plans-heading"
          className="text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
        >
          Mulai dari yang paling pas.
        </h2>
        <p className="text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[768px]:text-base">
          Konsultasi dulu. <br />
          Lanjut pendampingan rutin.
        </p>
      </Reveal>
      <div className="border-t border-border">
        {PLANS.map(
          ({ name, kind, description, price, period, action }, index) => (
            <Reveal key={kind} delay={index * 0.06}>
              <article className="grid grid-cols-[minmax(0,1fr)_230px_200px] items-center gap-12 border-b border-border py-10 max-[1200px]:grid-cols-[minmax(0,1fr)_170px_185px] max-[1200px]:gap-8 max-[992px]:grid-cols-[minmax(0,1fr)_180px] max-[992px]:gap-x-10 max-[992px]:gap-y-7 max-[992px]:py-8 max-[768px]:grid-cols-[minmax(0,1fr)_auto] max-[768px]:gap-6 max-[375px]:gap-x-4 max-[375px]:gap-y-5">
                <div className="max-[992px]:row-span-2 max-[992px]:self-start max-[768px]:col-span-full max-[768px]:row-auto [&_h3]:text-[26px] [&_h3]:leading-[1.25] [&_h3]:font-medium [&_h3]:tracking-[-0.035em] max-[768px]:[&_h3]:text-2xl [&_p]:mt-3 [&_p]:max-w-107.5 [&_p]:text-[15px] [&_p]:leading-[1.6] [&_p]:text-muted-foreground max-[768px]:[&_p]:max-w-112.5 max-[768px]:[&_p]:text-sm">
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
                <div className="[&_p]:mt-2.5 [&_p]:text-xs [&_p]:leading-normal [&_p]:text-muted-foreground max-[768px]:[&_p]:max-w-37.5 max-[768px]:[&_p]:text-[11px] [&>span]:block [&>span]:text-[40px] [&>span]:leading-[1.1] [&>span]:tracking-[-0.045em] max-[992px]:[&>span]:text-4xl max-[768px]:[&>span]:text-[34px]">
                  <span>{price}</span>
                  <p>{period}</p>
                </div>
                <a
                  href="#workspace"
                  className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border py-3.25 leading-5 font-medium whitespace-nowrap transition-[background,transform,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_12px_#00000014] active:translate-y-0 active:scale-98 ${kind === "solo" ? "border-border bg-background text-foreground hover:bg-muted" : "border-transparent bg-foreground text-background"} px-5 text-sm max-[992px]:col-start-2 max-[992px]:justify-self-start max-[768px]:col-auto max-[768px]:min-h-11 max-[768px]:px-4 max-[768px]:text-[13px] max-[375px]:gap-1.25 max-[375px]:px-3 max-[375px]:text-xs`}
                  onClick={() => chooseWorkspace(kind)}
                >
                  {action}
                  <ArrowUpRight size={17} strokeWidth={1.5} />
                </a>
              </article>
            </Reveal>
          )
        )}
      </div>
      <p className="mt-5.5 text-xs leading-normal text-muted-foreground max-[768px]:max-w-107.5 max-[768px]:text-[11px]">
        Hubungi kami untuk penawaran sesuai kebutuhan. Tanpa akun demo.
      </p>
    </section>
  );
}
