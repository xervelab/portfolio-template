import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Eye, X, ArrowRight, MessageSquare } from 'lucide-react';
import { type ArtworkData, type SiteData } from '../hooks/useSheetData';

interface GalleryProps {
  artworks: ArtworkData[];
  onInquireAboutArtwork: (artworkTitle: string) => void;
  site: SiteData;
}

export default function Gallery({ artworks, onInquireAboutArtwork, site }: GalleryProps) {
  const [filter, setFilter] = useState<string>('All');
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkData | null>(null);

  // Derive categories dynamically from artworks
  const categories = ['All', ...Array.from(new Set(artworks.map(a => a.category)))];

  const filteredArtworks = filter === 'All'
    ? artworks
    : artworks.filter(art => art.category === filter);

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 bg-[#0D0D0D] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header and Filter Category Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8 mb-12">
          <div className="space-y-3">
            <span className="font-mono text-xs text-[#C5A47E] tracking-widest uppercase block">{site.galleryLabel || 'CURATED COLLECTION'}</span>
            <h2 className="text-3xl md:text-4xl font-sans font-extralight tracking-tight text-white">
              {site.galleryTitle || 'The Exhibition Gallery'}
            </h2>
            <div className="w-12 h-[1px] bg-[#C5A47E]" />
          </div>

          {/* Elegant Minimal Category Pills */}
          <div className="flex flex-wrap gap-2 pt-4 md:pt-0">
            {categories.map(cat => (
              <button
                key={cat}
                id={`filter-tab-${cat.toLowerCase().replace(' ', '-')}`}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs tracking-wider uppercase font-mono border-b transition-all duration-300 cursor-pointer ${
                  filter === cat
                    ? 'border-[#C5A47E] text-white font-medium tracking-widest'
                    : 'border-transparent text-neutral-500 hover:text-white hover:border-[#C5A47E]/45'
                }`}
              >
                {cat === 'All' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Canvas Bento Staggered Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((art, idx) => {
              const sequenceNum = String(idx + 1).padStart(2, '0');
              return (
                <motion.div
                  key={art.id}
                  id={`artwork-card-${art.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col justify-between self-stretch h-full bg-[#121212] p-4 border border-white/5 rounded-xs shadow-xs hover:shadow-xl transition-shadow duration-500 hover:border-[#C5A47E]/40"
                >
                  <div className="space-y-4">
                    {/* Catalog Index & Year */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-white/40 tracking-wider">
                      <span>{sequenceNum}</span>
                      <span>{art.year}</span>
                    </div>

                    {/* Artwork Oil Canvas Container with Hover Details Overlay */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#1A1A1A] border border-white/5 group">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Interactive Hover Vignette Overlay */}
                      <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <button
                          id={`quick-view-${art.id}`}
                          onClick={() => setSelectedArtwork(art)}
                          className="px-4 py-2 bg-[#C5A47E] text-black font-mono text-xs font-semibold tracking-wider uppercase flex items-center gap-2 rounded-xs hover:bg-white hover:text-black transition-colors duration-300 shadow-lg cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Examine Piece
                        </button>
                      </div>

                      {/* Top Left Media Corner Tag */}
                      <div className="absolute top-2 left-2 bg-black/85 backdrop-blur-xs px-2.5 py-0.5 border border-white/10 text-[9px] font-mono tracking-wider uppercase text-white/80 rounded-sm">
                        {art.category}
                      </div>

                      {/* Top Right Available / Sold Status Dot */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm backdrop-blur-xs bg-black/85 border border-white/10">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          art.status === 'Inquire' ? 'bg-emerald-400' : 'bg-neutral-500'
                        }`} />
                        <span className="text-[8px] font-mono tracking-widest uppercase text-white/90">
                          {art.status}
                        </span>
                      </div>
                    </div>

                    {/* Descriptive Art Title & Specs block */}
                    <div className="pt-2 space-y-1">
                      <h3 className="text-lg font-serif tracking-tight text-white group-hover:text-[#C5A47E] transition-colors duration-300">
                        {art.title}
                      </h3>
                      <p className="text-[11px] font-mono text-white/60 leading-relaxed truncate">
                        {art.medium}
                      </p>
                    </div>
                  </div>

                  {/* Pricing and Details Trigger Row */}
                  <div className="border-t border-white/5 mt-4 pt-3 flex justify-between items-center">
                    <span className="font-mono text-xs text-white/70 font-mediumCode">
                      {art.status === 'Sold' ? 'Private Commission' : art.status === 'Private Collection' ? 'Private Collection' : art.price || 'P.O.A.'}
                    </span>
                    <button
                      id={`view-details-${art.id}`}
                      onClick={() => setSelectedArtwork(art)}
                      className="text-xs font-mono uppercase tracking-widest text-[#C5A47E] hover:text-white flex items-center gap-1 transition-colors group-hover:translate-x-1 duration-300 cursor-pointer"
                    >
                      SPEC <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Beautiful Lightbox Dialog Modal */}
        <AnimatePresence>
          {selectedArtwork && (
            <motion.div
              id="artwork-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedArtwork(null)}
            >
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(197,164,126,0.05) 0%, rgba(0,0,0,0) 80%)'
                }}
              />

              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#121212] border border-white/10 max-w-5xl w-full rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button top corner */}
                <button
                  id="close-lightbox"
                  onClick={() => setSelectedArtwork(null)}
                  className="absolute top-4 right-4 z-10 p-2 text-white/50 hover:text-white bg-black/70 border border-white/10 shadow-sm rounded-full transition-colors duration-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left side: Artwork Image */}
                <div className="md:w-3/5 bg-[#080808] flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 relative group min-h-[300px] md:min-h-0">
                  <img
                    src={selectedArtwork.imageUrl}
                    alt={selectedArtwork.title}
                    className="w-full h-full object-contain max-h-[80vh]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Right side: Provenance Catalog details */}
                <div className="md:w-2/5 p-8 flex flex-col justify-between space-y-8 bg-[#090909]">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex gap-2 items-center text-[10px] font-mono tracking-widest text-[#C5A47E]">
                        <span>REG. {selectedArtwork.id.toUpperCase()}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-sans font-light tracking-tight text-white">
                        {selectedArtwork.title}
                      </h3>
                      <div className="w-12 h-[1px] bg-white/10 mt-3" />
                    </div>

                    {/* Metadata Table */}
                    <div className="space-y-3 font-mono text-xs border-y border-white/10 py-4">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">MEDIUM</span>
                        <span className="text-[#F2F2F2] text-right max-w-[200px]">{selectedArtwork.medium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">DIMENSIONS</span>
                        <span className="text-[#F2F2F2]">{selectedArtwork.dimensions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">COMPLETED YEAR</span>
                        <span className="text-[#F2F2F2]">{selectedArtwork.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">STATUS</span>
                        <span className={`font-semibold flex items-center gap-1.5 ${
                          selectedArtwork.status === 'Inquire' ? 'text-emerald-400' : 'text-neutral-400'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            selectedArtwork.status === 'Inquire' ? 'bg-emerald-400' : 'bg-neutral-500'
                          }`} />
                          {selectedArtwork.status}
                        </span>
                      </div>
                    </div>

                    {/* Curatorial narrative */}
                    <div className="space-y-2">
                      <h4 className="font-mono text-[10px] uppercase text-[#C5A47E] tracking-wider font-semibold">Description</h4>
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans font-light">
                        {selectedArtwork.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs font-mono text-neutral-500">PRICE</span>
                      <span className="text-xl font-serif text-[#C5A47E]">
                        {selectedArtwork.status === 'Sold' ? 'Sold' : selectedArtwork.status === 'Private Collection' ? 'Private Collection' : selectedArtwork.price || 'Available on Request'}
                      </span>
                    </div>

                    {selectedArtwork.status === 'Inquire' ? (
                      <button
                        id="inquire-from-lightbox"
                        onClick={() => {
                          onInquireAboutArtwork(selectedArtwork.title);
                          setSelectedArtwork(null);
                        }}
                        className="w-full bg-[#C5A47E] text-black hover:bg-white hover:text-black text-xs font-mono tracking-widest py-3 uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-sm shadow-sm cursor-pointer font-semibold"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Inquire About This Piece
                      </button>
                    ) : (
                      <div className="text-center py-2 border border-white/5 bg-white/5 text-[10px] font-mono tracking-widest uppercase text-neutral-400 rounded-xs">
                        {selectedArtwork.status === 'Sold' ? 'Sold' : 'Private Holding'}
                      </div>
                    )}
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

