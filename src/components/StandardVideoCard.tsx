import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Pause, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { WhyOneNexusStandard } from "@/data/whyOneNexusStandards";

interface StandardVideoCardProps {
  standard: WhyOneNexusStandard;
  className?: string;
  variant?: "large" | "compact" | "panoramic";
}

export default function StandardVideoCard({
  standard,
  className = "",
  variant = "large",
}: StandardVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const isPanoramic = variant === "panoramic";
  const isCompact = variant === "compact";

  return (
    <Link
      href={`/why/${standard.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col justify-between overflow-hidden border border-black/15 bg-[#111827] text-white rounded-none transition-all duration-500 hover:border-[#2554E8] hover:shadow-2xl ${className}`}
    >
      {/* Background Video Engine */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0d121c]">
        <video
          ref={videoRef}
          src={standard.videoSrc}
          poster={standard.posterImage}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-75"
        />

        {/* Ambient Brutalist Gradients & Grain Protection */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/65 to-[#0d1117]/25" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-transparent to-black/60 pointer-events-none" />

        {/* Subtle Architecture Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Top Metadata Bar */}
      <div className="relative z-10 flex items-start justify-between p-5 sm:p-6 lg:p-7 border-b border-white/10 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center font-mono text-xs font-black uppercase tracking-wider text-white bg-[#2554E8] px-2.5 py-1 rounded-none shadow-xs">
            {standard.num}
          </span>
          <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase font-bold text-neutral-300">
            {standard.station}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Live Metric Badge */}
          <span className="font-mono text-[10px] sm:text-xs font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-0.5 rounded-none flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-pulse" />
            <span>{standard.metricStat}</span>
          </span>

          {/* Quick Play/Pause Ambient Toggle */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="w-7 h-7 flex items-center justify-center bg-black/50 hover:bg-[#2554E8] text-white border border-white/20 transition-colors rounded-none"
          >
            {isPlaying ? <Pause size={11} /> : <Play size={11} className="ml-0.5" />}
          </button>
        </div>
      </div>

      {/* Middle/Bottom Information Area */}
      <div
        className={`relative z-10 flex flex-col justify-end p-5 sm:p-6 lg:p-7 ${
          isPanoramic ? "lg:flex-row lg:items-end lg:justify-between gap-6" : "space-y-4"
        }`}
      >
        <div className={isPanoramic ? "max-w-2xl" : "space-y-2.5"}>
          {/* Eyebrow Highlight */}
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-wider uppercase font-semibold text-[#688bf8]">
            <span className="w-1.5 h-1.5 bg-[#2554E8]" />
            <span>{standard.highlight}</span>
          </div>

          {/* Card Title */}
          <h3
            className={`font-sans font-black tracking-tight text-white leading-[1.1] group-hover:text-white transition-colors ${
              isPanoramic
                ? "text-2xl sm:text-3xl lg:text-4xl"
                : isCompact
                ? "text-xl sm:text-2xl"
                : "text-2xl sm:text-3xl lg:text-3xl"
            }`}
          >
            {standard.title}
          </h3>

          {/* Short description */}
          <p
            className={`text-neutral-300 font-sans leading-relaxed line-clamp-2 ${
              isCompact ? "text-xs" : "text-xs sm:text-sm"
            }`}
          >
            {standard.shortDesc}
          </p>
        </div>

        {/* Action Button & Metric Callout */}
        <div className="flex items-center justify-between sm:justify-start lg:justify-end gap-3 pt-3 border-t border-white/10 shrink-0">
          <div className="text-left font-mono">
            <span className="block text-[9px] uppercase tracking-wider text-neutral-400">
              {standard.metricLabel}
            </span>
            <span className="text-xs font-bold text-white font-sans">
              {standard.metricStat}
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#111827] group-hover:bg-[#2554E8] group-hover:text-white font-mono text-[11px] font-black uppercase tracking-wider transition-all duration-300 rounded-none shadow-md">
            <span>INSPECT</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </div>

      {/* Reticle Corner Crosshair Ticks */}
      <span className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-white/20 group-hover:border-[#2554E8] transition-colors pointer-events-none" />
      <span className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-white/20 group-hover:border-[#2554E8] transition-colors pointer-events-none" />
      <span className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-white/20 group-hover:border-[#2554E8] transition-colors pointer-events-none" />
      <span className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-white/20 group-hover:border-[#2554E8] transition-colors pointer-events-none" />
    </Link>
  );
}
