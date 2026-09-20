import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Search, Palette, Rocket, TrendingUp } from "lucide-react";

export default function Process() {
  const containerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: "01",
      title: "Discover & Audit",
      subtitle: "Uncovering your competitive advantage.",
      desc: "We dive deep into your unit economics, customer journey, current positioning, and competitor gaps. We clarify your value proposition before writing a single line of code.",
      deliverables: ["Business & Conversion Audit", "Audience Persona Architecture", "Competitor Matrix & Pricing Strategy", "Growth Roadmap Timeline"],
      icon: Search,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "02",
      title: "Build the Brand",
      subtitle: "Engineering world-class visual authority.",
      desc: "We craft your brand identity, messaging hierarchy, typography rules, color science, and marketing assets. We build belief before clients even book.",
      deliverables: ["Signature Logo & Symbol", "Custom Typography & Palette", "Brand Guidelines & Voice Document", "Social & Marketing Design Kit"],
      icon: Palette,
      image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "03",
      title: "Launch Digitally",
      subtitle: "Bespoke website design & interactive speed.",
      desc: "We engineer a lightning-fast custom web experience with Awwwards-standard interactions, seamless booking workflows, local SEO mastery, and responsive elegance.",
      deliverables: ["Headless Next.js Architecture", "Interactive GSAP Animations", "Automated Booking/E-Commerce", "Speed & On-Page SEO Mastery"],
      icon: Rocket,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "04",
      title: "Grow & Scale",
      subtitle: "Acquisition funnels and continuous optimization.",
      desc: "We turn your new digital presence into a customer acquisition engine with targeted social video reels, paid search ads, automated follow-ups, and monthly conversion iteration.",
      deliverables: ["Short-Form Video Production", "Meta & Google Ads Management", "Automated SMS/Email Retention", "Monthly Analytics & CRO Sprints"],
      icon: TrendingUp,
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Progress line animation on scroll
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 30%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full bg-[#EFECE6] text-[#0F0F11] overflow-hidden border-t border-black/[0.07] py-20 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-12 border-b border-black/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#0022FF]" />
            <span className="font-mono text-xs sm:text-sm tracking-widest uppercase font-bold text-black">
              HOW WE WORK / OUR PROCESS
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase">
            [ 05 / 4-PHASE METHODOLOGY ]
          </span>
        </div>

        {/* Sticky Storytelling Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start">
          
          {/* Left Sticky Storytelling Column */}
          <div className="lg:col-span-5 lg:sticky top-28 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-[#0022FF] uppercase tracking-widest font-bold block mb-3">
                FROM CONCEPT TO CATEGORY LEADER
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black leading-tight mb-6">
                A proven blueprint for digital growth.
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-8">
                We remove guesswork from growing your business. Our disciplined 4-stage framework guarantees your brand, website, and acquisition systems align seamlessly.
              </p>
            </div>

            {/* Visual Process Stepper Indicator */}
            <div className="relative pl-6 hidden lg:block">
              {/* Background Track Line */}
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-black/[0.08]" />
              {/* Active Animated Progress Bar */}
              <div
                ref={progressBarRef}
                className="absolute left-2 top-0 bottom-0 w-0.5 bg-[#0022FF]"
              />

              <div className="flex flex-col gap-8">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-center gap-3 font-mono text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#0022FF]" />
                    <span className="font-bold text-black">{step.number}</span>
                    <span className="text-neutral-500 uppercase">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Scrolling Step Cards */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="p-8 sm:p-12 bg-white/80 backdrop-blur-sm border border-black/[0.08] rounded-2xl shadow-sm hover:shadow-xl hover:border-[#0022FF]/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between border-b border-black/[0.08] pb-6 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-2xl font-black text-[#0022FF]">
                        {step.number}
                      </span>
                      <h3 className="font-sans font-bold text-2xl sm:text-3xl text-black">
                        {step.title}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[#0022FF]/10 text-[#0022FF] flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                  </div>

                  <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-3">
                    {step.subtitle}
                  </p>

                  <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-6">
                    {step.desc}
                  </p>

                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-neutral-900">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover opacity-85"
                    />
                  </div>

                  <div className="pt-4 border-t border-black/[0.06]">
                    <span className="block font-mono text-[11px] text-neutral-400 uppercase tracking-widest mb-3">
                      KEY DELIVERABLES
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {step.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-mono text-neutral-800">
                          <span className="w-1.5 h-1.5 bg-[#0022FF]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
