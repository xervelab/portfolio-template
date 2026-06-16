import React from "react";
import { Artwork } from "../types";
import { Heart, MessageCircle, Layers, Star, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface GalleryGridProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
}

export default function GalleryGrid({ artworks, onArtworkClick }: GalleryGridProps) {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10 bg-[#0A0A0A]" id="gallery-grid-section">
      <AnimatePresence mode="popLayout">
        {artworks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-28 text-center"
            id="empty-gallery-state"
          >
            <div className="p-5 border border-white/5 bg-[#111111] mb-5 rounded-full text-brand-gold/60">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <p className="text-sm font-display uppercase tracking-widest text-[#E5E5E5]">No Masterpieces Found</p>
            <p className="text-xs text-[#E5E5E5]/40 mt-2 font-sans max-w-xs leading-relaxed">
              This catalogue filter or section contains no items at this current epoch of studies.
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 md:gap-7"
            id="portfolio-grid"
          >
            {artworks.map((art) => {
              return (
                <motion.div
                  key={art.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onArtworkClick(art)}
                  className="relative aspect-square group overflow-hidden bg-[#111111] cursor-pointer border border-white/10 hover:border-brand-gold/30 transition-all duration-500 shadow-xl"
                >
                  {/* Masterpiece Image with ReferrerPolicy */}
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter grayscale-[10%] group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-out"
                  />

                  {/* Elegant Gradient Shadow at bottom of each artwork */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent opacity-80 pointer-events-none"></div>

                  {/* Corner Badges (Top Right) */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                    {art.isSold ? (
                      <span className="bg-[#0A0A0A]/90 border border-white/15 text-[8px] font-sans font-light tracking-widest text-[#E5E5E5] px-2.5 py-1 uppercase backdrop-blur-xs">
                        Sold
                      </span>
                    ) : art.price ? (
                      <span className="bg-brand-gold/90 text-[8px] font-sans font-semibold tracking-widest text-black px-2.5 py-1 uppercase shadow-md">
                        Available
                      </span>
                    ) : null}

                    {art.featured && (
                      <span className="bg-[#0A0A0A]/90 border border-brand-gold/30 text-brand-gold p-1.5 backdrop-blur-xs self-end" title="Selected Main Study">
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </span>
                    )}

                    {art.tags.length > 3 && (
                      <div className="bg-[#0A0A0A]/85 border border-white/10 text-[#E5E5E5]/70 p-1.5 self-end" title="Multiple Studies">
                        <Layers className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>

                  {/* Elegant floating header on small screens where hover is unavailable */}
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent text-brand-cream font-serif italic text-[11px] font-light truncate md:hidden">
                    {art.title}
                  </div>

                  {/* Instagram-Style Minimal Hover Overlay */}
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-350 flex flex-col items-center justify-center p-4 text-center z-10">
                    <h3 className="text-brand-cream font-serif italic text-base leading-snug mb-1 translate-y-2 group-hover:translate-y-0 transition-all duration-550 delay-75 font-light">
                      {art.title}
                    </h3>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-brand-gold/70 mb-4 font-sans translate-y-2 group-hover:translate-y-0 transition-all duration-550 delay-100">
                      {art.medium}
                    </p>
                    
                    <div className="flex items-center gap-6 text-[#E5E5E5] translate-y-3 group-hover:translate-y-0 transition-all duration-550 delay-150 border-t border-white/10 pt-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 fill-brand-gold stroke-none" />
                        <span className="text-[10px] font-mono font-light text-[#E5E5E5]/85">{art.likes}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5 fill-[#E5E5E5]/60 stroke-none" />
                        <span className="text-[10px] font-mono font-light text-[#E5E5E5]/85">{art.comments.length}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
