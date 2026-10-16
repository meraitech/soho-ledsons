# soho-ledsons — KJA PT LEDSONS SOLUSI BISNIS

Situs profil perusahaan Kantor Jasa Akuntan (KJA) PT LEDSONS SOLUSI BISNIS. Seluruh konten berbahasa Indonesia.

Dibangun dengan Next.js 16.3.4, React 19.2.8, TypeScript strict, Tailwind CSS v4, Motion, next-themes, dan Lucide.

## Memulai

Butuh Node.js 20.9+ dan npm.

```bash
npm ci
npm run dev
```

Buka URL lokal yang dicetak Next.js. Untuk production:

```bash
npm run build
npm start
```

Tidak perlu environment variable, API key, atau database.

## Identitas

- Nama repo / package: `soho-ledsons`
- Perusahaan: KJA PT LEDSONS SOLUSI BISNIS
- Domain: https://kjaledsonssolusibisnis.com
- Email: info@kjaledsonssolusibisnis.co.id
- Telepon: (+62) 021-830-9924 / (+62) 857-1075-1970
- Alamat: Jl. Dr. Saharjo No. 96G, Menteng Atas, Setiabudi, Jakarta 12960

Konfigurasi terpusat di `lib/metadata.ts` (`siteConfig`), `public/site.webmanifest`, dan `components/structured-data.tsx` (skema `AccountingService`).

## Struktur halaman (`app/page.tsx`)

| Bagian         | Komponen              | ID                | Isi                                                                           |
| -------------- | --------------------- | ----------------- | ----------------------------------------------------------------------------- |
| Navigasi       | `nav.tsx`, `logo.tsx` | —                 | Tentang, Layanan, Kenapa Ledsons, Klien, Kontak                               |
| Hero           | `hero.tsx`            | `#top`            | KJA badge, H1 PT LEDSONS SOLUSI BISNIS, CTA layanan/kontak, sorotan 3 layanan |
| Tentang        | `together.tsx`        | `#tentang`        | Profil KJA, sejarah 2024, pesan pendiri                                       |
| Layanan        | `features.tsx`        | `#layanan`        | 5 layanan: pembukuan, pajak, laporan keuangan, TI akuntansi, konsultasi       |
| Kenapa Ledsons | `benefits.tsx`        | `#kenapa`         | Pelayanan pelanggan, layanan unggulan, mitra usaha, jaringan bisnis           |
| Visi & Misi    | `workflow.tsx`        | `#visi-misi`      | Tab Visi / Misi / Prinsip                                                     |
| Nilai inti     | `plans.tsx`           | `#nilai`          | 6 nilai perusahaan                                                            |
| Industri       | `audience.tsx`        | `#industri`       | Marquee sektor usaha                                                          |
| Klien          | `project-library.tsx` | `#klien`          | Daftar klien per industri                                                     |
| Kontak + FAQ   | `workspace.tsx`       | `#kontak`, `#faq` | Info kontak resmi + formulir demo lokal + FAQ                                 |
| Penutup        | `final-cta.tsx`       | `#mulai`          | CTA mitra terpercaya                                                          |
| Footer         | `footer.tsx`          | —                 | Navigasi + kontak resmi                                                       |

Formulir bersifat demo lokal: tidak mengirim email, tidak membuat akun, tidak menyimpan data ke server. Untuk komunikasi resmi gunakan email/telepon di atas.

## Skrip

| Perintah            | Fungsi                    |
| ------------------- | ------------------------- |
| `npm run dev`       | Server pengembangan       |
| `npm run build`     | Build production          |
| `npm start`         | Jalankan build production |
| `npm run typecheck` | Cek tipe TypeScript       |
| `npm run lint`      | ESLint                    |
| `npm run format`    | Format Prettier           |

## Deployment

Gunakan host yang mendukung server Node.js Next.js. Instal `npm ci`, build `npm run build`, jalankan `npm start`. Optimasi gambar Next.js default (bukan static export). Sebelum publikasi, ganti `public/og-image.png` dan ikon dengan logo resmi LEDSONS bila sudah tersedia.
