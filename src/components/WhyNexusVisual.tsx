import React, { useRef, useState, useEffect } from "react";

interface WhyNexusVisualProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
}

export default function WhyNexusVisual({ activeIndex, onSelectIndex }: WhyNexusVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // 5 Nodes arranged in a pentagonal orbit
  const nodes = [
    { num: "01", label: "UNDERSTAND", angle: -90, tag: "HONEST STRATEGY" },
    { num: "02", label: "PRACTICAL", angle: -18, tag: "HIGH IMPACT" },
    { num: "03", label: "ATTENTION", angle: 54, tag: "DEDICATED FOCUS" },
    { num: "04", label: "GROWTH", angle: 126, tag: "CONVERSION FIRST" },
    { num: "05", label: "SUPPORT", angle: 198, tag: "LONG-TERM PARTNER" },
  ];

  const radius = 110;
  const cx = 175;
  const cy = 165;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-5 sm:p-6 backdrop-blur-xl shadow-2xl overflow-hidden group select-none"
      aria-hidden="true"
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-60"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 30}% ${
            50 + mousePos.y * 30
          }%, rgba(37, 84, 232, 0.22) 0%, rgba(17, 24, 39, 0) 70%)`,
        }}
      />

      {/* Cybernetic Grid & Crosshairs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Top HUD Status Bar */}
      <div className="relative z-10 flex items-center justify-between pb-3.5 mb-2 border-b border-white/10 text-[10px] font-mono tracking-widest uppercase">
        <div className="flex items-center gap-2 text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-[#2554E8] animate-ping" />
          <span className="text-[#38BDF8] font-bold">NEXUS MATRIX</span>
          <span className="text-neutral-500">//</span>
          <span className="text-neutral-400">ACTIVE: 0{activeIndex + 1}</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-semibold">OPTIMIZED</span>
        </div>
      </div>

      {/* Central Abstract Kinetic Geometric Canvas */}
      <div
        className="relative z-10 w-full flex items-center justify-center py-2 transition-transform duration-300 ease-out"
        style={{
          transform: prefersReducedMotion
            ? "none"
            : `perspective(1000px) rotateX(${mousePos.y * -14}deg) rotateY(${mousePos.x * 14}deg)`,
        }}
      >
        <svg
          viewBox="0 0 350 330"
          className="w-full max-w-[340px] sm:max-w-[370px] h-auto drop-shadow-[0_0_25px_rgba(37,84,232,0.35)]"
        >
          <defs>
            {/* Gradients */}
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#2554E8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#111827" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#2554E8" stopOpacity="0.2" />
            </linearGradient>

            <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Concentric Ambient Orbit Rings */}
          <circle
            cx={cx}
            cy={cy}
            r={radius + 32}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="rgba(37, 84, 232, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="8 8"
            className={prefersReducedMotion ? "" : "animate-[spin_40s_linear_infinite]"}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
          <circle
            cx={cx}
            cy={cy}
            r={radius - 40}
            fill="none"
            stroke="rgba(56, 189, 248, 0.2)"
            strokeWidth="1"
            strokeDasharray="2 4"
            className={prefersReducedMotion ? "" : "animate-[spin_25s_linear_infinite_reverse]"}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />

          {/* Active Ray Beams from Core to All Nodes */}
          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const nx = cx + radius * Math.cos(rad);
            const ny = cy + radius * Math.sin(rad);
            const isActive = activeIndex === i;

            return (
              <g key={i}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={nx}
                  y2={ny}
                  stroke={isActive ? "url(#beamGrad)" : "rgba(255,255,255,0.08)"}
                  strokeWidth={isActive ? "2" : "1"}
                  strokeDasharray={isActive ? "none" : "2 3"}
                  filter={isActive ? "url(#glowFilter)" : undefined}
                  className="transition-all duration-500"
                />
              </g>
            );
          })}

          {/* Core Central Geometry: Multilayer Isometric Obsidian Nexus */}
          {/* Outer glow sphere */}
          <circle cx={cx} cy={cy} r="48" fill="url(#coreGlow)" />

          {/* Outer wireframe diamond */}
          <polygon
            points={`${cx},${cy - 38} ${cx + 34},${cy} ${cx},${cy + 38} ${cx - 34},${cy}`}
            fill="rgba(17, 24, 39, 0.85)"
            stroke="rgba(56, 189, 248, 0.6)"
            strokeWidth="1.5"
          />

          {/* Inner facet lines for isometric 3D crystal look */}
          <line x1={cx} y1={cy - 38} x2={cx} y2={cy + 38} stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />
          <line x1={cx - 34} y1={cy} x2={cx + 34} y2={cy} stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />

          {/* Center glowing core point */}
          <circle cx={cx} cy={cy} r="8" fill="#38BDF8" filter="url(#glowFilter)" />
          <circle cx={cx} cy={cy} r="3" fill="#ffffff" />

          {/* 5 Outer Principle Satellite Nodes */}
          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const nx = cx + radius * Math.cos(rad);
            const ny = cy + radius * Math.sin(rad);
            const isActive = activeIndex === i;

            return (
              <g
                key={i}
                onClick={() => onSelectIndex(i)}
                className="cursor-pointer transition-all duration-300"
              >
                {/* Active ripple wave */}
                {isActive && (
                  <circle
                    cx={nx}
                    cy={ny}
                    r="18"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.5"
                    opacity="0.75"
                    className={prefersReducedMotion ? "" : "animate-ping"}
                  />
                )}

                {/* Node outer ring */}
                <circle
                  cx={nx}
                  cy={ny}
                  r={isActive ? "14" : "11"}
                  fill={isActive ? "#1E293B" : "#0F172A"}
                  stroke={isActive ? "#38BDF8" : "rgba(255,255,255,0.25)"}
                  strokeWidth={isActive ? "2" : "1"}
                  className="transition-all duration-300"
                  filter={isActive ? "url(#glowFilter)" : undefined}
                />

                {/* Node number text */}
                <text
                  x={nx}
                  y={ny + 3.5}
                  textAnchor="middle"
                  fill={isActive ? "#FFFFFF" : "rgba(255,255,255,0.7)"}
                  fontSize={isActive ? "9" : "8"}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.num}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Telemetry Footer & Principle Quick Switcher */}
      <div className="relative z-10 pt-3 border-t border-white/10 mt-1">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-mono text-neutral-400 text-[11px]">
            ACTIVE ALIGNMENT
          </span>
          <span className="font-mono text-[#38BDF8] font-bold text-[11px] tracking-wider">
            {nodes[activeIndex]?.tag}
          </span>
        </div>

        {/* 5-Segment Principle Progress Bar / Interactive Clickable Track */}
        <div className="grid grid-cols-5 gap-1.5" role="tablist" aria-label="Principle selection tabs">
          {nodes.map((node, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelectIndex(i)}
                className={`py-1.5 px-1 rounded transition-all duration-300 font-mono text-[10px] font-bold flex flex-col items-center gap-0.5 ${
                  isActive
                    ? "bg-[#2554E8] text-white shadow-[0_0_12px_rgba(37,84,232,0.6)]"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white"
                }`}
                aria-label={`Jump to Principle ${node.num}: ${node.label}`}
                aria-selected={isActive}
                role="tab"
              >
                <span>{node.num}</span>
                <span className="text-[8px] tracking-tight opacity-75 hidden sm:inline">
                  {node.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
