import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight, Layers, Sparkles, TrendingUp, Cpu, Compass, ShieldCheck } from "lucide-react";

interface StepBlock {
  step: string;
  badge: string;
  title: string;
  desc: string;
  metric: string;
  metricLabel: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  theme: "light" | "blue" | "dark";
}

const leftBlocks: StepBlock[] = [
  {
    step: "01",
    badge: "FOUNDATION / STRATEGY",
    title: "Market Positioning",
    desc: "Deconstruct market friction, architect strategic growth flywheels.",
    metric: "+340%",
    metricLabel: "ORGANIC PIPELINE",
    icon: Compass,
    theme: "light",
  },
  {
    step: "02",
    badge: "IDENTITY & DESIGN",
    title: "Editorial Brand System",
    desc: "Awwwards-tier visual language engineered for high-conviction brands.",
    metric: "4.9x",
    metricLabel: "BRAND RECALL",
    icon: Sparkles,
    theme: "blue",
  },
];

const rightBlocks: StepBlock[] = [
  {
    step: "03",
    badge: "PRODUCT & ARCHITECTURE",
    title: "High-Speed Platforms",
    desc: "Next-gen web applications built for seamless conversions and scale.",
    metric: "<50ms",
    metricLabel: "GLOBAL TTFB",
    icon: Cpu,
    theme: "dark",
  },
  {
    step: "04",
    badge: "EXPANSION & SCALE",
    title: "Compound Growth Loops",
    desc: "Data-driven acquisition and automated retention mechanisms.",
    metric: "$24M+",
    metricLabel: "VENTURE VALUE",
    icon: TrendingUp,
    theme: "light",
  },
];

export default function GrowthHeroBlocks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Step-by-step sequential stagger entrance
      gsap.fromTo(
        ".growth-hero-block",
        {
          y: 40,
          opacity: 0,
          scale: 0.94,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      // Subtle breathing float animation for left & right pillars
      gsap.to(".growth-block-float-1", {
        y: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".growth-block-float-2", {
        y: 8,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const renderBlock = (item: StepBlock, idx: number, floatClass: string) => {
    const isBlue = item.theme === "blue";
    const isDark = item.theme === "dark";
    const IconComponent = item.icon;

    return (
      <div
        key={item.step}
        className={`growth-hero-block ${floatClass} group relative p-6 sm:p-7 rounded-[4px] border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer ${
          isBlue
            ? "bg-[#0022FF] text-white border-[#0022FF] shadow-lg shadow-blue-500/20"
            : isDark
            ? "bg-[#111115] text-white border-neutral-800 shadow-xl"
            : "bg-white/90 backdrop-blur-md text-black border-black/[0.09] shadow-sm hover:border-black/20"
        }`}
      >
        {/* Step Indicator Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-current/10 mb-4">
          <div className="flex items-center gap-2">
            <span
              className={`font-mono text-xs font-bold px-2 py-0.5 rounded-[2px] tracking-wider ${
                isBlue
                  ? "bg-white text-[#0022FF]"
                  : isDark
                  ? "bg-[#0022FF] text-white"
                  : "bg-black text-white"
              }`}
            >
              STEP {item.step}
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-70">
              {item.badge}
            </span>
          </div>

          <IconComponent
            size={18}
            className={`transition-transform duration-300 group-hover:scale-110 ${
              isBlue ? "text-white" : isDark ? "text-[#0022FF]" : "text-[#0022FF]"
            }`}
          />
        </div>

        {/* Title & Description */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed opacity-80 mb-5 font-normal">
          {item.desc}
        </p>

        {/* Growth Metric Bottom Row */}
        <div className="pt-3 border-t border-current/10 flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider opacity-60 block">
              {item.metricLabel}
            </span>
            <span
              className={`text-xl sm:text-2xl font-black font-sans tracking-tight ${
                isBlue ? "text-white" : isDark ? "text-[#0022FF]" : "text-black"
              }`}
            >
              {item.metric}
            </span>
          </div>

          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
              isBlue
                ? "bg-white/10 group-hover:bg-white text-white group-hover:text-[#0022FF]"
                : isDark
                ? "bg-white/10 group-hover:bg-[#0022FF] text-white"
                : "bg-neutral-100 group-hover:bg-[#0022FF] text-black group-hover:text-white"
            }`}
          >
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-[1400px] mx-auto px-2 sm:px-4 my-6 sm:my-8 pointer-events-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        
        {/* LEFT COLUMN: Steps 01 & 02 */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-1 px-1">
            <span className="w-2 h-2 rounded-full bg-[#0022FF] animate-pulse" />
            <span className="font-mono text-[11px] tracking-widest text-neutral-500 uppercase font-semibold">
              PHASE I — FOUNDATION & IDENTITY
            </span>
          </div>
          {leftBlocks.map((b, i) =>
            renderBlock(b, i, i === 0 ? "growth-block-float-1" : "growth-block-float-2")
          )}
        </div>

        {/* RIGHT COLUMN: Steps 03 & 04 */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 mb-1 px-1">
            <span className="w-2 h-2 rounded-full bg-[#0022FF] animate-pulse" />
            <span className="font-mono text-[11px] tracking-widest text-neutral-500 uppercase font-semibold">
              PHASE II — VELOCITY & SCALE
            </span>
          </div>
          {rightBlocks.map((b, i) =>
            renderBlock(b, i, i === 0 ? "growth-block-float-2" : "growth-block-float-1")
          )}
        </div>

      </div>
    </div>
  );
}
