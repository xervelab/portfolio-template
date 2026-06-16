import React, { useState } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight, MessageSquareCode, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ARTWORKS_DATA } from "../data";
import { Artwork } from "../types";

interface GalleryProps {
  onInquireAboutArtwork: (title: string) => void;
}

export default function Gallery({ onInquireAboutArtwork }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = ["All", "Abstract Oil", "Watercolor", "Contemporary"];

  // Filter artworks based on category
  const filteredArtworks = selectedCategory === "All"
    ? ARTWORKS_DATA
    : ARTWORKS_DATA.filter(art => art.category === selectedCategory);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const openLightbox = (id: string) => {
    const index = ARTWORKS_DATA.findIndex(art => art.id === id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      const idx = (lightboxIndex - 1 + ARTWORKS_DATA.length) % ARTWORKS_DATA.length;
      setLightboxIndex(idx);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      const idx = (lightboxIndex + 1) % ARTWORKS_DATA.length;
      setLightboxIndex(idx);
    }
  };

  const currentLightboxArt = lightboxIndex !== null ? ARTWORKS_DATA[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#FAF9F6] dark:bg-[#0F0F0F] border-b border-stone-900/10 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Gallery Headers */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0 border-b border-stone-900/10 dark:border-white/10 pb-8">
          <div className="space-y-3">
            <span className="font-sans text-[10px] tracking-[0.35em] text-brand-accent uppercase block font-semibold">
              Curated Gallery
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-stone-950 dark:text-stone-50 tracking-tight leading-none">
              Selected Artworks
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 pt-4 md:pt-0">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-sans text-[10px] md:text-xs tracking-[0.18em] uppercase transition-all duration-300 rounded-none border ${
                  selectedCategory === category
                    ? "bg-stone-950 dark:bg-stone-50 border-stone-950 dark:border-stone-50 text-stone-50 dark:text-stone-950 font-medium"
                    : "bg-transparent border-stone-900/10 dark:border-white/10 text-stone-500 dark:text-stone-400 hover:border-stone-950 dark:hover:border-stone-50 hover:text-stone-950 dark:hover:text-stone-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork) => {
              const isFav = favorites.includes(artwork.id);
              return (
                <motion.div
                  layout
                  key={artwork.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="group relative cursor-pointer flex flex-col justify-between"
                  onClick={() => openLightbox(artwork.id)}
                >
                  {/* Frame */}
                  <div className="relative overflow-hidden aspect-[4/5] bg-stone-100 dark:bg-zinc-900 border border-stone-900/10 dark:border-white/10 rounded-none">
                    {/* Status badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-2.5 py-1 text-[8px] font-sans tracking-[0.2em] font-medium uppercase rounded-none ${
                        artwork.status === 'available'
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                          : artwork.status === 'sold'
                          ? "bg-stone-500/10 text-stone-500 border border-stone-500/20"
                          : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                      }`}>
                        {artwork.status}
                      </span>
                    </div>

                    {/* Like button */}
                    <button
                      onClick={(e) => toggleFavorite(artwork.id, e)}
                      className="absolute top-4 right-4 z-10 p-2 rounded-none bg-stone-950/20 dark:bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-105 active:scale-95 text-stone-200 dark:text-stone-200"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-brand-accent text-brand-accent" : ""}`} />
                    </button>

                    {/* Image */}
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-750 ease-out group-hover:scale-103"
                    />

                    {/* Overlays on hover */}
                    <div className="absolute inset-0 bg-stone-950/25 dark:bg-zinc-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="p-3 bg-stone-900/60 backdrop-blur-md rounded-none border border-white/10 transform scale-90 group-hover:scale-100 transition-transform duration-500">
                        <Maximize2 className="w-4 h-4 text-stone-100" />
                      </div>
                    </div>
                  </div>

                  {/* Captions */}
                  <div className="mt-4 flex justify-between items-start border-t border-stone-900/5 dark:border-white/5 pt-3">
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg text-stone-950 dark:text-stone-50 font-medium group-hover:text-brand-accent transition-colors duration-300">
                        {artwork.title}
                      </h3>
                      <p className="font-sans text-[11px] text-stone-500 dark:text-stone-400 font-light tracking-wide italic">
                        {artwork.medium}
                      </p>
                      <p className="font-mono text-[9px] text-stone-400 dark:text-stone-500 uppercase tracking-widest">
                        {artwork.dimensions} • {artwork.year}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <span className="font-sans text-xs tracking-wider text-stone-900 dark:text-stone-50 block font-semibold text-brand-accent">
                        {artwork.price || "Contact for price"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && currentLightboxArt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-6 md:p-12 overflow-y-auto"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-stone-900/40 border border-stone-800 text-stone-200 hover:text-brand-accent transition-colors z-50"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Slider Controls */}
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/40 border border-stone-800 text-stone-200 hover:text-brand-accent transition-all hover:scale-105 z-40 hidden sm:block"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/40 border border-stone-800 text-stone-200 hover:text-brand-accent transition-all hover:scale-105 z-40 hidden sm:block"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Container Card */}
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="bg-stone-900 dark:bg-stone-950 border border-stone-800/80 w-full max-w-5xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl z-30"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image panel */}
                <div className="relative bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px]">
                  <img
                    src={currentLightboxArt.imageUrl}
                    alt={currentLightboxArt.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain max-h-[550px]"
                  />
                  {/* Status Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-brand-accent/90 backdrop-blur-sm text-[9px] font-sans tracking-[0.2em] font-semibold text-black uppercase rounded-sm">
                      {currentLightboxArt.status}
                    </span>
                  </div>
                </div>

                {/* Details panel */}
                <div className="p-8 md:p-12 flex flex-col justify-between text-stone-100 bg-stone-900">
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="font-sans text-[10px] tracking-[0.3em] text-brand-accent uppercase font-medium">
                        {currentLightboxArt.category}
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl font-light text-stone-50 leading-tight">
                        {currentLightboxArt.title}
                      </h3>
                      <p className="font-sans text-xs text-stone-400 font-light tracking-wide block italic">
                        {currentLightboxArt.medium}
                      </p>
                      <p className="font-mono text-[10px] text-stone-500 mt-1">
                        {currentLightboxArt.dimensions} • {currentLightboxArt.year}
                      </p>
                    </div>

                    <div className="w-12 h-[1px] bg-stone-800"></div>

                    <p className="font-sans text-stone-300 text-sm leading-relaxed font-light">
                      {currentLightboxArt.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-8 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="font-sans text-[10px] tracking-wider text-stone-500 uppercase font-light">
                        Price Valuation
                      </span>
                      <span className="font-serif text-2xl text-stone-100 block font-light">
                        {currentLightboxArt.price || "Sold"}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          onInquireAboutArtwork(currentLightboxArt.title);
                          setLightboxIndex(null);
                        }}
                        className="px-5 py-3 bg-stone-100 hover:bg-brand-accent text-stone-900 font-sans text-[10px] tracking-[0.2em] uppercase font-semibold rounded transition-all duration-300 flex items-center gap-2 hover:scale-[1.03] active:scale-95 text-center justify-center w-full sm:w-auto"
                      >
                        <MessageSquareCode className="w-3.5 h-3.5" />
                        Inquire Piece
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
