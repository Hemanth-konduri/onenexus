import Head from "next/head";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Proof from "@/components/Proof";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <Head>
        <title>oneNexus — Strategic Design & Digital Studio</title>
        <meta
          name="description"
          content="A founder-led strategic design studio connecting strategy, brand and digital products."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/onenexus-logo-bckgr.png" />
        <link rel="apple-touch-icon" href="/onenexus-logo-bckgr.png" />
      </Head>

      {/* Global Interactive Custom Cursor */}
      <CustomCursor />

      <main className="min-h-screen bg-[#EFECE6] text-[#0F0F11] antialiased selection:bg-[#0022FF] selection:text-white">
        {/* Section 01: Architectural Hero */}
        <Hero />

        {/* Section 02: About & Philosophy (Scroll Word Illuminate) */}
        <About />

        {/* Section 03: Selected Work (2-Column Editorial Grid) */}
        <Work />

        {/* Section 04: Services & Disciplines (High-Contrast Dark Mode) */}
        <Services />

        {/* Section 05: Proof & Credentials (Editorial Divided Table) */}
        <Proof />

        {/* Section 06: Minimalist FAQ Accordion */}
        <FAQ />

        {/* Section 07: Electric Blue Contact & Giant Footer Watermark */}
        <Contact />
      </main>
    </>
  );
}
