import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

interface ServiceItem {
  name: string;
}

interface ServiceCategory {
  id: string;
  number: string;
  shortTitle: string;
  fullTitle: string;
  items: ServiceItem[];
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "01",
    number: "01",
    shortTitle: "Brand Strategy",
    fullTitle: "Brand Strategy",
    items: [
      { name: "Brand Positioning & Messaging" },
      { name: "Logo & Complete Brand Identity" },
      { name: "Corporate Design & Guidelines" },
      { name: "Brand Architecture & Audits" },
    ],
  },
  {
    id: "02",
    number: "02",
    shortTitle: "Design",
    fullTitle: "Design",
    items: [
      { name: "Corporate Design" },
      { name: "Webdesign & UI/UX" },
      { name: "Creation & Campaign Ideas" },
      { name: "User Interface Design" },
    ],
  },
  {
    id: "03",
    number: "03",
    shortTitle: "Engineering",
    fullTitle: "Engineering",
    items: [
      { name: "Web Application Development" },
      { name: "Frontend & Motion Experience" },
      { name: "Full-Stack System Architecture" },
      { name: "Performance & SEO Infrastructure" },
    ],
  },
  {
    id: "04",
    number: "04",
    shortTitle: "Intelligence",
    fullTitle: "Intelligence",
    items: [
      { name: "Digital Growth Strategy" },
      { name: "Data-Driven Content Strategy" },
      { name: "Analytics & Conversion Scale" },
      { name: "AI Automation & Workflows" },
    ],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // GSAP Smooth Flex Width Expansion & Color Transition
  useEffect(() => {
    serviceCategories.forEach((cat, idx) => {
      const el = panelRefs.current[idx];
      if (!el) return;

      const isActive = activeId === cat.id;
      const isDefault = activeId === null;

      let targetFlex = 1;
      let targetBg = "#F4F0EA";

      if (isDefault) {
        targetFlex = 1;
        targetBg = "#F4F0EA";
      } else if (isActive) {
        targetFlex = 3.6;
        targetBg = "#E4DFD5";
      } else {
        targetFlex = 0.65;
        targetBg = "#F4F0EA";
      }

      gsap.to(el, {
        flexGrow: targetFlex,
        flexShrink: targetFlex,
        backgroundColor: targetBg,
        duration: 0.65,
        ease: "power3.out",
        overwrite: "auto",
      });

      // Animate expanded sub-services list fade-in
      const expandedContent = el.querySelector(".expanded-content");
      if (expandedContent && isActive) {
        gsap.fromTo(
          expandedContent,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.45, delay: 0.12, ease: "power2.out" }
        );
      }
    });
  }, [activeId]);

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
              SERVICES & DISCIPLINES
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm text-neutral-500 tracking-widest uppercase">
            [ SECTION 04 ]
          </span>
        </div>

        {/* Big Typography Heading */}
        <h2 className="text-6xl sm:text-8xl lg:text-[120px] xl:text-[160px] font-black tracking-tighter leading-[0.88] text-[#111827] mb-10 sm:mb-14 select-none uppercase">
          OUR CAPABILITIES
        </h2>

        {/* Near Full Screen-Size Outer Box */}
        <div className="relative w-full">
          <div
            onMouseLeave={() => setActiveId(null)}
            className="services-card-container w-full h-[72vh] min-h-[620px] max-h-[820px] bg-[#F4F0EA] border border-black/10 rounded-none overflow-hidden flex flex-col lg:flex-row shadow-sm"
          >
            {serviceCategories.map((cat, idx) => {
              const isActive = activeId === cat.id;

              return (
                <div
                  key={cat.id}
                  ref={(el) => {
                    panelRefs.current[idx] = el;
                  }}
                  onMouseEnter={() => setActiveId(cat.id)}
                  style={{ flex: 1 }}
                  className={`relative cursor-pointer overflow-hidden ${
                    idx !== serviceCategories.length - 1
                      ? "border-b lg:border-b-0 lg:border-r border-black/[0.12]"
                      : ""
                  }`}
                >
                  {/* EXPANDED PANEL (Image 2 style) */}
                  {isActive ? (
                    <div className="expanded-content p-8 sm:p-12 lg:p-16 flex flex-col justify-between h-full w-full">
                      <div>
                        {/* Title Header */}
                        <div className="flex items-baseline gap-4 mb-8 sm:mb-12">
                          <span className="font-mono text-base sm:text-lg font-semibold text-neutral-500">
                            {cat.number}
                          </span>
                          <h3 className="font-sans font-black text-3xl sm:text-5xl lg:text-6xl text-[#111827] tracking-tight">
                            {cat.fullTitle}
                          </h3>
                        </div>

                        {/* Sub-services List with Arrow Icons */}
                        <div className="border-t border-black/10">
                          {cat.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="group py-4 sm:py-6 border-b border-black/10 flex items-center justify-between cursor-pointer transition-colors duration-200"
                            >
                              <span className="font-sans font-bold text-xl sm:text-2xl lg:text-3xl text-[#111827] group-hover:text-[#2554E8] group-hover:translate-x-1.5 transition-all duration-300">
                                {item.name}
                              </span>
                              <ArrowUpRight
                                size={26}
                                className="text-neutral-500 group-hover:text-[#2554E8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer branding */}
                      <div className="pt-8 mt-auto flex items-center justify-between font-mono text-xs sm:text-sm text-neutral-500 uppercase tracking-widest font-semibold">
                        <span>ONE NEXUS Studio</span>
                        <span className="text-[#2554E8]">{cat.number} / 04</span>
                      </div>
                    </div>
                  ) : (
                    /* COLLAPSED PANEL (Image 1 style: Vertical titles placed at the BOTTOM with bottom numbers) */
                    <div className="p-8 sm:p-10 lg:p-12 flex lg:flex-col justify-end items-start h-full w-full">
                      {/* Vertical Pillar Name for Desktop (Positioned at Bottom, Big Font) */}
                      <div className="hidden lg:block mb-8 [writing-mode:vertical-lr] rotate-180 font-sans font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#111827] tracking-tight select-none">
                        {cat.shortTitle}
                      </div>

                      {/* Horizontal Title for Mobile */}
                      <div className="lg:hidden font-sans font-black text-2xl text-[#111827] mb-2">
                        {cat.shortTitle}
                      </div>

                      {/* Number at bottom left (matches Image 1) */}
                      <div className="font-mono text-base sm:text-lg font-extrabold text-neutral-400 select-none">
                        {cat.number}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
