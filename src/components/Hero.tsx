import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ArrowUpRight, ArrowDown, MapPin } from "lucide-react";
import InteractivePixelBackground from "@/components/InteractivePixelBackground";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const uniteRef = useRef<HTMLHeadingElement>(null);
  const innovateRef = useRef<HTMLHeadingElement>(null);
  const dominateRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Page Load Reveal Sequence
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.1 } });

      tl.fromTo(
        ".hero-center-tag",
        { opacity: 0, y: -25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )
        .fromTo(
          [uniteRef.current, innovateRef.current, dominateRef.current],
          { opacity: 0, y: 70, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 1 },
          "-=0.4"
        )
        .fromTo(
          ".hero-blue-glow",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          ".hero-short-subtext",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".hero-blue-cta",
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7 },
          "-=0.5"
        );

      // 2. Alternating Horizontal Scroll Parallax for UNITE, INNOVATE, DOMINATE
      // UNITE -> Scrolls to RIGHT
      if (uniteRef.current) {
        gsap.to(uniteRef.current, {
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      // INNOVATE -> Scrolls to LEFT
      if (innovateRef.current) {
        gsap.to(innovateRef.current, {
          xPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      // DOMINATE -> Scrolls to RIGHT
      if (dominateRef.current) {
        gsap.to(dominateRef.current, {
          xPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      // 3. Smooth Fade/Scale out transition into next section
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0.2,
          scale: 0.96,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[95vh] lg:min-h-screen w-full flex flex-col justify-between bg-[#EFECE6] text-[#111827] overflow-hidden border-b border-black/[0.08] selection:bg-[#2554E8] selection:text-white pt-24 pb-12"
    >
      {/* Interactive Canvas Pixel-Art Network Background */}
      <InteractivePixelBackground />

      {/* Center Ambient Glow Ring */}
      <div className="hero-blue-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#2554E8]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <Navbar />

      {/* MAIN CENTERED HERO CONTENT */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 my-auto w-full flex flex-col items-center text-center pt-6 pb-4"
      >
        {/* Top Centered Eyebrow Pill */}
        <div className="hero-center-tag inline-flex items-center gap-3 px-5 py-2 bg-white border border-black/10 shadow-sm rounded-full mb-8">
          <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-full animate-ping" />
          <span className="font-mono text-xs tracking-[0.25em] uppercase font-bold text-[#111827]">
            YOUR DIGITAL GROWTH PARTNER
          </span>
          <span className="text-neutral-300">|</span>
          <span className="font-mono text-xs text-[#2554E8] font-bold tracking-widest uppercase flex items-center gap-1.5">
            <MapPin size={13} />
            <span>SERVING CLIENTS ACROSS INDIA</span>
          </span>
        </div>

        {/* GIANT THREE-WORD TYPOGRAPHY WITH SCROLL ALTERNATING PARALLAX */}
        <div className="w-full flex flex-col items-center justify-center space-y-1 sm:space-y-3 my-2 select-none overflow-visible">
          {/* UNITE -> Moves RIGHT on Scroll */}
          <div className="w-full overflow-visible">
            <h1
              ref={uniteRef}
              className="font-sans font-black text-6xl sm:text-8xl lg:text-[135px] xl:text-[165px] tracking-tighter leading-[0.85] text-[#111827] uppercase transition-colors duration-300 hover:text-[#2554E8] cursor-default inline-block"
            >
              UNITE.
            </h1>
          </div>

          {/* INNOVATE -> Moves LEFT on Scroll */}
          <div className="w-full overflow-visible">
            <h1
              ref={innovateRef}
              className="font-sans font-black text-6xl sm:text-8xl lg:text-[135px] xl:text-[165px] tracking-tighter leading-[0.85] text-[#2554E8] uppercase cursor-default inline-block"
            >
              INNOVATE.
            </h1>
          </div>

          {/* DOMINATE -> Moves RIGHT on Scroll */}
          <div className="w-full overflow-visible">
            <h1
              ref={dominateRef}
              className="font-sans font-black text-6xl sm:text-8xl lg:text-[135px] xl:text-[165px] tracking-tighter leading-[0.85] text-[#111827] uppercase transition-colors duration-300 hover:text-[#2554E8] cursor-default inline-block"
            >
              DOMINATE.
            </h1>
          </div>
        </div>

        {/* SHORT SUBTEXT */}
        <div className="hero-short-subtext max-w-xl mx-auto mt-8 mb-8">
          <p className="font-sans text-base sm:text-lg text-[#334155] font-normal leading-relaxed text-center">
            <strong className="font-bold text-[#111827]">OneNexus</strong> empowers small businesses, entrepreneurs, and women founders across India to build, scale, and lead in the digital space.
          </p>
        </div>

        {/* CENTERED ACTION BUTTONS */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/contact"
            className="hero-blue-cta inline-flex items-center gap-2.5 px-9 py-4.5 bg-[#2554E8] hover:bg-[#1d42c0] text-white font-mono text-xs tracking-widest uppercase font-bold rounded-[2px] transition-all duration-300 shadow-xl hover:shadow-[0_8px_30px_rgba(37,84,232,0.4)] hover:scale-105 cursor-pointer"
          >
            <span>START YOUR GROWTH JOURNEY</span>
            <ArrowUpRight size={16} />
          </Link>

          <Link
            href="/services"
            className="hero-blue-cta inline-flex items-center gap-2 px-7 py-4.5 bg-white/90 hover:bg-white text-[#111827] hover:text-[#2554E8] font-mono text-xs tracking-widest uppercase font-bold border border-black/15 transition-all duration-300 cursor-pointer shadow-sm hover:border-[#2554E8]"
          >
            <span>EXPLORE SERVICES</span>
            <ArrowDown size={15} />
          </Link>
        </div>
      </div>

      {/* BOTTOM CENTERED SCROLL INDICATOR */}
      <div className="relative z-10 max-w-[1350px] mx-auto w-full text-center font-mono text-xs text-neutral-500 uppercase tracking-widest font-semibold pt-4">
        <a
          href="#who-we-help"
          className="inline-flex items-center gap-2 hover:text-[#2554E8] transition-colors group"
        >
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}

