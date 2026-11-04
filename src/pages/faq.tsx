import Head from "next/head";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function FAQPage() {
  return (
    <>
      <Head>
        <title>FAQ — OneNexus | Common Business Questions & Answers</title>
        <meta
          name="description"
          content="Find answers to common questions about OneNexus digital growth services, social media management, website design pricing, and serving clients across India."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/onenexus-logo-bckgr.png" />
      </Head>

      <CustomCursor />

      <main className="min-h-screen bg-[#EFECE6] text-[#111827] antialiased selection:bg-[#2554E8] selection:text-white pt-20">
        <Navbar />
        <FAQ />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
