import React, { useState } from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { motion, AnimatePresence } from 'motion/react';

interface SkillRow {
  skillName?: string;
  category?: string;
  expertiseSize?: string | number;
}

export const SkillsUniverse: React.FC = () => {
  const { data, loading } = useGoogleSheet('SKILLS');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (loading) {
    return (
      <section className="py-24 bg-cream-light dark:bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 h-64 flex items-center justify-center">
          <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  const skills: SkillRow[] = data || [];

  // Static Categories from prompt
  const categories = ['All', 'Administrative', 'Marketing', 'Communication', 'Technical', 'Project Management'];

  // Map category to aesthetic soft pastel shades
  const categoryColors: Record<string, { bg: string, border: string }> = {
    'Administrative': { 
      bg: 'bg-[#B5838D]/10 text-[#B5838D]', 
      border: 'border-[#B5838D]/30' 
    },
    'Marketing': { 
      bg: 'bg-[#E9C46A]/10 text-[#CBA24B] dark:text-[#E9C46A]', 
      border: 'border-[#E9C46A]/30' 
    },
    'Communication': { 
      bg: 'bg-[#D4A373]/10 text-[#9C7956] dark:text-[#E6C29E]', 
      border: 'border-[#D4A373]/30' 
    },
    'Technical': { 
      bg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400', 
      border: 'border-teal-500/20' 
    },
    'Project Management': { 
      bg: 'bg-[#CBE4E4]/40 dark:bg-sky-500/10 text-[#307070] dark:text-sky-300', 
      border: 'border-sky-500/20' 
    },
  };

  const getColors = (cat?: string) => {
    return categoryColors[cat || ''] || { bg: 'bg-gold/10 text-gold', border: 'border-gold/20' };
  };

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="skills" className="py-28 bg-cream-light dark:bg-obsidian border-b border-gold/5 relative overflow-hidden">
      {/* Mesh and decorative backgrounds */}
      <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-gold/5 dark:bg-gold/1 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[350px] h-[350px] bg-rose-gold/5 dark:bg-rose-gold/1 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="font-mono text-[10px] tracking-widest text-[#9C7956] dark:text-[#E6C29E] uppercase font-semibold">✦ Expertise Universe</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-cream-warm">
            The <span className="italic font-normal">Skills Ecosystem</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light max-w-lg mx-auto leading-relaxed">
            Instead of standard timelines, my administrative and systems skillset is designed as an interactive, fully integrated directory.
          </p>
        </div>

        {/* Dynamic Category Sliders/Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-sans text-[10px] tracking-widest uppercase font-semibold border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold text-cream-warm border-gold shadow-md'
                  : 'bg-cream-warm dark:bg-carbon text-gray-500 dark:text-gray-400 border-gold/10 hover:border-gold/30 hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Organic floating nodes container */}
        <div className="min-h-[380px] p-8 rounded-[32px] bg-cream-warm/40 dark:bg-carbon/20 border border-gold/15 relative flex flex-wrap items-center justify-center gap-6 overflow-hidden">
          
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((sk, index) => {
              const name = sk.skillName || "Operations Tool";
              const cat = sk.category || "Administrative";
              const rawSize = sk.expertiseSize ? Number(sk.expertiseSize) : 80;
              
              // Normalize size to bubble padding and font scale
              const padClass = rawSize >= 90 
                ? 'px-8 py-5 text-sm sm:text-base' 
                : rawSize >= 80 
                  ? 'px-6 py-4 text-xs sm:text-sm' 
                  : 'px-4 py-3 text-[11px] sm:text-xs';

              const floatDelay = index * 0.15;
              const { bg, border } = getColors(cat);

              return (
                <motion.div
                  key={name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -6, 0] // Soft organic hover loops
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                    y: {
                      repeat: Infinity,
                      duration: 4 + (index % 3),
                      ease: "easeInOut",
                      delay: floatDelay
                    }
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    y: -10,
                    boxShadow: "0 10px 25px -5px rgba(212, 163, 115, 0.2)"
                  }}
                  className={`rounded-full border shadow-sm backdrop-blur-md cursor-default text-center font-serif font-light tracking-wide transition-colors ${padClass} ${bg} ${border}`}
                >
                  <span className="flex items-center gap-1.5 justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                    {name}
                  </span>
                  {rawSize >= 85 && (
                    <span className="block font-sans text-[8px] tracking-widest text-gold uppercase mt-1">
                      {rawSize}% EXPERTISE
                    </span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredSkills.length === 0 && (
            <div className="font-sans text-xs text-gray-400 py-12">
              No skillset entries returned for this category.
            </div>
          )}
        </div>

        {/* Categories legend */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-gray-400">
          {categories.slice(1).map((cat) => {
            const { bg, border } = getColors(cat);
            return (
              <div key={cat} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${bg} ${border} border`} />
                <span className="font-sans text-[10px] tracking-wider uppercase font-semibold dark:text-gray-400">{cat}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
