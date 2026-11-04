import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInquiry } from "@/context/InquiryContext";
import { ArrowUpRight, X, Layers, CheckCircle2 } from "lucide-react";

export default function FloatingInquiryBar() {
  const { selectedServices, removeService, clearServices } = useInquiry();
  const router = useRouter();

  // Hide on contact page itself or if no services selected
  if (selectedServices.length === 0 || router.pathname === "/contact") {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-6 z-50 max-w-md w-[calc(100vw-3rem)] bg-[#111827] text-white p-4 sm:p-5 rounded-none shadow-2xl border border-white/10 backdrop-blur-lg animate-in fade-in slide-in-from-bottom-5 duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#2554E8] rounded-full animate-ping" />
          <span className="font-mono text-xs font-bold tracking-wider uppercase text-neutral-300 flex items-center gap-1.5">
            <Layers size={14} className="text-[#2554E8]" />
            <span>YOUR INQUIRY SELECTION</span>
          </span>
          <span className="px-2 py-0.5 bg-[#2554E8] text-white font-mono text-[10px] font-extrabold rounded-full">
            {selectedServices.length}
          </span>
        </div>

        <button
          onClick={clearServices}
          className="text-neutral-400 hover:text-white font-mono text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors"
          title="Clear all selections"
        >
          <span>Clear All</span>
          <X size={12} />
        </button>
      </div>

      {/* Selected Items Badges */}
      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto mb-4 pr-1 scrollbar-thin">
        {selectedServices.map((service, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/15 border border-white/10 rounded text-xs font-sans font-medium text-neutral-200 transition-colors"
          >
            <CheckCircle2 size={12} className="text-[#2554E8]" />
            <span className="truncate max-w-[180px]">{service}</span>
            <button
              onClick={() => removeService(service)}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>

      {/* Action Button */}
      <Link
        href="/contact"
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#2554E8] hover:bg-[#1d42c0] text-white font-mono text-xs font-bold tracking-widest uppercase rounded-[2px] transition-all duration-200 shadow-lg hover:shadow-[0_4px_20px_rgba(37,84,232,0.4)]"
      >
        <span>PROCEED TO INQUIRY FORM ({selectedServices.length})</span>
        <ArrowUpRight size={15} />
      </Link>
    </div>
  );
}
