import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TrendingUp, Users, Award, ShieldCheck } from "lucide-react";

export default function TrustImpact() {
  const containerRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Metric numbers count up / reveal
      const counterElements = countersRef.current?.querySelectorAll(".stat-box");
      if (counterElements) {
        gsap.fromTo(
          counterElements,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: countersRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      value: "120+",
      label: "Businesses Scaled",
      desc: "From local leaders to category champions",
      icon: Users,
    },
    {
      value: "98.4%",
      label: "Client Retention Rate",
      desc: "Long-term growth and partnership",
      icon: ShieldCheck,
    },
    {
      value: "3.8x",
      label: "Average Revenue Growth",
      desc: "Measured over first 12 months",
      icon: TrendingUp,
    },
    {
      value: "42+",
      label: "Industry Design Awards",
      desc: "Recognized for craft and impact",
      icon: Award,
    },
  ];

  const clientLogos = [
    "AURA CLINIC",
    "NOVA FITNESS",
    "KINETIC LAB",
    "LUMIÈRE SALON",
    "VERTEX COFFEE",
    "OASIS WELLNESS",
    "PRISM BOUTIQUE",
    "FORGE DENTAL",
    "VELOCE MOTORS",
    "SOLACE SPA",
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#EFECE6] text-[#0F0F11] overflow-hidden border-t border-black/[0.07] py-20 lg:py-28"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header Eyebrow */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-12 border-b border-black/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#0022FF]" />
            <span className="font-mono text-xs sm:text-sm tracking-widest uppercase font-bold text-black">
              PROVEN RESULTS / TRUST & IMPACT
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase">
            [ 01 / TRACK RECORD ]
          </span>
        </div>

        {/* 4 Stat Metric Cards Grid */}
        <div
          ref={countersRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="stat-box p-8 bg-white/70 backdrop-blur-sm border border-black/[0.08] rounded-2xl hover:border-[#0022FF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.02]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0022FF]/10 text-[#0022FF] flex items-center justify-center mb-6">
                  <Icon size={20} />
                </div>
                <div className="font-sans font-extrabold text-4xl sm:text-5xl text-black tracking-tight mb-2">
                  {stat.value}
                </div>
                <div className="font-sans font-bold text-base text-neutral-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-neutral-500 text-xs font-normal leading-relaxed">
                  {stat.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Infinite Horizontal Client Logo Marquee */}
        <div className="mt-8 pt-10 border-t border-black/[0.07] overflow-hidden">
          <p className="text-center font-mono text-xs tracking-widest text-neutral-500 uppercase mb-8">
            TRUSTED BY AMBITIOUS BUSINESSES & FOUNDERS NATIONWIDE
          </p>
          
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-12 sm:gap-16 items-center">
              {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={index}
                  className="font-mono text-sm sm:text-base font-bold text-neutral-400 hover:text-black transition-colors duration-200 tracking-widest uppercase flex items-center gap-4 select-none cursor-default"
                >
                  <span>{logo}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0022FF]/50" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
