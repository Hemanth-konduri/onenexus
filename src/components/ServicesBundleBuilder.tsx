import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ServicesBundleBuilder() {
  const packages = [
    {
      name: "Modular Individual Capability",
      subtitle: "PICK EXACTLY WHAT YOU NEED",
      desc: "Select specific services such as Website Engineering, Google Business Setup, AI Automation, or Branding identity.",
      features: [
        "Select single or dual services",
        "Transparent itemized scope",
        "Fast turnaround & quick deployment",
        "Direct founder-level communication",
      ],
      cta: "CHOOSE MODULAR SERVICE",
    },
    {
      name: "Complete Digital Growth Engine",
      subtitle: "END-TO-END BUSINESS FOUNDATION",
      desc: "Combine AI Services, Branding, Website Engineering, Digital Setup, and Monthly Growth Support for total digital authority.",
      features: [
        "Full brand identity & visual system",
        "High-converting custom Next.js website",
        "Google Business Profile & Domain email setup",
        "Monthly Social Media Management & Reels",
        "AI Workflow integration & custom tools",
      ],
      popular: true,
      cta: "START COMPLETE GROWTH ENGINE",
    },
  ];

  return (
    <section className="relative z-10 w-full bg-[#111827] text-white overflow-hidden border-t border-white/10 py-20 lg:py-28">
      {/* Background Guide Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1400px] mx-auto px-6 lg:px-12">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-white/[0.04] first:border-l first:border-white/[0.04]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Eyebrow Header Tag */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-none" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold text-white">
              FLEXIBLE ENGAGEMENT OPTIONS
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm text-[#2554E8] tracking-widest uppercase font-bold">
            [ MODULAR OR BUNDLED ]
          </span>
        </div>

        {/* Big Typography Section Headline */}
        <div className="max-w-4xl mb-16">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.92] text-white uppercase select-none mb-4">
            CHOOSE SINGLE CAPABILITIES OR <br />
            <span className="text-[#2554E8]">A COMPLETE GROWTH ENGINE.</span>
          </h2>
          <p className="font-sans text-base sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-3xl">
            Whether you need a single web application or a total brand launch across India, OneNexus provides complete flexibility with zero rigid contracts.
          </p>
        </div>

        {/* 2-Option Highlight Cards (Sharp Corners: rounded-none) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`p-8 sm:p-12 border transition-all duration-300 flex flex-col justify-between relative rounded-none ${
                pkg.popular
                  ? "bg-white/[0.06] border-[#2554E8] shadow-2xl"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 px-3.5 py-1.5 bg-[#2554E8] text-white font-mono text-[10px] font-extrabold uppercase tracking-widest shadow-md rounded-none">
                  ★ RECOMMENDED FOR STARTUPS
                </div>
              )}

              <div>
                <span className="font-mono text-xs font-bold text-[#2554E8] uppercase tracking-widest block mb-2">
                  {pkg.subtitle}
                </span>

                <h3 className="font-sans font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4">
                  {pkg.name}
                </h3>

                <p className="font-sans text-base text-neutral-300 leading-relaxed mb-8">
                  {pkg.desc}
                </p>

                <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                  <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                    INCLUDED CAPABILITIES:
                  </span>
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-[#2554E8] shrink-0" />
                      <span className="font-sans text-sm font-semibold text-white">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className={`w-full py-4 text-center font-mono text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg rounded-none ${
                  pkg.popular
                    ? "bg-[#2554E8] hover:bg-[#1d42c0] text-white"
                    : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
                }`}
              >
                <span>{pkg.cta}</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        {/* Footer Note (Sharp Corners: rounded-none) */}
        <div className="mt-12 p-6 bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400 rounded-none">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#2554E8]" />
            <span>Serving Small Businesses, Aspiring Entrepreneurs & Women Founders Across India</span>
          </div>
          <span className="text-white font-bold">onenexusdigi.com</span>
        </div>
      </div>
    </section>
  );
}

