import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING STUDIO CORE...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock body scroll during preloading
    document.body.style.overflow = "hidden";

    // Progress counter simulation (0 to 100%)
    const duration = 2200; // 2.2 seconds total load time
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      // Update telemetry text based on progress milestone
      if (currentProgress < 30) {
        setStatusText("INITIALIZING STUDIO CORE...");
      } else if (currentProgress < 60) {
        setStatusText("CALIBRATING 3D SHADERS & LIGHTING...");
      } else if (currentProgress < 88) {
        setStatusText("COMPOSING ARCHITECTURAL GRID...");
      } else if (currentProgress < 100) {
        setStatusText("FINALIZING EXPERIENCE...");
      } else {
        setStatusText("WELCOME TO ONE NEXUS STUDIO");
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
          if (onComplete) onComplete();
        }, 400);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999999] bg-[#111827] text-white flex flex-col justify-between p-8 sm:p-14 lg:p-20 overflow-hidden select-none"
        >
          {/* Architectural Background Grid Lines */}
          <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 opacity-40">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="h-full border-r border-white/[0.05] first:border-l first:border-white/[0.05]"
              />
            ))}
          </div>

          {/* Top Header Row */}
          <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <img
                src="/onenexus-logo-bckgr.png"
                alt="oneNexus Studio"
                className="h-7 sm:h-9 w-auto object-contain rounded-[2px]"
              />
              <span className="font-sans font-black text-xl sm:text-2xl tracking-tighter uppercase text-white">
                one<span className="text-[#2554E8]">Nexus</span>
              </span>
            </div>
            <span className="font-mono text-xs sm:text-sm text-neutral-400 tracking-widest uppercase font-bold">
              [ STUDIO INITIALIZER ]
            </span>
          </div>

          {/* Center Main Counter & Progress Bar */}
          <div className="relative z-10 max-w-4xl mx-auto w-full my-auto text-center py-10">
            <div className="font-mono text-xs sm:text-sm text-[#2554E8] font-extrabold uppercase tracking-[0.25em] mb-4 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2554E8] animate-ping" />
              <span>{statusText}</span>
            </div>

            {/* Giant Monospace Percentage Display */}
            <div className="font-mono text-7xl sm:text-9xl lg:text-[160px] font-black tracking-tighter leading-none text-white my-2">
              {progress.toString().padStart(2, "0")}
              <span className="text-[#2554E8] text-4xl sm:text-6xl lg:text-8xl">%</span>
            </div>

            {/* Cobalt Progress Line */}
            <div className="w-full h-1.5 bg-white/10 overflow-hidden rounded-none mt-8 max-w-xl mx-auto border border-white/10">
              <div
                className="h-full bg-[#2554E8] transition-all duration-100 ease-out shadow-[0_0_12px_#2554E8]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Bottom Telemetry Info */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4 font-mono text-xs text-neutral-400">
            <div>ONE NEXUS STUDIO • MAYFAIR LONDON</div>
            <div className="text-white font-bold tracking-widest">
              STRATEGIC DESIGN & ENGINEERING
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
