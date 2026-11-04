import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Target, Compass, Sparkles, MapPin, HeartHandshake, ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";

const statementText =
  "OneNexus is a Digital Growth Company dedicated to helping small businesses, aspiring founders, and women entrepreneurs establish and scale a powerful online presence. We serve clients across India with strategic branding, custom web design, AI solutions, and social media marketing.";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [activePillar, setActivePillar] = useState<number>(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. GSAP Scroll Word Illumination for top statement
      const words = textRef.current?.querySelectorAll(".about-word");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.15, color: "rgba(17, 24, 39, 0.15)" },
          {
            opacity: 1,
            color: "#111827",
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 75%",
              end: "bottom 35%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // 2. GSAP Reveal for Foundational Pillars Rows
      const rows = sectionRef.current?.querySelectorAll(".about-pillar-row");
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current?.querySelector(".about-pillars-container"),
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const wordsArray = statementText.split(" ");

  const pillars = [
    {
      num: "01",
      title: "Our Mission",
      subtitle: "EMPOWERING GROWTH NATIONWIDE",
      highlight: "Leveling the playing field for emerging business owners.",
      desc: "To empower small businesses, aspiring entrepreneurs, and women entrepreneurs across India with high-impact branding, modern web presences, and automated digital solutions that drive real economic growth.",
      icon: Target,
      tag: "CORE PURPOSE",
    },
    {
      num: "02",
      title: "Our Vision",
      subtitle: "BENCHMARK DIGITAL GROWTH PARTNER",
      highlight: "Bridging business ideas to sustainable market leadership.",
      desc: "To be India's premier digital growth partner for emerging ventures—connecting raw ambition to a thriving, category-leading digital footprint.",
      icon: Compass,
      tag: "FUTURE AMBITION",
    },
    {
      num: "03",
      title: "Our Approach",
      subtitle: "UNDERSTAND • BUILD • SCALE",
      highlight: "No generic templates. Tailored execution first.",
      desc: "We prioritize understanding your business before recommending strategies. We craft practical digital solutions backed by personal attention and long-term partnership.",
      icon: Sparkles,
      tag: "WORKING METHODOLOGY",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#EFECE6] text-[#111827] overflow-hidden border-t border-black/[0.08] px-4 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40"
    >
      {/* Continuous Architectural Vertical Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-black/[0.06] first:border-l first:border-black/[0.06]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Top Eyebrow Header Bar */}
        <div className="flex items-center justify-between pb-8 border-b border-black/[0.08] mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-full" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-[#111827]">
              ABOUT ONENEXUS
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm text-[#2554E8] tracking-widest uppercase font-bold flex items-center gap-2">
            <MapPin size={14} />
            <span>SERVING CLIENTS ACROSS INDIA</span>
          </span>
        </div>

        {/* 1. Main Editorial Statement with GSAP Scroll Word Illumination */}
        <div className="max-w-[1250px] py-4 sm:py-8 border-b border-black/[0.08] pb-16 mb-20">
          <h2
            ref={textRef}
            className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl xl:text-[58px] tracking-tight leading-[1.2] text-[#111827] select-none"
          >
            {wordsArray.map((word, index) => (
              <span
                key={index}
                className="about-word inline-block mr-[0.28em] transition-colors duration-150"
                style={{ opacity: 0.15, color: "rgba(17, 24, 39, 0.15)" }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* 2. Foundational Pillars: Mission, Vision, Approach (NO CARDS!) */}
        <div className="mb-24">
          <div className="flex items-center justify-between pb-6 border-b border-black/[0.08] mb-12">
            <h3 className="font-sans font-black text-3xl sm:text-5xl text-[#111827] uppercase tracking-tight">
              FOUNDATIONAL <span className="text-[#2554E8]">PILLARS.</span>
            </h3>
            <span className="font-mono text-xs text-neutral-500 font-bold uppercase tracking-widest">
              [ 03 DIRECTIVES ]
            </span>
          </div>

          <div className="about-pillars-container border-t border-black/20 flex flex-col">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activePillar === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActivePillar(idx)}
                  className={`about-pillar-row py-10 sm:py-14 border-b border-black/15 transition-all duration-500 cursor-pointer px-4 sm:px-8 relative overflow-hidden ${
                    isActive ? "bg-white/80 shadow-sm translate-x-2" : "bg-transparent"
                  }`}
                >
                  {/* Subtle Background Watermark Number */}
                  <span className="absolute right-8 top-1/2 -translate-y-1/2 font-sans font-black text-[120px] sm:text-[160px] text-black/[0.03] select-none pointer-events-none uppercase">
                    {item.num}
                  </span>

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Number, Tag, & Title */}
                    <div className="lg:col-span-5 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-base font-black text-[#2554E8]">
                          {item.num}
                        </span>
                        <span className="px-2.5 py-0.5 bg-black/5 text-[#2554E8] font-mono text-[10px] font-bold uppercase tracking-widest">
                          {item.tag}
                        </span>
                      </div>

                      <h4
                        className={`font-sans font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight transition-colors duration-300 ${
                          isActive ? "text-[#2554E8]" : "text-[#111827]"
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className="font-mono text-xs text-[#475569] font-bold uppercase tracking-wider">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Content & Highlight */}
                    <div className="lg:col-span-7 flex items-start gap-6">
                      <div
                        className={`w-12 h-12 rounded-[2px] flex items-center justify-center shrink-0 transition-colors ${
                          isActive ? "bg-[#2554E8] text-white" : "bg-[#111827] text-white"
                        }`}
                      >
                        <Icon size={24} />
                      </div>

                      <div className="space-y-3">
                        <p className="font-sans text-lg sm:text-xl font-bold text-[#111827]">
                          {item.highlight}
                        </p>
                        <p className="font-sans text-base text-[#475569] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Dark Mode Focus Manifesto: Small Businesses & Women Entrepreneurs (NO CARDS!) */}
        <div className="p-10 sm:p-16 lg:p-20 bg-[#111827] text-white border border-black/10 relative overflow-hidden shadow-2xl space-y-10">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#2554E8]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-white/10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2554E8] text-white font-mono text-xs font-bold uppercase tracking-widest">
                <HeartHandshake size={14} />
                <span>SPECIALIZED BUSINESS FOCUS</span>
              </div>

              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[0.95] text-white">
                PROUDLY SUPPORTING SMALL BUSINESSES & <span className="text-[#2554E8]">WOMEN ENTREPRENEURS.</span>
              </h3>

              <p className="font-sans text-base sm:text-lg text-neutral-300 leading-relaxed">
                We take immense pride in working alongside local business owners and visionary women leaders across India, providing accessible, transparent, and growth-focused digital services.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2554E8] hover:bg-[#1d42c0] text-white font-mono text-xs uppercase tracking-widest font-bold shadow-xl transition-all hover:scale-105 shrink-0"
            >
              <span>CONNECT WITH OUR TEAM</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* 3 Core Directives Bar */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#2554E8] font-bold uppercase tracking-widest block">
                01 / ACCESSIBLE CRAFT
              </span>
              <h4 className="font-sans font-bold text-lg text-white">Transparent Pricing & Fluff-Free Guidance</h4>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                No hidden charges or complicated terminology. Clean, itemized growth strategy built for your budget.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-[#2554E8] font-bold uppercase tracking-widest block">
                02 / PERSONAL ATTENTION
              </span>
              <h4 className="font-sans font-bold text-lg text-white">Direct Communication & Partnership</h4>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                You work directly with dedicated experts who listen, advise, and refine every element of your digital presence.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs text-[#2554E8] font-bold uppercase tracking-widest block">
                03 / INDIA-WIDE REACH
              </span>
              <h4 className="font-sans font-bold text-lg text-white">Remote Collaboration Across All States</h4>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                Empowering business owners in Tier-1, Tier-2, and Tier-3 cities with world-class digital standards.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
