import Head from "next/head";
import Hero from "@/components/Hero";
import WhoWeHelp from "@/components/WhoWeHelp";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import WhyOneNexus from "@/components/WhyOneNexus";
import MonthlyGrowthSupport from "@/components/MonthlyGrowthSupport";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <Head>
        <title>OneNexus — Your Digital Growth Partner</title>
        <meta
          name="description"
          content="OneNexus helps small businesses, aspiring entrepreneurs, and women entrepreneurs build and grow their digital presence through branding, AI solutions, social media marketing, website design, and digital business setup across India."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/onenexus-logo-bckgr.png" />
        <link rel="apple-touch-icon" href="/onenexus-logo-bckgr.png" />
      </Head>

      {/* Global Interactive Custom Cursor */}
      <CustomCursor />

      <main className="min-h-screen bg-[#EFECE6] text-[#111827] antialiased selection:bg-[#2554E8] selection:text-white">
        {/* Section 01: Centered Giant Typographic Hero Section */}
        <Hero />

        {/* Section 02: Who We Help */}
        <WhoWeHelp />

        {/* Section 03: Services Overview */}
        <Services />

        {/* Section 04: How We Work */}
        <HowWeWork />

        {/* Section 05: Why OneNexus */}
        <WhyOneNexus />

        {/* Section 06: Monthly Growth Support */}
        <MonthlyGrowthSupport />

        {/* Section 07: Call to Action */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
