import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const statementText =
  "oneNexus is a founder–led strategic design and engineering studio connecting strategy, brand, and digital products. We help ambitious founders and enterprises turn complex concepts into intuitive platforms people trust, use, and scale.";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = textRef.current?.querySelectorAll(".about-word");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.2, color: "rgba(17, 24, 39, 0.2)" },
          {
            opacity: 1,
            color: "#111827",
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 75%",
              end: "bottom 35%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const wordsArray = statementText.split(" ");

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#EFECE6] text-[#111827] overflow-hidden border-t border-black/[0.08] px-4 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40"
    >
      {/* Continuous Architectural Vertical Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-black/[0.06] first:border-l first:border-black/[0.06]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto">
        {/* Top Eyebrow Header Bar */}
        <div className="flex items-center justify-between pb-8 border-b border-black/[0.08] mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-full" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-[#111827]">
              ABOUT ONE NEXUS
            </span>
          </div>
          <span className="font-mono text-xs sm:text-sm text-neutral-500 tracking-widest uppercase">
            [ SECTION 02 ]
          </span>
        </div>

        {/* Main Editorial Statement with Scroll Word Illumination */}
        <div className="max-w-[1150px] py-4 sm:py-8">
          <h2
            ref={textRef}
            className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl xl:text-[64px] tracking-tight leading-[1.18] sm:leading-[1.18] text-[#111827] select-none"
          >
            {wordsArray.map((word, index) => (
              <span
                key={index}
                className="about-word inline-block mr-[0.28em] transition-colors duration-150"
                style={{ opacity: 0.2, color: "rgba(17, 24, 39, 0.2)" }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
