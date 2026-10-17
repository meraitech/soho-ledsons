"use client";

import Image from "next/image";
import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { images } from "@/lib/images";
import { useReducedMotion } from "@/lib/motion";

const STEPS = [
  {
    label: "Pembukuan",
    description: "Catat transaksi rutin dengan tertib.",
  },
  {
    label: "Perpajakan",
    description: "Kelola pajak agar patuh dan tepat waktu.",
  },
  {
    label: "Pelaporan",
    description: "Susun laporan siap untuk keputusan.",
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
          ? STEPS.length - 1
          : (selected +
              (event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1) +
              STEPS.length) %
            STEPS.length;
    setSelected(next);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  }

  return (
    <section
      id="workflow"
      className="mx-auto w-full max-w-360 px-14 py-16 [--note-ink:#1c2a4d] [--note-muted:#5a6a8c] [--note:#ffffff] [--scene:#e4eaf6] max-[992px]:px-8 max-[768px]:px-6 max-[768px]:py-11 max-[480px]:px-5 dark:[--note-ink:#e8edf7] dark:[--note-muted:#9fb0cc] dark:[--note:#1f2740] dark:[--scene:#1c2440] data-[reduced=true]:[&_*]:transition-none! motion-reduce:[&_*]:transition-none! [&_:where(button,[tabindex]):focus-visible]:outline-2 [&_:where(button,[tabindex]):focus-visible]:outline-offset-4 [&_:where(button,[tabindex]):focus-visible]:outline-ring"
      aria-labelledby={`${id}-heading`}
      data-reduced={reduced}
    >
      <Reveal>
        <header className="mx-auto max-w-[650px] text-center max-[768px]:max-w-[570px]">
          <h2
            className="mx-auto max-w-[590px] text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
            id={`${id}-heading`}
          >
            Dari catatan rutin jadi laporan siap.
          </h2>
          <p className="mt-6 text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[768px]:mt-5 max-[768px]:text-base">
            Catat dengan tertib. Kelola bersama ahlinya.
          </p>
        </header>
        <div
          className="mx-auto mt-8 mb-10 grid w-[min(100%,470px)] grid-cols-3 gap-1 rounded-[100px] bg-muted p-[5px] max-[768px]:mt-7 max-[768px]:mb-8 max-[480px]:gap-[3px] max-[480px]:p-1"
          role="tablist"
          aria-label="Ikuti alur layanan"
        >
          {STEPS.map((step, index) => (
            <button
              className="flex min-h-11 items-center justify-center gap-3 rounded-[100px] px-4 py-2.5 text-[15px] leading-[1.3] text-muted-foreground transition-[color,background] duration-200 hover:text-foreground aria-selected:bg-card aria-selected:text-foreground aria-selected:shadow-[0_1px_4px_#0000000a] max-[480px]:min-h-[42px] max-[480px]:gap-[7px] max-[480px]:px-2 max-[480px]:text-[13px]"
              key={step.label}
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
              {step.label}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <div
          className="relative isolate h-[520px] min-w-0 overflow-hidden rounded-[32px] bg-(--scene) max-[992px]:h-[480px] max-[768px]:h-[420px] max-[768px]:rounded-3xl"
          id={`${id}-stage`}
          role="tabpanel"
          aria-labelledby={`${id}-step-${selected}`}
          aria-describedby={`${id}-description`}
          tabIndex={0}
        >
          <div
            className="invisible absolute inset-0 opacity-0 transition-[opacity,visibility] duration-250 data-[active=true]:visible data-[active=true]:opacity-100 [&_img]:object-cover"
            data-active={selected === 0}
            aria-hidden={selected !== 0}
            inert={selected !== 0}
          >
            <div className="absolute inset-y-8 left-8 w-[76%] overflow-hidden rounded-[22px] max-[992px]:inset-y-6 max-[992px]:left-6 max-[992px]:w-[78%] max-[992px]:rounded-[20px] max-[768px]:inset-4 max-[768px]:w-auto max-[768px]:rounded-2xl [&_img]:object-[center_57%]">
              <Image
                src={images.chair.src}
                alt={images.chair.alt}
                fill
                sizes="(max-width: 767px) 90vw, (max-width: 1440px) 72vw, 1000px"
              />
            </div>
            <div className="absolute right-12 bottom-12 w-[min(34%,390px)] rounded-[18px] bg-(--note) p-8 text-(--note-ink) shadow-[0_8px_28px_#0000000a] max-[992px]:right-8 max-[992px]:bottom-8 max-[992px]:w-[38%] max-[992px]:p-[26px] max-[768px]:right-6 max-[768px]:bottom-6 max-[768px]:w-[min(66%,320px)] max-[768px]:rounded-2xl max-[768px]:p-6 max-[480px]:inset-x-6 max-[480px]:w-auto max-[480px]:p-[22px] [&>p]:mt-[18px] [&>p]:text-4xl [&>p]:leading-[1.1] [&>p]:font-normal [&>p]:tracking-[-0.045em] max-[992px]:[&>p]:text-[30px] max-[768px]:[&>p]:mt-3.5 max-[480px]:[&>p]:text-[29px] [&>span]:text-sm [&>span]:leading-[1.4] [&>span]:text-(--note-muted)">
              <span>Catatan berjalan</span>
              <p>
                Rapi dicatat.
                <br />
                Mudah ditelusur.
              </p>
            </div>
          </div>

          <div
            className="invisible absolute inset-0 opacity-0 transition-[opacity,visibility] duration-250 data-[active=true]:visible data-[active=true]:opacity-100 [&_img]:object-cover [&>img]:object-[center_48%]"
            data-active={selected === 1}
            aria-hidden={selected !== 1}
            inert={selected !== 1}
          >
            <Image
              src={images.courtyard.src}
              alt={images.courtyard.alt}
              fill
              sizes="(max-width: 1440px) 95vw, 1328px"
            />
            <figure className="absolute right-12 bottom-12 w-[min(38%,390px)] rounded-[20px] bg-(--note) p-7 text-(--note-ink) shadow-[0_8px_28px_#0000000a] max-[992px]:right-8 max-[992px]:bottom-8 max-[992px]:w-[43%] max-[992px]:p-6 max-[768px]:right-6 max-[768px]:bottom-6 max-[768px]:w-[min(76%,330px)] max-[768px]:rounded-2xl max-[768px]:p-[22px] max-[480px]:inset-x-6 max-[480px]:w-auto">
              <figcaption className="flex items-center gap-3 text-[15px] leading-[1.4] font-medium max-[480px]:text-sm">
                <span className="relative size-[38px] shrink-0 overflow-hidden rounded-full bg-muted max-[480px]:size-[34px]">
                  <Image
                    src={images.portraitOne.src}
                    alt=""
                    fill
                    sizes="40px"
                  />
                </span>
                <span>Tim LEDSONS</span>
              </figcaption>
              <blockquote className="mt-[18px] text-[21px] leading-[1.45] tracking-[-0.025em] max-[992px]:text-[19px] max-[768px]:mt-3.5 max-[768px]:text-lg max-[480px]:text-[17px]">
                Pajak beres tepat waktu. Anda fokus ke bisnis.
              </blockquote>
            </figure>
          </div>

          <div
            className="invisible absolute inset-0 opacity-0 transition-[opacity,visibility] duration-250 after:absolute after:inset-0 after:bg-[linear-gradient(90deg,#11190cc7,#11190ca6_60%,#11190c1f)] after:content-[''] data-[active=true]:visible data-[active=true]:opacity-100 max-[768px]:after:bg-[linear-gradient(0deg,#11190ccc,#11190cb3_58%,#11190c14)] [&_img]:object-cover [&>img]:object-[center_53%]"
            data-active={selected === 2}
            aria-hidden={selected !== 2}
            inert={selected !== 2}
          >
            <Image
              src={images.corridor.src}
              alt={images.corridor.alt}
              fill
              sizes="(max-width: 1440px) 95vw, 1328px"
            />
            <div className="absolute inset-x-14 bottom-[52px] z-1 text-white max-[992px]:inset-x-10 max-[992px]:bottom-10 max-[768px]:inset-x-8 max-[768px]:bottom-8 max-[480px]:inset-x-7 max-[480px]:bottom-[30px] [&>span]:text-base [&>span]:leading-[1.5] max-[768px]:[&>span]:text-sm">
              <span>Laporan keuangan</span>
              <h3 className="mt-5 text-[76px] leading-[1.02] font-normal tracking-[-0.055em] max-[992px]:text-[64px] max-[768px]:text-[56px] max-[480px]:mt-4 max-[480px]:text-[46px]">
                Siap untuk
                <br />
                keputusan.
              </h3>
              <p className="mt-5 max-w-[330px] text-base leading-[1.5] max-[768px]:text-sm max-[480px]:mt-[18px] max-[480px]:max-w-[220px]">
                Jelas, terstruktur, sesuai standar.
              </p>
            </div>
          </div>
        </div>
        <p
          className="mx-auto mt-5 min-h-[42px] max-w-[620px] text-center text-sm leading-[1.5] text-muted-foreground"
          id={`${id}-description`}
          role="status"
          aria-atomic="true"
        >
          {STEPS[selected]!.description}
        </p>
      </Reveal>
    </section>
  );
}
