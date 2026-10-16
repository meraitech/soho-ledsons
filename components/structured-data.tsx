import { siteConfig } from "@/lib/metadata";
import { faqs } from "@/lib/faqs";
import type { ReactNode } from "react";

export function StructuredData(): ReactNode {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AccountingService",
        "@id": `${siteConfig.url}/#organisasi`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone1,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Jl. Dr. Saharjo No. 96G, Menteng Atas",
          addressLocality: "Setiabudi, Jakarta",
          postalCode: "12960",
          addressCountry: "ID",
        },
        areaServed: "Indonesia",
      },
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "id-ID",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
