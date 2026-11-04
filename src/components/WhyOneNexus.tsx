import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, CheckCircle2, Sparkles, Terminal } from "lucide-react";
import { whyOneNexusStandards } from "@/data/whyOneNexusStandards";
import StandardVideoCard from "@/components/StandardVideoCard";

export default function WhyOneNexus() {
  const sectionRef = useRef<HTMLElement>(null);
  const standards = whyOneNexusStandards;

  return (
    <section
      id="why-onenexus"
      ref={sectionRef}
      className="relative w-full bg-[#EFECE6] text-[#111827] py-20 lg:py-32 border-t border-black/15 overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-black/[0.05] first:border-l first:border-black/[0.05]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 lg:mb-16 border-b border-black/15">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 bg-[#2554E8]" />
              <span className="font-mono text-xs lg:text-sm font-bold tracking-widest uppercase text-black">
                [ SYSTEM STANDARDS • 05 OPERATIONAL CODES ]
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-[76px] font-black tracking-tight leading-[1.0] text-black">
              WHY ONENEXUS<span className="text-[#2554E8]">.</span>
            </h2>

            <p className="text-neutral-600 font-sans text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
              Five non-negotiable operational standards engineered to eliminate agency waste, guarantee direct partner-level access, and compound your commercial revenue.
            </p>
          </div>

          {/* Live Telemetry System Counter */}
          <div className="flex flex-col sm:items-end font-mono shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2554E8] bg-[#2554E8]/10 border border-[#2554E8]/30 px-3 py-1.5 rounded-none">
              <span className="w-2 h-2 rounded-none bg-[#2554E8] animate-pulse" />
              <span>100% CODIFIED STANDARDS</span>
            </div>
            <span className="text-[11px] text-neutral-500 mt-1 uppercase tracking-wider">
              CLICK ANY VIDEO TO INSPECT DETAILS
            </span>
          </div>
        </div>

        {/* 5-Card Asymmetric Bento Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* ROW 1: Two very big cards fitting the screen with a small gap in middle */}
          <div className="col-span-1 lg:col-span-6">
            <StandardVideoCard
              standard={standards[0]}
              variant="large"
              className="h-[480px] sm:h-[520px] lg:h-[560px]"
            />
          </div>

          <div className="col-span-1 lg:col-span-6">
            <StandardVideoCard
              standard={standards[1]}
              variant="large"
              className="h-[480px] sm:h-[520px] lg:h-[560px]"
            />
          </div>

          {/* ROW 2: Two small cards with different sizes (5 cols vs 7 cols) */}
          <div className="col-span-1 lg:col-span-5">
            <StandardVideoCard
              standard={standards[2]}
              variant="compact"
              className="h-[380px] sm:h-[400px] lg:h-[440px]"
            />
          </div>

          <div className="col-span-1 lg:col-span-7">
            <StandardVideoCard
              standard={standards[3]}
              variant="compact"
              className="h-[380px] sm:h-[400px] lg:h-[440px]"
            />
          </div>

          {/* ROW 3: One big card which fits almost the whole screen (12 cols) */}
          <div className="col-span-1 lg:col-span-12">
            <StandardVideoCard
              standard={standards[4]}
              variant="panoramic"
              className="h-[420px] sm:h-[460px] lg:h-[480px]"
            />
          </div>
        </div>

        {/* Bottom Callout & Direct WhatsApp Conduit */}
        <div className="mt-12 lg:mt-16 p-6 sm:p-8 bg-white border border-black/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2554E8]">
              TRANSPARENT CLIENT PROTECTION
            </span>
            <p className="text-sm sm:text-base font-bold text-neutral-900">
              Want to audit your existing digital setup against these 5 standards?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#111827] hover:bg-[#2554E8] text-white font-mono text-xs font-black uppercase tracking-wider transition-colors duration-300 rounded-none flex items-center gap-2"
            >
              <span>REQUEST COMMERCIAL AUDIT</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
