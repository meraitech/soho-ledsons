"use client";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Plus,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { softEase, useReducedMotion } from "@/lib/motion";
import { faqs } from "@/lib/faqs";
import { siteConfig } from "@/lib/metadata";

export function Workspace(): ReactNode {
  const id = useId();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [sent, setSent] = useState<string | null>(null);
  const reduced = useReducedMotion();

  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSent(String(data.get("nama")).trim());
  }

  return (
    <section
      id="kontak"
      className={`mx-auto grid w-full max-w-360 grid-cols-2 items-start gap-x-28 gap-y-14 px-14 pt-16 pb-24 max-[1200px]:gap-12 max-[992px]:grid-cols-1 max-[992px]:gap-10 max-[992px]:px-8 max-[992px]:py-18 max-[768px]:px-6 max-[480px]:px-5`}
      aria-labelledby="kontak-heading"
    >
      <Reveal className="col-start-1 row-start-1 max-[992px]:row-auto [&_p]:mt-6 [&_p]:max-w-102.5">
        <p className="mb-3 text-[12px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
          Kontak
        </p>
        <h2
          id="kontak-heading"
          className="text-[clamp(36px,3.4vw,48px)] leading-[1.2] font-normal tracking-[-0.035em] text-balance max-[992px]:text-[42px] max-[768px]:text-[38px] max-[480px]:text-[34px]"
        >
          Mari diskusikan
          <br />
          kebutuhan bisnis Anda.
        </h2>
        <p className="text-lg leading-normal tracking-[-0.025em] text-pretty text-muted-foreground max-[768px]:text-base">
          Tim kecil namun berdedikasi kami siap mendampingi — dari keuangan,
          perpajakan, hingga penguatan sistem bisnis Anda.
        </p>

        <div className="mt-8 grid gap-4">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-transform duration-200 hover:-translate-y-0.5"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-muted">
              <Mail size={20} strokeWidth={1.5} />
            </span>
            <span>
              <span className="block text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                Email
              </span>
              <span className="mt-1 block text-[15px] font-medium break-all">
                {siteConfig.contact.email}
              </span>
            </span>
          </a>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-muted">
              <Phone size={20} strokeWidth={1.5} />
            </span>
            <span>
              <span className="block text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                Telepon
              </span>
              <span className="mt-1 block text-[15px] font-medium">
                {siteConfig.contact.phone1}
              </span>
              <span className="mt-0.5 block text-[15px] font-medium">
                {siteConfig.contact.phone2}
              </span>
            </span>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-muted">
              <MapPin size={20} strokeWidth={1.5} />
            </span>
            <span>
              <span className="block text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                Alamat
              </span>
              <span className="mt-1 block text-[15px] leading-relaxed font-medium">
                {siteConfig.contact.address}
              </span>
            </span>
          </div>
          <p className="flex items-center gap-2.5 text-[12px] text-muted-foreground">
            <Clock3 size={15} strokeWidth={1.5} />
            <span>Senin–Jumat, jam kerja. Respons maksimal 1×24 jam.</span>
          </p>
        </div>
      </Reveal>

      <Reveal className="col-start-2 row-span-2 row-start-1 rounded-[40px] border border-[#c8d0be] bg-[#d9dfd1] p-3 max-[992px]:col-start-1 max-[992px]:row-auto max-[992px]:w-full max-[992px]:max-w-140 max-[992px]:justify-self-center max-[992px]:rounded-[32px] max-[992px]:p-2 dark:border-[#4f5e49] dark:bg-[#3b4539]">
        <div className="min-h-165.5 rounded-[30px] border border-border bg-card px-11 py-10 max-[1200px]:px-7 max-[1200px]:py-8 max-[992px]:rounded-3xl max-[992px]:p-8 max-[480px]:min-h-160 max-[480px]:px-4.5 max-[480px]:py-7">
          {sent !== null ? (
            <div
              className="flex min-h-145 flex-col items-center justify-center gap-6 text-center max-[480px]:min-h-145.5 [&_h3]:max-w-full [&_h3]:text-[32px] [&_h3]:leading-[1.15] [&_h3]:tracking-[-0.04em] max-[480px]:[&_h3]:text-[28px] [&>small]:text-[10px] [&>small]:text-muted-foreground"
              role="status"
            >
              <span className="grid size-18 place-items-center rounded-3xl bg-muted">
                <Check size={30} strokeWidth={1.5} />
              </span>
              <p className="font-sans text-[9px] leading-[normal] tracking-[0.06em] text-muted-foreground">
                PERMINTAAN DITERIMA
              </p>
              <h3>Terima kasih{sent ? `, ${sent}` : ""}.</h3>
              <p className="text-[15px] leading-normal text-muted-foreground">
                Tim kami akan menghubungi Anda melalui email atau telepon.
                <br />
                Untuk respons cepat, hubungi {siteConfig.contact.phone2}.
              </p>
              <button
                type="button"
                className="text-[13px] text-muted-foreground underline underline-offset-4"
                onClick={() => setSent(null)}
              >
                Kirim permintaan lain
              </button>
              <small>
                Formulir demo lokal. Data tidak dikirim ke server — hubungi
                email/telepon di samping untuk komunikasi resmi.
              </small>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="flex flex-col gap-5 [&>button]:mt-1 [&>button]:self-center [&>h3]:text-center [&>h3]:text-[28px] [&>h3]:leading-[1.2] [&>h3]:font-medium [&>h3]:tracking-[-0.03em] max-[992px]:[&>h3]:text-[26px]"
            >
              <h3>
                Minta konsultasi.
                <br />
                Gratis penjajakan awal.
              </h3>
              <p className="-mt-2 text-center text-[13px] text-muted-foreground">
                Isi formulir singkat berikut, kami hubungi kembali.
              </p>
              <div className="grid grid-cols-2 gap-3 max-[480px]:grid-cols-1">
                <label className="flex flex-col gap-2 text-[13px] leading-normal font-medium max-[480px]:text-xs">
                  <span>Nama</span>
                  <input
                    className="h-11.5 w-full min-w-0 rounded-full border border-transparent bg-muted px-4.5 py-3 text-sm leading-normal font-normal text-foreground transition-[border-color] duration-200 placeholder:text-muted-foreground hover:border-border max-[992px]:text-base max-[480px]:px-3.5"
                    name="nama"
                    autoComplete="name"
                    placeholder="Nama Anda"
                    required
                    maxLength={60}
                  />
                </label>
                <label className="flex flex-col gap-2 text-[13px] leading-normal font-medium max-[480px]:text-xs">
                  <span>No. telepon / WA</span>
                  <input
                    className="h-11.5 w-full min-w-0 rounded-full border border-transparent bg-muted px-4.5 py-3 text-sm leading-normal font-normal text-foreground transition-[border-color] duration-200 placeholder:text-muted-foreground hover:border-border max-[992px]:text-base max-[480px]:px-3.5"
                    name="telepon"
                    autoComplete="tel"
                    placeholder="08xx-xxxx-xxxx"
                    required
                    maxLength={30}
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
                <span>Kebutuhan Anda</span>
                <select
                  className="h-11.5 w-full min-w-0 rounded-full border border-transparent bg-muted px-4.5 py-3 text-sm leading-normal font-normal text-foreground transition-[border-color] duration-200 hover:border-border max-[992px]:text-base max-[480px]:px-3.5"
                  name="kebutuhan"
                  required
                  defaultValue="Jasa Pembukuan"
                >
                  <option>Jasa Pembukuan</option>
                  <option>Jasa Perpajakan</option>
                  <option>Penyusunan & Kompilasi Laporan Keuangan</option>
                  <option>Jasa Teknologi Informasi Akuntansi</option>
                  <option>Konsultasi Manajemen & Keuangan</option>
                  <option>Lainnya</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-[13px] leading-normal font-medium max-[480px]:text-xs">
                <span>Ceritakan singkat kebutuhan Anda</span>
                <textarea
                  className="min-h-[110px] w-full min-w-0 rounded-3xl border border-transparent bg-muted px-4.5 py-3 text-sm leading-relaxed font-normal text-foreground transition-[border-color] duration-200 placeholder:text-muted-foreground hover:border-border max-[992px]:text-base max-[480px]:px-3.5"
                  name="pesan"
                  placeholder="Contoh: pembukuan bulanan untuk usaha dagang di Jakarta…"
                  required
                  minLength={10}
                  maxLength={1000}
                />
              </label>
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-transparent bg-foreground px-6 py-3.25 text-base leading-5 font-medium whitespace-nowrap text-background transition-[background,transform,translate,scale,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_5px_12px_#00000014] active:translate-y-0 active:scale-98 max-[480px]:text-sm"
              >
                Kirim permintaan <ArrowUpRight size={16} strokeWidth={1.5} />
              </button>
              <p className="-mt-2 text-center text-[10px] text-muted-foreground">
                Demo lokal. Untuk komunikasi resmi gunakan email/telepon di
                samping.
              </p>
            </form>
          )}
        </div>
      </Reveal>

      <div
        id="faq"
        className="col-start-1 row-start-2 self-end max-[992px]:row-auto"
        aria-label="Pertanyaan yang sering diajukan"
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
