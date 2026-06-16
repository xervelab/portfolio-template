import React from "react";
import { motion } from "motion/react";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  categories: { name: string; count: number }[];
}

export default function FilterBar({ activeFilter, onFilterChange, categories }: FilterBarProps) {
  return (
    <div className="w-full py-8 border-b border-white/10 flex flex-col items-center justify-center bg-[#0A0A0A]" id="filter-bar-container">
      {/* Category Horizontal Scrolling Container */}
      <div className="w-full overflow-x-auto scrollbar-none flex justify-start sm:justify-center py-1">
        <div className="flex items-center gap-4 sm:gap-8 md:gap-12 px-3 sm:px-6">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => onFilterChange(cat.name)}
                className="relative py-2 text-[11px] md:text-xs font-medium uppercase tracking-[0.2em] cursor-pointer select-none whitespace-nowrap group focus:outline-none transition-colors duration-300"
                id={`filter-pill-${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`${isActive ? "text-white" : "text-[#E5E5E5]/40 group-hover:text-brand-cream"} font-display transition-colors duration-300`}>
                    {cat.name}
                  </span>

                  <span
                    className={`text-[8px] font-mono tracking-normal leading-none font-light border rounded px-1.5 py-0.5 ${
                      isActive
                        ? "bg-brand-gold/10 text-brand-gold border-brand-gold/30"
                        : "bg-transparent text-[#E5E5E5]/30 border-white/5 group-hover:border-[#E5E5E5]/20 group-hover:text-[#E5E5E5]/50 transition-colors"
                    }`}
                  >
                    {cat.count}
                  </span>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="editorialActiveIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
