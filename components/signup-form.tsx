"use client";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { ArrowUpRight, Check } from "lucide-react";

export function SignupForm(): ReactNode {
  const id = useId();
  const [complete, setComplete] = useState(false);
  const nextAction = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (complete) nextAction.current?.focus({ preventScroll: true });
  }, [complete]);
  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setComplete(true);
  }
  return (
    <div className="w-full max-w-130">
      {complete ? (
        <div
          className="flex min-h-12 flex-wrap items-center gap-3 rounded-2xl border border-border px-4 py-2.5 text-sm leading-normal [&_a]:ml-auto"
          role="status"
        >
          <Check size={18} strokeWidth={1.5} />
          <span>Siap. Silakan lanjut ke kontak atau layanan.</span>
          <a
            ref={nextAction}
            href="#kontak"
            className="inline-flex items-center gap-1.5 underline underline-offset-4 [&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5"
          >
            Hubungi kami <ArrowUpRight size={15} strokeWidth={1.5} />
          </a>
        </div>
      ) : (
        <form
          className="flex w-full items-center gap-3 max-[480px]:flex-col max-[480px]:items-stretch max-[480px]:gap-2.5 min-[768px]:max-[992px]:flex-wrap [&_button]:px-5 [&_input]:h-12 [&_input]:min-w-0 [&_input]:flex-1 [&_input]:rounded-full [&_input]:border [&_input]:border-transparent [&_input]:bg-muted [&_input]:px-5 [&_input]:py-3 [&_input]:text-base [&_input]:text-foreground [&_input]:transition-[border-color] [&_input]:duration-200 max-[480px]:[&_input]:w-full max-[480px]:[&_input]:flex-auto min-[768px]:max-[992px]:[&_input]:basis-full [&_input::placeholder]:text-muted-foreground [&_input:hover]:border-border"
          onSubmit={submit}
        >
          <label className="sr-only" htmlFor={id}>
            Alamat email Anda
          </label>
          <input
            id={id}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email perusahaan Anda"
            required
            maxLength={254}
            aria-describedby={`${id}-note`}
          />
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-transparent bg-foreground px-6 py-3.25 text-base leading-5 font-medium whitespace-nowrap text-background transition-[background,transform,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_12px_#00000014] active:translate-y-0 active:scale-98 max-[480px]:text-sm"
            type="submit"
          >
            Minta dihubungi <ArrowUpRight size={16} strokeWidth={1.5} />
          </button>
        </form>
      )}
      <p
        id={`${id}-note`}
        className="mt-3 text-[11px] leading-normal text-muted-foreground max-[480px]:text-center max-[480px]:text-[10px]"
      >
        Pratinjau lokal. Tidak ada akun dibuat, tidak ada email terkirim.
      </p>
    </div>
  );
}
