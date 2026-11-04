import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInquiry } from "@/context/InquiryContext";

interface ServiceItem {
  name: string;
}

interface ServiceCategory {
  id: string;
  number: string;
  shortTitle: string;
  fullTitle: string;
  desc: string;
  items: ServiceItem[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "01",
    number: "01",
    shortTitle: "AI Services",
    fullTitle: "AI Services",
    desc: "Smart AI integration & custom workflow solutions to automate repetitive work.",
    items: [
      { name: "AI Workflow Solutions" },
      { name: "Custom Business AI Tools" },
      { name: "AI Content & Copywriting" },
      { name: "Customer Inquiry Assistants" },
    ],
  },
  {
    id: "02",
    number: "02",
    shortTitle: "Branding",
    fullTitle: "Branding & Visual Identity",
    desc: "Crafting distinct visual identities and positioning for modern businesses.",
    items: [
      { name: "Logo & Visual Identity" },
      { name: "Brand Guidelines & Typography" },
      { name: "Brand Positioning & Strategy" },
      { name: "Marketing & Brand Collateral" },
    ],
  },
  {
    id: "03",
    number: "03",
    shortTitle: "Social Media",
    fullTitle: "Social Media Marketing",
    desc: "End-to-end content creation, reels, captions, and account management.",
    items: [
      { name: "Social Media Posts & Graphics" },
      { name: "Reels & Short Video Creation" },
      { name: "Captions & Strategic Copywriting" },
      { name: "Content Scheduling & Management" },
    ],
  },
  {
    id: "04",
    number: "04",
    shortTitle: "Website Design",
    fullTitle: "Website Design & Craft",
    desc: "High-converting, responsive, and aesthetically stunning modern websites.",
    items: [
      { name: "Custom Responsive Web Design" },
      { name: "UI/UX & Mobile Optimization" },
      { name: "Landing Pages & E-Commerce" },
      { name: "Performance & SEO Setup" },
    ],
  },
  {
    id: "05",
    number: "05",
    shortTitle: "Digital Setup",
    fullTitle: "Digital Business Setup",
    desc: "Complete digital infrastructure establishment for new and existing businesses.",
    items: [
      { name: "Google Business Profile Creation & Optimization" },
      { name: "Domain & Professional Email Setup" },
      { name: "Local Listing & Map Presence" },
      { name: "Digital Business Onboarding" },
    ],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  // Default to null when not hovering so all panels start equal, or set an active card
  const [activeId, setActiveId] = useState<string | null>(null);
  const router = useRouter();
  const { addService, toggleService, isServiceSelected } = useInquiry();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = sectionRef.current?.querySelector(".services-card-container");
      if (container) {
        gsap.fromTo(
          container,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#EFECE6] text-[#111827] overflow-hidden border-t border-black/[0.08] px-4 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36"
    >
      {/* Background Grid Lines */}
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
        <div className="flex items-center justify-between pb-6 border-b border-black/[0.08] mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-[1px]" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-[#111827]">
              OUR SERVICES
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm text-[#2554E8] tracking-widest uppercase font-bold">
            [ 05 PRIMARY SERVICES ]
          </span>
        </div>

        {/* Big Typography Heading */}
        <h2 className="text-5xl sm:text-7xl lg:text-[110px] xl:text-[140px] font-black tracking-tighter leading-[0.88] text-[#111827] mb-10 sm:mb-14 select-none uppercase">
          OUR CAPABILITIES
        </h2>

        {/* Outer Box Container with smooth onMouseLeave reset */}
        <div className="relative w-full">
          <div
            onMouseLeave={() => setActiveId(null)}
            className="services-card-container w-full min-h-[580px] lg:h-[68vh] lg:max-h-[750px] bg-[#F4F0EA] border border-black/10 rounded-none overflow-hidden flex flex-col lg:flex-row shadow-sm"
          >
            {serviceCategories.map((cat, idx) => {
              const isHovered = activeId === cat.id;
              const isAnyHovered = activeId !== null;

              // Calculate flex values smoothly
              // When nothing is hovered: all get flex-grow = 1
              // When one is hovered: hovered gets flex-grow = 3.5, others get flex-grow = 0.65
              let flexStyle = 1;
              if (isAnyHovered) {
                flexStyle = isHovered ? 3.5 : 0.65;
              }

              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setActiveId(cat.id)}
                  onClick={() => setActiveId(cat.id)}
                  style={{
                    flexGrow: flexStyle,
                    flexShrink: flexStyle,
                  }}
                  className={`min-w-0 relative cursor-pointer overflow-hidden transition-[flex-grow,flex-shrink,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isHovered ? "bg-[#E4DFD5]" : "bg-[#F4F0EA]"
                  } ${
                    idx !== serviceCategories.length - 1
                      ? "border-b lg:border-b-0 lg:border-r border-black/[0.12]"
                      : ""
                  }`}
                >
                  {/* COLLAPSED / RESTING VIEW (Fades out quickly on expand, delays fade-in on collapse) */}
                  <div
                    className={`absolute inset-0 p-6 sm:p-8 flex lg:flex-col justify-between lg:justify-end items-center lg:items-start h-full w-full transition-all duration-300 ${
                      isHovered
                        ? "opacity-0 pointer-events-none scale-95 delay-0"
                        : "opacity-100 pointer-events-auto scale-100 delay-200"
                    }`}
                  >
                    {/* Vertical Title for Desktop */}
                    <div className="hidden lg:block mb-8 [writing-mode:vertical-lr] rotate-180 font-sans font-black text-2xl lg:text-3xl text-[#111827] tracking-tight select-none uppercase whitespace-nowrap">
                      {cat.shortTitle}
                    </div>

                    {/* Horizontal Title for Mobile */}
                    <div className="lg:hidden font-sans font-black text-xl text-[#111827]">
                      {cat.shortTitle}
                    </div>

                    <div className="font-mono text-base font-extrabold text-[#2554E8]">
                      {cat.number}
                    </div>
                  </div>

                  {/* EXPANDED VIEW (Fades in after expand starts, vanishes immediately on collapse to prevent text leaking) */}
                  <div
                    className={`absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-between h-full w-full overflow-hidden transition-all ${
                      isHovered
                        ? "opacity-100 pointer-events-auto translate-y-0 duration-400 delay-150"
                        : "opacity-0 pointer-events-none translate-y-2 duration-150 delay-0"
                    }`}
                  >
                    <div className="min-w-0">
                      {/* Title Header */}
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="font-mono text-base font-bold text-[#2554E8]">
                          {cat.number}
                        </span>
                        <h3 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#111827] tracking-tight uppercase leading-tight">
                          {cat.fullTitle}
                        </h3>
                      </div>

                      <p className="font-sans text-xs sm:text-sm text-[#475569] mb-6 leading-relaxed">
                        {cat.desc}
                      </p>

                      {/* Sub-services List */}
                      <div className="border-t border-black/10">
                        {cat.items.map((item, itemIdx) => {
                          const isSelected = isServiceSelected(item.name);
                          return (
                            <div
                              key={itemIdx}
                              onClick={() => {
                                addService(item.name);
                                router.push(`/contact?service=${encodeURIComponent(item.name)}`);
                              }}
                              className="group py-3 sm:py-3.5 border-b border-black/10 flex items-center justify-between cursor-pointer transition-colors duration-200"
                            >
                              <span
                                className={`font-sans font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 ${
                                  isSelected ? "text-[#2554E8]" : "text-[#111827] group-hover:text-[#2554E8] group-hover:translate-x-1"
                                }`}
                              >
                                {isSelected && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#2554E8]" />
                                )}
                                <span>{item.name}</span>
                              </span>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleService(item.name);
                                  }}
                                  className={`px-2 py-0.5 font-mono text-[9px] font-extrabold uppercase border rounded-[1px] transition-all ${
                                    isSelected
                                      ? "bg-[#2554E8] text-white border-[#2554E8]"
                                      : "bg-white/80 hover:bg-white text-[#111827] border-black/20 hover:border-[#2554E8]"
                                  }`}
                                >
                                  {isSelected ? "✓ Added" : "+ Select"}
                                </button>
                                <ArrowUpRight
                                  size={16}
                                  className={`transition-all duration-300 flex-shrink-0 ${
                                    isSelected ? "text-[#2554E8]" : "text-neutral-500 group-hover:text-[#2554E8]"
                                  }`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer branding */}
                    <div className="pt-4 mt-4 flex items-center justify-between font-mono text-[11px] text-neutral-500 uppercase tracking-widest font-semibold border-t border-black/5">
                      <span>OneNexus Services</span>
                      <span className="text-[#2554E8]">{cat.number} / 05</span>
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


