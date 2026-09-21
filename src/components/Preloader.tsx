import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

type PreloaderProps = {
  onComplete?: () => void;
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    // Lock body scrolling during preloading
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const letters = lettersRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = previousOverflow;
            onComplete?.();
          }, 350);
        },
      });

      // 1. Initial State: Letters are faint/dim outlines in 3D perspective
      gsap.set(letters, {
        opacity: 0.15,
        color: "#334155",
        rotateX: -90,
        y: 40,
        transformPerspective: 1000,
        transformOrigin: "50% 50% -40px",
      });

      // 2. Letter-by-letter 3D Flip & Illumination Fill
      tl.to(letters, {
        opacity: 1,
        color: "#FFFFFF",
        rotateX: 0,
        y: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "back.out(1.7)",
      })
      // 3. Highlight 'NEXUS' in Cobalt Blue letter-by-letter
      .to(
        letters.slice(3), // NEXUS letters
        {
          color: "#2554E8",
          textShadow: "0 0 35px rgba(37, 84, 232, 0.85)",
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.3"
      )
      // 4. Smooth 360-degree rotation wave across letters
      .to(
        letters,
        {
          rotateY: 360,
          duration: 1.1,
          stagger: 0.06,
          ease: "power2.inOut",
        },
        "+=0.15"
      );

    }, preloaderRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  const letterArray = ["O", "N", "E", "N", "E", "X", "U", "S"];

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          ref={preloaderRef}
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999999] bg-[#0B0F17] text-white flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden select-none"
        >
          {/* Background Architectural Grid Lines */}
          <div className="absolute inset-0 pointer-events-none flex justify-between max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 opacity-25">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="h-full border-r border-white/[0.05] first:border-l first:border-white/[0.05]"
              />
            ))}
          </div>

          {/* Top Header */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-6">
            <span className="font-mono text-xs sm:text-sm text-[#2554E8] tracking-[0.25em] font-bold uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2554E8] animate-ping" />
              <span>[ STUDIO INITIALIZER ]</span>
            </span>
            <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase font-bold">
              ONE NEXUS STUDIO
            </span>
          </div>

          {/* GIANT TYPOGRAPHY: ONENEXUS LETTER BY LETTER GSAP ANIMATION */}
          <div className="relative z-10 my-auto text-center perspective-[1200px]">
            <h1 className="font-sans font-black text-6xl sm:text-9xl lg:text-[140px] xl:text-[180px] tracking-tight uppercase leading-none select-none flex items-center justify-center gap-1 sm:gap-2 lg:gap-4">
              {letterArray.map((letter, index) => (
                <span
                  key={index}
                  ref={(el) => {
                    if (el) lettersRef.current[index] = el;
                  }}
                  className="inline-block transition-colors duration-300"
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Bottom Telemetry Info */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 font-mono text-xs text-neutral-400">
            <div>MAYFAIR LONDON • MANHATTAN NEW YORK</div>
            <div className="text-[#2554E8] font-bold uppercase tracking-widest">
              STRATEGIC DESIGN & ENGINEERING
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
