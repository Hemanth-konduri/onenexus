import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CheckCircle2, Shield, Sparkles, TrendingUp } from "lucide-react";

export default function Philosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const textRevealRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Narrative text scroll illumination
      const words = textRevealRef.current?.querySelectorAll(".reveal-word");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { color: "rgba(195, 194, 191, 0.4)", y: 4 },
          {
            color: "#0F0F11",
            y: 0,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: textRevealRef.current,
              start: "top 80%",
              end: "bottom 50%",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const statement =
    "Most agencies sell hours or generic templates. We build category leadership. By uniting founder strategy, world-class craftsmanship, and growth engineering, we turn ambitious small businesses into undeniable market authorities.";

  const pillars = [
    {
      title: "Customer-First Strategy",
      desc: "Every visual asset, headline, and page layout is engineered around how your high-value clients actually evaluate trust, quality, and decision-making.",
      icon: Shield,
    },
    {
      title: "Bespoke Digital Craftsmanship",
      desc: "Zero off-the-shelf themes or cookie-cutter solutions. We build tailored headless web experiences that reflect your standard of luxury and excellence.",
      icon: Sparkles,
    },
    {
      title: "Growth Through Design & Marketing",
      desc: "Stunning design without acquisition is art. Marketing without brand presence is noise. We integrate both to build sustained customer pipeline.",
      icon: TrendingUp,
    },
  ];

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative w-full bg-[#EFECE6] text-[#0F0F11] overflow-hidden border-t border-black/[0.07] py-20 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Eyebrow Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-12 border-b border-black/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#0022FF]" />
            <span className="font-mono text-xs sm:text-sm tracking-widest uppercase font-bold text-black">
              OUR MANIFESTO / WHY ONE NEXUS
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase">
            [ 04 / PHILOSOPHY ]
          </span>
        </div>

        {/* Split Layout: Large Narrative on Left, 3 Feature Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 items-start">
          
          {/* Left Large Statement */}
          <div className="lg:col-span-6 sticky top-28">
            <h3 className="font-mono text-xs text-[#0022FF] uppercase tracking-widest font-bold mb-4">
              THE CORE DIFFERENCE
            </h3>
            <p
              ref={textRevealRef}
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15]"
            >
              {statement.split(" ").map((word, i) => (
                <span key={i} className="reveal-word inline-block mr-2 sm:mr-3">
                  {word}
                </span>
              ))}
            </p>
          </div>

          {/* Right 3 Comparative Feature Blocks */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="p-8 sm:p-10 bg-white/80 backdrop-blur-sm border border-black/[0.08] rounded-2xl shadow-sm hover:shadow-xl hover:border-[#0022FF]/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0022FF]/10 text-[#0022FF] flex items-center justify-center mb-6">
                    <Icon size={24} />
                  </div>
                  <h4 className="text-2xl font-bold font-sans text-black mb-3">
                    {pillar.title}
                  </h4>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
