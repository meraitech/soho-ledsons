"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Copy,
  File,
  Globe2,
  Grid2X2,
  ImageIcon,
  Layers2,
  LockKeyhole,
  MessageCircle,
  MousePointer2,
  Plus,
} from "lucide-react";
import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { images } from "@/lib/images";
import { useReducedMotion } from "@/lib/motion";

const AUDIENCES = ["Untuk UMKM", "Untuk perusahaan"] as const;
const VERSIONS = [
  { title: "Pembukuan bulan berjalan", time: "Baru saja", number: "03" },
  { title: "Rekonsiliasi bank", time: "Kemarin", number: "02" },
  { title: "Arsip awal", time: "Minggu lalu", number: "01" },
] as const;

function AudienceCopy({
  children,
  active,
}: {
  children: readonly [string, string];
  active: number;
}): ReactNode {
  return (
    <span className="grid [&>span]:invisible [&>span]:opacity-0 [&>span]:transition-opacity [&>span]:duration-250 [&>span]:[grid-area:1/1] [&>span]:data-visible:visible [&>span]:data-visible:opacity-100">
      {children.map((copy, index) => (
        <span
          key={copy}
          aria-hidden={index !== active}
          data-visible={index === active || undefined}
        >
          {copy}
        </span>
      ))}
    </span>
  );
}

