import React, { useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  Clock,
  Check,
  MessageSquare,
  Maximize2,
} from "lucide-react";
import {
  WhyOneNexusStandard,
  whyOneNexusStandards,
  getStandardBySlug,
  getAdjacentStandards,
} from "@/data/whyOneNexusStandards";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface StandardDetailPageProps {
  standard: WhyOneNexusStandard;
  prevStandard: WhyOneNexusStandard;
  nextStandard: WhyOneNexusStandard;
}

export default function StandardDetailPage({
  standard,
  prevStandard,
  nextStandard,
}: StandardDetailPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  if (!standard) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <>
      <Head>
        <title>{`${standard.title} — Standard ${standard.num} | OneNexus`}</title>
        <meta name="description" content={standard.shortDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/onenexus-logo-bckgr.png" />
      </Head>

      <CustomCursor />

      <div className="min-h-screen bg-[#EFECE6] text-[#111827] antialiased selection:bg-[#2554E8] selection:text-white">
        <Navbar />

        <main className="pt-24 sm:pt-28 lg:pt-32 pb-24">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Navigation Bar / Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-8 border-b border-black/15 font-mono text-xs">
              <Link
                href="/#why-onenexus"
                className="flex items-center gap-2 text-neutral-600 hover:text-[#2554E8] transition-colors font-bold uppercase tracking-wider"
              >
                <ArrowLeft size={14} />
                <span>BACK TO ALL STANDARDS</span>
              </Link>

              <div className="flex items-center gap-3">
                <span className="text-neutral-400">INDEX:</span>
                <span className="px-2 py-0.5 bg-[#2554E8] text-white font-black">
                  STANDARD {standard.num} / 05
                </span>
                <span className="text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 font-bold uppercase hidden sm:inline-block">
                  {standard.metricStat} {standard.metricLabel}
                </span>
              </div>
            </div>

            {/* Standard Hero Header */}
            <div className="space-y-4 mb-10 lg:mb-14">
              <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#2554E8]">
                <span className="w-2 h-2 bg-[#2554E8]" />
                <span>{standard.station}</span>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-600">{standard.tag}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111827] leading-[1.05]">
                {standard.title}
              </h1>

              <p className="text-base sm:text-xl lg:text-2xl font-sans font-semibold text-neutral-700 max-w-3xl leading-snug">
                {standard.highlight}
              </p>
            </div>

            {/* Cinema Video Player Showcase */}
            <div className="relative w-full aspect-video bg-[#0d121c] border border-black/20 overflow-hidden mb-14 shadow-2xl rounded-none group">
              <video
                ref={videoRef}
                src={standard.videoSrc}
                poster={standard.posterImage}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Video Gradient Protection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Top Video Header Tag */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white font-mono text-[11px] pointer-events-none">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs px-3 py-1.5 border border-white/10">
                  <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
                  <span className="font-bold tracking-wider">STANDARD {standard.num} VIDEO ARCHIVE</span>
                </div>

                <div className="bg-black/60 backdrop-blur-xs px-3 py-1.5 border border-white/10 font-bold uppercase tracking-wider">
                  {standard.metricStat} {standard.metricLabel}
                </div>
              </div>

              {/* Bottom Video Controls Bar */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-20">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-2.5 bg-black/70 hover:bg-[#2554E8] text-white border border-white/20 transition-colors cursor-pointer rounded-none"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2.5 bg-black/70 hover:bg-[#2554E8] text-white border border-white/20 transition-colors cursor-pointer rounded-none"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  <span className="font-mono text-xs text-neutral-300 ml-2 hidden sm:inline-block">
                    {standard.title}
                  </span>
                </div>

                <button
                  onClick={handleFullscreen}
                  className="p-2.5 bg-black/70 hover:bg-[#2554E8] text-white border border-white/20 transition-colors cursor-pointer rounded-none"
                  aria-label="Fullscreen"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>

            {/* Deep-Dive Grid: Overview & Core Philosophy */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-3">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2554E8]">
                    01 // EXECUTIVE MANDATE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">
                    The Operational Philosophy Behind Standard {standard.num}
                  </h2>
                </div>

                <p className="text-neutral-700 text-base sm:text-lg leading-relaxed font-sans">
                  {standard.fullOverview}
                </p>

                {/* Founder Personal Pledge Quote */}
                <div className="p-6 bg-white border-l-4 border-[#2554E8] border border-black/10 shadow-xs">
                  <span className="font-mono text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                    FOUNDER'S NON-NEGOTIABLE PLEDGE
                  </span>
                  <p className="text-neutral-900 font-sans italic text-base sm:text-lg leading-relaxed">
                    "{standard.founderPledge}"
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-[#111827]">— OneNexus Leadership & Partner Council</span>
                    <span className="text-[#2554E8] font-bold">100% Guaranteed</span>
                  </div>
                </div>
              </div>

              {/* Sidebar Quick Stats Box */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-6 bg-white border border-black/15 shadow-sm space-y-5">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 block border-b border-black/10 pb-2">
                    BENCHMARK METRICS
                  </span>

                  <div>
                    <span className="block font-mono text-4xl sm:text-5xl font-black text-[#2554E8]">
                      {standard.metricStat}
                    </span>
                    <span className="font-mono text-xs font-bold text-neutral-700 uppercase">
                      {standard.metricLabel}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-black/10 space-y-2 text-xs font-sans">
                    <div className="flex justify-between py-1">
                      <span className="text-neutral-500">Service Level SLA:</span>
                      <span className="font-bold font-mono text-neutral-900">&lt;24h Response</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-neutral-500">Senior Delegation:</span>
                      <span className="font-bold font-mono text-neutral-900">0% Junior Hand-Off</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-neutral-500">Contract Lock-In:</span>
                      <span className="font-bold font-mono text-emerald-700">Zero Lock-In</span>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppUrl(`Hello OneNexus team, I would like to audit my business based on Standard ${standard.num}: ${standard.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#2554E8] hover:bg-[#1a42be] text-white font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors rounded-none"
                  >
                    <span>AUDIT YOUR BUSINESS</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* The Agency Trap vs The OneNexus Standard Comparison */}
            <div className="mb-16">
              <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2554E8]">
                  02 // DIRECT CONTRAST
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-[#111827]">
                  The Agency Trap vs. The OneNexus Standard
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base">
                  Why traditional agencies fail emerging founders, and how our codified operational standard prevents it.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Agency Trap Card */}
                <div className="p-6 sm:p-8 bg-neutral-100 border border-neutral-300 text-neutral-900 relative">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle size={18} className="text-red-500" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-600">
                      INDUSTRY NORM TO AVOID
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3">
                    {standard.comparison.agencyTrap.title}
                  </h3>

                  <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
                    {standard.comparison.agencyTrap.description}
                  </p>

                  <ul className="space-y-3 font-sans text-xs sm:text-sm text-neutral-700">
                    {standard.comparison.agencyTrap.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-none bg-red-400 mt-1.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* OneNexus Standard Card */}
                <div className="p-6 sm:p-8 bg-[#111827] text-white border border-[#2554E8] relative shadow-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                      OUR CODIFIED BENCHMARK
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">
                    {standard.comparison.oneNexusStandard.title}
                  </h3>

                  <p className="text-neutral-300 text-sm mb-6 leading-relaxed">
                    {standard.comparison.oneNexusStandard.description}
                  </p>

                  <ul className="space-y-3 font-sans text-xs sm:text-sm text-neutral-200">
                    {standard.comparison.oneNexusStandard.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Three Key Execution Proof Points */}
            <div className="mb-16">
              <div className="mb-8 space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2554E8]">
                  03 // VERIFIABLE PROOF
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">
                  Three Quantifiable Proof Points
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {standard.proofPoints.map((proof, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white border border-black/15 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-[#2554E8] bg-[#2554E8]/10 px-2 py-0.5 mb-3 inline-block">
                        {proof.metric}
                      </span>
                      <h3 className="font-sans font-bold text-lg text-neutral-900 mb-2">
                        {proof.title}
                      </h3>
                      <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                        {proof.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-World Case Study Highlight */}
            <div className="p-6 sm:p-10 bg-white border border-black/15 shadow-sm mb-16">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-black/10">
                <div className="space-y-1">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2554E8]">
                    CASE STUDY TELEMETRY
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-900">
                    {standard.caseStudy.clientType}
                  </h3>
                </div>

                <div className="text-left md:text-right font-mono">
                  <span className="block text-3xl sm:text-4xl font-black text-[#2554E8]">
                    {standard.caseStudy.resultMetric}
                  </span>
                  <span className="text-xs font-bold text-neutral-600 uppercase">
                    {standard.caseStudy.resultLabel}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-sm">
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-red-600 block mb-1">
                    THE COMMERCIAL CHALLENGE
                  </span>
                  <p className="text-neutral-700 leading-relaxed">
                    {standard.caseStudy.challenge}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-xs font-bold uppercase text-emerald-700 block mb-1">
                    THE ONENEXUS EXECUTION
                  </span>
                  <p className="text-neutral-700 leading-relaxed">
                    {standard.caseStudy.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* Standard Deliverables Included */}
            <div className="p-6 sm:p-8 bg-[#111827] text-white border border-black/20 mb-16">
              <div className="mb-6 space-y-1">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2554E8]">
                  04 // TANGIBLE ARTIFACTS
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Included Artifacts & Deliverables Under Standard {standard.num}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {standard.deliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3.5 bg-white/5 border border-white/10 flex items-start gap-2.5"
                  >
                    <Check size={16} className="text-[#2554E8] mt-0.5 shrink-0" />
                    <span className="text-xs font-sans text-neutral-200 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next / Previous Standard Navigation Switcher */}
            <div className="pt-8 border-t border-black/15">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-4">
                NAVIGATE OPERATIONAL STANDARDS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href={`/why/${prevStandard.slug}`}
                  className="p-5 bg-white border border-black/15 hover:border-[#2554E8] transition-colors group flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase">
                      ← PREVIOUS STANDARD
                    </span>
                    <h4 className="font-sans font-bold text-sm sm:text-base text-neutral-900 group-hover:text-[#2554E8] transition-colors">
                      {prevStandard.num}. {prevStandard.title}
                    </h4>
                  </div>
                </Link>

                <Link
                  href={`/why/${nextStandard.slug}`}
                  className="p-5 bg-white border border-black/15 hover:border-[#2554E8] transition-colors group flex items-center justify-between text-right"
                >
                  <div className="space-y-1 ml-auto">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase">
                      NEXT STANDARD →
                    </span>
                    <h4 className="font-sans font-bold text-sm sm:text-base text-neutral-900 group-hover:text-[#2554E8] transition-colors">
                      {nextStandard.num}. {nextStandard.title}
                    </h4>
                  </div>
                </Link>
              </div>
            </div>

            {/* Final Call to Action */}
            <div className="mt-14 p-8 bg-white border border-black/15 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#2554E8] uppercase tracking-wider">
                  DIRECT ACCESS TO LEADERSHIP
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-900">
                  Ready to experience Standard {standard.num} in your business?
                </h3>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={getWhatsAppUrl(`Hello! I am reviewing Standard ${standard.num} (${standard.title}) on the OneNexus site and want to discuss our project.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-black uppercase tracking-wider transition-colors rounded-none flex items-center gap-2"
                >
                  <span>CHAT ON WHATSAPP</span>
                  <ArrowUpRight size={14} />
                </a>

                <Link
                  href="/contact"
                  className="px-6 py-3 bg-[#111827] hover:bg-[#2554E8] text-white font-mono text-xs font-black uppercase tracking-wider transition-colors rounded-none flex items-center gap-2"
                >
                  <span>INQUIRY FORM</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = whyOneNexusStandards.map((standard) => ({
    params: { slug: standard.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const standard = getStandardBySlug(slug);

  if (!standard) {
    return {
      notFound: true,
    };
  }

  const { prev, next } = getAdjacentStandards(slug);

  return {
    props: {
      standard,
      prevStandard: prev,
      nextStandard: next,
    },
  };
};
