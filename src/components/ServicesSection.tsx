import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Bot,
  Palette,
  Share2,
  Layout,
  Store,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Cpu,
  Layers,
  Code2,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface Capability {
  num: string;
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  icon: any;
  deliverables: string[];
  techStack: string[];
  output: string;
  image: string;
  accentColor: string;
  metric: string;
}

const capabilitiesData: Capability[] = [
  {
    num: "01",
    id: "ai-services",
    category: "INTELLIGENT WORKFLOWS",
    title: "AI SERVICES & AUTOMATION",
    tagline: "SMART WORKFLOWS & CUSTOM BUSINESS AI",
    description:
      "Empower your business with modern AI integrations, automated workflow systems, and smart copywriting tools designed to eliminate repetitive tasks and scale operations.",
    icon: Bot,
    deliverables: [
      "AI Workflow Solutions & Automation",
      "Custom Business AI Assistants",
      "AI Copywriting & Content Tools",
      "Customer Inquiry & Chat Assistants",
    ],
    techStack: ["OpenAI API", "Python / LangChain", "Zapier Automation", "Custom LLM Workflows"],
    output: "Automated business workflows & 10x operational efficiency",
    image: "/how_we_work_01.jpg",
    accentColor: "#2554E8",
    metric: "10x Operational Speed",
  },
  {
    num: "02",
    id: "branding",
    category: "IDENTITY & POSITIONING",
    title: "BRANDING & VISUAL CRAFT",
    tagline: "DISTINCT BRAND POSITIONING & LOGO DESIGN",
    description:
      "Craft a memorable visual identity that makes your business look professional, highly credible, and instantly distinct from competitors in your industry.",
    icon: Palette,
    deliverables: [
      "Logo & Complete Visual Identity",
      "Brand Guidelines & Typography System",
      "Brand Positioning & Strategic Messaging",
      "Marketing & Social Media Collateral",
    ],
    techStack: ["Figma Systems", "Adobe Creative Suite", "Brand Guidelines", "Vector Assets"],
    output: "Complete brand guidelines & launch-ready visual identity",
    image: "/how_we_work_03.jpg",
    accentColor: "#2554E8",
    metric: "Instant Brand Equity",
  },
  {
    num: "03",
    id: "social-media",
    category: "VIDEO & CONTENT ENGINE",
    title: "SOCIAL MEDIA MARKETING",
    tagline: "REELS, CONTENT CREATION & MANAGEMENT",
    description:
      "Build an active social presence that engages followers and attracts clients through custom post graphics, short-form reels, strategic captions, and scheduled publishing.",
    icon: Share2,
    deliverables: [
      "Social Media Posts & Visual Graphics",
      "Reels & Short Video Content Creation",
      "Captions & Strategic Copywriting",
      "Content Scheduling & Account Strategy",
    ],
    techStack: ["Premiere Pro", "After Effects", "Meta Business Suite", "Analytics Engine"],
    output: "Monthly content calendar & managed social channels",
    image: "/monthly_growth_01.jpg",
    accentColor: "#2554E8",
    metric: "High Reach & Engagement",
  },
  {
    num: "04",
    id: "website-design",
    category: "HIGH-SPEED NEXT.JS WEBSITES",
    title: "WEBSITE ENGINEERING & UX CRAFT",
    tagline: "HIGH-CONVERTING, RESPONSIVE MODERN WEBSITES",
    description:
      "We engineer fast, mobile-friendly, aesthetically stunning websites built to convert visitors into paying clients with seamless UI/UX and smooth motion design.",
    icon: Layout,
    deliverables: [
      "Custom Responsive Web Engineering",
      "UI/UX & Mobile Optimization",
      "Landing Pages & E-Commerce Systems",
      "Speed Performance & SEO Infrastructure",
    ],
    techStack: ["Next.js 16", "React 19", "Tailwind CSS", "GSAP & Lenis Motion"],
    output: "Production-ready website deployed on custom domain",
    image: "/how_we_work_03.jpg",
    accentColor: "#2554E8",
    metric: "99+ Lighthouse Score",
  },
  {
    num: "05",
    id: "digital-setup",
    category: "DIGITAL INFRASTRUCTURE",
    title: "DIGITAL BUSINESS SETUP",
    tagline: "GOOGLE BUSINESS PROFILE & DIGITAL FOUNDATION",
    description:
      "Establish your complete digital infrastructure from day one—including Google Maps presence, professional domain emails, and local search visibility across India.",
    icon: Store,
    deliverables: [
      "Google Business Profile Setup & Optimization",
      "Domain & Professional Email Setup",
      "Local Search Indexing & Map Visibility",
      "Digital Onboarding Support",
    ],
    techStack: ["Google Business API", "Google Workspace", "Local SEO Engine", "Domain DNS"],
    output: "Verified Google Business Profile & professional email",
    image: "/how_we_work_04.jpg",
    accentColor: "#2554E8",
    metric: "Top Local Search Rank",
  },
];

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeInspectorTab, setActiveInspectorTab] = useState<"deliverables" | "tech">("deliverables");
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrance animations for specs grid cards
      gsap.fromTo(
        ".capability-spec-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".capability-specs-grid",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentCap = capabilitiesData[activeTab];

  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    if (stageRef.current) {
      gsap.fromTo(
        stageRef.current,
        { opacity: 0.4, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
      );
    }
    setActiveTab(index);
  };

  const handleQuickJump = (id: string) => {
    const targetEl = document.getElementById(id);
    if (targetEl) {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.scrollTo(targetEl);
      } else {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full bg-[#EFECE6] text-[#111827] overflow-hidden py-20 lg:py-28"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1400px] mx-auto px-6 lg:px-12">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-black/[0.04] first:border-l first:border-black/[0.04]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Section Header Bar */}
        <div className="pb-5 border-b border-black/[0.08] mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-none" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold text-[#111827]">
              CORE CAPABILITIES
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm text-[#2554E8] tracking-widest uppercase font-bold">
            [ 05 DOMAINS OF EXCELLENCE ]
          </span>
        </div>

        {/* Big Editorial Header */}
        <div className="mb-16 lg:mb-20 pb-10 border-b border-black/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.92] text-[#111827] uppercase select-none">
                THE ARCHITECTURE OF DIGITAL GROWTH. <br />
                <span className="text-[#2554E8]">DESIGN, CODE & AUTOMATION.</span>
              </h1>
              <p className="font-sans text-base sm:text-xl text-[#475569] leading-relaxed max-w-3xl">
                Explore OneNexus's 5 core capabilities engineered to establish your digital authority, craft exceptional visual identities, and drive long-term business growth across India.
              </p>
            </div>

            {/* Quick Navigation Pills */}
            <div className="lg:col-span-4 flex flex-col justify-end gap-3">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest font-bold">
                DIRECT JUMP TO CAPABILITY:
              </span>
              <div className="flex flex-wrap gap-2">
                {capabilitiesData.map((cap, idx) => (
                  <button
                    key={cap.id}
                    onClick={() => {
                      handleTabChange(idx);
                      handleQuickJump("spatial-stage");
                    }}
                    className={`px-3 py-1.5 font-mono text-[11px] font-bold uppercase transition-all rounded-none cursor-pointer ${
                      activeTab === idx
                        ? "bg-[#2554E8] text-white border border-[#2554E8]"
                        : "bg-white border border-black/15 text-[#111827] hover:border-[#2554E8] hover:text-[#2554E8]"
                    }`}
                  >
                    {cap.num} / {cap.title.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SPATIAL CANVAS STAGE & ACCORDION MATRIX */}
        <div id="spatial-stage" className="mb-24 lg:mb-32">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* LEFT: 5 Interactive Capability Selectors (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-black/10">
                <span className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-widest">
                  SELECT A CAPABILITY TO INSPECT
                </span>
                <span className="font-mono text-xs font-bold text-[#2554E8] uppercase">
                  MODULE {capabilitiesData[activeTab].num} ACTIVE
                </span>
              </div>

              <div className="space-y-3">
                {capabilitiesData.map((cap, idx) => {
                  const isActive = activeTab === idx;
                  const Icon = cap.icon;

                  return (
                    <div
                      key={cap.id}
                      onClick={() => handleTabChange(idx)}
                      className={`p-5 border transition-all duration-300 cursor-pointer rounded-none relative group ${
                        isActive
                          ? "bg-[#111827] text-white border-[#111827] shadow-xl"
                          : "bg-white text-[#111827] border-black/10 hover:border-black/30 hover:bg-neutral-50"
                      }`}
                    >
                      {/* Active indicator edge bar */}
                      {isActive && (
                        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#2554E8]" />
                      )}

                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-xs font-bold px-2 py-0.5 rounded-none ${
                              isActive
                                ? "bg-[#2554E8] text-white"
                                : "bg-black/5 text-[#2554E8]"
                            }`}
                          >
                            {cap.num}
                          </span>
                          <span
                            className={`font-mono text-[11px] font-bold tracking-wider uppercase ${
                              isActive ? "text-[#2554E8]" : "text-neutral-500"
                            }`}
                          >
                            {cap.category}
                          </span>
                        </div>
                        <Icon
                          size={18}
                          className={isActive ? "text-[#2554E8]" : "text-neutral-400 group-hover:text-[#111827]"}
                        />
                      </div>

                      <h3 className="font-sans font-black text-lg sm:text-xl uppercase tracking-tight leading-tight">
                        {cap.title}
                      </h3>

                      <p
                        className={`font-mono text-xs mt-1 truncate ${
                          isActive ? "text-neutral-300" : "text-neutral-500"
                        }`}
                      >
                        {cap.tagline}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: High-Impact Dynamic Stage & Spec Inspector (7 cols) */}
            <div
              ref={stageRef}
              className="lg:col-span-7 bg-[#111827] text-white p-6 sm:p-10 border border-black/20 shadow-2xl flex flex-col justify-between rounded-none relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#2554E8]/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Visual Image Header Stage */}
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-none border border-white/15 mb-8 group">
                  <img
                    src={currentCap.image}
                    alt={currentCap.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80" />

                  {/* Floating Metric Badge */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-[#111827]/90 backdrop-blur-md border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-none">
                    ★ {currentCap.metric}
                  </div>

                  {/* Bottom Category Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-white">
                    <span className="px-2.5 py-1 bg-[#2554E8] text-white">
                      {currentCap.category}
                    </span>
                    <span className="text-neutral-300">CAPABILITY {currentCap.num} / 05</span>
                  </div>
                </div>

                {/* Capability Header */}
                <div className="space-y-3 mb-6">
                  <span className="font-mono text-xs text-[#2554E8] font-bold uppercase tracking-widest">
                    {currentCap.tagline}
                  </span>
                  <h2 className="font-sans font-black text-2xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
                    {currentCap.title}
                  </h2>
                  <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {currentCap.description}
                  </p>
                </div>

                {/* Sub-Inspector Tabs */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-2">
                    <button
                      onClick={() => setActiveInspectorTab("deliverables")}
                      className={`font-mono text-xs font-bold uppercase tracking-widest pb-1 transition-all rounded-none border-b-2 cursor-pointer ${
                        activeInspectorTab === "deliverables"
                          ? "border-[#2554E8] text-white"
                          : "border-transparent text-neutral-400 hover:text-white"
                      }`}
                    >
                      [ INCLUDED DELIVERABLES ]
                    </button>
                    <button
                      onClick={() => setActiveInspectorTab("tech")}
                      className={`font-mono text-xs font-bold uppercase tracking-widest pb-1 transition-all rounded-none border-b-2 cursor-pointer ${
                        activeInspectorTab === "tech"
                          ? "border-[#2554E8] text-white"
                          : "border-transparent text-neutral-400 hover:text-white"
                      }`}
                    >
                      [ TECH & ENGINE STACK ]
                    </button>
                  </div>

                  {/* Inspector Content */}
                  {activeInspectorTab === "deliverables" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentCap.deliverables.map((del, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-3 bg-white/[0.04] border border-white/10 flex items-center gap-2.5 text-xs font-mono font-bold text-white uppercase tracking-wider rounded-none"
                        >
                          <ShieldCheck size={15} className="text-[#2554E8] shrink-0" />
                          <span className="truncate">{del}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {currentCap.techStack.map((tech, tIdx) => (
                        <div
                          key={tIdx}
                          className="p-3 bg-white/[0.04] border border-white/10 flex flex-col justify-between text-xs font-mono font-bold text-white uppercase tracking-wider rounded-none"
                        >
                          <Code2 size={15} className="text-[#2554E8] mb-2" />
                          <span className="truncate">{tech}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action Strip */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 font-mono text-xs text-neutral-300 font-bold uppercase tracking-wider">
                  <Zap size={15} className="text-[#2554E8]" />
                  <span>OUTPUT: {currentCap.output}</span>
                </div>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2554E8] hover:bg-blue-600 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all hover:scale-105 rounded-none shrink-0"
                >
                  <span>INQUIRE ABOUT {currentCap.num}</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>

            </div>

          </div>

        </div>

        {/* ARCHITECTURAL SPECIFICATIONS MATRIX (Detailed breakdown for all 5) */}
        <div className="pt-12 border-t border-black/10">
          <div className="flex items-center justify-between pb-6 mb-12 border-b border-black/10">
            <div>
              <span className="font-mono text-xs font-bold text-[#2554E8] uppercase tracking-widest block mb-1">
                COMPLETE CAPABILITIES DECK
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#111827] uppercase tracking-tight">
                FULL SPECIFICATION SHEETS
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest font-bold hidden sm:block">
              [ 05 MODULE SPECIFICATIONS ]
            </span>
          </div>

          <div className="capability-specs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilitiesData.map((cap) => {
              const Icon = cap.icon;

              return (
                <div
                  key={cap.id}
                  id={cap.id}
                  className="capability-spec-card bg-white border border-black/15 p-8 flex flex-col justify-between hover:border-[#2554E8] transition-all duration-300 shadow-sm hover:shadow-xl rounded-none relative group"
                >
                  {/* Top Header */}
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
                      <span className="font-mono text-xs font-extrabold px-2.5 py-1 bg-[#111827] text-white rounded-none">
                        MODULE {cap.num}
                      </span>
                      <Icon size={20} className="text-[#2554E8]" />
                    </div>

                    <span className="font-mono text-[11px] font-bold text-[#2554E8] uppercase tracking-wider block mb-1">
                      {cap.category}
                    </span>

                    <h3 className="font-sans font-black text-2xl text-[#111827] uppercase tracking-tight mb-3">
                      {cap.title}
                    </h3>

                    <p className="font-sans text-sm text-[#475569] leading-relaxed mb-6">
                      {cap.description}
                    </p>

                    {/* Deliverables checklist */}
                    <div className="space-y-2.5 pt-4 border-t border-black/10 mb-8">
                      <span className="font-mono text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                        KEY DELIVERABLES:
                      </span>
                      {cap.deliverables.map((item, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 size={15} className="text-[#2554E8] shrink-0 mt-0.5" />
                          <span className="font-mono text-xs font-bold text-[#111827] uppercase tracking-wider">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-neutral-500 uppercase">
                      {cap.metric}
                    </span>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#2554E8] hover:text-[#111827] uppercase tracking-wider transition-colors"
                    >
                      <span>INQUIRE</span>
                      <ArrowUpRight size={15} />
                    </Link>
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


