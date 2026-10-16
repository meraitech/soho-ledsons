import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Together } from "@/components/together";
import { Features } from "@/components/features";
import { Benefits } from "@/components/benefits";
import { Workflow } from "@/components/workflow";
import { Plans } from "@/components/plans";
import { Audience } from "@/components/audience";
import { ProjectLibrary } from "@/components/project-library";
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
        <Together />
        <Features />
        <Benefits />
        <Workflow />
        <Plans />
        <Audience />
        <ProjectLibrary />
        <Workspace />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
