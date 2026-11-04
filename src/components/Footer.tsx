import Link from "next/link";
import { ArrowUpRight, Mail, MessageSquare } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#090D16] text-white overflow-hidden border-t border-white/10 pt-20 pb-12">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-white/[0.03] first:border-l first:border-white/[0.03]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Subtle, Elegant Brand Values Line */}
        <div className="pb-12 border-b border-white/10 text-center">
          <p className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#2554E8] uppercase font-bold">
            UNITE. INNOVATE. DOMINATE.
          </p>
        </div>

        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16 border-b border-white/10">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-sans font-black text-3xl tracking-tight text-[#2554E8]">
                  OneNexus
                </span>
              </div>
              <p className="font-mono text-xs tracking-widest text-[#2554E8] uppercase font-bold mb-4">
                Your Digital Growth Partner
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                Helping small businesses, aspiring entrepreneurs, and women entrepreneurs build and grow their digital presence through strategic branding, AI solutions, social media marketing, and custom web design.
              </p>
            </div>

            <div className="mt-8 font-mono text-xs text-neutral-400 tracking-widest uppercase font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Serving Clients Across India</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <span className="block font-mono text-xs text-[#2554E8] uppercase tracking-widest mb-6 font-bold">
              NAVIGATION
            </span>
            <ul className="space-y-3 font-sans text-sm text-neutral-300">
              <li>
                <Link href="/" className="hover:text-[#2554E8] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#2554E8] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#2554E8] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#2554E8] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#2554E8] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Social */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <span className="block font-mono text-xs text-[#2554E8] uppercase tracking-widest mb-6 font-bold">
                CONNECT & ENQUIRE
              </span>
              <ul className="space-y-3 font-sans text-sm text-neutral-300">
                <li>
                  <a
                    href="mailto:onenexus789@gmail.com"
                    className="flex items-center gap-2.5 hover:text-[#2554E8] transition-colors group"
                  >
                    <Mail size={15} className="text-[#2554E8]" />
                    <span>onenexus789@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-[#2554E8] transition-colors group"
                  >
                    <MessageSquare size={15} className="text-emerald-400" />
                    <span>WhatsApp Chat</span>
                    <ArrowUpRight size={13} className="text-neutral-500 group-hover:text-[#2554E8]" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-[#2554E8] transition-colors group"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight size={13} className="text-neutral-500 group-hover:text-[#2554E8]" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 font-mono text-xs text-neutral-400">
              Official Website:{" "}
              <a
                href="https://onenexusdigi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#2554E8] underline font-bold"
              >
                onenexusdigi.com
              </a>
            </div>
          </div>

        </div>

        {/* Typographic Watermark */}
        <div className="py-12 select-none overflow-hidden text-center">
          <span className="font-sans font-black text-[14vw] leading-none text-white/[0.04] tracking-tighter block uppercase">
            OneNexus
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 font-mono text-xs text-neutral-400">
          <div>
            © {currentYear} OneNexus. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>onenexusdigi.com</span>
            <span>•</span>
            <span>Serving Clients Across India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

