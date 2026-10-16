"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { useReducedMotion } from "@/lib/motion";

const TABS = [
  {
    label: "Visi",
    title: "Visi perusahaan",
    body: "KJA PT LEDSONS SOLUSI BISNIS merupakan konsultan yang berlandaskan visi untuk memanfaatkan ilmu pengetahuan dan keahlian yang dimiliki guna memberikan nilai tambah bagi kemajuan klien serta lingkungan masyarakat secara luas. Sebagai salah satu Kantor Jasa Akuntan yang memiliki reputasi baik, berintegritas tinggi, profesional, dan independen, kami menjalankan setiap penugasan dengan mengacu pada ketentuan yang berlaku serta prinsip akuntansi yang berterima umum.",
  },
  {
    label: "Misi",
    title: "Misi perusahaan",
    body: "1. Turut berkontribusi dalam pembangunan negara melalui penerapan profesionalisme dan independensi sesuai ketentuan dan standar yang berlaku. 2. Memberikan jasa dengan kualitas terbaik sehingga memberikan manfaat nyata bagi para pemangku kepentingan. 3. Memperluas jaringan melalui kerja sama strategis dengan mitra yang relevan dan institusi sejenis. 4. Mengembangkan kompetensi profesional melalui personnel assessment, pendidikan berkelanjutan, serta pelatihan internal maupun eksternal. 5. Mengoptimalkan penggunaan teknologi informasi untuk meningkatkan akurasi dan efektivitas. 6. Memberikan kesempatan bagi mahasiswa atau akuntan pemula untuk menerapkan ilmu secara nyata melalui program pembinaan.",
  },
  {
    label: "Prinsip",
    title: "Cara kami bekerja",
    body: "Setiap penugasan dilaksanakan secara independen dan objektif, mengacu pada ketentuan yang berlaku serta prinsip akuntansi yang berterima umum — sehingga mampu memberikan manfaat dan kepercayaan bagi para pengguna jasa. Komitmen kami: hasil yang konsisten, tepat waktu, dan akurat.",
  },
] as const;

export function Workflow(): ReactNode {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();

  function moveStep(event: KeyboardEvent<HTMLButtonElement>): void {
    if (
      ![
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Home",
        "End",
      ].includes(event.key)
    )
      return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? TABS.length - 1
          : (selected +
              (event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1) +
              TABS.length) %
            TABS.length;
    setSelected(next);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  }

  return (
    <section
      id="visi-misi"
      className="mx-auto w-full max-w-360 px-14 py-16 max-[992px]:px-8 max-[768px]:px-6 max-[768px]:py-11 max-[480px]:px-5"
      aria-labelledby={`${id}-heading`}
      data-reduced={reduced}
    >
      <Reveal>
        <header className="mx-auto max-w-[680px] text-center max-[768px]:max-w-[570px]">
          <p className="mb-3 text-[12px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            Visi & Misi
          </p>
          <h2
            className="mx-auto max-w-[620px] text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
            id={`${id}-heading`}
          >
            Landasan yang menjaga kualitas kerja kami.
          </h2>
          <p className="mt-6 text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[768px]:mt-5 max-[768px]:text-base">
            Profesionalisme dan independensi di setiap penugasan.
          </p>
        </header>
        <div
          className="mx-auto mt-8 mb-10 grid w-[min(100%,470px)] grid-cols-3 gap-1 rounded-[100px] bg-muted p-[5px] max-[768px]:mt-7 max-[768px]:mb-8 max-[480px]:gap-[3px] max-[480px]:p-1"
          role="tablist"
          aria-label="Visi, misi, dan prinsip kerja"
        >
          {TABS.map((tab, index) => (
            <button
              className="flex min-h-11 items-center justify-center gap-3 rounded-[100px] px-4 py-2.5 text-[15px] leading-[1.3] text-muted-foreground transition-[color,background] duration-200 hover:text-foreground aria-selected:bg-card aria-selected:text-foreground aria-selected:shadow-[0_1px_4px_#0000000a] max-[480px]:min-h-[42px] max-[480px]:gap-[7px] max-[480px]:px-2 max-[480px]:text-[13px]"
              key={tab.label}
              type="button"
              role="tab"
              id={`${id}-step-${index}`}
              aria-controls={`${id}-stage`}
              aria-selected={selected === index}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={moveStep}
            >
              <span
                className="text-xs leading-[inherit] tabular-nums"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
              {tab.label}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div
          className="relative isolate min-h-[320px] overflow-hidden rounded-[32px] border border-border bg-card p-10 max-[992px]:p-8 max-[768px]:rounded-3xl max-[768px]:p-7 max-[480px]:p-6"
          id={`${id}-stage`}
          role="tabpanel"
          aria-labelledby={`${id}-step-${selected}`}
          tabIndex={0}
        >
          <p className="text-[12px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            0{selected + 1} — {TABS[selected]!.label}
          </p>
          <h3 className="mt-3 max-w-[560px] text-[32px] leading-[1.15] font-medium tracking-[-0.035em] max-[768px]:text-[28px] max-[480px]:text-2xl">
            {TABS[selected]!.title}
          </h3>
          <p className="mt-5 max-w-[860px] text-[15px] leading-[1.75] text-muted-foreground">
            {TABS[selected]!.body}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
