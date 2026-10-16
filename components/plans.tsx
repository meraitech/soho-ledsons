import {
  Handshake,
  Lightbulb,
  Medal,
  Target,
  UserCheck,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

const VALUES = [
  {
    Icon: Lightbulb,
    title: "Inovatif",
    text: "Kami senantiasa menciptakan solusi baru dan adaptif yang relevan dengan perkembangan teknologi, regulasi, dan kebutuhan klien.",
  },
  {
    Icon: Target,
    title: "Strategis",
    text: "Setiap layanan dirancang dengan pendekatan yang terukur, terstruktur, dan sesuai dengan tujuan jangka panjang bisnis klien.",
  },
  {
    Icon: Medal,
    title: "Dapat Diandalkan",
    text: "Komitmen kami adalah menjadi mitra terpercaya yang memberikan hasil konsisten, tepat waktu, dan akurat.",
  },
  {
    Icon: Users,
    title: "Kolaboratif",
    text: "Kami bertumbuh bersama klien dan mitra melalui komunikasi terbuka, kerja sama yang solid, dan pendampingan yang berkelanjutan.",
  },
  {
    Icon: UserCheck,
    title: "Profesional",
    text: "Mengutamakan etika kerja, keahlian, dan tanggung jawab dalam setiap proses dan layanan yang kami berikan.",
  },
  {
    Icon: Handshake,
    title: "Bermanfaat bagi Setiap Pemangku Kepentingan",
    text: "Kami berkomitmen menerapkan setiap nilai perusahaan dalam pelayanan yang kami berikan, sehingga memiliki nilai manfaat yang tinggi bagi setiap pemangku kepentingan.",
  },
] as const;

export function Plans(): ReactNode {
  return (
    <section
      id="nilai"
      className={`mx-auto w-full max-w-360 px-14 pt-16 pb-10 max-[992px]:px-8 max-[768px]:px-6 max-[768px]:pt-11 max-[768px]:pb-6 max-[480px]:px-5`}
      aria-labelledby="nilai-heading"
    >
      <Reveal className="mb-12 flex items-end justify-between gap-12 max-[992px]:mb-9 max-[992px]:block max-[768px]:mb-8 max-[992px]:[&_br]:hidden [&_h2]:max-w-167.5 [&_p]:max-w-77.5 [&_p]:shrink-0 [&_p]:pb-0.75 [&_p]:text-base max-[992px]:[&_p]:mt-5.5 max-[992px]:[&_p]:max-w-none max-[992px]:[&_p]:p-0">
        <div>
          <p className="mb-3 text-[12px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            Nilai inti perusahaan
          </p>
          <h2
            id="nilai-heading"
            className="text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
          >
            Nilai yang kami pegang di setiap pekerjaan.
          </h2>
        </div>
        <p className="text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[768px]:text-base">
          Enam nilai, satu komitmen: bermanfaat bagi setiap pemangku
          kepentingan.
        </p>
      </Reveal>
      <div className="grid grid-cols-3 gap-5 max-[992px]:grid-cols-2 max-[992px]:gap-4 max-[768px]:grid-cols-1">
        {VALUES.map(({ Icon, title, text }, index) => (
          <Reveal key={title} delay={(index % 3) * 0.06}>
            <article className="h-full rounded-3xl border border-border p-8 transition-[background,transform,translate,border-color] duration-250 hover:-translate-y-1 hover:bg-[color-mix(in_srgb,var(--muted)_40%,var(--background))] max-[992px]:p-6 max-[768px]:p-7 [&_h3]:mb-2.5 [&_h3]:text-xl [&_h3]:leading-[1.35] [&_h3]:font-medium [&_h3]:tracking-[-0.04em] [&_p]:text-[15px] [&_p]:leading-[1.65] [&_p]:text-muted-foreground">
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
