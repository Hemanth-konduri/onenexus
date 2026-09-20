import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: "dot" | "ring" | "cross" | "code" | "glyph";
  char?: string;
  alpha: number;
  targetAlpha: number;
  rotation: number;
  vRot: number;
}

export default function AntigravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
      isActive: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isActive = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const particles: Particle[] = [];
    const colors = [
      "rgba(0, 34, 255, ", // Electric Blue (brand)
      "rgba(10, 10, 11, ", // Stark Black/Slate
      "rgba(0, 150, 255, ", // Cyan Blue
      "rgba(99, 102, 241, ", // Indigo
    ];

    const glyphs = ["{ }", "< />", "01", "+", "•", "■", "▲", "✦", "[]", "//"];

    const initParticles = () => {
      particles.length = 0;
      const count = Math.floor((width * height) / 14000); // Responsive particle count

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const randType = Math.random();
        let type: Particle["type"] = "dot";
        let char = undefined;

        if (randType < 0.45) {
          type = "dot";
        } else if (randType < 0.65) {
          type = "ring";
        } else if (randType < 0.8) {
          type = "cross";
        } else {
          type = "glyph";
          char = glyphs[Math.floor(Math.random() * glyphs.length)];
        }

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.15, // Gentle upward anti-gravity float
          size: type === "glyph" ? 10 + Math.random() * 4 : 2 + Math.random() * 4.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          type,
          char,
          alpha: 0.15 + Math.random() * 0.35,
          targetAlpha: 0.15 + Math.random() * 0.35,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    initParticles();

    // Render Loop
    let time = 0;
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle interactive force field connections between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 34, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & Draw Each Antigravity Particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Natural antigravity floating physics
        p.x += p.vx + Math.sin(time + p.originX) * 0.25;
        p.y += p.vy + Math.cos(time + p.originY) * 0.25;
        p.rotation += p.vRot;

        // Wrap around boundaries smoothly
        if (p.y < -30) p.y = height + 20;
        if (p.y > height + 30) p.y = -20;
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        // 2. Interactive Anti-gravity Mouse Repulsion / Levitation Physics
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (1 - distance / mouse.radius) * 6.5;
          const angle = Math.atan2(dy, dx);
          // Push away (antigravity deflection)
          p.x -= Math.cos(angle) * force;
          p.y -= Math.sin(angle) * force;
          p.alpha = Math.min(0.85, p.alpha + 0.05);
        } else {
          // Relax back to natural alpha
          p.alpha += (p.targetAlpha - p.alpha) * 0.03;
        }

        // 3. Draw Particle with Aesthetic Styling
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === "dot") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.fill();
        } else if (p.type === "ring") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.strokeStyle = `${p.color}${p.alpha * 1.2})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else if (p.type === "cross") {
          ctx.strokeStyle = `${p.color}${p.alpha * 1.3})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(-p.size, 0);
          ctx.lineTo(p.size, 0);
          ctx.moveTo(0, -p.size);
          ctx.lineTo(0, p.size);
          ctx.stroke();
        } else if (p.type === "glyph" && p.char) {
          ctx.font = `600 ${p.size}px monospace`;
          ctx.fillStyle = `${p.color}${p.alpha * 1.4})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.char, 0, 0);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ opacity: 0.95 }}
    />
  );
}
