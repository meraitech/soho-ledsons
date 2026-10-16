import Link from "next/link";
import { Logo } from "@/components/logo";
import type { ReactNode } from "react";
export default function NotFound(): ReactNode {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-svh w-full max-w-360 flex-col items-center justify-center gap-7 px-14 text-center max-[992px]:px-8 max-[768px]:px-6 max-[480px]:px-5"
    >
      <Logo />
      <p className="mt-6 text-muted-foreground">
        404 / Halaman tidak ditemukan
      </p>
      <h1 className="text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]">
        Halaman yang Anda cari
        <br />
        tidak tersedia.
      </h1>
      <Link
        href="/"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-transparent bg-foreground px-6 py-3.25 text-base leading-5 font-medium whitespace-nowrap text-background transition-[background,transform,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_12px_#00000014] active:translate-y-0 active:scale-98 max-[480px]:text-sm"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
