import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
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
      setTimeout(() => setIsClicked(false), 200);
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

  // Fluid velocity calculation for smooth stretch
  const speed = Math.min(Math.sqrt(velocity.x ** 2 + velocity.y ** 2), 40);
  const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
  const stretchX = 1 + speed * 0.015;
  const stretchY = Math.max(1 - speed * 0.01, 0.7);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* 1. Pure Minimalist Chameleon Disc (mix-blend-difference, zero blocking text) */}
      <motion.div
        className="fixed top-0 left-0 bg-white rounded-full pointer-events-none mix-blend-difference"
        animate={{
          x: mousePos.x - (isHovered ? 28 : 9),
          y: mousePos.y - (isHovered ? 28 : 9),
          width: isHovered ? 56 : 18,
          height: isHovered ? 56 : 18,
          scaleX: isHovered ? 1 : isClicked ? 0.7 : stretchX,
          scaleY: isHovered ? 1 : isClicked ? 0.7 : stretchY,
          rotate: isHovered ? 0 : angle,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 32, mass: 0.35 }}
      />

      {/* 2. Precision Central Targeting Point */}
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
