"use client";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, Layers3, Plus, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { softEase, useReducedMotion } from "@/lib/motion";
import { faqs } from "@/lib/faqs";
import {
  WORKSPACE_CHOICE_EVENT,
  type WorkspaceKind,
} from "@/lib/workspace-choice";

export function Workspace(): ReactNode {
  const id = useId();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [kind, setKind] = useState<WorkspaceKind>("together");
  const [created, setCreated] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const nextAction = useRef<HTMLAnchorElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const wasCreated = useRef(false);
  useEffect(() => {
    const choose = (event: Event): void => {
      const choice = (event as CustomEvent<unknown>).detail;
      if (choice === "solo" || choice === "together") {
        setKind(choice);
        setCreated(null);
      }
    };
    window.addEventListener(WORKSPACE_CHOICE_EVENT, choose);
    return () => window.removeEventListener(WORKSPACE_CHOICE_EVENT, choose);
  }, []);
  useEffect(() => {
    if (created !== null) {
      nextAction.current?.focus({ preventScroll: true });
      wasCreated.current = true;
    } else if (wasCreated.current) {
      firstInput.current?.focus({ preventScroll: true });
      wasCreated.current = false;
    }
  }, [created]);
  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setCreated(String(data.get("workspace")).trim());
  }
  return (
    <section
      id="workspace"
      className={`mx-auto grid w-full max-w-360 grid-cols-2 items-start gap-x-28 gap-y-14 px-14 pt-16 pb-24 max-[1200px]:gap-12 max-[992px]:grid-cols-1 max-[992px]:gap-10 max-[992px]:px-8 max-[992px]:py-18 max-[768px]:px-6 max-[480px]:px-5`}
      aria-labelledby="workspace-heading"
    >
      <Reveal className="col-start-1 row-start-1 max-[992px]:row-auto [&_p]:mt-6 [&_p]:max-w-102.5">
        <h2
          id="workspace-heading"
          className="text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
        >
          Ceritakan kebutuhan
          <br />
          bisnis Anda.
        </h2>
        <p className="text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[768px]:text-base">
          Isi singkat.
          <br />
          Kami hubungi kembali.
        </p>
      </Reveal>
      <Reveal className="col-start-2 row-span-2 row-start-1 rounded-[40px] border border-[#a9bede] bg-[#cfdcf5] p-3 max-[992px]:col-start-1 max-[992px]:row-auto max-[992px]:w-full max-[992px]:max-w-140 max-[992px]:justify-self-center max-[992px]:rounded-[32px] max-[992px]:p-2 dark:border-[#3a4d78] dark:bg-[#27334f]">
        <div className="min-h-165.5 rounded-[30px] border border-border bg-card px-11 py-10 max-[1200px]:px-7 max-[1200px]:py-8 max-[992px]:rounded-3xl max-[992px]:p-8 max-[480px]:min-h-160 max-[480px]:px-4.5 max-[480px]:py-7">
          {created !== null ? (
            <div
              className="flex min-h-145 flex-col items-center justify-center gap-6 text-center max-[480px]:min-h-145.5 max-[480px]:[&_a]:text-xs [&_h3]:max-w-full [&_h3]:text-[38px] [&_h3]:leading-[1.15] [&_h3]:tracking-[-0.04em] [&_h3]:wrap-anywhere max-[480px]:[&_h3]:text-[32px] [&>small]:text-[10px] [&>small]:text-muted-foreground"
              role="status"
            >
              <span className="grid size-18 place-items-center rounded-3xl bg-muted">
                <Check size={30} strokeWidth={1.5} />
              </span>
              <p className="font-sans text-[9px] leading-[normal] tracking-[0.06em] text-muted-foreground">
                PERMINTAAN DITERIMA
              </p>
              <h3>{created}</h3>
              <p className="text-[15px] leading-normal text-muted-foreground">
                Terima kasih.
                <br />
                Kami hubungi Anda kembali.
              </p>
              <div className="flex w-full items-center gap-3 rounded-2xl bg-muted px-3.5 py-5 text-left text-[13px] [&_small]:mt-0.75 [&_small]:block [&_small]:text-[10px] [&_small]:text-muted-foreground [&_svg]:shrink-0 [&>span]:min-w-0 [&>span]:flex-1 [&>span]:wrap-anywhere">
                <Layers3 size={22} strokeWidth={1.5} />
                <span>
                  {created}
                  <small>
                    {kind === "together"
                      ? "Pendampingan rutin · kami hubungi"
                      : "Konsultasi awal · kami hubungi"}
                  </small>
                </span>
                <Check size={16} strokeWidth={1.5} />
              </div>
              <a
                ref={nextAction}
                href="#features"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-transparent bg-foreground px-6 py-3.25 text-base leading-5 font-medium whitespace-nowrap text-background transition-[background,transform,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_12px_#00000014] active:translate-y-0 active:scale-98 max-[480px]:text-sm"
              >
                Lihat layanan <ArrowUpRight size={16} strokeWidth={1.5} />
              </a>
              <button
                type="button"
                className="text-[13px] text-muted-foreground underline underline-offset-4"
                onClick={() => setCreated(null)}
              >
                Kirim yang lain
              </button>
              <small>Pratinjau lokal. Data tidak dikirim ke server.</small>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="flex flex-col gap-5 [&>button]:mt-1 [&>button]:self-center [&>h3]:text-center [&>h3]:text-[28px] [&>h3]:leading-[1.2] [&>h3]:font-medium [&>h3]:tracking-[-0.03em] max-[992px]:[&>h3]:text-[26px]"
            >
              <span className="mx-auto grid size-11 place-items-center rounded-[14px] bg-muted">
                <Layers3 size={24} strokeWidth={1.5} />
              </span>
              <h3>
                Minta dihubungi.
                <br />
                Kami respons cepat.
              </h3>
              <p className="-mt-2 text-center text-[13px] text-muted-foreground">
                Contoh lokal, tanpa akun.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-2 text-[13px] leading-normal font-medium max-[480px]:text-xs">
                  <span>Nama depan</span>
                  <input
                    className="h-11.5 w-full min-w-0 rounded-full border border-transparent bg-muted px-4.5 py-3 text-sm leading-normal font-normal text-foreground transition-[border-color] duration-200 placeholder:text-muted-foreground hover:border-border max-[992px]:text-base max-[480px]:px-3.5"
                    ref={firstInput}
                    name="name"
                    autoComplete="given-name"
                    placeholder="Nama depan"
                    required
                    maxLength={60}
                  />
                </label>
                <label className="flex flex-col gap-2 text-[13px] leading-normal font-medium max-[480px]:text-xs">
                  <span>Nama belakang</span>
                  <input
                    className="h-11.5 w-full min-w-0 rounded-full border border-transparent bg-muted px-4.5 py-3 text-sm leading-normal font-normal text-foreground transition-[border-color] duration-200 placeholder:text-muted-foreground hover:border-border max-[992px]:text-base max-[480px]:px-3.5"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Nama belakang"
                    maxLength={60}
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2 text-[13px] leading-normal font-medium max-[480px]:text-xs">
                <span>Email</span>
                <input
                  className="h-11.5 w-full min-w-0 rounded-full border border-transparent bg-muted px-4.5 py-3 text-sm leading-normal font-normal text-foreground transition-[border-color] duration-200 placeholder:text-muted-foreground hover:border-border max-[992px]:text-base max-[480px]:px-3.5"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nama@perusahaan.com"
                  required
                  maxLength={254}
                />
              </label>
              <label className="flex flex-col gap-2 text-[13px] leading-normal font-medium max-[480px]:text-xs">
                <span>Nama perusahaan</span>
                <input
                  className="h-11.5 w-full min-w-0 rounded-full border border-transparent bg-muted px-4.5 py-3 text-sm leading-normal font-normal text-foreground transition-[border-color] duration-200 placeholder:text-muted-foreground hover:border-border max-[992px]:text-base max-[480px]:px-3.5"
                  name="workspace"
                  placeholder="PT / CV / usaha Anda"
                  required
                  minLength={2}
                  maxLength={48}
                  pattern={".*\\S.*"}
                />
              </label>
              <fieldset className="grid gap-2.5">
                <legend className="mb-2.5 text-[13px] leading-normal font-medium max-[480px]:text-xs">
                  Kebutuhan Anda?
                </legend>
                <label className="relative flex cursor-pointer flex-row items-center gap-2 rounded-full border border-transparent bg-muted px-4 py-3 text-xs leading-normal font-normal text-muted-foreground transition-[border-color,color] duration-200 has-checked:border-[color-mix(in_srgb,var(--foreground)_30%,var(--border))] has-checked:text-foreground has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-ring max-[992px]:px-3 max-[992px]:text-[11px] max-[480px]:text-[10px]">
                  <input
                    className="peer absolute size-px opacity-0"
                    type="radio"
                    name="kind"
                    value="solo"
                    checked={kind === "solo"}
                    onChange={() => setKind("solo")}
                  />
                  <span className="block size-3 shrink-0 rounded-full border border-border bg-card peer-checked:bg-foreground peer-checked:shadow-[inset_0_0_0_3px_var(--card)]" />
                  Konsultasi awal, gratis penjajakan
                </label>
                <label className="relative flex cursor-pointer flex-row items-center gap-2 rounded-full border border-transparent bg-muted px-4 py-3 text-xs leading-normal font-normal text-muted-foreground transition-[border-color,color] duration-200 has-checked:border-[color-mix(in_srgb,var(--foreground)_30%,var(--border))] has-checked:text-foreground has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-ring max-[992px]:px-3 max-[992px]:text-[11px] max-[480px]:text-[10px]">
                  <input
                    className="peer absolute size-px opacity-0"
                    type="radio"
                    name="kind"
                    value="together"
                    checked={kind === "together"}
                    onChange={() => setKind("together")}
                  />
                  <span className="block size-3 shrink-0 rounded-full border border-border bg-card peer-checked:bg-foreground peer-checked:shadow-[inset_0_0_0_3px_var(--card)]" />
                  Pendampingan rutin bulanan
                </label>
              </fieldset>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-transparent bg-foreground px-6 py-3.25 text-base leading-5 font-medium whitespace-nowrap text-background transition-[background,transform,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_12px_#00000014] active:translate-y-0 active:scale-98 max-[480px]:text-sm"
              >
                Kirim permintaan <ArrowUpRight size={16} strokeWidth={1.5} />
              </button>
              <p className="-mt-2 text-center text-[10px] text-muted-foreground">
                Pratinjau lokal. Tanpa email terkirim, tanpa akun.
              </p>
            </form>
          )}
        </div>
      </Reveal>
      <div
        id="faq"
        className="col-start-1 row-start-2 self-end max-[992px]:row-auto"
        aria-label="Pertanyaan umum"
      >
        {faqs.map((item, index) => (
          <div
            className="border-b border-border [&_h3_button]:flex [&_h3_button]:w-full [&_h3_button]:items-center [&_h3_button]:justify-between [&_h3_button]:gap-5 [&_h3_button]:py-5.75 [&_h3_button]:text-left [&_h3_button]:text-lg [&_h3_button]:leading-[1.4] [&_h3_button]:tracking-[-0.025em] [&_h3_button]:text-muted-foreground [&_h3_button]:transition-colors [&_h3_button]:duration-200 max-[1200px]:[&_h3_button]:text-base max-[992px]:[&_h3_button]:text-[17px] [&_h3_button:hover]:text-foreground [&_h3_button[aria-expanded=true]]:text-foreground [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300"
            key={item.question}
          >
            <h3>
              <button
                id={`${id}-q-${index}`}
                type="button"
                aria-expanded={expanded === index}
                aria-controls={`${id}-a-${index}`}
                onClick={() => setExpanded(expanded === index ? null : index)}
              >
                {item.question}
                <Plus
                  size={20}
                  strokeWidth={1.5}
                  className={expanded === index ? "rotate-45" : "rotate-0"}
                />
              </button>
            </h3>
            <motion.div
              id={`${id}-a-${index}`}
              role="region"
              aria-labelledby={`${id}-q-${index}`}
              aria-hidden={expanded !== index}
              inert={expanded !== index}
              initial={false}
              animate={{
                height: expanded === index ? "auto" : 0,
                opacity: expanded === index ? 1 : 0,
              }}
              transition={{ duration: reduced ? 0 : 0.3, ease: softEase }}
              className="overflow-hidden [&_p]:pr-6 [&_p]:pb-6 [&_p]:text-[15px] [&_p]:leading-[1.6] [&_p]:text-muted-foreground"
            >
              <p>{item.answer}</p>
            </motion.div>
          </div>
        ))}
        <div className="mt-6 flex items-center gap-2.5 text-[11px] text-muted-foreground">
          <Users size={16} strokeWidth={1.5} />
          <span>Bermanfaat bagi setiap pemangku kepentingan.</span>
        </div>
      </div>
    </section>
  );
}
