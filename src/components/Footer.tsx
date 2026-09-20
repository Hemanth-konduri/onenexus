import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#050507] text-white overflow-hidden border-t border-white/10 pt-20 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Manifesto & Location */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 bg-[#0022FF]" />
                <span className="font-sans font-black text-2xl text-white tracking-tight">
                  one<span className="text-[#0022FF]">Nexus</span>™
                </span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                A founder-led digital growth studio connecting brand identity, world-class website craft, and revenue-driven acquisition for category leaders.
              </p>
            </div>

            <div className="mt-8 font-mono text-xs text-neutral-500 uppercase tracking-widest">
              LONDON • NEW YORK • REMOTE
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <span className="block font-mono text-xs text-[#0022FF] uppercase tracking-widest mb-4 font-bold">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 font-sans text-sm text-neutral-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">What We Do</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">Featured Portfolio</a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors">Our Philosophy</a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">4-Step Process</a>
              </li>
              <li>
                <a href="#industries" className="hover:text-white transition-colors">Industries We Serve</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Common Questions</a>
              </li>
            </ul>
          </div>

          {/* Social & Connect */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="block font-mono text-xs text-[#0022FF] uppercase tracking-widest mb-4 font-bold">
                CONNECT & SOCIAL
              </span>
              <ul className="space-y-2.5 font-sans text-sm text-neutral-400">
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                    <span>LinkedIn</span>
                    <ArrowUpRight size={13} />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                    <span>Instagram (@onenexus.studio)</span>
                    <ArrowUpRight size={13} />
                  </a>
                </li>
                <li>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                    <span>X / Twitter</span>
                    <ArrowUpRight size={13} />
                  </a>
                </li>
                <li>
                  <a href="https://awwwards.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                    <span>Awwwards Directory</span>
                    <ArrowUpRight size={13} />
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 font-mono text-xs text-neutral-400">
              Direct: <a href="mailto:hello@onenexus.studio" className="text-white hover:text-[#0022FF] underline">hello@onenexus.studio</a>
            </div>
          </div>

        </div>

        {/* Massive Typographic Footer Watermark */}
        <div className="py-12 select-none overflow-hidden text-center">
          <span className="font-sans font-extrabold text-[15vw] leading-none text-white/[0.04] tracking-tighter block uppercase">
            oneNexus
          </span>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 font-mono text-xs text-neutral-500">
          <div>
            © {currentYear} One Nexus Studio Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Engagement</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
