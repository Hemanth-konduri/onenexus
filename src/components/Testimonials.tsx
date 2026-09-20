import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "One Nexus completely transformed our business trajectory. We went from competing on price with local salons to commanding a 6-week waiting list and doubling our average client spend. Their level of taste and strategic clarity is unmatched.",
      author: "Elena Rostova",
      role: "Founder & Creative Director",
      business: "Lumière Haute Salon",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 5,
      impact: "+180% Revenue Growth",
    },
    {
      quote:
        "Working with One Nexus felt like having an elite Silicon Valley product and marketing team in-house. They rebuilt our entire web architecture, optimized our patient acquisition funnels, and increased our private surgical inquiries by nearly 3x.",
      author: "Dr. Marcus Vance",
      role: "Lead Surgeon & Managing Partner",
      business: "Aura Aesthetic Clinic",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 5,
      impact: "2.8x Qualified Consultations",
    },
    {
      quote:
        "Before One Nexus, we had a generic template website that barely converted. They built us a cinematic brand universe and automated class booking system that sold out all 500 founding gym memberships within 30 days of launch.",
      author: "Julian Thorne",
      role: "Co-Founder",
      business: "Vertex Performance Fitness",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      rating: 5,
      impact: "500 Members in 30 Days",
    },
    {
      quote:
        "The best investment we made this year. The digital storytelling and online reservation experience they designed turned our restaurant into the #1 booked venue in our city. True artists who understand commercial ROI.",
      author: "Chef Antoine Laurent",
      role: "Owner & Head Chef",
      business: "L’Atelier Bistro",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      rating: 5,
      impact: "Fully Booked 6 Weeks Out",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section
      className="relative w-full bg-[#EFECE6] text-[#0F0F11] overflow-hidden border-t border-black/[0.07] py-20 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Eyebrow Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-12 border-b border-black/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#0022FF]" />
            <span className="font-mono text-xs sm:text-sm tracking-widest uppercase font-bold text-black">
              CLIENT VOICES / TESTIMONIALS
            </span>
          </div>
          
          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonial"
              className="w-11 h-11 rounded-full border border-black/[0.1] bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Testimonial"
              className="w-11 h-11 rounded-full border border-black/[0.1] bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all duration-200 cursor-pointer shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Featured Editorial Testimonial Card */}
        <div className="py-12">
          <div className="p-8 sm:p-14 lg:p-20 bg-white/90 backdrop-blur-xl border border-black/[0.08] rounded-3xl shadow-xl transition-all duration-500">
            <div className="flex flex-col gap-8">
              
              {/* Star Rating & Verified Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#0022FF]">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-current" />
                  ))}
                </div>
                <span className="px-3 py-1 bg-[#0022FF]/10 text-[#0022FF] rounded-full font-mono text-xs font-bold uppercase tracking-wider">
                  {current.impact}
                </span>
              </div>

              {/* Large Editorial Quote */}
              <p className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-black font-sans leading-[1.25] tracking-tight">
                "{current.quote}"
              </p>

              {/* Client Profile Row */}
              <div className="flex items-center gap-4 pt-6 border-t border-black/[0.08]">
                <img
                  src={current.image}
                  alt={current.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#0022FF]"
                />
                <div>
                  <h4 className="font-sans font-bold text-lg text-black">
                    {current.author}
                  </h4>
                  <p className="text-neutral-500 font-mono text-xs tracking-wider uppercase">
                    {current.role} • <span className="text-black font-bold">{current.business}</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? "w-8 bg-[#0022FF]" : "w-2 bg-black/20 hover:bg-black/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
