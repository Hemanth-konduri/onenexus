import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PreloaderProps = {
  onComplete?: () => void;
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [decimalProgress, setDecimalProgress] = useState("00.0");
  const [statusText, setStatusText] = useState("NEURAL MATRIX INITIALIZING...");
  const [isLoading, setIsLoading] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. AI Neural Particle Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Generate AI Neural Nodes
    const particleCount = Math.min(Math.floor((width * height) / 18000), 50);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 1.8 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Neural Connection Threads
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(37, 84, 232, ${0.25 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Render Nodes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#38BDF8";
        ctx.shadowColor = "#2554E8";
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 2. High-Precision Loading Sequence
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const duration = 2200;
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(Math.round(currentProgress));
      setDecimalProgress(currentProgress.toFixed(1).padStart(4, "0"));

      if (currentProgress < 25) {
        setStatusText("INITIALIZING QUANTUM NEURAL CORE...");
      } else if (currentProgress < 55) {
        setStatusText("SYNTHESIZING 3D GRAPHICS & LIGHTING...");
      } else if (currentProgress < 85) {
        setStatusText("COMPOSING ARCHITECTURAL EXPERIENCE...");
      } else if (currentProgress < 100) {
        setStatusText("FINALIZING TELEMETRY PIPELINE...");
      } else {
        setStatusText("NEURAL MATRIX READY // ONE NEXUS STUDIO");
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = previousOverflow;
          onComplete?.();
        }, 400);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <div className="fixed inset-0 z-[999999] pointer-events-none select-none overflow-hidden bg-[#070A10] text-white">
          
          {/* AI NEURAL PARTICLE CANVAS */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-60 z-0"
          />

          {/* TOP SPLIT PANEL WIPE */}
          <motion.div
            key="preloader-top"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 border-b border-white/10 z-10"
          >
            {/* Top Telemetry Bar */}
            <div className="absolute top-6 left-6 sm:top-10 sm:left-10 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#2554E8] animate-ping" />
              <span className="font-mono text-xs font-bold text-[#2554E8] tracking-[0.25em] uppercase">
                [ AI NEURAL ENGINE v4.8 ]
              </span>
            </div>
            <div className="absolute top-6 right-6 sm:top-10 sm:right-10 font-mono text-xs text-neutral-400 tracking-widest font-bold uppercase hidden sm:block">
              SYS_LATENCY: 0.12ms
            </div>
          </motion.div>

          {/* BOTTOM SPLIT PANEL WIPE */}
          <motion.div
            key="preloader-bottom"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 border-t border-white/10 z-10"
          >
            {/* Bottom Left Telemetry Status */}
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 font-mono text-xs text-neutral-400 uppercase tracking-widest font-bold max-w-xs">
              <span className="text-[#2554E8] block mb-1">STATUS: ACTIVE</span>
              <span>{statusText}</span>
            </div>

            {/* Bottom Right Monospace Decimal Percentage Display */}
            <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 flex items-baseline gap-1 font-mono text-white">
              <span className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none">
                {decimalProgress}
              </span>
              <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#2554E8]">
                %
              </span>
            </div>
          </motion.div>

          {/* CENTER HOLOGRAPHIC AI CORE & LOGO */}
          <motion.div
            exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            {/* Concentric Rotating Holographic Rings */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Outer Dashed Data Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                className="absolute inset-0 rounded-full border border-dashed border-[#2554E8]/40"
              />

              {/* Inner Counter-Rotating Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                className="absolute inset-4 rounded-full border border-dotted border-[#38BDF8]/50"
              />

              {/* Center Glowing AI Core Orb */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-[#070A10] border border-white/10 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(37,84,232,0.5)] backdrop-blur-md p-4 text-center"
              >
                <img
                  src="/onenexus-logo-bckgr.png"
                  alt="oneNexus Studio"
                  className="h-10 sm:h-12 w-auto object-contain rounded-[4px] mb-2 shadow-[0_0_15px_#2554E8]"
                />
                <h1 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-white">
                  one<span className="text-[#2554E8]">Nexus</span>
                </h1>
                <span className="font-mono text-[9px] font-bold text-[#38BDF8] tracking-[0.25em] uppercase mt-1">
                  AI DIGITAL STUDIO
                </span>
              </motion.div>

              {/* Horizontal Laser Scanning Line */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#2554E8] to-transparent shadow-[0_0_20px_#2554E8] transition-all duration-75"
                style={{ width: `${progress * 3.5}px` }}
              />
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
