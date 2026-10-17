import { ArrowUpRight, ArrowUp } from "lucide-react";
import { Logo } from "@/components/logo";
import type { ReactNode } from "react";

export function Footer(): ReactNode {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-360 px-14 max-[992px]:px-8 max-[768px]:px-6 max-[480px]:px-5">
        <div className="grid grid-cols-[2fr_1fr_1fr] gap-16 py-16 max-[992px]:gap-8 max-[768px]:grid-cols-2 max-[768px]:gap-x-6 max-[768px]:gap-y-10 max-[768px]:py-12 [&_a_svg]:transition-transform [&_a_svg]:duration-200 [&_h2]:mb-2 [&_h2]:text-[13px] [&_h2]:text-muted-foreground [&_nav]:flex [&_nav]:flex-col [&_nav]:items-start [&_nav]:gap-3 [&_nav]:text-[15px] [&_nav_a]:inline-flex [&_nav_a]:items-center [&_nav_a]:gap-2 [&_nav_a:hover_svg]:translate-x-0.5 [&_nav_a:hover_svg]:-translate-y-0.5">
          <div className="max-[768px]:col-span-full [&_p]:mt-5 [&_p]:text-base [&_p]:text-muted-foreground">
            <a href="#top" aria-label="Beranda LEDSONS">
              <Logo />
            </a>
            <p>Mitra solusi bisnis terpercaya Anda.</p>
          </div>
          <nav aria-label="Navigasi footer">
            <h2>Jelajahi</h2>
            <a href="#together">
              Tentang <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
            <a href="#why">
              Kenapa kami <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
            <a href="#features">
              Layanan <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
            <a href="#workflow">
              Alur kerja <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
            <a href="#who">
              Sektor usaha <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
          </nav>
          <nav aria-label="Mulai dari sini">
            <h2>Mulai</h2>
            <a href="#library">
              Pilih layanan <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
            <a href="#plans">
              Paket <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
            <a href="#workspace">
              Kontak <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
            <a href="#faq">
              FAQ <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
            <a href="#start">
              Mulai <ArrowUpRight size={13} strokeWidth={1.5} />
            </a>
          </nav>
        </div>
        <div className="flex items-center justify-between gap-5 border-t border-border pt-6 pb-8 text-xs leading-normal text-muted-foreground max-[768px]:flex-wrap max-[768px]:pb-20 [&_a]:inline-flex [&_a]:items-center [&_a]:gap-2 [&_a]:text-foreground max-[768px]:[&>span:nth-child(2)]:order-3 max-[768px]:[&>span:nth-child(2)]:basis-full">
          <span>© {new Date().getFullYear()} LEDSONS Solusi Bisnis</span>
          <a href="#top">
            Kembali ke atas <ArrowUp size={14} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
