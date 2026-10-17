"use client";

import Image from "next/image";
import { ArrowUpRight, Check, X } from "lucide-react";
import { motion } from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Reveal } from "@/components/reveal";
import { images } from "@/lib/images";
import { softEase, useReducedMotion } from "@/lib/motion";

const FILTERS = ["Semua", "Akuntansi", "Pajak", "Konsultasi"] as const;
type Filter = (typeof FILTERS)[number];

const PROJECTS = [
  {
    id: "still-form",
    title: "Pembukuan Rutin",
    category: "Akuntansi",
    format: "Jasa bulanan",
    description: "Pencatatan rutin yang rapi dan akurat.",
    brief:
      "Pembukuan sistematis untuk laporan yang rapi. Serahkan catatan rutin, terima laporan siap pakai setiap bulan.",
    checklist: [
      "Catat transaksi rutin setiap bulan.",
      "Rekonsiliasi bank dan kas.",
      "Terima laporan siap pakai.",
    ],
    artworkDescription:
      "Foto kursi putih large dengan kartu identitas Pembukuan Rutin di atas permukaan krem.",
  },
  {
    id: "common-ground",
    title: "Pendampingan Pajak",
    category: "Pajak",
    format: "Jasa perpajakan",
    description: "Kelola pajak agar patuh dan tepat waktu.",
    brief:
      "Pendampingan pajak perusahaan secara patuh dan efisien. Dari hitung hingga lapor, didampingi sampai beres.",
    checklist: [
      "Petakan kewajiban pajak Anda.",
      "Siapkan hitung dan dokumen.",
      "Lapor tepat waktu.",
    ],
    artworkDescription:
      "Foto halaman dengan judul Pendampingan Pajak di atas arsitektur dan tanaman.",
  },
  {
    id: "between-lines",
    title: "Kompilasi Laporan",
    category: "Akuntansi",
    format: "Laporan keuangan",
    description: "Laporan jelas sesuai standar.",
    brief:
      "Penyajian laporan keuangan yang jelas dan terstruktur. Untuk kebutuhan internal, bank, maupun investor.",
    checklist: [
      "Kumpulkan dokumen sumber.",
      "Susun laporan sesuai standar.",
      "Gunakan untuk keputusan.",
    ],
    artworkDescription:
      "Sampul editorial Kompilasi Laporan dengan foto buku catatan di atas permukaan lavender.",
  },
  {
    id: "look-again",
    title: "Konsultasi Bisnis",
    category: "Konsultasi",
    format: "Sesi konsultasi",
    description: "Solusi strategis untuk keuangan.",
    brief:
      "Diskusikan kondisi keuangan dan target bisnis. Petakan langkah yang paling tepat untuk bertumbuh.",
    checklist: [
      "Ceritakan kondisi usaha Anda.",
      "Petakan prioritas perbaikan.",
      "Jalankan pendampingan rutin.",
    ],
    artworkDescription:
      "Foto koridor beton dalam bingkai dengan judul Konsultasi Bisnis di sampingnya.",
  },
] as const;

type Project = (typeof PROJECTS)[number];

