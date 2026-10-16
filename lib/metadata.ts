import type { Metadata } from "next";

export const siteConfig = {
  name: "KJA PT LEDSONS SOLUSI BISNIS",
  shortName: "LEDSONS",
  description:
    "Kantor Jasa Akuntan (KJA) PT LEDSONS SOLUSI BISNIS — penyedia layanan profesional di bidang akuntansi: jasa pembukuan, kompilasi laporan keuangan, konsultasi manajemen, perpajakan, prosedur yang disepakati atas informasi keuangan, serta layanan teknologi informasi.",
  url: "https://kjaledsonssolusibisnis.com",
  ogImage: "/og-image.png",
  ogImageAlt:
    "KJA PT LEDSONS SOLUSI BISNIS — Mitra Solusi Bisnis Terpercaya Anda.",
  creator: "KJA PT LEDSONS SOLUSI BISNIS",
  authors: [
    {
      name: "KJA PT LEDSONS SOLUSI BISNIS",
      url: "https://kjaledsonssolusibisnis.com",
    },
  ],
  keywords: [
    "kantor jasa akuntan",
    "KJA Ledsons",
    "jasa pembukuan",
    "kompilasi laporan keuangan",
    "konsultan pajak jakarta",
    "konsultasi manajemen",
    "software akuntansi",
    "LEDSONS Solusi Bisnis",
  ],
  contact: {
    email: "info@kjaledsonssolusibisnis.co.id",
    phone1: "(+62) 021-830-9924",
    phone2: "(+62) 857-1075-1970",
    website: "www.kjaledsonssolusibisnis.com",
    address: "Jl. Dr. Saharjo No. 96G, Menteng Atas, Setiabudi, Jakarta 12960",
  },
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, alt: siteConfig.ogImageAlt }],
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const ogImage = image ?? siteConfig.ogImage;
  const pageTitle = title ?? siteConfig.name;
  const pageDescription = description ?? siteConfig.description;

  return {
    ...(title === undefined ? {} : { title }),
    description: pageDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: siteConfig.name,
      title: pageTitle,
      description: pageDescription,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: image ? pageTitle : siteConfig.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [
        { url: ogImage, alt: image ? pageTitle : siteConfig.ogImageAlt },
      ],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
