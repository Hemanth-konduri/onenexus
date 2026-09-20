import React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const headlineLines = [
  "BUILD",
  "A BRAND",
  "THAT PEOPLE",
  "REMEMBER."
];

export default function HeroContent() {
  return (
    <div className="relative z-10 w-full max-w-[1200px] mx-auto text-center flex flex-col items-center justify-center px-4 py-1">
      
      {/* Soft translucent cool-white radial glow behind central content */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 m-auto w-[90%] max-w-[750px] h-[85%] bg-[#F5F8FC]/50 rounded-full blur-[40px] pointer-events-none -z-10"
      />

      {/* Main Headline - Vertical Lines with Interactive Hover Letters */}
      <h1 className="hero-headline font-sans font-black text-[clamp(3.2rem,6.8vw,6.8rem)] tracking-[-0.05em] leading-[0.90] text-[#111827] select-none text-center flex flex-col items-center justify-center uppercase my-2 sm:my-3">
        {headlineLines.map((line, lineIndex) => (
          <span
            key={lineIndex}
            className="hero-text-line flex items-center justify-center gap-[0.015em] whitespace-nowrap py-0"
          >
            {line.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                className={`inline-block transition-all duration-300 ease-out cursor-pointer select-none text-[#111827] hover:text-[#2554E8] hover:rotate-[15deg] hover:scale-125 hover:-translate-y-1 ${
                  char === " " ? "w-[0.28em]" : ""
                }`}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        ))}
      </h1>

      {/* Action Buttons */}
      <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-5">
        {/* Primary CTA Button */}
        <a
          href="#contact"
          className="hero-cta-btn group inline-flex items-center justify-center gap-2 h-[48px] px-6 bg-[#172554] hover:bg-[#2554E8] text-[#F8FAFC] font-mono text-xs tracking-widest uppercase font-medium rounded-[2px] transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-[0_8px_25px_rgba(37,84,232,0.35)] cursor-pointer"
        >
          <span>START A PROJECT</span>
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>

        {/* Secondary CTA Button */}
        <a
          href="#work"
          className="hero-cta-btn group inline-flex items-center justify-center gap-2 h-[48px] px-4 bg-transparent text-[#172554] hover:text-[#2554E8] font-mono text-xs tracking-widest uppercase font-medium transition-colors duration-200 border-b border-[#172554]/25 hover:border-[#2554E8] cursor-pointer"
        >
          <span>EXPLORE OUR WORK</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </a>
      </div>

    </div>
  );
}
