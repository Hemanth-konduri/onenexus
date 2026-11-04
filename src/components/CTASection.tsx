import Link from "next/link";
import { ArrowUpRight, CheckCircle2, MessageSquare, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative z-10 w-full bg-[#EFECE6] text-[#111827] overflow-hidden border-t border-black/[0.08] py-24 sm:py-32 px-4 sm:px-8 lg:px-12">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-black/[0.06] first:border-l first:border-black/[0.06]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className="p-10 sm:p-16 lg:p-20 bg-[#111827] text-white border border-black/10 relative overflow-hidden shadow-2xl">
          {/* Subtle Background Glow */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#2554E8]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2554E8] text-white font-mono text-xs font-bold uppercase tracking-widest mb-6">
              <span>READY TO GROW?</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.92] text-white uppercase mb-6">
              LET’S TURN YOUR BUSINESS IDEA INTO A <span className="text-[#2554E8]">DIGITAL POWERHOUSE.</span>
            </h2>

            <p className="font-sans text-base sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl mb-10">
              Partner with OneNexus to establish your branding, website design, AI workflow, and digital marketing setup. Serving clients across India.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#2554E8] hover:bg-[#1d42c0] text-white font-mono text-xs uppercase tracking-widest font-bold shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span>START YOUR GROWTH JOURNEY</span>
                <ArrowUpRight size={16} />
              </Link>

              <a
                href="mailto:onenexus789@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest font-bold border border-white/10 transition-colors"
              >
                <Mail size={16} className="text-[#2554E8]" />
                <span>onenexus789@gmail.com</span>
              </a>
            </div>

            {/* Quick Guarantees */}
            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#2554E8]" />
                <span>Tailored for Small Businesses & Startups</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#2554E8]" />
                <span>Serving Clients Across India</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#2554E8]" />
                <span>Direct Personal Attention</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
