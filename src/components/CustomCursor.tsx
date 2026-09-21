import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const prevMouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only initialize on non-touch desktop pointer devices
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

      // Trail delay
      setTimeout(() => {
        setTrailPos({ x: e.clientX, y: e.clientY });
      }, 50);
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
        target.classList.contains("cursor-pointer") ||
        target.closest(".work-card");

      if (interactiveEl) {
        setIsHovered(true);
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

  // Velocity fluid stretch calculations
  const speed = Math.min(Math.sqrt(velocity.x ** 2 + velocity.y ** 2), 50);
  const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
  const stretchX = 1 + speed * 0.012;
  const stretchY = Math.max(1 - speed * 0.008, 0.7);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
      {/* 1. Trailing Particle Echo */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#2554E8]/40 pointer-events-none blur-[1px]"
        animate={{
          x: trailPos.x - 4,
          y: trailPos.y - 4,
          scale: isHovered ? 2 : 1,
          opacity: isHovered ? 0.6 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />

      {/* 2. Fluid Kinetic Outer Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none border-2 transition-colors duration-300 flex items-center justify-center ${
          isHovered
            ? "border-[#2554E8] bg-[#2554E8]/[0.06] shadow-[0_0_30px_rgba(37,84,232,0.4)] backdrop-blur-[1px]"
            : "border-[#111827]/60 bg-transparent"
        }`}
        animate={{
          x: mousePos.x - (isHovered ? 30 : 15),
          y: mousePos.y - (isHovered ? 30 : 15),
          width: isHovered ? 60 : 30,
          height: isHovered ? 60 : 30,
          scaleX: isHovered ? 1 : isClicked ? 0.65 : stretchX,
          scaleY: isHovered ? 1 : isClicked ? 0.65 : stretchY,
          rotate: isHovered ? 0 : angle,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.4 }}
      >
        {/* Reticle Corner Crosshair Ticks when Hovering */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full h-full relative"
          >
            <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t-2 border-l-2 border-[#2554E8]" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 border-t-2 border-r-2 border-[#2554E8]" />
            <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b-2 border-l-2 border-[#2554E8]" />
            <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b-2 border-r-2 border-[#2554E8]" />
          </motion.div>
        )}
      </motion.div>

      {/* 3. Precision Snappy Laser Core Point */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#2554E8] rounded-full pointer-events-none shadow-[0_0_12px_#2554E8]"
        animate={{
          x: mousePos.x - 5,
          y: mousePos.y - 5,
          scale: isHovered ? 1.4 : isClicked ? 2.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 50 }}
      />

      {/* 4. Click Concentric Shockwave Pulse */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 1, scale: 0.4 }}
            animate={{ opacity: 0, scale: 2.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 left-0 w-12 h-12 -ml-6 -mt-6 rounded-full border-2 border-[#2554E8] pointer-events-none"
            style={{ x: mousePos.x, y: mousePos.y }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
