import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const prevMouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only initialize on desktop pointer devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);
    document.body.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      const vx = e.clientX - prevMouseRef.current.x;
      const vy = e.clientY - prevMouseRef.current.y;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };

      setMousePos({ x: e.clientX, y: e.clientY });
      setVelocity({ x: vx, y: vy });
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 250);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const interactiveEl =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".work-card");

      if (interactiveEl) {
        setIsHovered(true);
        const text = (target.textContent || "").toLowerCase();
        if (text.includes("project") || text.includes("start") || text.includes("initiate")) {
          setHoverLabel("INITIATE ↗");
        } else if (text.includes("return") || text.includes("back")) {
          setHoverLabel("RETURN ↖");
        } else if (text.includes("copy")) {
          setHoverLabel("COPY");
        } else if (target.closest(".work-card")) {
          setHoverLabel("VIEW ↗");
        } else {
          setHoverLabel("SELECT");
        }
      } else {
        setIsHovered(false);
        setHoverLabel("");
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

  // Fluid velocity calculation for dynamic chameleon morphing
  const speed = Math.min(Math.sqrt(velocity.x ** 2 + velocity.y ** 2), 45);
  const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
  const stretchX = 1 + speed * 0.015;
  const stretchY = Math.max(1 - speed * 0.01, 0.65);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Chameleon Adaptive Fluid Outer Lens (mix-blend-difference) */}
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none mix-blend-difference flex items-center justify-center"
        animate={{
          x: mousePos.x - (isHovered ? 38 : 13),
          y: mousePos.y - (isHovered ? 38 : 13),
          width: isHovered ? 76 : 26,
          height: isHovered ? 76 : 26,
          scaleX: isHovered ? 1 : isClicked ? 0.7 : stretchX,
          scaleY: isHovered ? 1 : isClicked ? 0.7 : stretchY,
          rotate: isHovered ? 0 : angle,
        }}
        transition={{ type: "spring", stiffness: 550, damping: 30, mass: 0.4 }}
      >
        {/* Dynamic Action Text Label inside Chameleon Lens */}
        <AnimatePresence>
          {isHovered && hoverLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[9px] font-black tracking-widest text-black uppercase select-none text-center px-1"
            >
              {hoverLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 2. Precision Laser Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none mix-blend-difference"
        animate={{
          x: mousePos.x - 3,
          y: mousePos.y - 3,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 60 }}
      />
    </div>
  );
}
