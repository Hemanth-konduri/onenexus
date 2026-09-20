import React from "react";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    number: "01",
    title: "BRAND IDENTITY",
    description: "Strategy, positioning & visual systems",
  },
  {
    number: "02",
    title: "WEB EXPERIENCES",
    description: "High-performance websites & applications",
  },
  {
    number: "03",
    title: "CREATIVE CONTENT",
    description: "Brand messaging & digital assets",
  },
  {
    number: "04",
    title: "DIGITAL GROWTH",
    description: "Acquisition loops & campaign scale",
  },
];

export default function ServiceCards() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-[#F5F8FC]/70 backdrop-blur-md border border-[rgba(23,37,84,0.18)] rounded-[4px] overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(23,37,84,0.14)]">
          {services.map((item) => (
            <div
              key={item.number}
              className="service-card group relative px-5 py-4 sm:py-5 flex flex-col justify-center h-[76px] sm:h-[84px] hover:bg-white/95 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#2554E8] tracking-widest">
                  {item.number}
                </span>
                <span className="font-mono text-xs font-extrabold text-[#111827] tracking-wider uppercase group-hover:text-[#2554E8] transition-colors duration-300">
                  {item.title}
                </span>
              </div>
              <p className="font-sans text-[11px] text-[#475569] font-medium mt-1 transition-opacity duration-300 opacity-70 group-hover:opacity-100 truncate">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
