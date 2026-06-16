import React, { useState } from "react";
import { JournalPost } from "../types";
import { BookOpen, Calendar, Clock, Heart, X, BookMarked } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface JournalListProps {
  posts: JournalPost[];
  onLikePost: (id: string) => void;
}

export default function JournalList({ posts, onLikePost }: JournalListProps) {
  const [activePost, setActivePost] = useState<JournalPost | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-300" id="studio-journal-section">
      <div className="text-center mb-8 sm:mb-14">
        <h3 className="text-lg sm:text-2xl font-light tracking-widest text-neutral-900 dark:text-[#E5E5E5] font-display uppercase flex items-center justify-center gap-2 sm:gap-3">
          <BookMarked className="w-5 h-5 text-brand-gold" />
          THE STUDIO JOURNAL
        </h3>
        <p className="text-xs text-neutral-500 dark:text-zinc-400 font-serif italic max-w-md mx-auto mt-3 leading-relaxed">
          Deep dives into historical pigments, canvas geometries, and essays recorded straight from the active easel.
        </p>
      </div>

      <div className="space-y-6 sm:space-y-10" id="journal-posts-grid">
        {posts.map((post) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 bg-white dark:bg-[#111111] p-4 sm:p-6 md:p-8 border border-neutral-200 dark:border-white/10 hover:border-brand-gold/30 transition-all duration-500 shadow-md dark:shadow-2xl"
          >
            {/* Post Image Cover */}
            <div className="w-full sm:w-48 h-36 sm:h-40 flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-[#0A0A0A] border border-neutral-100 dark:border-white/5 relative">
              <img
                src={post.imageUrl}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale contrast-110 hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-100/30 dark:from-[#111111]/30 to-transparent pointer-events-none"></div>
            </div>

            {/* Post Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-neutral-400 dark:text-[#E5E5E5]/40 mb-3 font-sans">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold/50" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-gold/50" />
                    {post.readTime}
                  </span>
                </div>

                <h4 className="text-lg md:text-xl font-light tracking-tight text-neutral-900 dark:text-[#E5E5E5] font-display leading-snug">
                  {post.title}
                </h4>
                
                <p className="text-xs text-neutral-600 dark:text-[#E5E5E5]/60 mt-3 line-clamp-2 md:line-clamp-3 leading-relaxed font-sans font-light">
                  {post.excerpt}
                </p>
              </div>

              {/* Action Buttons inside Post Card */}
              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between">
                <button
                  onClick={() => onLikePost(post.id)}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-500 dark:text-[#E5E5E5]/50 hover:text-brand-gold transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-brand-gold/60" />
                  <span>{post.likes} notes</span>
                </button>

                <button
                  onClick={() => setActivePost(post)}
                  className="text-[10px] uppercase tracking-widest font-medium text-brand-gold hover:text-brand-cream flex items-center gap-1.5 cursor-pointer transition-colors duration-300"
                >
                  Read Essay
                  <BookOpen className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Fullscreen Reading Essay Overlay Drawer/Modal */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onKeyDown={(e) => {
              if (e.key === "Escape") setActivePost(null);
            }}
          >
            {/* Backclick exits */}
            <div className="absolute inset-0 cursor-default" onClick={() => setActivePost(null)}></div>

            <motion.div
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[#111111] overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cover Header Banner */}
              <div className="relative h-56 md:h-64 flex-shrink-0 bg-black p-6 flex flex-col justify-end">
                <img
                  src={activePost.imageUrl}
                  alt={activePost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-60 absolute inset-0 filter grayscale ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-black/30"></div>
                
                {/* Close Button Float */}
                <button
                  onClick={() => setActivePost(null)}
                  className="absolute top-5 right-5 p-2 bg-black/65 text-brand-cream border border-white/10 rounded-full hover:border-[#E5E5E5]/40 transition-colors cursor-pointer z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Cover Caption Info */}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-brand-gold mb-2 font-sans">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-brand-gold/70" /> {activePost.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand-gold/70" /> {activePost.readTime}</span>
                  </div>
                  <h3 className="text-xl md:text-3xl font-light tracking-tight text-[#E5E5E5] leading-tight font-display">
                    {activePost.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable Essay Content Paper */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 scrollbar-thin bg-[#111111]">
                <div className="flex justify-between items-center bg-[#090909] border border-white/5 p-4">
                  <div className="flex items-center gap-3 text-xs">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
                      <span className="text-xs text-brand-gold font-serif italic">E</span>
                    </div>
                    <div>
                      <span className="font-display font-medium text-white block">vance_studio</span>
                      <span className="text-[9px] text-brand-gold/60 uppercase tracking-widest">At the painting easel</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onLikePost(activePost.id);
                      // Update active post counter state elegantly
                      setActivePost({ ...activePost, likes: activePost.likes + 1 });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold text-[10px] uppercase tracking-widest border border-brand-gold/30 rounded-none cursor-pointer duration-300"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{activePost.likes} Notes</span>
                  </button>
                </div>

                <div className="text-sm md:text-base text-brand-cream/80 font-serif font-light leading-relaxed whitespace-pre-line space-y-4 tracking-wide antialiased">
                  {activePost.content}
                </div>
              </div>

              {/* Essay Footer Action */}
              <div className="p-4 md:p-5 border-t border-white/5 bg-[#0A0A0A] flex justify-between items-center text-[10px] uppercase tracking-widest text-white/30 font-sans">
                <span className="italic font-serif tracking-normal text-xs text-brand-gold/50">Berlin Studio Chronicles</span>
                <button
                  onClick={() => setActivePost(null)}
                  className="px-6 py-2 bg-brand-gold hover:bg-brand-cream text-black hover:text-black font-semibold transition-colors duration-300 cursor-pointer"
                >
                  Done Reading
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
