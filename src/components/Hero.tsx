import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.0 } });

      // Smooth GSAP Entrance Sequence
      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          ".hero-headline-line",
          { opacity: 0, y: 65, rotateX: 20 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.12 },
          "-=0.4"
        )
        .fromTo(
          ".hero-subtext",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".hero-cta-btn",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 },
          "-=0.5"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Word-level hover interaction handlers using GSAP
  const handleWordEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    gsap.to(e.currentTarget, {
      y: -10,
      scale: 1.03,
      color: "#2554E8",
      skewX: -3,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleWordLeave = (e: React.MouseEvent<HTMLSpanElement>, defaultHighlight: boolean) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      color: defaultHighlight ? "#2554E8" : "#111827",
      skewX: 0,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const headlineStructure = [
    {
      words: [
        { text: "WE", highlight: false },
        { text: "BUILD", highlight: false },
      ],
    },
    {
      words: [
        { text: "DIGITAL", highlight: false },
        { text: "PRODUCTS", highlight: false },
      ],
    },
    {
      words: [
        { text: "THAT", highlight: false },
        { text: "DEFINE", highlight: false },
      ],
    },
    {
      words: [{ text: "CATEGORIES.", highlight: true }],
    },
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-between bg-[#EFECE6] text-[#111827] overflow-hidden border-b border-black/[0.08] selection:bg-[#2554E8] selection:text-white pt-24 pb-16"
    >
      {/* 1. Continuous Architectural Vertical Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-black/[0.06] first:border-l first:border-black/[0.06]"
          />
        ))}
      </div>

      {/* 2. Top Navigation Navbar */}
      <Navbar />

      {/* 3. Main Hero Architectural Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 my-auto w-full pt-10 pb-6">
        {/* Top Eyebrow Tag */}
        <div className="hero-eyebrow flex items-center justify-between pb-6 border-b border-black/[0.08] mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-[1px] animate-pulse" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-[#111827]">
              STRATEGIC DESIGN & DIGITAL ENGINEERING
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm text-neutral-500 tracking-widest uppercase">
            [ SECTION 01 ]
          </span>
        </div>

        {/* Very Large Editorial Headline with Interactive Hover Words */}
        <h1 className="font-sans font-black text-5xl sm:text-7xl lg:text-[110px] xl:text-[142px] tracking-tighter leading-[0.88] text-[#111827] uppercase select-none my-4 sm:my-8 perspective-[1000px]">
          {headlineStructure.map((line, lineIdx) => (
            <div key={lineIdx} className="hero-headline-line overflow-hidden py-1 flex flex-wrap gap-x-4 lg:gap-x-7">
              {line.words.map((word, wordIdx) => (
                <span
                  key={wordIdx}
                  onMouseEnter={handleWordEnter}
                  onMouseLeave={(e) => handleWordLeave(e, word.highlight)}
                  className={`inline-block cursor-pointer transition-colors duration-200 ${
                    word.highlight ? "text-[#2554E8]" : "text-[#111827]"
                  }`}
                >
                  {word.text}
                </span>
              ))}
            </div>
          ))}
        </h1>

        {/* Subtitle Paragraph & CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-6 sm:pt-10 border-t border-black/[0.08] mt-8 sm:mt-12">
          <div className="hero-subtext lg:col-span-7">
            <p className="font-sans text-base sm:text-xl text-[#475569] font-normal leading-relaxed max-w-2xl">
              A founder-led strategic design and engineering studio connecting brand positioning, custom 3D web experiences, and scalable digital products for ambitious brands worldwide.
            </p>
          </div>

          <div className="lg:col-span-5 flex items-center gap-4 flex-wrap lg:justify-end">
            {/* Primary CTA */}
            <Link
              href="/contact"
              className="hero-cta-btn inline-flex items-center gap-2.5 px-8 py-4 bg-[#111827] hover:bg-[#2554E8] text-white font-mono text-xs tracking-widest uppercase font-bold rounded-[2px] transition-all duration-300 shadow-xl hover:shadow-[0_8px_30px_rgba(37,84,232,0.35)] hover:-translate-y-0.5 cursor-pointer"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={16} />
            </Link>

            {/* Secondary CTA */}
            <a
              href="#work"
              className="hero-cta-btn inline-flex items-center gap-2 px-6 py-4 bg-white/60 hover:bg-white text-[#111827] hover:text-[#2554E8] font-mono text-xs tracking-widest uppercase font-bold border border-black/15 transition-all duration-300 cursor-pointer"
            >
              <span>EXPLORE WORK</span>
              <ArrowDown size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
