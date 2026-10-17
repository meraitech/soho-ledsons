import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Benefits } from "@/components/benefits";
import { Audience } from "@/components/audience";
import { Features } from "@/components/features";
import { Workflow } from "@/components/workflow";
import { ProjectLibrary } from "@/components/project-library";
import { Together } from "@/components/together";
import { Plans } from "@/components/plans";
import { Workspace } from "@/components/workspace";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  ...createMetadata({
    title: "KJA PT LEDSONS SOLUSI BISNIS — Mitra Solusi Bisnis Terpercaya",
    description: siteConfig.description,
    path: "/",
  }),
  title: {
    absolute: "KJA PT LEDSONS SOLUSI BISNIS — Mitra Solusi Bisnis Terpercaya",
  },
};

export default function HomePage(): ReactNode {
  return (
    <>
      <span id="top" />
      <StructuredData />
      <Nav />
      <main id="main-content">
        <Hero />
        <Benefits />
        <Audience />
        <Features />
        <Workflow />
        <Together />
        <ProjectLibrary />
        <Plans />
        <Workspace />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
