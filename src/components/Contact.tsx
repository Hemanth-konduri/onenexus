import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowUpRight, ArrowUp, Mail, Copy, Check, MessageSquare, Globe } from "lucide-react";

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Contact() {
  const footerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("onenexus789@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative z-10 w-full bg-[#111827] text-[#F8FAFC] overflow-hidden border-t border-white/10 pt-24 sm:pt-32 lg:pt-40 pb-12 selection:bg-[#2554E8] selection:text-white"
    >
      {/* Architectural Background Lines */}
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
          <span className="font-mono text-xs sm:text-sm text-[#2554E8] tracking-widest uppercase font-bold">
            SERVING BUSINESSES ACROSS INDIA
          </span>
        </div>

        {/* Big Editorial Headline */}
        <div className="footer-heading mb-16 lg:mb-24">
          <h2 className="text-4xl sm:text-7xl lg:text-[95px] xl:text-[120px] font-black tracking-tighter leading-[0.92] text-white uppercase select-none">
            READY TO GROW <br />
            YOUR BUSINESS? <br />
            <span className="text-[#2554E8]">LET’S BUILD IT PROPERLY.</span>
          </h2>
        </div>

        {/* Direct Email & Action Bar */}
        <div className="mb-20 lg:mb-28 p-8 sm:p-12 lg:p-16 bg-white/[0.03] border border-white/10 rounded-none flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:border-[#2554E8]/50 transition-colors duration-500">
          <div>
            <span className="font-mono text-xs sm:text-sm text-[#2554E8] uppercase tracking-widest font-extrabold block mb-3">
              DIRECT INQUIRIES & ENQUIRIES
            </span>
            <a
              href="mailto:onenexus789@gmail.com"
              className="font-sans font-black text-2xl sm:text-4xl lg:text-5xl text-white hover:text-[#2554E8] transition-colors duration-300 tracking-tight"
            >
              onenexus789@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={handleCopyEmail}
              className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 border border-white/10 transition-all duration-300 cursor-pointer"
            >
              {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              <span>{copied ? "COPIED EMAIL" : "COPY EMAIL"}</span>
            </button>

            <Link
              href="/contact"
              className="px-8 py-4 bg-[#2554E8] hover:bg-[#1d42c0] text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span>SUBMIT ENQUIRY FORM</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-white/10">
          {/* Brand Identity */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-sans font-black text-3xl text-[#2554E8] uppercase tracking-tight">
                  OneNexus
                </span>
              </div>
              <p className="font-mono text-xs text-[#2554E8] uppercase tracking-widest font-bold mb-4">
                Your Digital Growth Partner
              </p>
              <p className="font-sans text-base text-neutral-400 max-w-sm leading-relaxed mb-6">
                Helping small businesses, aspiring entrepreneurs, and women entrepreneurs build and grow their digital presence across India.
              </p>
            </div>

            <div className="font-mono text-xs text-neutral-400 space-y-1 pt-6 border-t border-white/10">
              <span className="text-white font-bold block uppercase">DOMESTIC COVERAGE</span>
              <p>Serving Clients Across All States & UTs in India</p>
              <p className="text-neutral-500">Official Website: onenexusdigi.com</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs text-[#2554E8] font-bold uppercase tracking-widest block mb-6">
              [ NAVIGATION ]
            </span>
            <ul className="space-y-3 font-sans text-base font-semibold text-neutral-300">
              <li>
                <Link href="/" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  01 / Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  02 / About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  03 / Services
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  04 / FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all">
                  05 / Contact & Enquiry Form ↗
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Connect */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-[#2554E8] font-bold uppercase tracking-widest block mb-6">
                [ CONNECT & SOCIAL ]
              </span>
              <ul className="space-y-3 font-sans text-base font-semibold text-neutral-300">
                <li>
                  <a
                    href="mailto:onenexus789@gmail.com"
                    className="hover:text-[#2554E8] flex items-center justify-between group transition-colors"
                  >
                    <span>Email: onenexus789@gmail.com</span>
                    <Mail size={16} className="text-neutral-500 group-hover:text-[#2554E8]" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2554E8] flex items-center justify-between group transition-colors"
                  >
                    <span>WhatsApp Chat</span>
                    <MessageSquare size={16} className="text-emerald-400" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2554E8] flex items-center justify-between group transition-colors"
                  >
                    <span>Instagram</span>
                    <InstagramIcon size={16} className="text-pink-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://onenexusdigi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#2554E8] flex items-center justify-between group transition-colors font-bold text-white"
                  >
                    <span>onenexusdigi.com</span>
                    <Globe size={16} className="text-[#2554E8]" />
                  </a>
                </li>
              </ul>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-8 w-full py-4 bg-white/5 hover:bg-[#2554E8] text-white font-mono text-xs font-bold uppercase tracking-widest border border-white/10 flex items-center justify-center gap-2 transition-all group cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Watermark Signature */}
        <div className="py-12 select-none overflow-hidden text-center border-b border-white/10">
          <span className="font-sans font-black text-[14vw] leading-none text-white/[0.04] tracking-tighter block uppercase">
            OneNexus
          </span>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 font-mono text-xs text-neutral-400">
          <div>© {currentYear} OneNexus. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>onenexusdigi.com</span>
            <span>•</span>
            <span>Unite. Innovate. Dominate.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
