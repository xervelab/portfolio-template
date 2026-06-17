import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { type ArtworkData, type SiteData } from "../hooks/useSheetData";

interface GalleryProps {
  artworks: ArtworkData[];
  site: SiteData;
}

export function Gallery({ artworks, site }: GalleryProps) {
  const categories = useMemo(() => {
    const cats = Array.from(new Set(artworks.map((w) => w.category).filter(Boolean)));
    return ["All", ...cats];
  }, [artworks]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? artworks : artworks.filter((w) => w.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevWork = () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  const nextWork = () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <section id="work" className="py-32 px-6 bg-[#0f0d0b]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-['DM_Mono'] text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-4">{site.galleryLabel}</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="font-['Playfair_Display'] text-[#f0ebe3] leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}>
              {site.galleryTitle}
            </h2>
            {/* Category filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-['DM_Sans'] text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-300 ${
                    activeCategory === cat
                      ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10"
                      : "border-[rgba(201,169,110,0.2)] text-[#9c8e7e] hover:border-[#c9a96e]/50 hover:text-[#f0ebe3]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Masonry-style grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((work, idx) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="relative group cursor-pointer overflow-hidden bg-[#1a1714]"
                style={{ aspectRatio: idx % 3 === 1 ? "3/4" : "4/5" }}
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={work.img}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0f0d0b]/0 group-hover:bg-[#0f0d0b]/70 transition-all duration-500 flex flex-col justify-end p-6">
                  <motion.div
                    initial={false}
                    className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400"
                  >
                    <h3 className="font-['Playfair_Display'] text-[#f0ebe3] text-lg mb-1">{work.title}</h3>
                    <p className="font-['DM_Mono'] text-[#c9a96e] text-xs tracking-wider">{work.year} · {work.medium}</p>
                    {work.available && (
                      <span className="inline-block mt-2 font-['DM_Sans'] text-[10px] tracking-[0.2em] uppercase text-[#0f0d0b] bg-[#c9a96e] px-2 py-1">
                        Available
                      </span>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0806]/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full flex flex-col md:flex-row gap-0 bg-[#1a1714]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:w-2/3 bg-[#231f1b]">
                <img
                  src={filtered[lightboxIndex].img}
                  alt={filtered[lightboxIndex].title}
                  className="w-full h-full object-contain max-h-[80vh]"
                />
              </div>
              <div className="md:w-1/3 p-8 flex flex-col justify-between">
                <div>
                  <p className="font-['DM_Mono'] text-[#c9a96e] text-xs tracking-[0.25em] uppercase mb-4">
                    {lightboxIndex + 1} / {filtered.length}
                  </p>
                  <h3 className="font-['Playfair_Display'] text-[#f0ebe3] text-2xl mb-2" style={{ fontWeight: 400 }}>
                    {filtered[lightboxIndex].title}
                  </h3>
                  <p className="font-['DM_Mono'] text-[#9c8e7e] text-xs mb-6">
                    {filtered[lightboxIndex].year}
                  </p>
                  <p className="font-['DM_Sans'] text-[#9c8e7e] text-sm leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                    {filtered[lightboxIndex].description}
                  </p>
                  <div className="space-y-1 border-t border-[rgba(201,169,110,0.15)] pt-4">
                    <p className="font-['DM_Sans'] text-[#9c8e7e] text-xs">{filtered[lightboxIndex].medium}</p>
                    <p className="font-['DM_Sans'] text-[#9c8e7e] text-xs">{filtered[lightboxIndex].size}</p>
                    {filtered[lightboxIndex].available ? (
                      <p className="font-['DM_Sans'] text-[#c9a96e] text-xs pt-1">Available — inquire for pricing</p>
                    ) : (
                      <p className="font-['DM_Sans'] text-[#9c8e7e] text-xs pt-1 opacity-50">Not for sale</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={prevWork} className="flex-1 border border-[rgba(201,169,110,0.2)] text-[#9c8e7e] hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors duration-200 p-3 flex items-center justify-center">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={nextWork} className="flex-1 border border-[rgba(201,169,110,0.2)] text-[#9c8e7e] hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors duration-200 p-3 flex items-center justify-center">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-[#9c8e7e] hover:text-[#f0ebe3] transition-colors"
              >
                <X size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