export function Features(): ReactNode {
  const id = useId();
  const [audience, setAudience] = useState(0);
  const [canvas, setCanvas] = useState(0);
  const [shared, setShared] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [version, setVersion] = useState(0);
  const [approved, setApproved] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const activeVersion = VERSIONS[version]!;

  function moveAudience(event: KeyboardEvent<HTMLButtonElement>): void {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - audience;
    setAudience(next);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>("[role=tab]")
      [next]?.focus();
  }

  return (
    <section
      className="mx-auto w-full max-w-360 px-14 pt-24 pb-16 [--canvas-surface:#dfe7f6] [--comment-surface:#e0e8f5] [--history-surface:#e9eef7] [--share-surface:#e6eaf3] [--ui-accent:#c7d7f3] [--ui-card:#ffffff] [--ui-ink:#1f2c4d] [--ui-line:#dde4ef] [--ui-muted:#4d5d7d] [--ui-soft:#eef2f8] max-[992px]:px-8 max-[992px]:py-[72px] max-[768px]:px-6 max-[481px]:py-14 max-[480px]:px-5 dark:[--canvas-surface:#1c2740] dark:[--comment-surface:#1e2a44] dark:[--history-surface:#1a2334] dark:[--share-surface:#222a3a] dark:[--ui-accent:#2c4d8f] dark:[--ui-card:#1a2340] dark:[--ui-ink:#e9edf6] dark:[--ui-line:#2e3a55] dark:[--ui-muted:#9fb0cc] dark:[--ui-soft:#232d47] data-[reduced=true]:[&_*]:transition-none! motion-reduce:[&_*]:transition-none! [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-offset-3 [&_button:focus-visible]:outline-ring"
      id="features"
      aria-labelledby={`${id}-heading`}
      data-reduced={reduced}
    >
      <Reveal>
        <header className="mb-10 text-center">
          <h2
            className="text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
            id={`${id}-heading`}
          >
            Keuangan rapi
            <br />
            butuh pendamping tepat.
          </h2>
          <p className="mt-6 text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[768px]:text-base max-[481px]:mt-5">
            Dari catatan berantakan hingga laporan siap pakai.
            <br className="max-[481px]:hidden" /> Semua tertangani di satu
            tempat.
          </p>
          <div
            className="mt-8 inline-flex gap-[3px] rounded-[99px] border border-border bg-muted p-1 max-[481px]:mt-6"
            role="tablist"
            aria-label="Lihat layanan untuk"
          >
            {AUDIENCES.map((label, index) => (
              <button
                type="button"
                role="tab"
                id={`${id}-tab-${index}`}
                aria-controls={`${id}-panel`}
                aria-selected={audience === index}
                tabIndex={audience === index ? 0 : -1}
                className="min-h-9 rounded-[99px] px-5 py-2 text-[13px] leading-normal text-muted-foreground transition-[background,color] duration-200 aria-selected:bg-card aria-selected:text-foreground aria-selected:shadow-[0_1px_4px_#00000016] max-[481px]:px-4 max-[481px]:text-xs"
                key={label}
                onClick={() => setAudience(index)}
                onKeyDown={moveAudience}
              >
                {label}
              </button>
            ))}
          </div>
        </header>
      </Reveal>

      <div
        className="grid grid-cols-12 gap-6 max-[992px]:grid-cols-1 max-[992px]:gap-5"
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${audience}`}
      >
        <Reveal className="col-span-7 min-w-0 max-[992px]:col-auto">
          <article className="group/canvas relative h-full min-h-[536px] overflow-hidden rounded-3xl bg-(--canvas-surface) p-8 text-foreground max-[1101px]:min-h-[550px] max-[1101px]:p-7 max-[992px]:min-h-[536px] max-[992px]:p-8 max-[481px]:min-h-[530px] max-[481px]:p-6">
            <div className="relative z-2 max-w-[390px] max-[992px]:max-w-[400px] [&_h3]:text-[27px] [&_h3]:leading-[1.2] [&_h3]:font-medium [&_h3]:tracking-[-0.7px] [&_h3]:max-[1101px]:text-[25px] [&_h3]:max-[992px]:text-[27px] [&_h3]:max-[481px]:text-2xl [&_p]:mt-3 [&_p]:max-w-[350px] [&_p]:text-sm [&_p]:leading-[1.55] [&_p]:text-(--ui-muted) [&_p]:max-[992px]:max-w-[380px] [&_p]:max-[481px]:text-[13px]">
              <h3>
                <AudienceCopy active={audience}>
                  {[
                    "Pembukuan rutin yang tertib.",
                    "Satu tempat untuk semua berkas.",
                  ]}
                </AudienceCopy>
              </h3>
              <p>
                <AudienceCopy active={audience}>
                  {[
                    "Catat transaksi rutin. Beri ruang agar laporan tersusun rapi.",
                    "Satukan berkas dan catatan dari tim dalam satu tempat.",
                  ]}
                </AudienceCopy>
              </p>
            </div>
            <div className="absolute inset-x-0 top-[170px] bottom-0 text-(--ui-ink) max-[1101px]:top-[188px] max-[992px]:top-[170px] max-[481px]:top-44">
              <div
                className="absolute inset-0 bg-[radial-gradient(#3d5a9640_1px,transparent_1px)] mask-[linear-gradient(transparent,black_25%)] bg-size-[16px_16px]"
                aria-hidden="true"
              />
              <div
                className="absolute top-20 left-7 z-3 grid gap-1 rounded-xl border border-(--ui-line) bg-(--ui-card) p-1.5 shadow-[0_4px_12px_#00000008] max-[1101px]:left-4 max-[992px]:left-[max(24px,calc(50%-207px))] max-[481px]:left-3.5 max-[481px]:p-1 [&_button]:hover:bg-(--ui-soft) [&_button]:aria-pressed:bg-(--ui-accent) [&_button]:aria-pressed:text-(--ui-ink) [&_button]:aria-pressed:hover:bg-(--ui-soft) [&>:is(button,span)]:grid [&>:is(button,span)]:size-[30px] [&>:is(button,span)]:place-items-center [&>:is(button,span)]:rounded-md [&>:is(button,span)]:text-(--ui-muted) [&>:is(button,span)]:max-[481px]:h-[29px] [&>:is(button,span)]:max-[481px]:w-[27px]"
                role="group"
                aria-label="Pilih contoh berkas"
              >
                <button
                  type="button"
                  aria-label="Tampilkan pembukuan"
                  aria-pressed={canvas === 0}
                  onClick={() => setCanvas(0)}
                >
                  <MousePointer2 size={17} />
                </button>
                <button
                  type="button"
                  aria-label="Tampilkan laporan"
                  aria-pressed={canvas === 1}
                  onClick={() => setCanvas(1)}
                >
                  <ImageIcon size={17} />
                </button>
                <span aria-hidden="true">
                  <Grid2X2 size={17} />
                </span>
                <span aria-hidden="true">
                  <Layers2 size={17} />
                </span>
              </div>
              <div className="absolute top-[22px] left-1/2 w-[min(340px,calc(100%-150px))] -translate-x-[48%] -rotate-3 rounded-[14px] border border-(--ui-line) bg-(--ui-card) p-2.5 shadow-[0_12px_30px_#16295e12] transition-transform duration-450 group-hover/canvas:-rotate-1 max-[1101px]:w-[calc(100%-118px)] max-[992px]:w-[min(330px,calc(100%-130px))] max-[481px]:top-6 max-[481px]:w-[calc(100%-94px)] max-[481px]:-translate-x-[43%]">
                <div className="flex items-center justify-between gap-2 px-[3px] pt-[3px] pb-2.5 text-[9px] max-[481px]:text-[8px] [&>span:first-child]:truncate">
                  <span>
                    {canvas === 0
                      ? "Berkas / pembukuan rutin"
                      : "Arsip / laporan tersusun"}
                  </span>
                  <span aria-hidden="true">•••</span>
                </div>
                <div className="relative h-[207px] overflow-hidden rounded-[7px] bg-(--ui-soft) max-[481px]:h-[197px]">
                  {[images.chair, images.courtyard].map((photo, index) => (
                    <Image
                      key={photo.src}
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 480px) 220px, 340px"
                      className="object-cover opacity-0 transition-opacity duration-350 aria-[hidden=false]:opacity-100"
                      aria-hidden={canvas !== index}
                    />
                  ))}
                  <span className="absolute bottom-3 left-3 rounded-sm bg-[#ffffffdb] px-[7px] py-[5px] font-sans text-[8px] leading-[normal] text-[#363b33]">
                    BERKAS 0{canvas + 1}
                  </span>
                </div>
                <div className="flex justify-between gap-2 px-[3px] pt-3 pb-[3px] text-[8px] text-(--ui-muted) max-[481px]:[&>span:first-child]:max-w-[94px]">
                  <span>Layak ditindaklanjuti.</span>
                  <span>01 / 04</span>
                </div>
              </div>
              <div
                className="pointer-events-none absolute top-[145px] right-[52px] text-[#1e3a8a] max-[1101px]:right-[25px] max-[992px]:right-[max(32px,calc(50%-185px))] max-[481px]:top-36 max-[481px]:right-4 [&>span]:-mt-[3px] [&>span]:ml-[17px] [&>span]:block [&>span]:rounded-[0_6px_6px] [&>span]:bg-[#1e3a8a] [&>span]:px-[9px] [&>span]:py-1 [&>span]:text-[10px] [&>span]:text-white"
                aria-hidden="true"
              >
                <MousePointer2 size={21} fill="currentColor" />
                <span>{audience === 0 ? "Anda" : "Konsultan"}</span>
              </div>
              <div className="absolute right-6 bottom-[25px] flex w-[232px] rotate-3 items-center gap-[9px] rounded-[11px] border border-(--ui-line) bg-(--ui-card) p-2.5 shadow-[0_7px_24px_#0000000c] transition-transform duration-350 group-hover/canvas:-translate-y-[3px] group-hover/canvas:rotate-0 max-[1101px]:right-5 max-[1101px]:w-[210px] max-[992px]:right-[max(24px,calc(50%-220px))] max-[992px]:w-[232px] max-[481px]:right-4 max-[481px]:w-[207px] [&_strong]:text-[10px] [&_strong]:font-medium [&>span]:grid [&>span]:min-w-0 [&>span]:gap-1 [&>span>span]:text-[8px] [&>span>span]:text-(--ui-muted) [&>svg]:ml-auto [&>svg]:shrink-0">
                <div className="relative h-11 w-10 shrink-0 overflow-hidden rounded-md [&_img]:object-cover">
                  <Image src={images.process.src} alt="" fill sizes="48px" />
                </div>
                <span>
                  <strong>Berkas terkumpul</strong>
                  <span>
                    {audience === 0
                      ? "Berkas usaha Anda"
                      : "Disiapkan untuk laporan"}
                  </span>
                </span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal
          className="col-span-5 min-w-0 max-[992px]:col-auto"
          delay={0.08}
        >
          <article className="group/share relative h-full min-h-[536px] overflow-hidden rounded-3xl bg-(--share-surface) p-8 text-foreground max-[1101px]:min-h-[550px] max-[1101px]:p-7 max-[992px]:min-h-[536px] max-[992px]:p-8 max-[481px]:min-h-[530px] max-[481px]:p-6">
            <div className="relative z-2 max-w-[390px] max-[992px]:max-w-[400px] [&_h3]:text-[27px] [&_h3]:leading-[1.2] [&_h3]:font-medium [&_h3]:tracking-[-0.7px] [&_h3]:max-[1101px]:text-[25px] [&_h3]:max-[992px]:text-[27px] [&_h3]:max-[481px]:text-2xl [&_p]:mt-3 [&_p]:max-w-[350px] [&_p]:text-sm [&_p]:leading-[1.55] [&_p]:text-(--ui-muted) [&_p]:max-[992px]:max-w-[380px] [&_p]:max-[481px]:text-[13px]">
              <h3>
                <AudienceCopy active={audience}>
                  {[
                    "Akses yang terkendali.",
                    "Minim kirim berkas bolak-balik.",
                  ]}
                </AudienceCopy>
              </h3>
              <p>
                <AudienceCopy active={audience}>
                  {[
                    "Bagikan dokumen berjalan dengan pendamping terpercaya.",
                    "Satu tempat berbagi, dengan kendali siapa melihat apa.",
                  ]}
                </AudienceCopy>
              </p>
            </div>
            <div className="absolute inset-x-0 top-[170px] bottom-0 text-(--ui-ink) max-[1101px]:top-[188px] max-[992px]:top-[170px] max-[481px]:top-44">
              <div
                className="absolute top-px left-1/2 flex h-72 w-[min(294px,calc(100%-66px))] -translate-x-1/2 -rotate-5 items-start gap-2 rounded-xl border border-(--ui-line) bg-(--ui-card) p-[13px] text-[9px] text-(--ui-muted) max-[1101px]:w-[calc(100%-50px)] max-[992px]:w-[min(294px,calc(100%-66px))] max-[481px]:w-[calc(100%-54px)] max-[481px]:max-w-[282px]"
                aria-hidden="true"
              >
                <File size={15} />
                <span>Pembukuan / dokumen berjalan</span>
              </div>
              <div className="absolute top-[19px] left-1/2 w-[min(306px,calc(100%-56px))] -translate-x-1/2 rotate-2 overflow-hidden rounded-[14px] border border-(--ui-line) bg-(--ui-card) shadow-[0_9px_25px_#0000000c] transition-transform duration-350 group-hover/share:rotate-0 max-[1101px]:w-[calc(100%-40px)] max-[992px]:w-[min(306px,calc(100%-56px))] max-[481px]:top-[17px] max-[481px]:w-[calc(100%-42px)] max-[481px]:max-w-[294px]">
                <div className="relative h-[67px] overflow-hidden [&_img]:object-cover [&_img]:brightness-77 [&>span]:absolute [&>span]:bottom-3 [&>span]:left-[15px] [&>span]:font-sans [&>span]:text-2xl [&>span]:leading-[normal] [&>span]:font-medium [&>span]:text-white">
                  <Image src={images.corridor.src} alt="" fill sizes="320px" />
                  <span>Pembukuan</span>
                </div>
                <div className="p-4 max-[1101px]:p-3.5 max-[992px]:p-4 max-[481px]:p-3.5">
                  <div className="mb-[15px] grid gap-[5px] [&_strong]:text-xs [&_strong]:leading-normal [&_strong]:font-medium [&>span]:text-[9px] [&>span]:text-(--ui-muted)">
                    <strong>Pendamping yang tepat.</strong>
                    <span>Akses dokumen</span>
                  </div>
                  <div className="mt-3 flex items-center gap-[9px] max-[481px]:gap-[7px] [&_strong]:text-[10px] [&_strong]:font-medium [&>span:nth-child(2)]:grid [&>span:nth-child(2)]:min-w-0 [&>span:nth-child(2)]:gap-[3px] [&>span>span]:text-[8px] [&>span>span]:text-(--ui-muted)">
                    <span className="relative inline-grid size-[30px] shrink-0 place-items-center overflow-hidden rounded-full bg-(--ui-soft) [&_img]:object-cover">
                      <Image
                        src={images.portraitOne.src}
                        alt=""
                        fill
                        sizes="32px"
                      />
                    </span>
                    <span>
                      <strong>Anda</strong>
                      <span>
                        {audience === 0 ? "Usaha Anda" : "Perusahaan Anda"}
                      </span>
                    </span>
                    <span className="ml-auto text-[8px] whitespace-nowrap text-(--ui-muted) max-[481px]:text-[7px]">
                      Pemilik
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-[9px] max-[481px]:gap-[7px] [&_strong]:text-[10px] [&_strong]:font-medium [&>span:nth-child(2)]:grid [&>span:nth-child(2)]:min-w-0 [&>span:nth-child(2)]:gap-[3px] [&>span>span]:text-[8px] [&>span>span]:text-(--ui-muted)">
                    <span className="relative inline-grid size-[30px] shrink-0 place-items-center overflow-hidden rounded-full bg-(--ui-accent) text-[9px] text-(--ui-muted) [&_img]:object-cover">
                      LS
                    </span>
                    <span>
                      <strong>Tim LEDSONS</strong>
                      <span>
                        {audience === 0 ? "Pendamping Anda" : "Tim pendamping"}
                      </span>
                    </span>
                    <span className="ml-auto text-[8px] whitespace-nowrap text-(--ui-muted) max-[481px]:text-[7px]">
                      Konsultan
                    </span>
                  </div>
                  <button
                    type="button"
                    className="group/access mt-3.5 flex w-full items-center gap-2 border-t border-(--ui-line) pt-2.5 text-left text-[9px] text-(--ui-ink) hover:text-(--ui-muted)"
                    aria-pressed={shared}
                    onClick={() => setShared(!shared)}
                  >
                    {shared ? <Globe2 size={16} /> : <LockKeyhole size={16} />}
                    <span>
                      {shared
                        ? "Tautan pratinjau terbuka"
                        : "Hanya pihak terundang"}
                    </span>
                    <span
                      className="ml-auto flex h-4 w-[26px] shrink-0 items-center rounded-[99px] bg-(--ui-line) p-[3px] group-aria-pressed/access:bg-[#1e3a8a] [&>span]:size-2.5 [&>span]:rounded-full [&>span]:bg-(--ui-card) [&>span]:transition-transform [&>span]:duration-200 [&>span]:group-aria-pressed/access:translate-x-2.5"
                      aria-hidden="true"
                    >
                      <span />
                    </span>
                  </button>
                  <p
                    className="mt-[7px] min-h-3 text-[8px] text-(--ui-muted)"
                    role="status"
                  >
                    {shared
                      ? "Pratinjau demo terbuka."
                      : "Contoh berkas tetap privat."}
                  </p>
                </div>
              </div>
              <span className="absolute right-6 bottom-[19px] flex items-center gap-1.5 font-sans text-[7px] leading-[normal] text-(--ui-muted) max-[481px]:right-5 max-[481px]:text-[6px]">
                <Copy size={12} aria-hidden="true" /> SATU TEMPAT UNTUK BERKAS
              </span>
            </div>
          </article>
        </Reveal>

        <Reveal className="col-span-5 min-w-0 max-[992px]:col-auto">
          <article className="group/comments relative h-full min-h-[536px] overflow-hidden rounded-3xl bg-(--comment-surface) p-8 text-foreground max-[1101px]:min-h-[550px] max-[1101px]:p-7 max-[992px]:min-h-[536px] max-[992px]:p-8 max-[481px]:min-h-[530px] max-[481px]:p-6">
            <div className="relative z-2 max-w-[390px] max-[992px]:max-w-[400px] [&_h3]:text-[27px] [&_h3]:leading-[1.2] [&_h3]:font-medium [&_h3]:tracking-[-0.7px] [&_h3]:max-[1101px]:text-[25px] [&_h3]:max-[992px]:text-[27px] [&_h3]:max-[481px]:text-2xl [&_p]:mt-3 [&_p]:max-w-[350px] [&_p]:text-sm [&_p]:leading-[1.55] [&_p]:text-(--ui-muted) [&_p]:max-[992px]:max-w-[380px] [&_p]:max-[481px]:text-[13px]">
              <h3>
                <AudienceCopy active={audience}>
                  {["Diskusi dalam konteks.", "Masukan tepat sasaran."]}
                </AudienceCopy>
              </h3>
              <p>
                <AudienceCopy active={audience}>
                  {[
                    "Saran kecil tepat di samping dokumen yang dibahas.",
                    "Ubah pesan beruntun jadi diskusi yang jelas.",
                  ]}
                </AudienceCopy>
              </p>
            </div>
            <div className="absolute inset-x-0 top-[170px] bottom-0 text-(--ui-ink) max-[1101px]:top-[188px] max-[992px]:top-[170px] max-[481px]:top-44">
              <div className="absolute top-1 left-1/2 h-[198px] w-[268px] -translate-x-[44%] rotate-6 overflow-visible rounded-xl border-8 border-(--ui-card) shadow-[0_6px_15px_#00000008] transition-transform duration-400 group-hover/comments:rotate-3 max-[1101px]:w-[calc(100%-65px)] max-[992px]:w-[268px] max-[481px]:h-[190px] max-[481px]:w-[calc(100%-64px)] max-[481px]:max-w-[268px] [&>img]:rounded-[5px] [&>img]:object-cover">
                <Image
                  src={images.chair.src}
                  alt={images.chair.alt}
                  fill
                  sizes="300px"
                />
                <span
                  className="absolute top-[59px] left-[60px] grid size-[30px] place-items-center rounded-[50%_50%_50%_4px] border-2 border-white bg-[#3a5e75] text-[11px] text-white shadow-[0_3px_8px_#00000015]"
                  aria-hidden="true"
                >
                  {resolved ? <Check size={14} /> : "1"}
                </span>
              </div>
              <div className="absolute bottom-[34px] left-1/2 w-[min(316px,calc(100%-54px))] -translate-x-1/2 -rotate-2 rounded-xl border border-(--ui-line) bg-(--ui-card) p-4 shadow-[0_9px_22px_#0000000a] transition-transform duration-350 group-hover/comments:rotate-0 max-[1101px]:w-[calc(100%-40px)] max-[1101px]:p-3.5 max-[992px]:w-[min(316px,calc(100%-54px))] max-[992px]:p-4 max-[481px]:bottom-[33px] max-[481px]:w-[calc(100%-38px)] max-[481px]:p-[13px] [&>p]:mt-[13px] [&>p]:text-[11px] [&>p]:leading-[1.6]">
                <div className="flex items-center gap-[9px] [&_strong]:grid [&_strong]:gap-1 [&_strong]:text-[10px] [&_strong]:font-medium [&_strong>span]:text-[8px] [&_strong>span]:font-normal [&_strong>span]:text-(--ui-muted) [&>svg]:ml-auto [&>svg]:text-(--ui-muted)">
                  <span className="relative inline-grid size-[30px] shrink-0 place-items-center overflow-hidden rounded-full bg-(--ui-soft) [&_img]:object-cover">
                    <Image
                      src={images.portraitTwo.src}
                      alt=""
                      fill
                      sizes="32px"
                    />
                  </span>
                  <strong>
                    Tim LEDSONS <span>Baru saja</span>
                  </strong>
                  <MessageCircle size={15} aria-hidden="true" />
                </div>
                <p>Selisih kecil ini perlu dikoreksi. Kami rapikan sekarang.</p>
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-(--ui-line) pt-3 max-[1101px]:gap-[5px] max-[481px]:gap-[7px] [&>span]:text-[8px] [&>span]:text-(--ui-muted) max-[1101px]:[&>span]:max-w-[62px] max-[992px]:[&>span]:max-w-none max-[481px]:[&>span]:max-w-[72px]">
                  <span role="status">
                    {resolved ? "Sudah jelas." : "Satu masukan berguna."}
                  </span>
                  <button
                    type="button"
                    className="inline-flex min-h-[26px] min-w-[110px] items-center justify-center gap-[5px] rounded-[5px] bg-(--ui-soft) text-[9px] text-(--ui-ink) hover:bg-(--ui-accent)"
                    aria-pressed={resolved}
                    onClick={() => setResolved(!resolved)}
                  >
                    {resolved ? <Plus size={13} /> : <Check size={13} />}
                    {resolved ? "Buka lagi" : "Tandai selesai"}
                  </button>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal
          className="col-span-7 min-w-0 max-[992px]:col-auto"
          delay={0.08}
        >
          <article className="group/history relative h-full min-h-[536px] overflow-hidden rounded-3xl bg-(--history-surface) p-8 text-foreground max-[1101px]:min-h-[550px] max-[1101px]:p-7 max-[992px]:min-h-[536px] max-[992px]:p-8 max-[481px]:min-h-[530px] max-[481px]:p-6">
            <div className="absolute inset-x-0 top-0 h-[336px] text-(--ui-ink)">
              <div className="absolute top-7 left-1/2 flex -translate-x-1/2 items-center gap-[7px] font-sans text-[7px] leading-[normal] whitespace-nowrap text-(--ui-muted)">
                <Clock3 size={13} aria-hidden="true" />
                <span>LAPORAN TERSUSUN DARI CATATAN RUTIN.</span>
              </div>
              <div className="absolute top-[59px] left-1/2 w-[min(398px,calc(100%-64px))] -translate-x-1/2 -rotate-3 overflow-hidden rounded-[13px] border border-(--ui-line) bg-(--ui-card) shadow-[0_8px_24px_#00000008] transition-transform duration-350 group-hover/history:rotate-0 max-[481px]:top-[53px] max-[481px]:w-[calc(100%-38px)]">
                <div className="flex items-center justify-between gap-2.5 border-b border-(--ui-line) px-[17px] py-3.5 max-[481px]:p-[13px] [&>span:first-child]:flex [&>span:first-child]:items-center [&>span:first-child]:gap-[7px] [&>span:first-child]:text-[10px] [&>span:first-child]:max-[481px]:text-[9px] [&>span:last-child]:font-sans [&>span:last-child]:text-[7px] [&>span:last-child]:leading-[normal] [&>span:last-child]:whitespace-nowrap [&>span:last-child]:text-(--ui-muted) [&>span:last-child]:max-[481px]:text-[6px]">
                  <span>
                    <Layers2 size={15} aria-hidden="true" /> Riwayat pembukuan
                  </span>
                  <span>VERSI {activeVersion.number}</span>
                </div>
                <div
                  className="p-[7px]"
                  role="group"
                  aria-label="Pratinjau versi laporan"
                >
                  {VERSIONS.map((item, index) => (
                    <button
                      type="button"
                      className="group/version relative flex w-full items-center gap-3 rounded-md px-2.5 py-[11px] text-left hover:bg-(--ui-soft) aria-pressed:bg-(--ui-soft) max-[481px]:gap-[9px] max-[481px]:px-2 [&_strong]:text-[11px] [&_strong]:font-medium max-[481px]:[&_strong]:text-[10px] [&>span:nth-child(2)]:grid [&>span:nth-child(2)]:gap-1 [&>span>span]:text-[8px] [&>span>span]:text-(--ui-muted)"
                      key={item.number}
                      aria-pressed={version === index}
                      onClick={() => setVersion(index)}
                    >
                      <span className="size-[7px] shrink-0 rounded-full border border-(--ui-muted) group-aria-pressed/version:border-(--ui-ink) group-aria-pressed/version:bg-(--ui-ink) group-aria-pressed/version:shadow-[0_0_0_3px_var(--ui-line)]" />
                      <span>
                        <strong>{item.title}</strong>
                        <span>{item.time}</span>
                      </span>
                      <span className="ml-auto font-sans text-[8px] leading-[normal] text-(--ui-muted)">
                        v{item.number}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-(--ui-line) px-[17px] py-3 max-[481px]:gap-[7px] max-[481px]:px-[13px] [&>span]:text-[9px] [&>span]:text-(--ui-muted) max-[481px]:[&>span]:text-[8px]">
                  <span role="status">
                    {approved === version
                      ? `Versi ${activeVersion.number} selesai.`
                      : `Menampilkan versi ${activeVersion.number}.`}
                  </span>
                  <button
                    type="button"
                    className="flex min-h-7 min-w-[115px] items-center justify-center gap-[5px] rounded-md bg-(--ui-accent) text-[9px] text-(--ui-ink) hover:shadow-[inset_0_0_0_1px_var(--ui-muted)] max-[481px]:min-w-[105px] max-[481px]:text-[8px]"
                    aria-pressed={approved === version}
                    onClick={() =>
                      setApproved(approved === version ? null : version)
                    }
                  >
                    <Check size={13} />
                    {approved === version ? "Selesai" : "Tandai selesai"}
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute inset-x-8 bottom-8 z-2 max-w-[480px] max-[1101px]:inset-x-7 max-[1101px]:bottom-7 max-[992px]:inset-x-8 max-[992px]:bottom-8 max-[992px]:max-w-[400px] max-[481px]:inset-x-6 max-[481px]:bottom-6 [&_h3]:text-[27px] [&_h3]:leading-[1.2] [&_h3]:font-medium [&_h3]:tracking-[-0.7px] [&_h3]:max-[1101px]:text-[25px] [&_h3]:max-[992px]:text-[27px] [&_h3]:max-[481px]:text-2xl [&_p]:mt-3 [&_p]:max-w-[420px] [&_p]:text-sm [&_p]:leading-[1.55] [&_p]:text-(--ui-muted) max-[992px]:[&_p]:max-w-[380px] [&_p]:max-[481px]:text-[13px]">
              <h3>
                <AudienceCopy active={audience}>
                  {["Koreksi mudah ditelusur.", "Setiap versi tercatat."]}
                </AudienceCopy>
              </h3>
              <p>
                <AudienceCopy active={audience}>
                  {[
                    "Simpan jejak perubahan. Progres selalu terlacak.",
                    "Lihat perjalanan berkas, tinjau, dan sepakati lanjutannya.",
                  ]}
                </AudienceCopy>
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
