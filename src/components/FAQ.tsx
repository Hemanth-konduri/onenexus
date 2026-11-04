import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "I have a business idea but don't know where to start. Can OneNexus help?",
      highlight: "Yes, absolutely.",
      desc: "OneNexus specializes in guiding aspiring entrepreneurs from raw concepts to a complete digital presence—including brand identity, logo, domain, website, and Google Business setup.",
    },
    {
      q: "Can you build a social media presence for my existing business?",
      highlight: "Yes, end-to-end.",
      desc: "Whether you have no accounts yet or want to revamp existing profiles, we design branded templates, craft engaging posts & reels, write persuasive captions, and structure your channel strategy.",
    },
    {
      q: "Do you provide monthly social media management?",
      highlight: "Yes, ongoing growth support.",
      desc: "Our Monthly Growth Support package handles post design, reels, content creation, captioning, scheduling, and channel management so you can focus entirely on your core business.",
    },
    {
      q: "Can I choose individual services instead of a complete package?",
      highlight: "Yes, completely flexible.",
      desc: "All our services are modular. You can choose specific services such as Website Design, Google Business Profile Setup, or Branding, or opt for a combined growth package.",
    },
    {
      q: "How is the website cost determined?",
      highlight: "Transparent & requirement-based.",
      desc: "Website cost depends on your exact project scope—such as page count, custom features, AI integration, interactive elements, and content requirements. We provide itemized quotes upfront.",
    },
    {
      q: "Do you work with clients across India?",
      highlight: "Yes, serving clients nationwide.",
      desc: "OneNexus serves small businesses, aspiring founders, and women entrepreneurs across all cities and states in India through seamless remote communication and digital collaboration.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative w-full bg-[#EFECE6] text-[#111827] overflow-hidden border-t border-black/[0.07] px-4 sm:px-8 lg:px-12 py-20 lg:py-32"
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
            <span className="w-2.5 h-2.5 bg-[#2554E8]" />
            <span className="font-mono text-xs lg:text-sm tracking-widest uppercase font-bold text-black">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <span className="font-mono text-xs text-[#2554E8] tracking-widest uppercase font-bold">
            [ CLEAR ANSWERS ]
          </span>
        </div>

        {/* Section Headline */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold tracking-tight leading-[1.05] text-black mb-4">
            FREQUENTLY ASKED <span className="text-[#2554E8]">QUESTIONS.</span>
          </h2>
          <p className="text-neutral-600 text-lg lg:text-xl font-normal max-w-2xl">
            Everything you need to know about working with OneNexus to launch and grow your digital presence.
          </p>
        </div>

        {/* Minimalist Line-Divider Accordion List */}
        <ul className="flex flex-col border-b border-black/20">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={index} className="border-t border-black/15 pb-8">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-6 pt-8 pb-2 text-left cursor-pointer group"
                >
                  <h3 className="font-sans font-bold text-xl sm:text-2xl lg:text-3xl text-black group-hover:text-[#2554E8] transition-colors duration-200">
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
                        <span className="font-bold text-[#2554E8]">{faq.highlight} </span>
                        <span className="text-neutral-600">{faq.desc}</span>
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
