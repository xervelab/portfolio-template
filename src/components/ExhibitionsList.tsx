import React from "react";
import { Exhibition } from "../types";
import { Calendar, MapPin, ExternalLink, Award, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface ExhibitionsListProps {
  exhibitions: Exhibition[];
}

export default function ExhibitionsList({ exhibitions }: ExhibitionsListProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-[#0A0A0A]" id="exhibitions-timeline-section">
      <div className="text-center mb-8 sm:mb-14">
        <h3 className="text-lg sm:text-2xl font-light tracking-widest text-[#E5E5E5] font-display uppercase flex items-center justify-center gap-2 sm:gap-3">
          <Award className="w-5 h-5 text-brand-gold" />
          EXHIBITION EXPEDITIONS
        </h3>
        <p className="text-xs text-zinc-400 font-serif italic max-w-md mx-auto mt-3 leading-relaxed">
          Contemporary installations of fine oil studies and structural canvases.
        </p>
      </div>

      <div className="relative border-l border-white/10 ml-2 sm:ml-4 pl-4 sm:pl-6 md:pl-8 space-y-8 sm:space-y-12 pb-6">
        {exhibitions.map((ex, idx) => {
          const isLive = ex.status === "Live Now";
          const isUpcoming = ex.status === "Upcoming";

          return (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              id={`exemption-card-${ex.id}`}
            >
              {/* Timeline dot */}
              <span className={`absolute -left-[25px] sm:-left-[31px] md:-left-[39px] top-1.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-3 border-[#0A0A0A] flex items-center justify-center ${
                isLive 
                  ? "bg-brand-gold shadow-lg shadow-brand-gold/20" 
                  : isUpcoming 
                  ? "bg-brand-cream" 
                  : "bg-neutral-800"
              }`}>
                {isLive && (
                  <span className="absolute inset-0 bg-brand-gold rounded-full animate-ping opacity-60"></span>
                )}
              </span>

              {/* Card Container */}
              <div className="bg-[#111111] p-4 sm:p-6 md:p-8 border border-white/15 hover:border-brand-gold/40 transition-all duration-500 shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className={`text-[8px] font-medium uppercase tracking-[0.2em] px-3 py-1 border ${
                    isLive
                      ? "bg-brand-gold/10 text-brand-gold border-brand-gold/30 flex items-center gap-1.5"
                      : isUpcoming
                      ? "bg-transparent text-brand-cream border-brand-cream/25 flex items-center gap-1.5"
                      : "bg-[#161616] text-[#E5E5E5]/50 border-white/5"
                  }`}>
                    {isLive && <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse inline-block" />}
                    {isUpcoming && <Sparkles className="w-2.5 h-2.5 text-brand-cream" />}
                    {ex.status}
                  </span>
                  
                  <div className="flex items-center gap-1.5 text-xs text-white/40 font-sans font-light">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold/60" />
                    {ex.dates}
                  </div>
                </div>

                <h4 className="text-lg md:text-xl font-light text-[#E5E5E5] leading-snug font-display tracking-tight">
                  {ex.title}
                </h4>

                <div className="mt-5 space-y-2.5 text-[#E5E5E5]/70">
                  <div className="text-sm font-serif text-[#E5E5E5]/90 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
                    {ex.gallery}
                  </div>
                  <div className="text-xs text-[#E5E5E5]/50 flex items-center gap-1.5 pl-3 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold/40" />
                    {ex.location}
                  </div>
                </div>

                {/* Optional Inquiry Link */}
                {ex.status !== "Past" && (
                  <div className="mt-6 pt-5 border-t border-white/5 flex justify-end">
                    <a
                      href="mailto:glenndalemagbanua.collabrios@gmail.com?subject=Inquiry%20regarding%20Exhibition"
                      className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-brand-gold hover:text-brand-cream pb-1 border-b border-brand-gold/20 hover:border-brand-cream transition-all duration-300 font-medium cursor-pointer"
                    >
                      Inquire invitation passes
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
