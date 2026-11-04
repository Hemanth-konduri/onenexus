import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Building2,
  Lightbulb,
  Sparkles,
  MapPin,
  ArrowUpRight,
  Check,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInquiry } from "@/context/InquiryContext";

interface AudiencePoint {
  id: string;
  num: string;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const audiencePoints: AudiencePoint[] = [
  {
    id: "small-businesses",
    num: "01",
    tag: "SCALABLE PRESENCE",
    title: "Small Businesses",
    subtitle: "Established & Growing Local Entities",
    desc: "Empowering traditional & growing businesses to transition online, dominate local search, and automate digital inquiries.",
    icon: Building2,
  },
  {
    id: "aspiring-entrepreneurs",
    num: "02",
    tag: "CONCEPT TO LAUNCH",
    title: "Aspiring Entrepreneurs",
    subtitle: "Visionaries & Idea-Stage Founders",
    desc: "Transforming raw concepts into launch-ready digital products, distinct brand identities, and rapid go-to-market execution.",
    icon: Lightbulb,
  },
  {
    id: "women-entrepreneurs",
    num: "03",
    tag: "EMPOWERED GROWTH",
    title: "Women Entrepreneurs",
    subtitle: "Founders, Creators & Leaders",
    desc: "Dedicated digital growth partnership, strategic branding, social expansion, and hands-on guidance to help women-led ventures thrive.",
    icon: Sparkles,
  },
];

const indianCities = [
  "BENGALURU",
  "MUMBAI",
  "DELHI NCR",
  "HYDERABAD",
  "CHENNAI",
  "PUNE",
  "AHMEDABAD",
  "KOLKATA",
  "JAIPUR",
  "KOCHI",
  "CHANDIGARH",
  "INDORE",
  "LUCKNOW",
  "COIMBATORE",
  "BHUBANESWAR",
  "SURAT",
  "NAGPUR",
  "VADODARA",
  "VISAKHAPATNAM",
  "PATNA",
  "ALL 28 STATES & UNION TERRITORIES",
];

export default function WhoWeHelp() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { addService, toggleService, isServiceSelected } = useInquiry();

