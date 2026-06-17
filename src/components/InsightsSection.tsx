import React from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { motion } from 'motion/react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogRow {
  title?: string;
  category?: string;
  readingTime?: string;
  publishDate?: string;
  content?: string;
  image?: string;
}

export const InsightsSection: React.FC = () => {
  const { data, loading } = useGoogleSheet('BLOGS');

  if (loading) {
    return (
      <section className="py-24 bg-cream-warm dark:bg-carbon">
        <div className="max-w-7xl mx-auto px-6 h-64 flex items-center justify-center">
          <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  const blogs: BlogRow[] = data || [];

  if (blogs.length === 0) {
    return null;
  }

  // First post is featured
  const featured = blogs[0];
  const remaining = blogs.slice(1);

  return (
    <section id="blog" className="py-28 bg-cream-warm dark:bg-carbon/60 border-b border-gold/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <p className="font-mono text-[10px] tracking-widest text-[#9C7956] dark:text-[#E6C29E] uppercase font-semibold">✦ INTELLECTUAL CURATION</p>
          <imgName />
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-cream-warm">
            The <span className="italic">Editorial Magazine</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light max-w-lg mx-auto">
            Essays on virtual work mechanics, high-priority time preservation, Notion architecture rules, and personal corporate design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT FRONT: Big Featured Editorial Link Card */}
          {featured && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 flex flex-col justify-between space-y-6 group cursor-pointer"
            >
              <div className="w-full aspect-[16/10] overflow-hidden rounded-sm border border-gold/15 bg-gray-200 dark:bg-zinc-800 shadow-lg relative">
                <img 
                  src={featured.image || "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=1000"} 
                  alt={featured.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700 ease-out"
                />
                <span className="absolute top-4 left-4 font-mono text-[9px] tracking-widest uppercase font-bold text-cream-warm px-3 py-1.5 bg-black/70 backdrop-blur-sm border border-white/10 rounded-sm">
                  {featured.category || "Curation"}
                </span>
              </div>

              <div className="space-y-4 text-left">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-gray-400 dark:text-gray-500 font-mono text-[9px] tracking-wider uppercase font-semibold">
                  <span className="flex items-center gap-1"><Calendar size={10} />{featured.publishDate || "June 17, 2026"}</span>
                  <span className="h-2 w-2 rounded-full bg-gold/35" />
                  <span className="flex items-center gap-1"><Clock size={10} />{featured.readingTime || "5 Min Read"}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-light text-gray-900 dark:text-cream-warm group-hover:text-gold transition-colors duration-200 leading-tight">
                  {featured.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">
                  {featured.content}
                </p>

                <div className="inline-flex items-center gap-2 text-gold font-mono text-[10px] tracking-widest font-bold uppercase pt-2">
                  <span>Read Document</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          )}

          {/* RIGHT GRID: Scroll list of subsidiary secondary articles */}
          <div className="lg:col-span-5 space-y-8 text-left">
            {remaining.map((blog, rIdx) => {
              const bgTitle = blog.title || "Systems & Schedule Tagging Setup";
              const bgCategory = blog.category || "Organization";
              const bgDate = blog.publishDate || "June 2026";
              const bgTime = blog.readingTime || "4 Min Read";
              const bgImg = blog.image || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600";
              const bgSummary = blog.content || "An operations briefing covering specific tags and folder filters for creative Founders.";

              return (
                <motion.div
                  key={rIdx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: rIdx * 0.15 }}
                  className="flex items-start gap-4 p-4 rounded-sm hover:bg-cream-light dark:hover:bg-obsidian border border-transparent hover:border-gold/10 transition-all duration-300 group cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-sm border border-gold/15 bg-gray-200 dark:bg-zinc-800">
                    <img
                      src={bgImg}
                      alt={bgTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>

                  {/* Descriptions block */}
                  <div className="space-y-2 flex-grow">
                    <div className="flex flex-wrap items-center gap-3 text-gray-400 dark:text-gray-500 font-mono text-[8px] tracking-wider uppercase font-semibold">
                      <span className="text-gold font-bold">{bgCategory}</span>
                      <span>•</span>
                      <span>{bgTime}</span>
                    </div>

                    <h4 className="font-serif text-base sm:text-lg font-light text-gray-900 dark:text-cream-warm group-hover:text-gold transition-colors duration-200 leading-snug">
                      {bgTitle}
                    </h4>
                    
                    <p className="font-sans text-[11px] text-gray-500 dark:text-gray-400 font-light max-w-sm line-clamp-2">
                      {bgSummary}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {remaining.length === 0 && (
              <div className="p-8 border border-dashed border-gold/15 rounded-sm text-center">
                <BookOpen size={20} className="text-gold/35 mx-auto mb-3" />
                <p className="font-sans text-xs text-gray-400">Additional publications and administrative briefings pending launch.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
