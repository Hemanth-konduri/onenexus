import Head from "next/head";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us — OneNexus | Your Digital Growth Partner</title>
        <meta
          name="description"
          content="Learn about OneNexus, a Digital Growth Company helping small businesses, aspiring entrepreneurs, and women entrepreneurs build and expand their online presence across India."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/onenexus-logo-bckgr.png" />
      </Head>

      <CustomCursor />

      <main className="min-h-screen bg-[#EFECE6] text-[#111827] antialiased selection:bg-[#2554E8] selection:text-white pt-20">
        <Navbar />
        <About />
        <Footer />
      </main>
    </>
  );
}
