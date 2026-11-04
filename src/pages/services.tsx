import Head from "next/head";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import ServicesBundleBuilder from "@/components/ServicesBundleBuilder";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Services & Capabilities — OneNexus | Digital Growth Partner</title>
        <meta
          name="description"
          content="Discover OneNexus core capabilities: AI Services, Branding, Social Media Marketing, Website Design, and Digital Business Setup including Google Business Profile across India."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/onenexus-logo-bckgr.png" />
      </Head>

      <CustomCursor />

      <main className="min-h-screen bg-[#EFECE6] text-[#111827] antialiased selection:bg-[#2554E8] selection:text-white pt-20">
        <Navbar />
        <ServicesSection />
        <ServicesBundleBuilder />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
