import React, { useEffect, useRef } from "react";

interface PixelNode {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  phase: number;
  color: string;
}

export default function InteractivePixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animId: number;
    let width = 0;
    let height = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 160,
    };

    let nodes: PixelNode[] = [];

    const initNodes = () => {
      const parent = canvas.parentElement;
      width = canvas.width = parent?.clientWidth || window.innerWidth;
      height = canvas.height = parent?.clientHeight || window.innerHeight;

      nodes = [];
      const isMobile = width < 768;
      // Grid cell spacing in px
      const spacing = isMobile ? 55 : 44;

      const cols = Math.floor(width / spacing) + 1;
      const rows = Math.floor(height / spacing) + 1;

      const offsetX = (width - cols * spacing) / 2 + spacing / 2;
      const offsetY = (height - rows * spacing) / 2 + spacing / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Slight natural grid variance
          const gridX = offsetX + i * spacing + (Math.random() - 0.5) * 6;
          const gridY = offsetY + j * spacing + (Math.random() - 0.5) * 6;

          // 1 in 7 pixels is signature OneNexus blue (#2554E8), others are dark neutral (#111827)
          const isBlue = Math.random() < 0.15;
          const color = isBlue ? "#2554E8" : "#111827";

          nodes.push({
            x: gridX,
            y: gridY,
            originX: gridX,
            originY: gridY,
            size: Math.random() < 0.25 ? 3.5 : 2.5,
            baseAlpha: isBlue ? 0.16 : 0.1,
            alpha: isBlue ? 0.16 : 0.1,
            phase: Math.random() * Math.PI * 2,
            color,
          });
        }
      }
    };

    initNodes();

    const handleResize = () => {
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinate interpolation (lerping)
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      const maxConnectionDist = width < 768 ? 65 : 85;
      const radiusSq = mouse.radius * mouse.radius;

      // 1. Draw connecting lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const ldx = other.x - node.x;
          const ldy = other.y - node.y;
          const ldistSq = ldx * ldx + ldy * ldy;

          if (ldistSq < maxConnectionDist * maxConnectionDist) {
            const ldist = Math.sqrt(ldistSq);
            const lineAlpha =
              (1 - ldist / maxConnectionDist) *
              Math.min(node.alpha, other.alpha) *
              1.4;

            if (lineAlpha > 0.015) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle =
                node.color === "#2554E8" || other.color === "#2554E8"
                  ? `rgba(37, 84, 232, ${lineAlpha * 1.4})`
                  : `rgba(17, 24, 39, ${lineAlpha})`;
              ctx.lineWidth = 0.65;
              ctx.stroke();
            }
          }
        }
      }

      // 2. Update and render individual pixel nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Subtle resting drift animation
        const idleX = prefersReducedMotion ? 0 : Math.sin(time + node.phase) * 1.5;
        const idleY = prefersReducedMotion ? 0 : Math.cos(time * 0.8 + node.phase) * 1.5;

        const targetOriginX = node.originX + idleX;
        const targetOriginY = node.originY + idleY;

        // Proximity calculation for cursor interaction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distSq = dx * dx + dy * dy;

        let targetX = targetOriginX;
        let targetY = targetOriginY;
        let targetAlpha = node.baseAlpha;
        let scaleFactor = 1;

        if (distSq < radiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = 1 - dist / mouse.radius;

          // Soft magnetic displacement vector away from cursor
          const angle = Math.atan2(dy, dx);
          const push = force * 24;

          targetX = targetOriginX - Math.cos(angle) * push;
          targetY = targetOriginY - Math.sin(angle) * push;

          targetAlpha = Math.min(0.85, node.baseAlpha + force * 0.6);
          scaleFactor = 1 + force * 0.75;
        }

        // Fluid spring/easing back to positions & opacity
        node.x += (targetX - node.x) * 0.1;
        node.y += (targetY - node.y) * 0.1;
        node.alpha += (targetAlpha - node.alpha) * 0.1;

        // Render clean square pixel
        const currentSize = node.size * scaleFactor;
        ctx.fillStyle =
          node.color === "#2554E8"
            ? `rgba(37, 84, 232, ${node.alpha})`
            : `rgba(17, 24, 39, ${node.alpha})`;

        ctx.fillRect(
          node.x - currentSize / 2,
          node.y - currentSize / 2,
          currentSize,
          currentSize
        );
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
