"use client";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";

const LINKS = [
  { label: "Tentang", id: "tentang" },
  { label: "Layanan", id: "layanan" },
  { label: "Kenapa Ledsons", id: "kenapa" },
  { label: "Klien", id: "klien" },
  { label: "Kontak", id: "kontak" },
] as const;

type CloseIntent =
  { reason: "dismiss" | "resize" } | { reason: "navigate"; target: string };

function focusSection(id: string): void {
  const section = document.getElementById(id);
  const target = section?.querySelector<HTMLElement>("h1, h2") ?? section;
  if (!target) return;
  if (!target.hasAttribute("tabindex")) {
    target.tabIndex = -1;
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
      once: true,
    });
  }
  target.focus({ preventScroll: true });
}

export function Nav(): ReactNode {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const desktopNav = useRef<HTMLElement>(null);
  const homeLink = useRef<HTMLAnchorElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeIntent = useRef<CloseIntent>({ reason: "dismiss" });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const sections = LINKS.map((link) =>
      document.getElementById(link.id)
    ).filter((section): section is HTMLElement => section !== null);
    let frame = 0;
    const check = (): void => {
      frame = 0;
      const line = (header.current?.getBoundingClientRect().bottom ?? 72) + 25;
      const current = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= line && bounds.bottom > line;
      });
      setScrolled(window.scrollY > 16);
      setActive(current?.id ?? "");
    };
    const queueCheck = (): void => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    const observer = new ResizeObserver(queueCheck);
    sections.forEach((section) => observer.observe(section));
    queueCheck();
    window.addEventListener("scroll", queueCheck, { passive: true });
    window.addEventListener("resize", queueCheck);
    window.addEventListener("hashchange", queueCheck);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueCheck);
      window.removeEventListener("resize", queueCheck);
      window.removeEventListener("hashchange", queueCheck);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const query = window.matchMedia("(min-width: 768px)");
    const closeOnResize = (): void => {
      if (query.matches) {
        closeIntent.current = { reason: "resize" };
        dialog.current?.close();
      }
    };
    query.addEventListener("change", closeOnResize);
    return () => {
      document.body.style.overflow = previous;
      query.removeEventListener("change", closeOnResize);
    };
  }, [open]);
  function close(): void {
    closeIntent.current = { reason: "dismiss" };
    dialog.current?.close();
  }
  function closeForNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    target: string
  ): void {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    closeIntent.current = { reason: "navigate", target };
    dialog.current?.close();
  }
  return (
    <>
      <header
        ref={header}
        className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/88 backdrop-blur-[24px] transition-shadow duration-200 data-scrolled:shadow-(--soft-shadow)"
        data-scrolled={scrolled || undefined}
      >
        <div
          className={`mx-auto flex h-(--header-height) w-full max-w-360 items-center gap-8 px-14 max-[1200px]:gap-5 max-[992px]:gap-4 max-[992px]:px-8 max-[768px]:h-18 max-[768px]:px-6 max-[480px]:px-5`}
        >
          <a
            ref={homeLink}
            className="flex border-r border-border pr-8 max-[1200px]:pr-5 max-[992px]:border-0 max-[992px]:p-0"
            href="#top"
            aria-label="Beranda KJA PT LEDSONS SOLUSI BISNIS"
          >
            <Logo />
          </a>
          <nav
            ref={desktopNav}
            className="flex items-center gap-7 text-base leading-normal tracking-[-0.025em] text-muted-foreground max-[1200px]:gap-5 max-[1200px]:text-sm max-[992px]:gap-3.5 max-[992px]:text-[13px] max-[768px]:hidden [&_a]:relative [&_a]:py-2 [&_a]:whitespace-nowrap [&_a]:transition-colors [&_a]:duration-200 [&_a::after]:absolute [&_a::after]:inset-x-0 [&_a::after]:bottom-0.75 [&_a::after]:h-px [&_a::after]:origin-left [&_a::after]:scale-x-0 [&_a::after]:bg-current [&_a::after]:transition-transform [&_a::after]:duration-250 [&_a::after]:content-[''] [&_a:hover]:text-foreground [&_a:hover::after]:scale-x-100 [&_a[aria-current]]:text-foreground [&_a[aria-current]::after]:scale-x-100"
            aria-label="Navigasi utama"
          >
            {LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active === link.id ? "location" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#kontak"
            className={`ml-auto inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-base leading-5 font-medium whitespace-nowrap text-foreground transition-[background,transform,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-muted hover:shadow-[0_5px_12px_#00000014] active:translate-y-0 active:scale-98 max-[1200px]:text-sm max-[768px]:hidden max-[480px]:text-sm max-[992px]:[&_svg]:hidden`}
          >
            Konsultasi <ArrowUpRight size={15} strokeWidth={1.5} />
          </a>
          <button
            className="ml-auto hidden rounded-full p-2 max-[768px]:flex"
            ref={trigger}
            type="button"
            aria-label="Buka navigasi"
            aria-expanded={open}
            onClick={() => {
              closeIntent.current = { reason: "dismiss" };
              dialog.current?.showModal();
              setOpen(true);
            }}
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>
      <dialog
        ref={dialog}
        className="fixed top-3 mx-auto my-0 max-h-[calc(100svh-24px)] w-[calc(100%-24px)] max-w-135 overflow-y-auto rounded-3xl border border-border bg-card p-6 text-foreground backdrop:bg-black/40 backdrop:backdrop-blur-[8px] [&_nav_a]:flex [&_nav_a]:items-center [&_nav_a]:gap-4 [&_nav_a]:border-b [&_nav_a]:border-border [&_nav_a]:py-5 [&_nav_a]:text-[25px] [&_nav_a]:tracking-[-0.03em] [&_nav_a_span]:font-sans [&_nav_a_span]:text-[10px] [&_nav_a_span]:leading-[normal] [&_nav_a_span]:text-muted-foreground [&_nav_a_svg]:ml-auto [&_p]:mt-8 [&_p]:mb-5 [&_p]:text-muted-foreground"
        aria-labelledby="mobile-menu-title"
        onClose={() => {
          setOpen(false);
          const intent = closeIntent.current;
          closeIntent.current = { reason: "dismiss" };
          if (intent.reason === "navigate") {
            focusSection(intent.target);
          } else if (
            intent.reason === "resize" ||
            window.matchMedia("(min-width: 768px)").matches
          ) {
            const destination =
              desktopNav.current?.querySelector<HTMLAnchorElement>(
                'a[aria-current="location"]'
              ) ?? homeLink.current;
            destination?.focus({ preventScroll: true });
          } else {
            trigger.current?.focus({ preventScroll: true });
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="mb-8 flex items-center justify-between [&_button]:rounded-full [&_button]:p-2.5">
          <span id="mobile-menu-title">
            <Logo />
          </span>
          <button type="button" aria-label="Tutup navigasi" onClick={close}>
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        <nav aria-label="Navigasi seluler">
          {LINKS.map((link, index) => (
            <a
              href={`#${link.id}`}
              key={link.id}
              onClick={(event) => closeForNavigation(event, link.id)}
            >
              <span>0{index + 1}</span>
              {link.label}
              <ArrowUpRight size={22} strokeWidth={1.5} />
            </a>
          ))}
        </nav>
        <p>
          Kantor Jasa Akuntan.
          <br />
          Mitra solusi bisnis terpercaya Anda.
        </p>
        <a
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-transparent bg-foreground px-6 py-3.25 text-base leading-5 font-medium whitespace-nowrap text-background transition-[background,transform,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_12px_#00000014] active:translate-y-0 active:scale-98 max-[480px]:text-sm"
          href="#kontak"
          onClick={(event) => closeForNavigation(event, "kontak")}
        >
          Hubungi kami <ArrowUpRight size={16} strokeWidth={1.5} />
        </a>
      </dialog>
    </>
  );
}
