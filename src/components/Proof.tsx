import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Trophy, Users, Target } from "lucide-react";

interface ProofItem {
  num: string;
  metric: string;
  title: string;
  highlight: string;
  desc: string;
  image: string;
  tag: string;
}

const proofItems: ProofItem[] = [
  {
    num: "01",
    metric: "10+ YEARS",
    title: "A decade together",
    highlight: "A proven team, not assembled for the pitch.",
    desc: "We have worked side-by-side for over 10 years, building deep trust, shared standards, and a working rhythm that delivers fast, launch-ready results.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    tag: "PROVEN SYNERGY",
  },
  {
    num: "02",
    metric: "100+ SHIPPED",
    title: "100+ Projects shipped",
    highlight: "From early-stage concepts to global platforms.",
    desc: "Shipped enterprise web apps, high-converting digital products, and brand identity systems for ambitious leaders across US & European markets.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
    tag: "TRACK RECORD",
  },
  {
    num: "03",
    metric: "GLOBAL RECOGNITION",
    title: "Award-winning craft",
    highlight: "Recognition across premier design awards.",
    desc: "Honored with Awwwards, Webby Awards, FWA, and BIMA for bespoke digital products, interactive experiences, and brand identity systems.",
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80",
    tag: "AWARDS & ACCLAIM",
  },
  {
    num: "04",
    metric: "100% SENIOR",
    title: "Direct founder access",
    highlight: "The people you meet build your product.",
    desc: "No junior handover or disappearing pitch teams. From kick-off to final delivery, you collaborate directly with senior partners and studio founders.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    tag: "ZERO MIDDLEMEN",
  },
  {
    num: "05",
    metric: "VELOCITY",
    title: "Built for momentum",
    highlight: "Big-agency power without bureaucratic layers.",
    desc: "Lean, fast-moving execution designed to make high-stakes decisions quickly and move seamlessly from strategic concept to production launch.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    tag: "HIGH VELOCITY",
  },
  {
    num: "06",
    metric: "SELECTIVE",
    title: "Fewer clients. Relentless focus.",
    highlight: "Small by design, intense in execution.",
    desc: "We intentionally cap active clients to ensure dedicated senior bandwidth, rapid turnarounds, and relentless focus on your digital outcomes.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
    tag: "DEDICATED FOCUS",
  },
];

export default function Proof() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      const headerText = sectionRef.current?.querySelector(".proof-header-title");
      if (headerText) {
        gsap.fromTo(
          headerText,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerText,
              start: "top 85%",
            },
          }
        );
      }

      // Staggered Row Reveal Animation
      const rows = sectionRef.current?.querySelectorAll(".proof-row-item");
      if (rows) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current?.querySelector(".proof-rows-container"),
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="proof"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#EFECE6] text-[#111827] overflow-hidden border-t border-black/[0.08] px-4 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-black/[0.05] first:border-l first:border-black/[0.05]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1700px] mx-auto">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-black/[0.08] mb-10 sm:mb-14">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-[1px]" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-[#111827]">
              CREDENTIALS & PROOF
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm text-neutral-500 tracking-widest uppercase">
            [ SECTION 05 ]
          </span>
        </div>

        {/* Section Headline */}
        <div className="proof-header-title mb-16 sm:mb-20">
          <h2 className="text-5xl sm:text-7xl lg:text-[110px] xl:text-[145px] font-black tracking-tighter leading-[0.88] text-[#111827] uppercase select-none">
            NEW STUDIO. <br />
            <span className="text-[#2554E8]">NOT NEW TO THIS.</span>
          </h2>
        </div>

        {/* Highlight Stat Counter Pill Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 lg:mb-20">
          {[
            { label: "COMBINED RHYTHM", val: "10+ YRS", icon: Users },
            { label: "PRODUCTS SHIPPED", val: "100+", icon: Target },
            { label: "DESIGN HONORS", val: "AWARDS", icon: Trophy },
            { label: "FOUNDER ACCESS", val: "100%", icon: ShieldCheck },
          ].map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                className="p-6 bg-[#F4F0EA] border border-black/10 rounded-none flex flex-col justify-between hover:bg-[#E4DFD5] transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                    {stat.label}
                  </span>
                  <IconComponent size={18} className="text-[#2554E8]" />
                </div>
                <span className="font-sans font-black text-3xl sm:text-4xl text-[#111827]">
                  {stat.val}
                </span>
              </div>
            );
          })}
        </div>

        {/* Interactive Editorial Credentials List */}
        <div className="proof-rows-container border-t border-black/20 flex flex-col">
          {proofItems.map((item, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`proof-row-item group border-b border-black/15 py-8 sm:py-10 lg:py-12 px-4 sm:px-6 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${
                  isHovered ? "bg-[#E4DFD5] translate-x-2" : "bg-transparent"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
                  {/* Left Column: Number & Big Title */}
                  <div className="lg:w-1/2 flex items-start gap-4 sm:gap-6">
                    <span className="font-mono text-sm sm:text-base font-extrabold text-[#2554E8] tracking-widest pt-1">
                      {item.num}
                    </span>
                    <div>
                      <div className="inline-block px-2.5 py-0.5 mb-2 bg-black/5 border border-black/10 font-mono text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
                        {item.tag}
                      </div>
                      <h3
                        className={`font-sans font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight transition-colors duration-300 ${
                          isHovered ? "text-[#2554E8]" : "text-[#111827]"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Middle Column: Thumbnail Preview & Description */}
                  <div className="lg:w-1/2 flex items-start gap-5 sm:gap-8">
                    {/* Image Thumbnail with Hover Expansion */}
                    <div className="relative shrink-0 overflow-hidden w-20 h-20 sm:w-28 sm:h-28 rounded-none border border-black/10 bg-neutral-900 group-hover:scale-105 transition-transform duration-500 shadow-md">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-[#2554E8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Text Details */}
                    <div className="flex-1">
                      <p className="font-sans text-base sm:text-lg leading-relaxed text-[#111827]">
                        <span className="font-bold text-[#111827]">{item.highlight} </span>
                        <span className="text-[#475569] font-normal">{item.desc}</span>
                      </p>

                      <div className="mt-4 flex items-center gap-2 font-mono text-xs font-bold text-[#2554E8] uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">
                        <span>LEARN MORE</span>
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
