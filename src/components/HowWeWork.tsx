import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Check } from "lucide-react";

interface Step {
  num: string;
  category: string;
  heading: string;
  desc: string;
  image: string;
}

const steps: Step[] = [
  {
    num: "01",
    category: "IDEA / DISCOVERY",
    heading: "SHARE YOUR AMBITION",
    desc: "Tell us about your business, vision, and product goals. We start by understanding what you're trying to achieve.",
    image: "/how_we_work_01.jpg",
  },
  {
    num: "02",
    category: "UNDERSTAND / RESEARCH",
    heading: "ANALYZE & MAP STRATEGY",
    desc: "We research your market landscape and evaluate competitor positioning to map out a clear, actionable growth strategy.",
    image: "/how_we_work_02.jpg",
  },
  {
    num: "03",
    category: "BUILD / CREATION",
    heading: "CRAFT BRAND & WEBSITE",
    desc: "We turn the strategy into a distinctive visual identity, high-converting website, and modern digital system.",
    image: "/how_we_work_03.jpg",
  },
  {
    num: "04",
    category: "LAUNCH / DEPLOYMENT",
    heading: "GO LIVE ACROSS CHANNELS",
    desc: "We launch the experience across all channels and ensure everything is optimized to perform from day one.",
    image: "/how_we_work_04.jpg",
  },
  {
    num: "05",
    category: "GROW / EXPANSION",
    heading: "CONTINUOUS MONTHLY GROWTH",
    desc: "The work continues after launch through monthly content creation, performance insights, and continuous iteration.",
    image: "/how_we_work_05.jpg",
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const rightVisualRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState<number>(0);
  const currentStepRef = useRef<number>(0);
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: Pinned 2-column visual storytelling with smooth Lenis scrub
      mm.add("(min-width: 1024px)", () => {
        if (!pinWrapperRef.current) return;

        const pinTrigger = ScrollTrigger.create({
          trigger: pinWrapperRef.current,
          start: "top top+=90",
          end: "+=350%",
          pin: true,
          pinSpacing: true,
          scrub: 1, // Smooth Lenis momentum scrub interpolation
          onUpdate: (self) => {
            const step = Math.min(4, Math.floor(self.progress * 4.999));
            if (step !== currentStepRef.current) {
              currentStepRef.current = step;
              setActiveStep(step);
            }
            if (progressLineRef.current) {
              progressLineRef.current.style.height = `${self.progress * 100}%`;
            }
          },
        });

        stRef.current = pinTrigger;
      });

      // Mobile/Tablet: Vertical Scroll Story
      mm.add("(max-width: 1023px)", () => {
        const mobileSections = sectionRef.current?.querySelectorAll(".mobile-phase-story");
        mobileSections?.forEach((sec, index) => {
          ScrollTrigger.create({
            trigger: sec,
            start: "top 55%",
            end: "bottom 55%",
            onEnter: () => setActiveStep(index),
            onEnterBack: () => setActiveStep(index),
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth GSAP transition for the single large visual + text when activeStep changes
  useEffect(() => {
    if (rightVisualRef.current) {
      gsap.fromTo(
        rightVisualRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          clearProps: "transform,opacity",
        }
      );
    }
  }, [activeStep]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    currentStepRef.current = index;

    if (window.innerWidth >= 1024 && stRef.current) {
      const start = stRef.current.start;
      const end = stRef.current.end;
      const targetScroll = start + (index / 4) * (end - start);

      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.scrollTo(targetScroll);
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    } else {
      const targetCard = sectionRef.current?.querySelectorAll(".mobile-phase-story")[index];
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const currentStep = steps[activeStep];

  return (
    <section
      id="how-we-work"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#EFECE6] text-[#111827] overflow-hidden border-t border-black/[0.08] py-20 lg:py-28"
    >
      {/* Background Subtle Structural Guide Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1400px] mx-auto px-6 lg:px-12">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-black/[0.04] first:border-l first:border-black/[0.04]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Header Tag */}
        <div className="pb-5 border-b border-black/[0.08] mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-none" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold text-[#111827]">
              HOW WE WORK
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm text-[#2554E8] tracking-widest uppercase font-bold">
            [ 5-STEP PROCESS ]
          </span>
        </div>

        {/* Big Typography Section Headline & Context Line */}
        <div className="mb-14 sm:mb-16 max-w-4xl">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.92] text-[#111827] uppercase select-none mb-4">
            A TRANSPARENT, CONNECTED <span className="text-[#2554E8]">ROADMAP TO LAUNCH.</span>
          </h2>
          <p className="font-sans text-base sm:text-xl text-[#475569] leading-relaxed">
            No guesswork, no complex jargon. Our 5-step process takes your project seamlessly from raw concept to continuous growth.
          </p>
        </div>

        {/* Desktop Pinned 2-Column Storytelling (>= 1024px) */}
        <div ref={pinWrapperRef} className="relative w-full">
          <div className="hidden lg:grid grid-cols-12 gap-12 xl:gap-20 items-center min-h-[580px]">
            
            {/* LEFT SIDE: Minimal 5-Step Navigation Timeline (35% width) */}
            <div className="col-span-4 relative pl-8 py-4">
              {/* Timeline Track Line */}
              <div className="absolute left-[15px] top-6 bottom-6 w-[2px] bg-black/10 rounded-none z-0" />
              
              {/* Animated Progress Fill Line */}
              <div
                ref={progressLineRef}
                className="absolute left-[15px] top-6 w-[2px] bg-[#2554E8] rounded-none z-0 transition-all duration-200 ease-out"
                style={{ height: "0%" }}
              />

              <div className="space-y-9 relative z-10">
                {steps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isPassed = idx < activeStep;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleStepClick(idx)}
                      className={`w-full text-left flex items-start gap-5 group transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "opacity-100 translate-x-1"
                          : isPassed
                          ? "opacity-75"
                          : "opacity-35 hover:opacity-70"
                      }`}
                    >
                      {/* Sharp Square Node Indicator */}
                      <div
                        className={`relative z-10 flex items-center justify-center shrink-0 w-8 h-8 rounded-none transition-all duration-300 ${
                          isActive
                            ? "bg-[#2554E8] text-white shadow-lg shadow-[#2554E8]/30 ring-4 ring-[#2554E8]/20 scale-105"
                            : isPassed
                            ? "bg-[#2554E8] text-white"
                            : "bg-[#EFECE6] border-2 border-black/20 text-neutral-400 group-hover:border-[#2554E8]"
                        }`}
                      >
                        {isPassed ? (
                          <Check size={14} strokeWidth={3} />
                        ) : (
                          <span className="font-mono text-xs font-black">{step.num}</span>
                        )}
                      </div>

                      {/* Step Text Info */}
                      <div className="pt-0.5 space-y-1">
                        <span
                          className={`font-mono text-[11px] font-bold tracking-widest uppercase block transition-colors ${
                            isActive ? "text-[#2554E8]" : "text-neutral-400"
                          }`}
                        >
                          {step.category}
                        </span>

                        <h3
                          className={`font-sans font-black text-lg xl:text-xl tracking-tight uppercase leading-snug transition-colors ${
                            isActive ? "text-[#111827]" : "text-neutral-500 group-hover:text-[#111827]"
                          }`}
                        >
                          {step.heading}
                        </h3>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT SIDE: One Large Visual (Sharp Corners) + Minimal Story Content (65% width) */}
            <div className="col-span-8 relative">
              <div ref={rightVisualRef} className="space-y-6">
                
                {/* ONE Large Visual Image (Sharp Corners: rounded-none) */}
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-none bg-[#111827] border border-black/10 shadow-2xl">
                  <img
                    src={currentStep.image}
                    alt={currentStep.heading}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Phase Badge on Visual (Sharp Corners: rounded-none) */}
                  <div className="absolute top-5 left-5 px-3.5 py-1.5 bg-[#111827]/85 backdrop-blur-md text-white font-mono text-xs font-bold uppercase tracking-widest border border-white/10 rounded-none">
                    PHASE {currentStep.num} — {currentStep.category}
                  </div>
                </div>

                {/* Minimal Phase Text Content */}
                <div className="pt-2 max-w-2xl space-y-3">
                  <h3 className="font-sans font-black text-3xl xl:text-4xl text-[#111827] uppercase tracking-tight leading-tight">
                    {currentStep.heading}
                  </h3>
                  <p className="font-sans text-base xl:text-lg text-[#475569] leading-relaxed">
                    {currentStep.desc}
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* MOBILE / TABLET VERTICAL STORY LAYOUT (< 1024px) */}
          <div className="block lg:hidden space-y-16">
            {steps.map((step, idx) => (
              <div key={idx} className="mobile-phase-story space-y-6">
                {/* Visual Image (Sharp Corners: rounded-none) */}
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-none bg-[#111827] border border-black/10 shadow-xl">
                  <img
                    src={step.image}
                    alt={step.heading}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#2554E8] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-none">
                    PHASE {step.num}
                  </div>
                </div>

                {/* Minimal Content */}
                <div className="space-y-2">
                  <span className="font-mono text-xs text-[#2554E8] font-bold uppercase tracking-widest block">
                    {step.category}
                  </span>
                  <h3 className="font-sans font-black text-2xl text-[#111827] uppercase tracking-tight">
                    {step.heading}
                  </h3>
                  <p className="font-sans text-sm text-[#475569] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

