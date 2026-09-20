import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("INTERACT");
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor on desktop devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);
    document.body.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const interactiveEl =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer");

      if (interactiveEl) {
        setIsHovered(true);
        // Determine dynamic action text based on content
        const textContent = (target.textContent || "").toLowerCase();
        if (textContent.includes("project") || textContent.includes("initiate")) {
          setHoverText("START ↗");
        } else if (textContent.includes("return") || textContent.includes("back")) {
          setHoverText("RETURN ↖");
        } else if (textContent.includes("copy")) {
          setHoverText("COPY");
        } else {
          setHoverText("SELECT");
        }
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Micro HUD Coordinate Telemetry Label */}
      <motion.div
        className="fixed top-0 left-0 flex items-center gap-1.5 font-mono text-[9px] font-bold text-[#2554E8] tracking-widest uppercase select-none opacity-60"
        animate={{
          x: mousePosition.x + 18,
          y: mousePosition.y + 18,
          opacity: isHovered ? 0.9 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 45 }}
      >
        <span className="w-1 h-1 rounded-full bg-[#2554E8] animate-pulse" />
        <span>
          [{mousePosition.x.toString().padStart(4, "0")}:{mousePosition.y.toString().padStart(4, "0")}]
        </span>
      </motion.div>

      {/* 2. Precision Central Laser Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#2554E8] rounded-full pointer-events-none shadow-[0_0_12px_#2554E8]"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovered ? 0.5 : isClicked ? 1.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 60 }}
      />

      {/* 3. Innovative Reticle Frame & Dynamic Hover Badge */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none border border-[#2554E8]/40 bg-[#2554E8]/[0.03] backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - (isHovered ? 40 : 20),
          y: mousePosition.y - (isHovered ? 20 : 20),
          width: isHovered ? 80 : 40,
          height: isHovered ? 40 : 40,
          borderRadius: isHovered ? 4 : 20,
          borderColor: isHovered ? "rgba(37, 84, 232, 0.9)" : "rgba(37, 84, 232, 0.35)",
          scale: isClicked ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 32 }}
      >
        {/* Reticle Corner Marks (L-Brackets) */}
        <span className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-[#2554E8]" />
        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t-2 border-r-2 border-[#2554E8]" />
        <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b-2 border-l-2 border-[#2554E8]" />
        <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-[#2554E8]" />

        {/* Dynamic Action Text Badge */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="font-mono text-[10px] font-black tracking-widest text-[#2554E8] uppercase select-none"
            >
              {hoverText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 4. Click Shockwave Wave Pulse */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 3.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border-2 border-[#2554E8] pointer-events-none"
            style={{ x: mousePosition.x, y: mousePosition.y }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
