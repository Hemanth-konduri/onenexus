import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
  X,
  Play,
  Pause,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart3,
  Calendar,
  MessageSquare,
  Clock,
  Award,
  SlidersHorizontal,
} from "lucide-react";

interface DeliverableItem {
  title: string;
  desc: string;
}

interface PartnershipModule {
  id: string;
  num: string;
  category: string;
  title: string;
  tagline: string;
  fullTitle: string;
  fullDesc: string;
  metric: string;
  metricLabel: string;
  turnaround: string;
  deliverables: DeliverableItem[];
}

const modules: PartnershipModule[] = [
  {
    id: "video-overviews",
    num: "01",
    category: "CREATIVE & VIDEO PRODUCTION",
    title: "Video Overviews",
    tagline: "See your sources come to life with visual explainers in a variety of style options.",
    fullTitle: "Video Overviews & High-Retention Reels Engine",
    fullDesc:
      "Engineered specifically to capture feed attention and drive compound organic reach across Instagram, YouTube Shorts, and LinkedIn. We produce high-retention video explainers, formatted vertical reels, dynamic typography, and scroll-stopping visual hooks tailored to your brand voice.",
    metric: "3.4x Multiplier",
    metricLabel: "Average Reach Lift",
    turnaround: "Weekly Releases",
    deliverables: [
      {
        title: "Custom 4K Vertical Reels & Shorts",
        desc: "8-12 bespoke short-form videos monthly with professional motion cuts, sound design, and color grading.",
      },
      {
        title: "Carousel Graphics & Storyboards",
        desc: "Multi-slide educational and product carousels designed for high bookmark, save, and share rates.",
      },
      {
        title: "Persuasive Hook Scripting",
        desc: "Data-backed copywriting for video intros, viral hooks, and high-conversion calls to action.",
      },
      {
        title: "Dynamic Subtitles & Motion Overlays",
        desc: "Kinetic typography, animated pointers, sound effects, and brand asset integration.",
      },
      {
        title: "High-CTR Thumbnail Variations",
        desc: "A/B tested cover frames and visual thumbnails optimized for profile grid and explore feeds.",
      },
      {
        title: "Branded Asset Kit & Story Packs",
        desc: "Daily story templates, announcement badges, and promotional sticker packs for rapid posting.",
      },
    ],
  },
  {
    id: "profile-management",
    num: "02",
    category: "ACCOUNT STRATEGY & CURATION",
    title: "Full-Service Profile Management",
    tagline: "Consistent posting timetables, strategic hashtag distribution, visual aesthetic curation, and active audience engagement.",
    fullTitle: "Complete Account Architecture & Active Growth Operations",
    fullDesc:
      "We take the daily burden of social media operations off your shoulders. From timetable optimization and visual aesthetic curation to profile bio architecture and proactive DM engagement, your brand presence stays flawless and active 365 days a year.",
    metric: "100% Consistency",
    metricLabel: "Uptime & Daily Coverage",
    turnaround: "Daily Operations",
    deliverables: [
      {
        title: "Optimal Posting Timetable",
        desc: "Scheduled releases matched precisely to your target audience's peak engagement windows.",
      },
      {
        title: "Social SEO & Hashtag Clusters",
        desc: "Strategic semantic search optimization to capture organic platform search traffic.",
      },
      {
        title: "Grid Aesthetic & Palette Harmony",
        desc: "Harmonized visual layout ensuring your profile grid instantly converts profile visitors into followers.",
      },
      {
        title: "Community DMs & Lead Routing",
        desc: "Active comment moderation, lead inquiry handoffs, and conversational nurturing.",
      },
      {
        title: "Monthly Content Planning Calendar",
        desc: "Interactive editorial calendar for one-click previews, edits, and team approvals.",
      },
      {
        title: "Competitor Trend Surveillance",
        desc: "Weekly intelligence on breakout niche trends, audio spikes, and competitor moves.",
      },
    ],
  },
  {
    id: "cro-telemetry",
    num: "03",
    category: "DATA TELEMETRY & CONVERSION",
    title: "Real-Time Telemetry & CRO Audits",
    tagline: "Continuous traffic telemetry, conversion rate optimization, user behavior heatmaps, and monthly performance reviews.",
    fullTitle: "Real-Time Funnel Analytics & Conversion Sprints",
    fullDesc:
      "Stop guessing what works. We deploy telemetry across your entire digital surface, pinpointing friction points, analyzing user heatmaps, and conducting iterative CRO sprints to turn casual clicks into measurable pipeline revenue.",
    metric: "+38.4% Lift",
    metricLabel: "Average Funnel Conversion Lift",
    turnaround: "Bi-Weekly Sprints",
    deliverables: [
      {
        title: "Live User Journey & Heatmap Telemetry",
        desc: "Full session recording analysis, tap maps, and scroll depth tracking across key landing pages.",
      },
      {
        title: "Checkout & Lead Funnel Tuning",
        desc: "Frictionless form optimization, CTA contrast enhancement, and checkout drop-off elimination.",
      },
      {
        title: "A/B Split-Testing Sprints",
        desc: "Empirical headline, copy, and layout tests with strict statistical confidence validation.",
      },
      {
        title: "Speed & Core Web Vitals Audits",
        desc: "Continuous monitoring of page speed, caching, and mobile responsiveness.",
      },
      {
        title: "Executive ROI Attribution Dashboards",
        desc: "Transparent, executive-ready monthly reporting on leads, revenue, and customer acquisition costs.",
      },
      {
        title: "Search Engine Health Monitoring",
        desc: "Indexation tracking, backlink hygiene, and broken link resolution.",
      },
    ],
  },
  {
    id: "campaign-scaling",
    num: "04",
    category: "STRATEGIC EXPANSION & LAUNCHES",
    title: "Campaign Scaling & Offer Architecture",
    tagline: "Campaign ideation, irresistible offer structuring, promotional push execution, and direct senior advisory support.",
    fullTitle: "High-Ticket Campaign Execution & System Scaling",
    fullDesc:
      "Whether launching a seasonal promotion, high-ticket product, or entering new customer segments, we structure irresistible offers, craft rapid-deployment landing pages, and guide your promotional push from kickoff to close.",
    metric: "4.2x ROAS",
    metricLabel: "Target Return on Campaign Spend",
    turnaround: "Bi-Weekly Reviews",
    deliverables: [
      {
        title: "High-Ticket Launch Blueprints",
        desc: "Strategic positioning, promotional timeline, and phase-by-phase launch architecture.",
      },
      {
        title: "Rapid Landing Page Scaling",
        desc: "Custom high-converting promotional pages built, tested, and published in days.",
      },
      {
        title: "Irresistible Offer Structuring",
        desc: "Pricing tiers, bundle bonuses, and urgency mechanisms tailored to your market.",
      },
      {
        title: "Bi-Weekly Senior Advisory Calls",
        desc: "Direct strategy sessions with agency leadership to review roadmap and solve bottlenecks.",
      },
      {
        title: "Multi-Channel Promo Coordination",
        desc: "Synchronized email blasts, social teasers, and partner collaborations.",
      },
      {
        title: "Ad Creative & Copy Alignment",
        desc: "High-performing ad creatives and copy variations aligned with organic messaging.",
      },
    ],
  },
  {
    id: "omnichannel-retention",
    num: "05",
    category: "CUSTOMER RETENTION & COMMUNITY",
    title: "Omnichannel Retention & Automated Nurture",
    tagline: "Automated email sequences, VIP customer nurture loops, review collection engines, and community growth.",
    fullTitle: "Lifecycle Retention & Automated Customer Engines",
    fullDesc:
      "Acquisition is only half the battle. We build automated retention engines that nurture leads, collect verified 5-star reviews on autopilot, re-engage lapsed customers, and maximize lifetime customer value (LTV) without extra manual effort.",
    metric: "2.6x Retention",
    metricLabel: "Customer LTV Multiplier",
    turnaround: "Continuous Automation",
    deliverables: [
      {
        title: "Automated Onboarding Sequences",
        desc: "Multi-part educational email sequences that turn new signups into repeat buyers.",
      },
      {
        title: "Automated 5-Star Review Harvester",
        desc: "Smart satisfaction check that routes happy customers to Google/Trustpilot reviews.",
      },
      {
        title: "Abandoned Inquiry Recovery Loops",
        desc: "Timely, helpful automated follow-ups that recover otherwise lost high-value leads.",
      },
      {
        title: "VIP Loyalty & Referral Workflows",
        desc: "Automated incentives and recognition for your top 10% highest-value brand advocates.",
      },
      {
        title: "WhatsApp & SMS Lead Integration",
        desc: "Instant mobile confirmation and notification conduits for high-urgency inquiries.",
      },
      {
        title: "Customer Churn Telemetry",
        desc: "Early warning indicators when customer activity drops, triggering retention campaigns.",
      },
    ],
  },
];

