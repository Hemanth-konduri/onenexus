import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

interface Project {
  number: string;
  title: string;
  category: string;
  tag: string;
  year: string;
  image: string;
  offset?: string;
}

const projects: Project[] = [
  {
    number: "01",
    title: "FLIT",
    category: "AI Real Estate Platform",
    tag: "BRAND • PRODUCT • AI",
    year: "2026",
    image: "/work_flit.jpg",
  },
  {
    number: "02",
    title: "OPUS",
    category: "Enterprise Brand Intelligence",
    tag: "SAAS PLATFORM • DESIGN SYSTEM",
    year: "2026",
    image: "/work_opus.jpg",
    offset: "md:mt-24",
  },
  {
    number: "03",
    title: "KITTY",
    category: "Shared Group Payments",
    tag: "FINTECH • MOBILE APP",
    year: "2025",
    image: "/work_kitty.jpg",
  },
  {
    number: "04",
    title: "NEXUS FLOW",
    category: "Autonomous Growth Engine",
    tag: "WEB ENGINEERING • CONVERSION",
    year: "2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    offset: "md:mt-24",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".work-card");
      if (cards && cards.length > 0) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#EFECE6] text-[#111827] overflow-hidden border-t border-black/[0.08] py-24 sm:py-32 lg:py-40"
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

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Top Section Header Bar */}
        <div className="flex items-center justify-between pb-8 border-b border-black/[0.08] mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-[1px]" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-[#111827]">
              SELECTED WORK
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm text-neutral-500 tracking-widest uppercase">
            [ SECTION 03 ]
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <h2 className="text-5xl sm:text-7xl lg:text-[120px] xl:text-[150px] font-black tracking-tighter leading-[0.86] text-[#111827] mb-16 sm:mb-24 select-none uppercase">
          PROOF OF CRAFT
        </h2>

        {/* Awwwards Staggered 2-Column Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {projects.map((project, index) => (
            <article
              key={index}
              className={`work-card group relative flex flex-col gap-4 cursor-pointer ${project.offset || ""}`}
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-[#111827] rounded-[4px] overflow-hidden border border-black/10 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#172554]/90 backdrop-blur-md text-[#F8FAFC] font-mono text-[10px] tracking-widest uppercase rounded-[2px] font-bold">
                    {project.number} / {project.year}
                  </span>
                </div>

                {/* Floating Magnetic Arrow Icon */}
                <div className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-[#172554] text-white flex items-center justify-center group-hover:bg-[#2554E8] group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shadow-xl">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              {/* Minimalist Title & Meta info below image (Zero fluff text) */}
              <div className="flex items-baseline justify-between pt-1">
                <h3 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-[#111827] tracking-tight group-hover:text-[#2554E8] transition-colors duration-300">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-[#475569] uppercase font-semibold tracking-wider">
                  {project.category}
                </span>
              </div>

              <div className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
                {project.tag}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
