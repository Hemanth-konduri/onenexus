import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight, ArrowUp, Mail, Copy, Check } from "lucide-react";

export default function Contact() {
  const footerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@onenexus.studio");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Main Heading Reveal
      const heading = footerRef.current?.querySelector(".footer-heading");
      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
            },
          }
        );
      }

      // Stagger Columns Reveal
      const cols = footerRef.current?.querySelectorAll(".footer-col");
      if (cols) {
        gsap.fromTo(
          cols,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current?.querySelector(".footer-grid"),
              start: "top 85%",
            },
          }
        );
      }

      // Watermark Parallax Effect
      const watermark = footerRef.current?.querySelector(".footer-watermark");
      if (watermark) {
        gsap.fromTo(
          watermark,
          { opacity: 0.05, y: 30 },
          {
            opacity: 0.18,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: watermark,
              start: "top 90%",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative z-10 w-full bg-[#111827] text-[#F8FAFC] overflow-hidden border-t border-white/10 pt-24 sm:pt-32 lg:pt-40 pb-12 selection:bg-[#2554E8] selection:text-white"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-white/[0.04] first:border-l first:border-white/[0.04]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Eyebrow */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-12 lg:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-[1px]" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-white">
              START A CONVERSATION
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm text-neutral-400 tracking-widest uppercase">
            [ SECTION 06 ]
          </span>
        </div>

        {/* Big Editorial Headline */}
        <div className="footer-heading mb-16 lg:mb-24">
          <h2 className="text-4xl sm:text-7xl lg:text-[100px] xl:text-[130px] font-black tracking-tighter leading-[0.92] text-white uppercase select-none">
            HAVE SOMETHING <br />
            WORTH SHAPING? <br />
            <span className="text-[#2554E8]">LET’S BUILD IT PROPERLY.</span>
          </h2>
        </div>

        {/* Huge Interactive Direct Email Bar + Dedicated Contact Button */}
        <div className="mb-20 lg:mb-28 p-8 sm:p-12 lg:p-16 bg-white/[0.03] border border-white/10 rounded-none flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:border-[#2554E8]/50 transition-colors duration-500">
          <div>
            <span className="font-mono text-xs sm:text-sm text-[#2554E8] uppercase tracking-widest font-extrabold block mb-3">
              DIRECT INQUIRIES & PARTNERSHIPS
            </span>
            <a
              href="mailto:hello@onenexus.studio"
              className="font-sans font-black text-2xl sm:text-4xl lg:text-6xl text-white hover:text-[#2554E8] transition-colors duration-300 tracking-tight"
            >
              hello@onenexus.studio
            </a>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={handleCopyEmail}
              className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 border border-white/10 transition-all duration-300"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
            </button>

            <Link
              href="/contact"
              className="px-8 py-4 bg-[#2554E8] hover:bg-[#1d42c0] text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* 4-Column Studio Footer Grid Layout */}
        <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-white/10">
          
          {/* Col 1: Studio Identity (4 cols) */}
          <div className="footer-col lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 group cursor-pointer">
                <div className="relative overflow-hidden rounded-[2px] p-0.5 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(37,84,232,0.6)]">
                  <img
                    src="/onenexus-logo-bckgr.png"
                    alt="oneNexus Studio"
                    className="h-9 w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:brightness-125"
                  />
                </div>
                <span className="font-sans font-black text-2xl text-white tracking-tighter uppercase group-hover:text-[#2554E8] transition-colors duration-300">
                  oneNexus
                </span>
                <span className="px-2 py-0.5 bg-[#2554E8] text-white font-mono text-[10px] font-bold tracking-widest uppercase group-hover:bg-white group-hover:text-[#111827] transition-all duration-300">
                  STUDIO
                </span>
              </div>
              <p className="font-sans text-base text-neutral-400 max-w-sm leading-relaxed mb-6">
                A founder-led strategic design and engineering studio connecting strategy, brand, and digital products for ambitious brands worldwide.
              </p>
            </div>

            <div className="font-mono text-xs text-neutral-400 space-y-1 pt-6 border-t border-white/10">
              <span className="text-white font-bold block">LOCATIONS</span>
              <p>Mayfair, London • Manhattan, New York</p>
              <p className="text-neutral-500">Global Client Roster</p>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="footer-col lg:col-span-3">
            <span className="font-mono text-xs text-[#2554E8] font-bold uppercase tracking-widest block mb-6">
              [ NAVIGATION ]
            </span>
            <ul className="space-y-3 font-sans text-base font-semibold text-neutral-300">
              <li>
                <a href="#about" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  01 / About & Philosophy
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  02 / Selected Work
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  03 / Capabilities & Disciplines
                </a>
              </li>
              <li>
                <a href="#proof" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  04 / Credentials & Proof
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  05 / Project Discovery Questionnaire ↗
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Connect (3 cols) */}
          <div className="footer-col lg:col-span-3">
            <span className="font-mono text-xs text-[#2554E8] font-bold uppercase tracking-widest block mb-6">
              [ CONNECT & SOCIAL ]
            </span>
            <ul className="space-y-3 font-sans text-base font-semibold text-neutral-300">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2554E8] flex items-center justify-between group transition-colors duration-300"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-[#2554E8] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2554E8] flex items-center justify-between group transition-colors duration-300"
                >
                  <span>Twitter / X</span>
                  <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-[#2554E8] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2554E8] flex items-center justify-between group transition-colors duration-300"
                >
                  <span>Instagram</span>
                  <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-[#2554E8] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2554E8] flex items-center justify-between group transition-colors duration-300"
                >
                  <span>Dribbble</span>
                  <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-[#2554E8] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2554E8] flex items-center justify-between group transition-colors duration-300"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-[#2554E8] transition-colors" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Engagement & Back to top (2 cols) */}
          <div className="footer-col lg:col-span-2 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-[#2554E8] font-bold uppercase tracking-widest block mb-4">
                [ ENGAGEMENT ]
              </span>
              <p className="font-sans text-xs text-neutral-400 leading-relaxed mb-6">
                Selective quarterly engagements to guarantee 100% direct founder access and relentless craft quality.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="w-full py-4 bg-white/5 hover:bg-[#2554E8] text-white font-mono text-xs font-bold uppercase tracking-widest border border-white/10 flex items-center justify-center gap-2 transition-all duration-300 group cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>

        </div>

        {/* Giant Watermark Signature */}
        <div className="footer-watermark py-12 lg:py-16 select-none overflow-hidden text-center border-b border-white/10">
          <span className="font-sans font-black text-[16vw] leading-none text-white tracking-tighter block uppercase">
            oneNexus
          </span>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 font-mono text-xs text-neutral-400">
          <div>
            © {currentYear} oneNexus Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-neutral-500">
            <span>LONDON 10:30 AM • GMT</span>
            <span>NEW YORK 05:30 AM • EST</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