function ProjectArtwork({ project }: { project: Project }): ReactNode {
  switch (project.id) {
    case "still-form":
      return (
        <div className="absolute inset-0 bg-[#e9dfd0] font-sans dark:bg-[#594f43]">
          <div className="absolute top-[7%] left-[30%] isolate h-[101%] w-[64%] rotate-5 overflow-hidden rounded-2xl shadow-[0_3px_7px_#27201412,0_18px_36px_#2720141f] max-[480px]:rounded-[10px] [&_img]:object-cover [&_img]:object-[46%_53%] [&_img]:transition-transform [&_img]:duration-650 [&_img]:ease-[cubic-bezier(0.22,1,0.36,1)] [&_img]:group-focus-within/project:scale-[1.035] [&_img]:group-hover/project:scale-[1.035] [&_img]:group-data-[reduced=true]/library:scale-100! [&_img]:group-data-[reduced=true]/library:transition-none! [&_img]:motion-reduce:scale-100! [&_img]:motion-reduce:transition-none!">
            <Image
              src={images.chair.src}
              alt=""
              fill
              sizes="(max-width: 767px) 70vw, 500px"
            />
          </div>
          <div className="absolute bottom-[10%] left-[7%] z-1 w-[45%] -rotate-5 rounded-[14px] border border-[#ffffff80] bg-[#faf6ec] p-[clamp(18px,4.6cqw,34px)] text-[#3b4135] shadow-[0_3px_8px_#392c1712,0_14px_28px_#392c1724] max-[480px]:rounded-[10px] [&_span]:block [&_span]:text-[clamp(34px,10cqw,70px)] [&_span]:leading-[0.96] [&_span]:font-medium [&_span]:tracking-[-0.065em]">
            <span>
              pembuku
              <br />
              an.
            </span>
          </div>
        </div>
      );
    case "common-ground":
      return (
        <div className="absolute inset-0 bg-[#66735c] font-sans">
          <div className="absolute inset-0 isolate overflow-hidden rounded-none shadow-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,#10221805_12%,#1022189f_54%,#102218b0_100%)] after:content-[''] [&_img]:object-cover [&_img]:object-[48%_55%] [&_img]:transition-transform [&_img]:duration-650 [&_img]:ease-[cubic-bezier(0.22,1,0.36,1)] [&_img]:group-focus-within/project:scale-[1.035] [&_img]:group-hover/project:scale-[1.035] [&_img]:group-data-[reduced=true]/library:scale-100! [&_img]:group-data-[reduced=true]/library:transition-none! [&_img]:motion-reduce:scale-100! [&_img]:motion-reduce:transition-none!">
            <Image
              src={images.courtyard.src}
              alt=""
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), 740px"
            />
          </div>
          <div className="absolute bottom-[8%] left-[8%] text-[clamp(34px,10.4cqw,72px)] leading-[0.94] font-medium tracking-[-0.05em] text-white [text-shadow:0_2px_14px_#10221855]">
            <span>
              Pajak
              <br />
              beres.
            </span>
          </div>
        </div>
      );
    case "between-lines":
      return (
        <div className="absolute inset-0 bg-[#e8e0f1] font-sans dark:bg-[#494151]">
          <div className="absolute top-[9%] left-[14%] flex h-full w-[72%] -rotate-4 flex-col gap-[5%] rounded-xl border border-[#ffffff90] bg-[#faf8f2] p-[5%] shadow-[0_4px_8px_#30243910,0_18px_38px_#30243926] max-[480px]:rounded-lg">
            <span className="block shrink-0 text-[clamp(28px,8.4cqw,62px)] leading-[0.98] font-medium tracking-[-0.055em] text-[#42384b]">
              Laporan
              <br />
              keuangan.
            </span>
            <div className="relative isolate min-h-0 flex-1 overflow-hidden rounded-[5px] shadow-none max-[480px]:rounded-[3px] [&_img]:object-cover [&_img]:object-[50%_58%] [&_img]:transition-transform [&_img]:duration-650 [&_img]:ease-[cubic-bezier(0.22,1,0.36,1)] [&_img]:group-focus-within/project:scale-[1.035] [&_img]:group-hover/project:scale-[1.035] [&_img]:group-data-[reduced=true]/library:scale-100! [&_img]:group-data-[reduced=true]/library:transition-none! [&_img]:motion-reduce:scale-100! [&_img]:motion-reduce:transition-none!">
              <Image
                src={images.desk.src}
                alt=""
                fill
                sizes="(max-width: 767px) 70vw, 530px"
              />
            </div>
          </div>
        </div>
      );
    case "look-again":
      return (
        <div className="absolute inset-0 bg-[#3b5145] font-sans dark:bg-[#293e30]">
          <div className="absolute top-[8%] left-[7%] isolate h-[101%] w-[54%] -rotate-5 overflow-hidden rounded-[14px] border-[clamp(5px,1.15cqw,9px)] border-[#faf8f0] shadow-[0_4px_8px_#1320181a,0_20px_36px_#13201840] max-[480px]:rounded-[10px] [&_img]:object-cover [&_img]:object-[50%_45%] [&_img]:transition-transform [&_img]:duration-650 [&_img]:ease-[cubic-bezier(0.22,1,0.36,1)] [&_img]:group-focus-within/project:scale-[1.035] [&_img]:group-hover/project:scale-[1.035] [&_img]:group-data-[reduced=true]/library:scale-100! [&_img]:group-data-[reduced=true]/library:transition-none! [&_img]:motion-reduce:scale-100! [&_img]:motion-reduce:transition-none!">
            <Image
              src={images.corridor.src}
              alt=""
              fill
              sizes="(max-width: 767px) 65vw, 480px"
            />
          </div>
          <span className="absolute top-[19%] right-[6%] w-[34%] text-[clamp(32px,9.4cqw,68px)] leading-[0.96] font-medium tracking-[-0.055em] text-[#f8f5e9] [text-shadow:0_2px_12px_#14291c26]">
            Konsul
            <br />
            tasi.
          </span>
        </div>
      );
  }
}

