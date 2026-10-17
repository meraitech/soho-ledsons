import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { images } from "@/lib/images";

export function Together(): ReactNode {
  return (
    <section
      id="together"
      className={`mx-auto w-full max-w-360 px-14 py-16 max-[992px]:px-8 max-[768px]:px-6 max-[768px]:py-11 max-[480px]:px-5`}
      aria-labelledby="together-heading"
    >
      <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] items-center gap-20 max-[1200px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] max-[1200px]:gap-12 max-[992px]:gap-8 max-[768px]:grid-cols-[minmax(0,1fr)] max-[768px]:gap-9">
        <Reveal className="min-w-0 [&_h2]:max-w-115 max-[1200px]:[&_h2]:text-[42px] max-[992px]:[&_h2]:text-4xl max-[768px]:[&_h2]:text-[38px] max-[480px]:[&_h2]:text-[34px]">
          <h2
            id="together-heading"
            className="text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
          >
            KJA LEDSONS,
            <br />
            mitra bisnis Anda.
          </h2>
          <p
            className={`mt-7 max-w-95 text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[992px]:mt-5.5 max-[992px]:text-base max-[768px]:max-w-110 max-[768px]:text-base`}
          >
            Penyedia jasa akuntansi: pembukuan, laporan keuangan, pajak, dan
            konsultasi.
          </p>
          <p className="mt-5 max-w-91.25 text-[15px] leading-[1.65] text-muted-foreground max-[992px]:text-sm max-[768px]:max-w-110">
            Berdiri sejak 2024, didampingi partner dan tenaga ahli
            berpengalaman.
          </p>
          <a
            href="#workflow"
            className="mt-9 inline-flex items-center gap-2.5 border-b border-border py-2 text-[15px] leading-normal font-medium max-[992px]:mt-6 max-[992px]:text-sm [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5"
          >
            Lihat alur layanan <ArrowUpRight size={17} strokeWidth={1.5} />
          </a>
        </Reveal>
        <Reveal className="min-w-0" delay={0.08}>
          <figure>
            <div className="relative aspect-[1.25] w-full min-w-0 overflow-hidden rounded-[28px] bg-muted max-[1200px]:aspect-square max-[992px]:aspect-[0.88] max-[768px]:aspect-[1.2] max-[768px]:rounded-3xl [&_img]:object-cover [&_img]:object-[center_56%]">
              <Image
                src={images.process.src}
                alt={images.process.alt}
                fill
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1440px) 54vw, 750px"
              />
            </div>
            <figcaption className="mt-4.5 flex justify-between gap-5 text-xs leading-normal text-muted-foreground max-[1200px]:flex-col max-[1200px]:gap-0.75 max-[768px]:mt-3.5 max-[768px]:flex-row max-[768px]:gap-4 max-[768px]:text-[11px] max-[480px]:flex-col max-[480px]:gap-0.75 [&>span:first-child]:text-foreground">
              <span>Pendampingan yang berkelanjutan.</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
