import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

export default function Industries() {
  const [selectedId, setSelectedId] = useState("restaurants");

  const industries = [
    {
      id: "restaurants",
      name: "Restaurants & Bars",
      headline: "Filling tables with high-margin reservations.",
      desc: "We turn dining into a must-visit cultural destination through cinematic food visuals, frictionless table reservations, automated private dining booking engines, and local culinary PR.",
      stats: "+240% Direct Bookings",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
      features: ["Custom Table Reservation Funnels", "Seasonal Menu Staging & QR Systems", "VIP Club & SMS Drops", "Local Foodie Influencer Campaigns"],
    },
    {
      id: "fitness",
      name: "Fitness & Wellness",
      headline: "Selling out memberships and class packs.",
      desc: "From boutique Pilates to strength gyms, we build energizing brand identities, habit-forming class scheduling apps, and paid acquisition funnels that convert trials into annual loyalists.",
      stats: "500+ Recurring Members Added",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80",
      features: ["Seamless Class Booking & Memberships", "Trainer Spotlight & Video Reels", "7-Day Trial Lead Capture Funnels", "Automated Retention Sequences"],
    },
    {
      id: "beauty",
      name: "Beauty & Salons",
      headline: "Positioning your salon as the luxury authority.",
      desc: "Elevate your salon from transactional cuts to high-ticket beauty transformations with editorial lookbooks, stylist portfolio showcases, and automatic appointment re-booking.",
      stats: "+180% Average Ticket Size",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
      features: ["High-End Visual Lookbooks", "Stylist Bio & Portfolio Pages", "Deposit-Secured Booking Engines", "Automated Post-Treatment Reviews"],
    },
    {
      id: "healthcare",
      name: "Healthcare & Clinics",
      headline: "Building trust for specialized clinical treatments.",
      desc: "Dental, aesthetic, and specialized medical clinics require immaculate trust. We design serene digital patient portals that answer concerns and streamline initial patient onboarding.",
      stats: "2.8x New Patient Inquiries",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80",
      features: ["HIPAA-Compliant Consultation Forms", "Treatment Explorer & Before/Afters", "Surgeon & Doctor Credentials", "Local Google Map Domination"],
    },
    {
      id: "retail",
      name: "Retail & Boutiques",
      headline: "Bridging physical footfall with e-commerce velocity.",
      desc: "Create bespoke e-commerce and in-store synergy. We build high-converting Shopify storefronts, localized drop marketing, and omnichannel customer loyalty programs.",
      stats: "$1.4M First-Year Online Sales",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
      features: ["Custom Headless E-Commerce", "In-Store Pickup & Inventory Sync", "Limited Drop Hype Pages", "Automated Cart Recovery Sequences"],
    },
    {
      id: "startups",
      name: "Startups & Services",
      headline: "Validating propositions and scaling client pipeline.",
      desc: "Fast-moving founders need credible digital positioning to raise capital, sign enterprise pilots, and acquire early adopters without burning cash on bloated agency timelines.",
      stats: "10x Valuation Growth",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
      features: ["Interactive Product Demo Landers", "Investor Pitch Deck Digital Staging", "B2B Lead Generation Funnels", "Product Hunt & Launch PR"],
    },
  ];

  const current = industries.find((ind) => ind.id === selectedId) || industries[0];

  return (
    <section
      id="industries"
      className="relative w-full bg-[#EFECE6] text-[#0F0F11] overflow-hidden border-t border-black/[0.07] py-20 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Eyebrow Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-12 border-b border-black/[0.07]">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-[#0022FF]" />
            <span className="font-mono text-xs sm:text-sm tracking-widest uppercase font-bold text-black">
              SPECIALIZED EXPERTISE / INDUSTRIES WE SERVE
            </span>
          </div>
          <span className="font-mono text-xs text-neutral-500 tracking-widest uppercase">
            [ 06 / SECTOR PLAYBOOKS ]
          </span>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-3 py-10 border-b border-black/[0.07]">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setSelectedId(ind.id)}
              className={`px-5 py-3 rounded-full font-mono text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedId === ind.id
                  ? "bg-[#0022FF] text-white shadow-lg shadow-blue-600/30 scale-105 font-bold"
                  : "bg-white/70 border border-black/[0.08] text-neutral-600 hover:text-black hover:bg-white"
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Industry Showcase Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-center">
          
          {/* Left Customized Industry Narrative */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white font-mono text-xs uppercase tracking-widest rounded-sm mb-4">
              <span>OUTCOME:</span>
              <span className="text-[#0022FF] font-bold">{current.stats}</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-extrabold text-black tracking-tight leading-tight mb-6">
              {current.headline}
            </h3>

            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-8">
              {current.desc}
            </p>

            <div className="w-full space-y-3 pt-6 border-t border-black/[0.08] mb-8">
              <span className="block font-mono text-xs text-neutral-400 uppercase tracking-widest mb-3">
                TAILORED INDUSTRY CAPABILITIES
              </span>
              {current.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-sans font-semibold text-neutral-900">
                  <div className="w-5 h-5 rounded-full bg-[#0022FF]/10 text-[#0022FF] flex items-center justify-center shrink-0">
                    <Check size={12} />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-black text-white font-mono text-xs uppercase tracking-widest rounded-[2px] hover:bg-[#0022FF] transition-colors duration-200 font-bold"
            >
              <span>Scale in {current.name}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Right Dynamic Industry Showcase Visual */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-black/10 bg-neutral-950">
              <img
                src={current.image}
                alt={current.name}
                key={current.id}
                className="w-full h-full object-cover animate-in fade-in duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                <span className="font-mono text-xs text-[#0022FF] uppercase tracking-widest font-bold">
                  ONE NEXUS SPECIALIZED PLAYBOOK
                </span>
                <span className="font-sans text-2xl font-bold">
                  {current.name}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