function containFocus(event: KeyboardEvent<HTMLDialogElement>): void {
  if (event.key !== "Tab") return;
  const controls = event.currentTarget.querySelectorAll<HTMLElement>(
    'button:not([disabled]), a[href], [tabindex="0"]'
  );
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function ProjectLibrary(): ReactNode {
  const id = useId();
  const [filter, setFilter] = useState<Filter>("Semua");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const goToWorkspace = useRef(false);
  const backdropPress = useRef(false);
  const unlock = useRef<() => void>(() => {});
  const reduced = useReducedMotion();
  const projects = PROJECTS.filter(
    (project) => filter === "Semua" || project.category === filter
  );

  useEffect(() => {
    const element = dialog.current;
    if (!selected || !element) return;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const padding =
      Number.parseFloat(getComputedStyle(document.body).paddingRight) || 0;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0)
      document.body.style.paddingRight = `${padding + scrollbar}px`;
    let restored = false;
    const restore = (): void => {
      if (restored) return;
      restored = true;
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
    unlock.current = restore;
    element.showModal();
    element.scrollTop = 0;
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      restore();
      if (element.open) element.close();
    };
  }, [selected]);

  function openProject(project: Project, trigger: HTMLButtonElement): void {
    opener.current = trigger;
    goToWorkspace.current = false;
    setSelected(project);
  }

  function closePreview(): void {
    unlock.current();
    setSelected(null);
    if (!goToWorkspace.current) {
      opener.current?.focus({ preventScroll: true });
      return;
    }
    const heading = document.querySelector<HTMLElement>("#workspace h2");
    if (!heading) return;
    if (!heading.hasAttribute("tabindex")) {
      heading.tabIndex = -1;
      heading.addEventListener(
        "blur",
        () => heading.removeAttribute("tabindex"),
        { once: true }
      );
    }
    heading.focus({ preventScroll: true });
  }

  function startWorkspace(event: MouseEvent<HTMLAnchorElement>): void {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    goToWorkspace.current = true;
    unlock.current();
    dialog.current?.close();
  }

  return (
    <section
      id="library"
      className="group/library mx-auto w-full max-w-360 px-14 py-16 max-[992px]:px-8 max-[768px]:px-6 max-[768px]:py-11 max-[480px]:px-5"
      aria-labelledby={`${id}-heading`}
      data-reduced={reduced}
    >
      <Reveal>
        <header className="flex items-end justify-between gap-12 max-[992px]:flex-col max-[992px]:items-start max-[992px]:gap-5">
          <h2
            className="max-w-[700px] text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
            id={`${id}-heading`}
          >
            Mulai dari kebutuhan Anda.
          </h2>
          <p className="max-w-[350px] flex-[0_1_350px] pb-[3px] text-base leading-[1.5] leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[992px]:max-w-[450px] max-[992px]:basis-auto max-[992px]:p-0 max-[768px]:text-base">
            Empat layanan inti. Buka dan pelajari singkat.
          </p>
        </header>
      </Reveal>

      <div
        className="my-8 flex flex-wrap gap-2 max-[768px]:mt-6 max-[768px]:mb-7 max-[768px]:gap-1"
        role="group"
        aria-label="Saring layanan"
      >
        {FILTERS.map((category) => (
          <button
            type="button"
            className="rounded-[100px] border border-transparent px-4 py-[9px] text-[13px] leading-5 text-muted-foreground transition-[color,background,border-color] duration-200 first:-ml-px hover:bg-muted hover:text-foreground aria-pressed:border-border aria-pressed:bg-muted aria-pressed:text-foreground max-[768px]:px-2.5 max-[768px]:py-2 max-[768px]:text-xs"
            key={category}
            aria-pressed={filter === category}
            aria-controls={`${id}-projects`}
            onClick={() => setFilter(category)}
          >
            {category === "Semua" ? "Semua" : category}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {projects.length} {projects.length === 1 ? "layanan" : "layanan"}{" "}
        ditampilkan
        {filter === "Semua" ? "." : ` pada ${filter.toLowerCase()}.`}
      </p>

      <div
        className="grid grid-cols-2 gap-8 max-[992px]:gap-6 max-[768px]:grid-cols-1"
        id={`${id}-projects`}
      >
        {projects.map((project, index) => (
          <motion.article
            className="group/project relative min-w-0 overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-300 hover:shadow-[0_8px_24px_#00000006] has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-5 has-[button:focus-visible]:outline-ring"
            key={project.id}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            {...(reduced
              ? { animate: { opacity: 1, y: 0 } }
              : {
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.1 },
                })}
            transition={{
              duration: reduced ? 0 : 0.65,
              delay: reduced ? 0 : (index % 2) * 0.08,
              ease: softEase,
            }}
          >
            <div
              className="@container relative isolate aspect-[1.48] overflow-hidden"
              aria-hidden="true"
            >
              <ProjectArtwork project={project} />
            </div>
            <div className="flex min-h-[140px] items-center justify-between gap-6 px-7 py-6 max-[992px]:min-h-[154px] max-[992px]:gap-4 max-[992px]:p-[22px] max-[768px]:min-h-[136px] max-[768px]:p-6 max-[480px]:items-start max-[480px]:gap-3 max-[480px]:p-5">
              <div>
                <span className="block text-xs leading-[1.5] text-muted-foreground">
                  {project.format}
                </span>
                <h3 className="mt-[5px] text-[25px] leading-[1.2] font-medium tracking-[-0.035em] max-[992px]:text-[23px] max-[768px]:text-[25px] max-[480px]:text-[23px]">
                  <button
                    type="button"
                    className="text-left after:absolute after:inset-0 after:z-2 after:rounded-3xl after:content-[''] focus-visible:outline-none"
                    aria-label={`Pratinjau ${project.title}`}
                    aria-haspopup="dialog"
                    onClick={(event) =>
                      openProject(project, event.currentTarget)
                    }
                  >
                    {project.title}
                  </button>
                </h3>
                <p className="mt-2 text-sm leading-[1.5] text-muted-foreground max-[992px]:text-[13px] max-[768px]:text-sm max-[480px]:text-[13px]">
                  {project.description}
                </p>
              </div>
              <span
                className="grid size-[42px] shrink-0 place-items-center rounded-full border border-border transition-[background,transform,translate] duration-250 group-focus-within/project:translate-x-0.5 group-focus-within/project:-translate-y-0.5 group-focus-within/project:bg-muted group-hover/project:translate-x-0.5 group-hover/project:-translate-y-0.5 group-hover/project:bg-muted group-data-[reduced=true]/library:translate-x-0! group-data-[reduced=true]/library:translate-y-0! group-data-[reduced=true]/library:transition-none! motion-reduce:translate-x-0! motion-reduce:translate-y-0! motion-reduce:transition-none! max-[992px]:size-9 max-[480px]:mt-[22px] max-[480px]:size-8 max-[480px]:[&_svg]:size-[18px]"
                aria-hidden="true"
              >
                <ArrowUpRight size={22} strokeWidth={1.5} />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="m-auto max-h-[calc(100dvh-48px)] w-[min(920px,calc(100vw-48px))] max-w-none overflow-x-hidden overflow-y-auto overscroll-contain rounded-3xl border border-border bg-card p-0 text-foreground shadow-[0_24px_96px_#00000035] backdrop:bg-[#10151070] backdrop:backdrop-blur-[6px] max-[768px]:max-h-[calc(100dvh-24px)] max-[768px]:w-[calc(100vw-24px)] max-[768px]:rounded-[20px]"
        aria-labelledby={`${id}-preview-title`}
        aria-describedby={`${id}-preview-brief`}
        onClose={closePreview}
        onKeyDown={containFocus}
        onPointerDown={(event) => {
          backdropPress.current = event.target === event.currentTarget;
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget && backdropPress.current)
            dialog.current?.close();
        }}
      >
        {selected && (
          <div className="relative">
            <div className="sticky top-0 z-3 flex items-center justify-between gap-4 border-b border-border bg-card py-3 pr-[18px] pl-7 max-[768px]:pl-5 [&>span]:text-[13px] [&>span]:leading-[1.5] [&>span]:text-muted-foreground">
              <span>Pratinjau layanan</span>
              <button
                ref={closeButton}
                type="button"
                className="grid size-10 shrink-0 place-items-center rounded-full transition-[background] duration-200 hover:bg-muted"
                aria-label="Tutup pratinjau"
                onClick={() => dialog.current?.close()}
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <div
              className="@container relative isolate mx-auto mt-7 aspect-[1.48] max-w-[740px] overflow-hidden rounded-2xl max-[992px]:mx-7 max-[768px]:mx-5 max-[768px]:mt-5 max-[480px]:mx-3"
              role="img"
              aria-label={selected.artworkDescription}
            >
              <div aria-hidden="true">
                <ProjectArtwork project={selected} />
              </div>
            </div>
            <div className="grid grid-cols-[1.1fr_1fr] gap-x-12 gap-y-8 px-12 pt-8 pb-9 max-[992px]:gap-x-8 max-[992px]:px-7 max-[768px]:grid-cols-1 max-[768px]:gap-7 max-[768px]:px-6 max-[768px]:py-7 max-[480px]:px-5">
              <div className="[&_h2]:mt-2 [&_h2]:text-[30px] [&_h2]:leading-[1.15] [&_h2]:font-medium [&_h2]:tracking-[-0.04em] [&_h2]:max-[480px]:text-[26px] [&>p]:mt-4 [&>p]:text-sm [&>p]:leading-[1.6] [&>p]:text-muted-foreground">
                <span className="block text-xs leading-[1.5] text-muted-foreground">
                  {selected.format}
                </span>
                <h2 id={`${id}-preview-title`}>{selected.title}</h2>
                <p id={`${id}-preview-brief`}>{selected.brief}</p>
              </div>
              <div className="[&_h3]:mb-4 [&_h3]:text-base [&_h3]:font-medium [&_h3]:tracking-[-0.025em] [&_li]:flex [&_li]:items-start [&_li]:gap-2.5 [&_li]:text-[13px] [&_li]:leading-[1.5] [&_li]:text-muted-foreground [&_svg]:mt-0.5 [&_svg]:shrink-0 [&_svg]:text-foreground [&_ul]:grid [&_ul]:gap-4">
                <h3>Langkah awal.</h3>
                <ul role="list">
                  {selected.checklist.map((item) => (
                    <li key={item}>
                      <Check size={16} strokeWidth={1.5} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-full flex items-center justify-between gap-6 border-t border-border pt-6 max-[768px]:flex-wrap max-[768px]:gap-5 [&_p]:max-w-[260px] [&_p]:text-xs [&_p]:leading-[1.5] [&_p]:text-muted-foreground max-[768px]:[&_p]:max-w-full">
                <p>Contoh lokal. Tanpa akun atau penyimpanan data.</p>
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-transparent bg-foreground px-6 py-3.25 text-base leading-5 font-medium whitespace-nowrap text-background transition-[background,transform,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_12px_#00000014] active:translate-y-0 active:scale-98 max-[480px]:text-sm"
                  href="#workspace"
                  onClick={startWorkspace}
                >
                  Minta konsultasi <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
