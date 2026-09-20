import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";
import ServiceCards from "@/components/ServiceCards";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Play video smoothly
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered text reveal & UI entrance timeline
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

      entranceTl
        .fromTo(
          ".hero-text-line",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, stagger: 0.12 }
        )
        .fromTo(
          ".hero-cta-btn",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          ".service-card",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.08 },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between bg-[#F5F8FC] text-[#111827] overflow-hidden selection:bg-[#2554E8] selection:text-white pt-24 pb-8"
    >
      {/* 1. Futuristic Looping Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden select-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center pointer-events-none"
        >
          <source src="/Animating_futuristic_image.mp4" type="video/mp4" />
        </video>
        {/* Subtle white translucent overlay for perfect contrast */}
        <div className="absolute inset-0 bg-[#F5F8FC]/20 pointer-events-none z-0" />
      </div>

      {/* 2. Top Navigation */}
      <Navbar />

      {/* 3. Central Hero Content */}
      <div className="relative z-10 my-auto py-6 flex items-center justify-center">
        <HeroContent />
      </div>

      {/* 4. Bottom Service Cards (Positioned strictly inside the Hero container) */}
      <div className="relative z-10 w-full mt-auto pb-2">
        <ServiceCards />
      </div>
    </section>
  );
}
