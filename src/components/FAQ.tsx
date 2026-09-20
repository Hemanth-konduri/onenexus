import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Are you a brand studio, a product studio or a strategy partner?",
      highlight: "Yes, when the work needs all three.",
      desc: "The strongest digital experiences connect what a company says, what it makes and how people use it. That is where we work best.",
    },
    {
      q: "We have an idea, but it is still messy. Is that too early?",
      highlight: "Never too early.",
      desc: "We regularly work with founders at the earliest concept stages, helping structure ambiguous ideas into clear strategic roadmaps and launch-ready prototypes.",
    },
    {
      q: "Why work with a small studio instead of a larger agency?",
      highlight: "Direct access to senior practitioners.",
      desc: "You collaborate directly with our partners from day one to launch. No junior handoffs, no bureaucratic layers, and complete alignment.",
    },
    {
      q: "Can you help us look credible without making us look like everyone else?",
      highlight: "Distinctiveness is our core focus.",
      desc: "We reject boilerplate templates. Every visual asset, typography selection, and interaction is tailored to your business positioning.",
    },
    {
      q: "What happens after the first project?",
      highlight: "Long-term growth partnership.",
      desc: "Many partners retain us on ongoing monthly engagements for conversion optimization, feature iterations, and digital marketing growth.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative w-full bg-[#EFECE6] text-[#0F0F11] overflow-hidden border-t border-black/[0.07] px-4 sm:px-8 lg:px-12 py-20 lg:py-32"
    >
      {/* Continuous Architectural Vertical Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-black/[0.07] first:border-l first:border-black/[0.07]"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        
        {/* Eyebrow Header */}
        <div className="flex items-center justify-between pb-8 border-b border-black/[0.07] mb-12">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#0022FF]" />
            <span className="font-mono text-xs lg:text-sm tracking-widest uppercase font-bold text-black">
              QUESTIONS & ANSWERS / FAQ
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase">
            [ SECTION 06 ]
          </span>
        </div>

        {/* Section Headline */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold tracking-tightest leading-[1.05] text-black mb-4">
            Questions worth asking<br />before we work together.
          </h2>
          <p className="text-neutral-600 text-lg lg:text-xl font-normal max-w-2xl">
            Not the usual FAQs. Just the questions clients often have when choosing the right partner for something important.
          </p>
        </div>

        {/* Minimalist Line-Divider Accordion List (Brikken Pure Style) */}
        <ul className="flex flex-col">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={index} className="border-t border-black pb-12">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-6 pt-8 pb-2 text-left cursor-pointer group"
                >
                  <h3 className="font-sans font-bold text-xl sm:text-2xl lg:text-3xl text-black group-hover:text-[#0022FF] transition-colors duration-200">
                    {faq.q}
                  </h3>
                  
                  {/* Minimalist +/- Toggle SVG */}
                  <div className="relative w-6 h-6 shrink-0 mt-1">
                    <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-black -translate-y-1/2" />
                    {!isOpen && (
                      <span className="absolute left-1/2 top-0 h-full w-[1.5px] bg-black -translate-x-1/2" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-base sm:text-lg lg:text-xl text-black leading-relaxed mt-4 max-w-3xl">
                        <span className="font-bold">{faq.highlight} </span>
                        <span className="text-neutral-500">{faq.desc}</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}