  // Automatic video playback strictly when in view, paused when out of view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is muted for policy compliance & seamless autoplay
    video.muted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Autoplay policy handled silently
              });
            }
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.25, // Only plays when at least 25% of the video is inside viewport
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Entrance animations for small cards
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".small-audience-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current?.querySelector(".small-cards-grid"),
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
      id="who-we-help"
      ref={sectionRef}
      aria-labelledby="who-we-help-heading"
      className="relative z-10 w-full bg-[#EFECE6] text-[#111827] overflow-hidden border-t border-black/[0.08] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 selection:bg-[#2554E8] selection:text-white"
    >
      {/* Architectural Background Vertical Guidelines */}
      <div
        className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12"
        aria-hidden="true"
      >
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-black/[0.05] first:border-l first:border-black/[0.05]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Eyebrow Header Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-black/[0.08] mb-10 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-[1px]" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-[#111827]">
              WHO WE POWER
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm text-[#2554E8] tracking-widest uppercase font-bold">
            [ AUDIENCE FOCUS ]
          </span>
        </div>

        {/* Section Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-3xl">
            <h2
              id="who-we-help-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.92] text-[#111827] uppercase select-none mb-3"
            >
              TAILORED GROWTH FOR <br />
              <span className="text-[#2554E8]">EVERY AMBITIOUS VISION.</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl">
              Whether you are launching your first business idea or expanding an established venture, OneNexus delivers bespoke digital strategy, branding, and high-converting web infrastructure.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#2554E8] hover:bg-[#1d42c0] text-white font-mono text-xs uppercase tracking-widest font-bold shadow-md hover:scale-105 transition-all rounded-none"
            >
              <span>START A CONVERSATION</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* ================= 1. BIG CINEMATIC VIDEO CARD (NO CONTROLS, AUTOPLAYS IN VIEW) ================= */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] bg-[#111827] border border-black/15 shadow-2xl overflow-hidden rounded-none">
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            preload="auto"
            controls={false}
            disablePictureInPicture
            className="w-full h-full object-cover pointer-events-none select-none"
          >
            <source src="/onenexus_hero_video.mp4" type="video/mp4" />
            <source src="/Animating_futuristic_image.mp4" type="video/mp4" />
          </video>

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Floating Live Tag Overlay */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2.5 px-3.5 py-1.5 bg-[#111827]/85 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest pointer-events-none shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#2554E8] animate-ping" />
            <span>ONENEXUS DIGITAL ENGINE</span>
            <span className="text-white/30 hidden sm:inline">//</span>
            <span className="text-[#38BDF8] hidden sm:inline">AUTONOMOUS GROWTH</span>
          </div>
        </div>

        {/* ================= 2. THOSE THREE POINTS AS VERY SMALL CARDS ================= */}
        <div className="small-cards-grid grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {audiencePoints.map((point) => {
            const Icon = point.icon;
            const isSelected = isServiceSelected(point.title);

            return (
              <div
                key={point.id}
                className="small-audience-card group bg-white border border-black/10 p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#2554E8]/60 transition-all rounded-none flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Bar: Number, Tag, & Icon */}
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-sm font-black text-[#2554E8]">
                        {point.num}
                      </span>
                      <span className="px-2 py-0.5 bg-black/5 font-mono text-[9px] font-bold text-[#2554E8] uppercase tracking-wider rounded-[1px]">
                        {point.tag}
                      </span>
                    </div>

                    <div className="w-8 h-8 bg-[#111827] text-white flex items-center justify-center rounded-[1px] group-hover:bg-[#2554E8] transition-colors shrink-0">
                      <Icon size={15} />
                    </div>
                  </div>

                  {/* Title & One-line Description */}
                  <div>
                    <h3 className="font-sans font-black text-lg sm:text-xl text-[#111827] uppercase tracking-tight group-hover:text-[#2554E8] transition-colors">
                      {point.title}
                    </h3>
                    <p className="font-sans text-xs text-[#475569] leading-relaxed mt-1.5">
                      {point.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-4 border-t border-black/[0.08] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => toggleService(point.title)}
                    className={`flex-1 py-2 px-2.5 font-mono text-[10px] font-bold uppercase tracking-wider rounded-none border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? "bg-[#2554E8] text-white border-[#2554E8]"
                        : "bg-white hover:bg-[#111827] hover:text-white text-[#111827] border-black/15"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check size={12} strokeWidth={3} />
                        <span>ADDED</span>
                      </>
                    ) : (
                      <>
                        <Plus size={12} strokeWidth={3} />
                        <span>SELECT</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      addService(point.title);
                      router.push(`/contact?audience=${encodeURIComponent(point.title)}`);
                    }}
                    className="p-2 bg-[#F4F0EA] hover:bg-[#2554E8] hover:text-white text-[#111827] border border-black/10 transition-colors rounded-none shrink-0 cursor-pointer"
                    aria-label={`Inquire about ${point.title}`}
                  >
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= 3. ANIMATED INFINITY SCROLLING CITY NAMES ================= */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-black/[0.08]">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase text-neutral-500 font-bold tracking-widest mb-3">
            <MapPin size={13} className="text-[#2554E8]" />
            <span>ACTIVE PARTNERSHIP CORRIDORS ACROSS ALL 28 STATES &amp; UNION TERRITORIES:</span>
          </div>

          {/* Marquee Ticker Strip with Fade Edges */}
          <div className="relative w-full overflow-hidden border-y border-black/10 bg-white py-3.5 shadow-sm">
            {/* Left & Right Gradient Fade Masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />

            {/* Seamless Infinite Marquee Track (Repeated Twice) */}
            <div className="animate-marquee items-center gap-6 select-none">
              {/* Loop Copy 1 */}
              {indianCities.map((city, cIdx) => (
                <span
                  key={`city-1-${cIdx}`}
                  className="inline-flex items-center gap-6 font-mono text-xs font-bold text-[#111827] uppercase tracking-wider shrink-0 hover:text-[#2554E8] transition-colors"
                >
                  <span>{city}</span>
                  <span className="text-[#2554E8] font-black text-sm select-none">•</span>
                </span>
              ))}

              {/* Loop Copy 2 for seamless wrap-around */}
              {indianCities.map((city, cIdx) => (
                <span
                  key={`city-2-${cIdx}`}
                  className="inline-flex items-center gap-6 font-mono text-xs font-bold text-[#111827] uppercase tracking-wider shrink-0 hover:text-[#2554E8] transition-colors"
                >
                  <span>{city}</span>
                  <span className="text-[#2554E8] font-black text-sm select-none">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
