import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  return <Component {...pageProps} />;
}