export default function MonthlyGrowthSupport() {
  const N = modules.length;
  // 3 copies to create a seamless infinite loop
  const extendedModules = [...modules, ...modules, ...modules];

  // Start in the middle set (index N = 5 for 5 modules)
  const [trackIndex, setTrackIndex] = useState<number>(N);
  const [withTransition, setWithTransition] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Interactive state for preview player
  const [videoPlaying, setVideoPlaying] = useState<boolean>(true);
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(1200);

  // Measure container for responsive card centering
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateWidth, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Compute card sizing with sharp layout
  const isMobile = containerWidth < 640;
  const isTablet = containerWidth >= 640 && containerWidth < 1024;
  const cardWidth = isMobile
    ? Math.max(300, containerWidth - 40)
    : isTablet
    ? Math.min(620, containerWidth * 0.76)
    : Math.min(820, containerWidth * 0.65);

  const gap = isMobile ? 16 : 28;

  // Exact translation to center the active card
  const translateX = (containerWidth - cardWidth) / 2 - trackIndex * (cardWidth + gap);

  // Seamless infinite wrap-around on transition end
  const handleTransitionEnd = () => {
    if (trackIndex >= 2 * N) {
      setWithTransition(false);
      setTrackIndex(trackIndex - N);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
        });
      });
    } else if (trackIndex < N) {
      setWithTransition(false);
      setTrackIndex(trackIndex + N);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setWithTransition(true);
        });
      });
    }
  };

  // Move next / prev
  const nextSlide = useCallback(() => {
    setWithTransition(true);
    setTrackIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setWithTransition(true);
    setTrackIndex((prev) => prev - 1);
  }, []);

  // Auto-scrolling: halts for 2.5 seconds (between 2 and 3 seconds), then slides smoothly, infinite loop
  useEffect(() => {
    if (isPaused || !isPlayingAuto || expandedIndex !== null) return;

    // Halts for 2.5 seconds as explicitly requested
    const timer = setTimeout(() => {
      nextSlide();
    }, 2500);

    return () => clearTimeout(timer);
  }, [trackIndex, isPaused, isPlayingAuto, expandedIndex, nextSlide]);

  // Jump to dot
  const handleDotClick = (targetIndex: number) => {
    const currentMod = trackIndex % N;
    let diff = targetIndex - currentMod;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    setWithTransition(true);
    setTrackIndex(trackIndex + diff);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (expandedIndex !== null) {
        if (e.key === "Escape") setExpandedIndex(null);
        return;
      }
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedIndex, prevSlide, nextSlide]);

  const activeOriginalIndex = trackIndex % N;
  const activeModule = modules[activeOriginalIndex];

  return (
    <section
      id="monthly-growth-support"
      className="relative z-10 w-full bg-[#EFECE6] text-[#111827] overflow-hidden border-t border-black/[0.08] py-20 sm:py-28"
    >
      {/* Background Structural Guide Lines */}
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
              ONGOING PARTNERSHIP
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm text-[#2554E8] tracking-widest uppercase font-bold">
            [ MONTHLY GROWTH ENGINE ]
          </span>
        </div>

        {/* Big Typography Section Headline */}
        <div className="mb-12 sm:mb-16 max-w-4xl">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.92] text-[#111827] uppercase select-none mb-4">
            SUSTAINED BRAND MOMENTUM <br />
            <span className="text-[#2554E8]">WITHOUT IN-HOUSE OVERHEAD.</span>
          </h2>
          <p className="font-sans text-base sm:text-xl text-[#475569] font-normal leading-relaxed">
            Building a digital presence is step one. Maintaining consistent customer momentum and compound growth is step two. OneNexus acts as your dedicated monthly growth team.
          </p>
        </div>

        {/* Partnership Performance Metrics Bar with Sharp Corners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 sm:mb-20">
          <div className="p-6 bg-white border border-black/[0.08] rounded-none shadow-none flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2554E8]/10 text-[#2554E8] flex items-center justify-center shrink-0 rounded-none">
              <TrendingUp size={24} />
            </div>
            <div>
              <span className="font-mono text-2xl font-black text-[#111827] block">3.4x</span>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider font-bold">
                AVERAGE REACH MULTIPLIER
              </span>
            </div>
          </div>

          <div className="p-6 bg-white border border-black/[0.08] rounded-none shadow-none flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2554E8]/10 text-[#2554E8] flex items-center justify-center shrink-0 rounded-none">
              <ShieldCheck size={24} />
            </div>
            <div>
              <span className="font-mono text-2xl font-black text-[#111827] block">100%</span>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider font-bold">
                BRAND CONSISTENCY GUARANTEE
              </span>
            </div>
          </div>

          <div className="p-6 bg-white border border-black/[0.08] rounded-none shadow-none flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2554E8]/10 text-[#2554E8] flex items-center justify-center shrink-0 rounded-none">
              <Zap size={24} />
            </div>
            <div>
              <span className="font-mono text-2xl font-black text-[#111827] block">WEEKLY</span>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider font-bold">
                DEPLOYMENTS & CRO AUDITS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          HIGH-PERFORMANCE HARDWARE-ACCELERATED SHARP-CORNERED CAROUSEL
          - Zero lag: GPU translate3d with willChange, zero heavy blurs
          - 100% Sharp corners (rounded-none) matching OneNexus brutalist design
          - Halts for 2 to 3 seconds (2.5s) then slides automatically to next card
          - Peeking cards on left and right, active card centered
          - Click card to expand rich content modal
      ========================================================================== */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Track with Hardware Acceleration */}
        <div
          className="flex items-center"
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition: withTransition
              ? "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
            willChange: "transform",
            gap: `${gap}px`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedModules.map((item, idx) => {
            const isActive = idx === trackIndex;
            const originalIdx = idx % N;

            return (
              <div
                key={idx}
                style={{ width: `${cardWidth}px` }}
                className="shrink-0"
              >
                {/* Large Outer Card Container with Sharp Corners (OneNexus Architecture) */}
                <div
                  onClick={() => {
                    if (isActive) {
                      setExpandedIndex(originalIdx);
                    } else {
                      setWithTransition(true);
                      setTrackIndex(idx);
                    }
                  }}
                  className={`group relative rounded-none border transition-all duration-300 cursor-pointer p-4 sm:p-7 lg:p-9 ${
                    isActive
                      ? "bg-[#EAE7DF] border-black/20 opacity-100"
                      : "bg-[#E5E2DA] border-black/10 opacity-40 hover:opacity-70"
                  }`}
                >
                  {/* Inner Floating Mockup Card with Sharp Corners */}
                  <div className="relative w-full max-w-2xl mx-auto">
                    {/* Window Card with Sharp Corners and Clean Borders */}
                    <div className="relative bg-white rounded-none border border-black/15 shadow-none overflow-hidden transition-transform duration-200 group-hover:-translate-y-0.5">
                      {/* Window Header */}
                      <div className="px-4 sm:px-6 py-3 border-b border-black/10 flex items-center justify-between bg-white rounded-none">
                        {/* Placeholder pill on the left with sharp corners */}
                        <div className="flex items-center gap-2.5">
                          <div className="w-24 sm:w-32 h-2.5 bg-neutral-300 rounded-none" />
                          <span className="hidden sm:inline-block px-2 py-0.5 bg-[#111827] text-[10px] font-mono text-white uppercase tracking-widest font-bold rounded-none">
                            MOD {item.num}
                          </span>
                        </div>

                        {/* Control icons on the right with sharp square buttons */}
                        <div className="flex items-center gap-1 text-neutral-500">
                          <button
                            type="button"
                            aria-label="Thumbs up"
                            onClick={(e) => {
                              e.stopPropagation();
                              setLikedMap((prev) => ({
                                ...prev,
                                [originalIdx]: !prev[originalIdx],
                              }));
                            }}
                            className={`p-1.5 rounded-none border border-transparent hover:border-black/10 hover:bg-neutral-100 transition-colors ${
                              likedMap[originalIdx] ? "text-[#2554E8] bg-[#2554E8]/10" : "text-neutral-500"
                            }`}
                          >
                            <ThumbsUp size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <button
                            type="button"
                            aria-label="Thumbs down"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-none border border-transparent hover:border-black/10 hover:bg-neutral-100 transition-colors text-neutral-500"
                          >
                            <ThumbsDown size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <button
                            type="button"
                            aria-label="More options"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-none border border-transparent hover:border-black/10 hover:bg-neutral-100 transition-colors text-neutral-500"
                          >
                            <MoreVertical size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <button
                            type="button"
                            aria-label="Close preview"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-none border border-transparent hover:border-black/10 hover:bg-neutral-100 transition-colors text-neutral-500"
                          >
                            <X size={14} className="sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Mockup Canvas Body with Sharp Corners */}
                      <div className="p-4 sm:p-6 min-h-[190px] sm:min-h-[230px] flex flex-col justify-between bg-neutral-50/80 rounded-none">
                        {/* ================= CARD 01: Video Player (Sharp Architectural OneNexus Style) ================= */}
                        {originalIdx === 0 && (
                          <div className="relative w-full border border-black/10 rounded-none bg-white p-4 sm:p-5 flex flex-col justify-between min-h-[170px] sm:min-h-[195px]">
                            {/* Graphic elements */}
                            <div className="flex justify-between items-start">
                              <div className="w-12 sm:w-16 h-7 sm:h-8 bg-[#2554E8]/10 border border-[#2554E8]/30 rounded-none flex items-center justify-center">
                                <Sparkles size={14} className="text-[#2554E8]" />
                              </div>
                              <div className="w-24 sm:w-32 h-2.5 bg-neutral-200 rounded-none" />
                              <div className="w-10 sm:w-12 h-7 sm:h-8 bg-neutral-100 border border-neutral-200 rounded-none" />
                            </div>

                            {/* Centered Sharp Blue Play/Pause Button */}
                            <div className="relative py-2 flex flex-col items-center justify-center">
                              <button
                                type="button"
                                aria-label="Play or pause preview video"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setVideoPlaying(!videoPlaying);
                                }}
                                className="w-12 h-12 sm:w-14 sm:h-14 bg-[#2554E8] hover:bg-[#1a42be] text-white rounded-none flex items-center justify-center shadow-none hover:scale-105 active:scale-95 transition-transform"
                              >
                                {videoPlaying ? (
                                  <Pause size={18} className="fill-white" />
                                ) : (
                                  <Play size={18} className="fill-white ml-0.5" />
                                )}
                              </button>

                              {/* Graduation cap / explainers outline icon */}
                              <div className="mt-2 text-neutral-400 flex items-center justify-center">
                                <svg
                                  className="w-7 h-7 sm:w-8 sm:h-8 stroke-neutral-500 stroke-[1.5] fill-none"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                              </div>
                            </div>

                            {/* Sharp Video Scrubber Timeline */}
                            <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-neutral-600 font-bold">
                              <span>0:12</span>
                              <div className="relative flex-1 h-2 bg-neutral-200 rounded-none overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-[24%] bg-[#2554E8] rounded-none" />
                              </div>
                              <div className="-ml-2 w-3 h-3 bg-[#2554E8] rounded-none border border-white shrink-0" />
                              <span className="shrink-0">0:59</span>
                            </div>
                          </div>
                        )}

                        {/* ================= CARD 02: Account Architecture & Calendar ================= */}
                        {originalIdx === 1 && (
                          <div className="relative w-full border border-black/10 rounded-none bg-white p-4 sm:p-5 flex flex-col justify-between min-h-[170px] sm:min-h-[195px]">
                            <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100">
                              <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-[#2554E8]" />
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900">
                                  Weekly Cadence Grid
                                </span>
                              </div>
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold uppercase tracking-wider rounded-none border border-emerald-300">
                                Active • 100% On-Schedule
                              </span>
                            </div>

                            {/* Schedule Day Columns with Sharp Corners */}
                            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 py-2">
                              {["MON", "TUE", "WED", "THU", "FRI"].map((day, d) => (
                                <div
                                  key={d}
                                  className={`p-2 rounded-none border text-center ${
                                    d === 1 || d === 3
                                      ? "bg-[#2554E8]/5 border-[#2554E8]"
                                      : "bg-neutral-50 border-neutral-200"
                                  }`}
                                >
                                  <span className="block text-[9px] font-mono font-bold text-neutral-500">
                                    {day}
                                  </span>
                                  <div
                                    className={`mt-1.5 mx-auto w-5 h-5 rounded-none flex items-center justify-center text-[10px] font-mono font-bold ${
                                      d === 1 || d === 3
                                        ? "bg-[#2554E8] text-white"
                                        : "bg-neutral-200 text-neutral-700"
                                    }`}
                                  >
                                    {d === 1 ? "4K" : d === 3 ? "REEL" : "✓"}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Aesthetic harmony swatch bar with Sharp Corners */}
                            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-[11px] font-mono text-neutral-500">
                              <span className="text-[10px] uppercase font-bold text-neutral-700">
                                Palette Uniformity
                              </span>
                              <div className="flex items-center gap-1.5">
                                <span className="w-3.5 h-3.5 rounded-none bg-[#111827] border border-black/20" />
                                <span className="w-3.5 h-3.5 rounded-none bg-[#2554E8] border border-black/20" />
                                <span className="w-3.5 h-3.5 rounded-none bg-[#EFECE6] border border-black/20" />
                                <span className="w-3.5 h-3.5 rounded-none bg-[#38BDF8] border border-black/20" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ================= CARD 03: Telemetry & CRO Funnel ================= */}
                        {originalIdx === 2 && (
                          <div className="relative w-full border border-black/10 rounded-none bg-white p-4 sm:p-5 flex flex-col justify-between min-h-[170px] sm:min-h-[195px]">
                            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                              <div className="flex items-center gap-2">
                                <BarChart3 size={14} className="text-[#2554E8]" />
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900">
                                  Conversion Funnel Audit
                                </span>
                              </div>
                              <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-700 uppercase">
                                <span className="w-2 h-2 rounded-none bg-emerald-600 animate-pulse" />
                                Telemetry Active
                              </span>
                            </div>

                            {/* Metric Display & Funnel Bars with Sharp Corners */}
                            <div className="grid grid-cols-12 gap-3 items-center py-2">
                              <div className="col-span-5 p-2 bg-neutral-50 rounded-none border border-neutral-200 text-center">
                                <span className="block font-mono text-xl sm:text-2xl font-black text-[#2554E8]">
                                  +38.4%
                                </span>
                                <span className="text-[9px] font-mono font-bold uppercase text-neutral-500 tracking-wider">
                                  CRO Lift
                                </span>
                              </div>

                              <div className="col-span-7 space-y-1.5">
                                <div>
                                  <div className="flex justify-between text-[10px] font-mono text-neutral-600 mb-0.5">
                                    <span>Landing Depth</span>
                                    <span>86%</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-neutral-100 rounded-none overflow-hidden">
                                    <div className="h-full bg-neutral-900 rounded-none w-[86%]" />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between text-[10px] font-mono text-neutral-600 mb-0.5">
                                    <span>Checkout Velocity</span>
                                    <span>48%</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-neutral-100 rounded-none overflow-hidden">
                                    <div className="h-full bg-[#2554E8] rounded-none w-[48%]" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-[10px] font-mono text-neutral-500">
                              <span>Core Web Vitals: 99/100</span>
                              <span>Session Latency: 0.38s</span>
                            </div>
                          </div>
                        )}

                        {/* ================= CARD 04: Campaign Scaling & Launchpad ================= */}
                        {originalIdx === 3 && (
                          <div className="relative w-full border border-black/10 rounded-none bg-white p-4 sm:p-5 flex flex-col justify-between min-h-[170px] sm:min-h-[195px]">
                            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                              <div className="flex items-center gap-2">
                                <SlidersHorizontal size={14} className="text-[#2554E8]" />
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900">
                                  Launch System Telemetry
                                </span>
                              </div>
                              <span className="px-2 py-0.5 bg-[#2554E8] text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded-none">
                                Scale Mode
                              </span>
                            </div>

                            {/* Split Test A / B Cards with Sharp Corners */}
                            <div className="grid grid-cols-2 gap-2 py-2">
                              <div className="p-2.5 rounded-none border border-[#2554E8] bg-[#2554E8]/5">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-[10px] font-mono font-bold text-[#2554E8]">
                                    Variant A (Winner)
                                  </span>
                                  <Award size={12} className="text-[#2554E8]" />
                                </div>
                                <span className="font-mono text-lg font-black text-[#111827] block">
                                  4.2x ROAS
                                </span>
                                <span className="text-[9px] font-mono text-neutral-500">
                                  Video Hook + Dynamic Landing
                                </span>
                              </div>

                              <div className="p-2.5 rounded-none border border-neutral-200 bg-neutral-50">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-[10px] font-mono font-bold text-neutral-500">
                                    Variant B
                                  </span>
                                </div>
                                <span className="font-mono text-lg font-black text-neutral-600 block">
                                  2.8x ROAS
                                </span>
                                <span className="text-[9px] font-mono text-neutral-500">
                                  Static Hero Baseline
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-[10px] font-mono text-neutral-500">
                              <span>Ad Spend Optimized: 100%</span>
                              <span className="text-emerald-700 font-bold">+52% Efficiency</span>
                            </div>
                          </div>
                        )}

                        {/* ================= CARD 05: Omnichannel Retention Engine ================= */}
                        {originalIdx === 4 && (
                          <div className="relative w-full border border-black/10 rounded-none bg-white p-4 sm:p-5 flex flex-col justify-between min-h-[170px] sm:min-h-[195px]">
                            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                              <div className="flex items-center gap-2">
                                <MessageSquare size={14} className="text-[#2554E8]" />
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-900">
                                  Lifecycle Retention Conduit
                                </span>
                              </div>
                              <span className="px-2 py-0.5 bg-[#111827] text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded-none">
                                Automated
                              </span>
                            </div>

                            {/* Connected Nodes with Sharp Corners */}
                            <div className="flex items-center justify-between gap-1.5 py-3">
                              <div className="flex-1 p-2 bg-neutral-50 border border-neutral-200 rounded-none text-center">
                                <span className="block text-[9px] font-mono text-neutral-400 font-bold uppercase">
                                  01 Inbound
                                </span>
                                <span className="text-[10px] font-mono font-bold text-neutral-800">
                                  Lead Capture
                                </span>
                              </div>
                              <span className="text-neutral-400 font-mono text-xs">→</span>
                              <div className="flex-1 p-2 bg-[#2554E8]/5 border border-[#2554E8] rounded-none text-center">
                                <span className="block text-[9px] font-mono text-[#2554E8] font-bold uppercase">
                                  02 Nurture
                                </span>
                                <span className="text-[10px] font-mono font-bold text-neutral-800">
                                  VIP Email Flow
                                </span>
                              </div>
                              <span className="text-neutral-400 font-mono text-xs">→</span>
                              <div className="flex-1 p-2 bg-neutral-50 border border-neutral-200 rounded-none text-center">
                                <span className="block text-[9px] font-mono text-neutral-400 font-bold uppercase">
                                  03 Repeat
                                </span>
                                <span className="text-[10px] font-mono font-bold text-neutral-800">
                                  Review Loop
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-[10px] font-mono text-neutral-500">
                              <span>Open Rate: 68.2%</span>
                              <span className="text-emerald-700 font-bold">2.6x Lifetime Value</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sharp Click-to-Expand Badge on the Card */}
                    <div className="mt-3.5 flex items-center justify-end">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-black/15 rounded-none font-mono text-[10px] text-neutral-700 uppercase tracking-widest font-bold group-hover:bg-[#2554E8] group-hover:text-white group-hover:border-[#2554E8] transition-colors">
                        <span>Click to expand full details</span>
                        <Maximize2 size={11} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            BOTTOM INFORMATION BAR (Sharp Brutalist OneNexus Layout)
            - Left: Title & Minimal Description
            - Right: Sharp Segment Indicators & Arrow Controls
        ========================================================================== */}
        <div
          className="mx-auto mt-6 sm:mt-8 px-6 lg:px-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
          style={{ maxWidth: `${cardWidth + 48}px` }}
        >
          {/* Left Text */}
          <div className="max-w-xl">
            <h3 className="font-sans text-2xl sm:text-3xl font-black text-[#111827] uppercase tracking-tight">
              {activeModule.title}
            </h3>
            <p className="font-sans text-sm sm:text-base text-neutral-600 font-normal leading-relaxed mt-1">
              {activeModule.tagline}
            </p>
          </div>

          {/* Right Navigation & Sharp Indicator Segments */}
          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
            {/* Minimal Prev / Next Arrows with Sharp Corners */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous card"
              className="w-8 h-8 rounded-none border border-black/15 bg-white hover:bg-[#111827] hover:text-white flex items-center justify-center text-neutral-800 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Pagination Indicators with Sharp Corners (`▬ ▬ ▬ ▬ ▬`) */}
            <div className="flex items-center gap-1.5 px-2">
              {modules.map((_, dotIdx) => {
                const isDotActive = dotIdx === activeOriginalIndex;
                return (
                  <button
                    key={dotIdx}
                    type="button"
                    aria-label={`Jump to slide ${dotIdx + 1}`}
                    onClick={() => handleDotClick(dotIdx)}
                    className="focus:outline-none py-1.5 cursor-pointer"
                  >
                    {isDotActive ? (
                      <span className="block w-7 h-1.5 bg-[#111827] rounded-none transition-all duration-200" />
                    ) : (
                      <span className="block w-2.5 h-1.5 bg-neutral-300 hover:bg-neutral-500 rounded-none transition-all duration-200" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next card"
              className="w-8 h-8 rounded-none border border-black/15 bg-white hover:bg-[#111827] hover:text-white flex items-center justify-center text-neutral-800 transition-colors"
            >
              <ChevronRight size={16} />
            </button>

            {/* Auto-play toggle button with Sharp Corners */}
            <button
              type="button"
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              title={isPlayingAuto ? "Pause auto-scroll" : "Resume auto-scroll"}
              aria-label={isPlayingAuto ? "Pause auto-scroll" : "Resume auto-scroll"}
              className="p-1.5 rounded-none border border-transparent hover:border-black/10 hover:bg-black/5 text-neutral-500 hover:text-neutral-900 transition-colors ml-1"
            >
              {isPlayingAuto ? <Pause size={13} /> : <Play size={13} />}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          EXPANDED CONTENT MODAL (Triggered on clicking card)
          - Sharp brutalist container with 100% sharp corners
          - Shows comprehensive strategic deliverables, performance metrics, and inquiry CTA
      ========================================================================== */}
      <AnimatePresence>
        {expandedIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedIndex(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Dialog Container with Sharp Corners */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-white rounded-none border border-black/20 shadow-2xl p-6 sm:p-10 z-10 my-8 max-h-[88vh] overflow-y-auto"
            >
              {/* Close Button with Sharp Corners */}
              <button
                type="button"
                onClick={() => setExpandedIndex(null)}
                className="absolute top-6 right-6 p-2 rounded-none bg-neutral-100 hover:bg-[#111827] hover:text-white text-neutral-800 transition-colors border border-black/10"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Modal Header */}
              <div className="pr-10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#2554E8] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-none">
                    MODULE {modules[expandedIndex].num}
                  </span>
                  <span className="font-mono text-xs text-[#2554E8] font-bold uppercase tracking-widest">
                    {modules[expandedIndex].category}
                  </span>
                </div>

                <h3 className="font-sans text-3xl sm:text-4xl font-black text-[#111827] uppercase tracking-tight">
                  {modules[expandedIndex].fullTitle}
                </h3>
                <p className="font-sans text-base sm:text-lg text-[#475569] mt-3 leading-relaxed">
                  {modules[expandedIndex].fullDesc}
                </p>
              </div>

              {/* Metrics Highlights Bar with Sharp Corners */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 p-4 bg-[#F8FAFC] border border-neutral-200 rounded-none">
                <div className="p-3 bg-white rounded-none border border-neutral-200">
                  <span className="font-mono text-xl sm:text-2xl font-black text-[#2554E8] block">
                    {modules[expandedIndex].metric}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider font-bold">
                    {modules[expandedIndex].metricLabel}
                  </span>
                </div>
                <div className="p-3 bg-white rounded-none border border-neutral-200">
                  <span className="font-mono text-xl sm:text-2xl font-black text-[#111827] block">
                    {modules[expandedIndex].turnaround}
                  </span>
                  <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider font-bold">
                    Turnaround Frequency
                  </span>
                </div>
                <div className="p-3 bg-white rounded-none border border-neutral-200">
                  <span className="font-mono text-xl sm:text-2xl font-black text-[#111827] block">
                    Zero Lock-In
                  </span>
                  <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider font-bold">
                    Flexible Monthly Retainer
                  </span>
                </div>
              </div>

              {/* Detailed Deliverables Checklist with Sharp Corners */}
              <div className="mt-8">
                <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">
                  [ MONTHLY DELIVERABLES & SCOPE OF WORK ]
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {modules[expandedIndex].deliverables.map((del, dIdx) => (
                    <div
                      key={dIdx}
                      className="p-4 bg-white border border-neutral-200 rounded-none hover:border-[#2554E8] transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <CheckCircle2 size={16} className="text-[#2554E8] shrink-0" />
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111827]">
                          {del.title}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-neutral-600 leading-relaxed pl-6">
                        {del.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons with Sharp Corners */}
              <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                  <Clock size={14} className="text-[#2554E8]" />
                  <span>Onboarding takes under 48 hours</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setExpandedIndex(null)}
                    className="flex-1 sm:flex-initial px-5 py-3 border border-neutral-300 hover:bg-neutral-100 font-mono text-xs uppercase tracking-widest font-bold text-neutral-800 transition-colors rounded-none"
                  >
                    Close
                  </button>
                  <Link
                    href={`/contact?module=${modules[expandedIndex].id}`}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2554E8] hover:bg-[#1a42be] text-white font-mono text-xs uppercase tracking-widest font-bold transition-transform hover:scale-105 rounded-none"
                  >
                    <span>Inquire for Module {modules[expandedIndex].num}</span>
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          BOTTOM RETAINER CALLOUT (Sharp Corners)
      ========================================================================== */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 mt-20 sm:mt-28">
        <div className="p-8 sm:p-12 lg:p-14 bg-[#111827] text-white border border-black/10 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 rounded-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#2554E8]/15 rounded-none blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="font-mono text-xs text-[#2554E8] font-bold uppercase tracking-widest block">
              FLEXIBLE MONTHLY RETAINERS
            </span>
            <h3 className="font-sans font-black text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
              READY TO SCALE YOUR BRAND ON A MONTHLY ENGINE?
            </h3>
            <p className="font-sans text-base text-neutral-300 leading-relaxed">
              No long-term lock-ins. Custom content frequency, dedicated strategy leads, and continuous digital evolution tailored to your business goals.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2554E8] hover:bg-[#1d42c0] text-white font-mono text-xs uppercase tracking-widest font-bold transition-transform hover:scale-105 rounded-none"
            >
              <span>BUILD YOUR MONTHLY PLAN</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
