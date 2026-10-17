# soho-ledsons — KJA PT LEDSONS SOLUSI BISNIS

Situs profil perusahaan Kantor Jasa Akuntan (KJA) PT LEDSONS SOLUSI BISNIS. Seluruh konten berbahasa Indonesia. Struktur desain, warna, foto, dan interaksi sama dengan template asli — hanya copywriting yang diganti dengan porsi teks yang sama.

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

Urutan dan ID section sama dengan template asli; hanya label dan isi teks yang berbahasa Indonesia dan pendek.

| Bagian                              | Komponen                           | Isi singkat                                                      |
| ----------------------------------- | ---------------------------------- | ---------------------------------------------------------------- |
| Navigasi                            | `nav.tsx`, `logo.tsx`              | Tentang, Kenapa, Layanan, Klien, Kontak                          |
| Hero                                | `hero.tsx`, `signup-form.tsx`      | Badge KJA, H1 2 baris, 1 sub kalimat, carousel 3 sorotan layanan |
| Manfaat (`#why`)                    | `benefits.tsx`                     | 3 kartu: pembukuan tertib, pajak patuh, siap bertumbuh           |
| Sektor (`#who`)                     | `audience.tsx`                     | 2 baris foto sektor usaha                                        |
| Layanan (`#features`)               | `features.tsx`                     | Tab UMKM/Perusahaan + 4 kartu interaktif                         |
| Alur (`#workflow`)                  | `workflow.tsx`                     | Tab Pembukuan/Perpajakan/Pelaporan + stage foto                  |
| Tentang (`#together`)               | `together.tsx`                     | 2 paragraf singkat + 1 foto                                      |
| Layanan (`#library`)                | `project-library.tsx`              | 4 kartu + filter + dialog pratinjau                              |
| Paket (`#plans`)                    | `plans.tsx`                        | 2 baris: Konsultasi Awal, Pendampingan Rutin                     |
| Kontak + FAQ (`#workspace`, `#faq`) | `workspace.tsx`                    | Form demo lokal + FAQ singkat                                    |
| Penutup (`#start`)                  | `final-cta.tsx`, `signup-form.tsx` | CTA + photo tiles                                                |
| Footer                              | `footer.tsx`                       | Navigasi + kembali ke atas                                       |

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
