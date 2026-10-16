import { ArrowUpRight } from "lucide-react";
import { useId, type ReactNode } from "react";
import { Reveal } from "@/components/reveal";

const CLIENT_GROUPS = [
  {
    industry: "Pertanian",
    clients: ["PKT Pupuk Kaltim"],
  },
  {
    industry: "Otomotif",
    clients: ["Auto Bravo"],
  },
  {
    industry: "Perusahaan Jasa",
    clients: ["Tokyo Consulting", "Ambadar & Partner", "SHM Partnership"],
  },
  {
    industry: "Konstruksi",
    clients: ["Jaya Baya"],
  },
  {
    industry: "IT / Telekomunikasi",
    clients: ["ARITA Mobile International"],
  },
  {
    industry: "Hotel / Properti",
    clients: [
      "PT Sakura Property",
      "Naga Cipta Central",
      "PT Vista Utama Properindo",
    ],
  },
  {
    industry: "Kimia",
    clients: ["PT Aneka Kimia Lestari"],
  },
  {
    industry: "Energi & Sumber Daya Alam",
    clients: ["Geo Link Energi"],
  },
  {
    industry: "Tekstil",
    clients: ["PT Mutu Gading Textile"],
  },
  {
    industry: "Manufaktur",
    clients: [
      "Cahaya Pesona Abadi / Daiken",
      "PT Padma Sari Pangan",
      "Hanamasa",
    ],
  },
  {
    industry: "Lainnya",
    clients: ["PT Perikanan Nusantara"],
  },
] as const;

export function ProjectLibrary(): ReactNode {
  const id = useId();

  return (
    <section
      id="klien"
      className="mx-auto w-full max-w-360 px-14 py-16 max-[992px]:px-8 max-[768px]:px-6 max-[768px]:py-11 max-[480px]:px-5"
      aria-labelledby={`${id}-heading`}
    >
      <Reveal>
        <header className="flex items-end justify-between gap-12 max-[992px]:flex-col max-[992px]:items-start max-[992px]:gap-5">
          <div>
            <p className="mb-3 text-[12px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              Klien kami
            </p>
            <h2
              className="max-w-[700px] text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
              id={`${id}-heading`}
            >
              Dipercaya perusahaan dari berbagai sektor.
            </h2>
          </div>
          <p className="max-w-[350px] flex-[0_1_350px] pb-[3px] text-base leading-[1.5] tracking-[-0.025em] text-pretty text-muted-foreground max-[992px]:max-w-[450px] max-[992px]:basis-auto max-[992px]:p-0 max-[768px]:text-base">
            Dari pertanian hingga manufaktur — kami mendampingi klien dengan
            kebutuhan yang beragam.
          </p>
        </header>
      </Reveal>

      <div className="mt-10 grid grid-cols-3 gap-5 max-[992px]:grid-cols-2 max-[992px]:gap-4 max-[768px]:grid-cols-1">
        {CLIENT_GROUPS.map((group, index) => (
          <Reveal key={group.industry} delay={(index % 3) * 0.06}>
            <article className="h-full rounded-3xl border border-border bg-card p-7 max-[992px]:p-6">
              <p className="text-[12px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                {group.industry}
              </p>
              <ul className="mt-4 grid gap-2.5" role="list">
                {group.clients.map((client) => (
                  <li
                    key={client}
                    className="text-[15px] leading-[1.5] font-medium tracking-[-0.02em]"
                  >
                    {client}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
        <Reveal delay={0.12}>
          <article className="flex h-full flex-col justify-between rounded-3xl bg-foreground p-7 text-background max-[992px]:p-6">
            <div>
              <h3 className="text-xl leading-[1.35] font-medium tracking-[-0.04em]">
                Jadilah klien kami berikutnya.
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed opacity-80">
                Kami siap menjadi mitra solusi bisnis terpercaya Anda.
              </p>
            </div>
            <a
              href="#kontak"
              className="mt-6 inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Hubungi kami <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
