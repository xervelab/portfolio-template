import { useState } from "react";
import { Heart, MessageCircle, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useSheetData, mapReels, type ReelItem } from "../hooks/useSheetData";

export function Reels() {
  const { data: reels, loading } = useSheetData<ReelItem>("Reels", mapReels, []);
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);

  if (loading) {
    return (
      <div className="max-w-[935px] mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[9/16] rounded-lg animate-pulse"
              style={{ background: "var(--secondary)" }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (reels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(236,72,152,0.15))" }}>
          <Play size={28} style={{ color: "var(--muted-foreground)" }} />
        </div>
        <p style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>
          No reels yet
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-[935px] mx-auto px-4 py-4">
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {reels.map((reel) => (
            <motion.div
              key={reel.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer group"
              style={{ background: "var(--secondary)" }}
              onClick={() => setActiveReel(reel)}
            >
              {/* Thumbnail */}
              {reel.thumbnailUrl ? (
                <img
                  src={reel.thumbnailUrl}
                  alt={reel.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(236,72,152,0.1))" }}>
                  <Play size={32} style={{ color: "var(--muted-foreground)" }} />
                </div>
              )}

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="flex items-center gap-4 text-white">
                  <span className="flex items-center gap-1 text-sm font-semibold">
                    <Heart size={16} fill="white" /> {reel.likes}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold">
                    <MessageCircle size={16} fill="white" /> {reel.comments}
                  </span>
                </div>
              </div>

              {/* Play icon overlay */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <Play size={14} fill="white" color="white" />
              </div>

              {/* Title */}
              {reel.title && (
                <div className="absolute bottom-2 right-2 left-8">
                  <p className="text-white text-[10px] font-medium truncate drop-shadow-md" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {reel.title}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Reel Viewer */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.95)" }}
            onClick={() => setActiveReel(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-4 right-4 z-[110] p-2 rounded-full hover:bg-white/10 transition-colors"
              style={{ color: "#fff" }}
            >
              <X size={24} />
            </button>

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-[420px] mx-4 rounded-xl overflow-hidden"
              style={{ aspectRatio: "9/16", maxHeight: "90vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={activeReel.videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                playsInline
                controls
              />

              {/* Caption overlay */}
              {activeReel.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 pt-12" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.8))" }}>
                  <p className="text-white text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {activeReel.caption}
                  </p>
                </div>
              )}

              {/* Stats */}
              <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                    <Heart size={20} color="#fff" />
                  </div>
                  <span className="text-white text-xs font-semibold">{activeReel.likes}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                    <MessageCircle size={20} color="#fff" />
                  </div>
                  <span className="text-white text-xs font-semibold">{activeReel.comments}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
