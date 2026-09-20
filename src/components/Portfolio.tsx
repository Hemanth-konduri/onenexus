import { useState } from "react";
import { ArrowUpRight, TrendingUp } from "lucide-react";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      title: "Flit Real Estate",
      industry: "PropTech & Housing",
      outcome: "+340% User Conversion",
      category: "Startups",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      description: "Complete rebrand, custom mobile-first booking experience, and acquisition strategy for a high-growth real estate platform.",
      span: "lg:col-span-8",
      aspect: "aspect-[16/10]",
    },
    {
      title: "Aura Dental & Aesthetic Clinic",
      industry: "Healthcare & Aesthetics",
      outcome: "2.8x New Patient Bookings",
      category: "Clinic",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80",
      description: "Elevating clinical excellence into a luxury hospitality experience with custom patient onboarding.",
      span: "lg:col-span-4",
      aspect: "aspect-[4/5]",
    },
    {
      title: "Vertex High-Performance Gym",
      industry: "Fitness & Wellness",
      outcome: "Sold Out 500 Memberships",
      category: "Gym",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80",
      description: "Cinematic brand film, interactive class scheduler, and organic social growth campaign.",
      span: "lg:col-span-5",
      aspect: "aspect-[4/5]",
    },
    {
      title: "L’Atelier Gourmet Bistro",
      industry: "Restaurant & Hospitality",
      outcome: "Fully Booked 6 Weeks Out",
      category: "Restaurant",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
      description: "Editorial photography, interactive seasonal menu, and local influencer activation campaign.",
      span: "lg:col-span-7",
      aspect: "aspect-[16/10]",
    },
    {
      title: "Maison Velvet Haute Salon",
      industry: "Beauty & Spa",
      outcome: "+180% Average Ticket Value",
      category: "Salon",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
      description: "Digital transformation for a premier salon chain with automated client retention funnels.",
      span: "lg:col-span-7",
      aspect: "aspect-[16/10]",
    },
    {
      title: "Solstice Artisan Boutique",
      industry: "Luxury Retail & Goods",
      outcome: "$1.4M First Year E-Commerce",
      category: "Retail",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80",
      description: "High-fashion e-commerce storefront with custom product staging and global marketing campaigns.",
      span: "lg:col-span-5",
      aspect: "aspect-[4/5]",
    },
  ];

  const filteredProjects = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="relative w-full bg-[#EFECE6] text-[#0F0F11] overflow-hidden border-t border-black/[0.07] py-20 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-black/[0.07]">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2.5 h-2.5 bg-[#0022FF]" />
              <span className="font-mono text-xs sm:text-sm tracking-widest uppercase font-bold text-black">
                SELECTED CASE STUDIES / FEATURED PORTFOLIO
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black">
              Proven work that moves markets.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {["All", "Restaurant", "Gym", "Salon", "Clinic", "Retail", "Startups"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeFilter === filter
                    ? "bg-black text-white shadow-md shadow-black/20"
                    : "bg-white/70 border border-black/[0.08] text-neutral-600 hover:text-black hover:bg-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Grid with Mixed Aspect Ratios */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`${project.span} group relative flex flex-col gap-4 cursor-pointer`}
            >
              {/* Image Container with Hover Zoom & Dark Overlay */}
              <div
                className={`relative w-full ${project.aspect} bg-neutral-950 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-700`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Floating Outcome Metric Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 bg-black/75 backdrop-blur-md text-white rounded-full border border-white/10 font-mono text-xs font-semibold">
                  <TrendingUp size={13} className="text-[#0022FF]" />
                  <span>{project.outcome}</span>
                </div>

                {/* Floating Top Right Expand Arrow */}
                <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 shadow-xl">
                  <ArrowUpRight size={18} />
                </div>

                {/* Gradient Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <span className="font-mono text-xs text-[#0022FF] uppercase tracking-widest font-bold mb-1">
                    {project.industry}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Project Short Narrative */}
              <p className="text-neutral-600 text-sm leading-relaxed px-1">
                {project.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
