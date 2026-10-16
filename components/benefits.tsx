import { Handshake, Headset, Network, PackageCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import type { ReactNode } from "react";

const REASONS = [
  {
    Icon: Headset,
    title: "Pelayanan Pelanggan",
    text: "Memberikan layanan yang sangat baik dan berkualitas tinggi kepada setiap klien dengan fokus pada kepuasan dan keberlanjutan.",
  },
  {
    Icon: PackageCheck,
    title: "Layanan Unggulan",
    text: "Menyediakan layanan unggulan di bidang akuntansi, perpajakan, software, perekrutan tenaga kerja, outsourcing, dan konsultasi bisnis.",
  },
  {
    Icon: Handshake,
    title: "Mitra Usaha",
    text: "Bermitra dengan profesional dan penyedia layanan yang andal, berpengalaman, dan kredibel.",
  },
  {
    Icon: Network,
    title: "Jaringan Bisnis",
    text: "Didukung oleh tim dan mitra yang tersebar di berbagai wilayah Indonesia, siap memberikan layanan tepat waktu, efisien, dan berkualitas tinggi.",
  },
] as const;

export function Benefits(): ReactNode {
  return (
    <section
      id="kenapa"
      className={`mx-auto w-full max-w-360 px-14 pt-24 pb-16 max-[992px]:px-8 max-[992px]:pt-22 max-[992px]:pb-14 max-[768px]:px-6 max-[768px]:pt-18 max-[768px]:pb-10 max-[480px]:px-5`}
      aria-labelledby="kenapa-heading"
    >
      <Reveal className="mb-12 grid grid-cols-2 items-end gap-18 max-[992px]:gap-8 max-[768px]:mb-8 max-[768px]:grid-cols-1 max-[768px]:gap-6 [&_p]:max-w-112">
        <div>
          <p className="mb-3 text-[12px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            Kenapa Ledsons?
          </p>
          <h2
            id="kenapa-heading"
            className="text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
          >
            Mitra yang hadir,
            <br />
            mendampingi, memberi nilai lebih.
          </h2>
        </div>
        <p className="text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[768px]:text-base">
          Kami tidak hanya memberikan layanan, tapi juga komitmen: untuk hadir,
          mendampingi, dan memberi nilai lebih bagi setiap klien.
        </p>
      </Reveal>
      <div className="grid grid-cols-2 gap-5 max-[992px]:gap-4 max-[768px]:grid-cols-1 [&>div]:h-full">
        {REASONS.map(({ Icon, title, text }, index) => (
          <Reveal key={title} delay={index * 0.08}>
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
