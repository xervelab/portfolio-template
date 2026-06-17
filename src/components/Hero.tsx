import React from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, Trophy, Award, Star, RefreshCw } from 'lucide-react';

interface HeroProps {
  onWorkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWorkClick }) => {
  const { data, loading, isFallback, refresh } = useGoogleSheet('HERO');
  
  // Use first row or fallback
  const hero = data && data[0] ? data[0] : {};

  // Extract fields with correct fallbacks
  const name = hero.name || "Cecilia Vance";
  const tagline = hero.tagline || "Executive Virtual Assistant & Business Operations Partner";
  const headline = hero.headline || "Helping Visionary Entrepreneurs Focus On What Matters Most.";
  const subheadline = hero.subheadline || "I bring structure, organization, and peace of mind to growing businesses.";
  const ctaTextWork = hero.ctaTextWork || "Let's Work Together";
  const ctaTextResume = hero.ctaTextResume || "Download Resume";
  const portraitImage = hero.portraitImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200";
  const experienceBadge = hero.experienceBadge || "5+ Years Experience";
  const projectsBadge = hero.projectsBadge || "100+ Projects";
  const ratingBadge = hero.ratingBadge || "Top Rated VA";
  const resumeUrl = hero.resumeUrl || "#";

  if (loading) {
    return (
      <section className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-cream-light dark:bg-obsidian">
        <div className="w-full max-w-7xl mx-auto px-6 h-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="h-4 w-1/4 bg-gold/20 rounded animate-pulse" />
            <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-24 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="flex gap-4">
              <div className="h-12 w-32 bg-gold/35 rounded animate-pulse" />
              <div className="h-12 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-[450px] w-full rounded-md bg-gray-200 dark:bg-gray-800 animate-pulse relative" />
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-20 flex items-center overflow-hidden bg-[#FAF7F2] dark:bg-[#0F1115] transition-colors duration-500">
      {/* Dynamic Background Orbs from the theme */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#E9C46A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#D4A373]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Branding Texts */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#B5838D] font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 block font-bold">
              {tagline || "Premier Virtual Assistance"}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-[76px] lg:text-[84px] leading-[0.9] font-serif mb-8 text-[#141414] dark:text-[#FAF7F2] tracking-tight">
              Helping Visionary<br />
              <span className="italic text-[#D4A373] text-shine font-serif">Entrepreneurs</span><br />
              Focus On Flow.
            </h1>
            
            <p className="max-w-md text-base sm:text-lg text-[#6B6B6B] dark:text-gray-300 leading-relaxed mb-10 font-light font-sans">
              {subheadline}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-6 items-center pt-2"
          >
            <button
              onClick={onWorkClick}
              className="px-8 py-4 bg-[#D4A373] text-white hover:bg-[#141414] dark:hover:bg-white dark:hover:text-[#141414] text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-md flex items-center gap-2 group cursor-pointer"
              id="hero-inquire-btn"
            >
              {ctaTextWork}
              <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold uppercase tracking-widest underline underline-offset-8 text-[#B5838D] hover:text-[#D4A373] transition-all"
              id="hero-resume-btn"
            >
              {ctaTextResume}
            </a>
          </motion.div>

          {/* Bottom Trust Row */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="pt-8 grid grid-cols-3 gap-6 border-t border-[#D4A373]/20 max-w-lg"
          >
            <div>
              <p className="font-serif text-2xl sm:text-3xl text-[#D4A373] italic">{experienceBadge.split(' ')[0] || "5+"}</p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#B5838D] font-semibold">{experienceBadge.split(' ').slice(1).join(' ') || "Years Mastery"}</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl text-[#D4A373] italic">{projectsBadge.split(' ')[0] || "100+"}</p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#B5838D] font-semibold">{projectsBadge.split(' ').slice(1).join(' ') || "Successful Projects"}</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl text-[#D4A373] italic flex items-center gap-1">
                99%
              </p>
              <p className="font-sans text-[10px] uppercase tracking-widest text-[#B5838D] font-semibold">{ratingBadge || "Client Retention"}</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Premium Portrait Image Frame (Geometric Balance Layout) */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[4/5] z-10"
          >
            {/* Main elegant balanced capsule-box */}
            <div className="w-full h-full rounded-[100px] sm:rounded-[120px] overflow-hidden shadow-2xl bg-[#EBE7E1] dark:bg-[#181A1F] relative flex items-center justify-center border-[12px] border-white dark:border-[#333333]/30">
              <img 
                src={portraitImage} 
                alt={name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/30 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating aesthetic place badge */}
              <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-black/90 backdrop-blur-md p-5 rounded-2xl border border-white/50 dark:border-white/10 shadow-lg z-20">
                <div className="text-[9px] uppercase font-bold tracking-widest text-[#B5838D] mb-1">Based In</div>
                <div className="text-sm font-serif text-[#141414] dark:text-[#FAF7F2]">{name}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Extreme back giant initials background element for visual depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.025] select-none z-0">
        <h1 className="text-[250px] sm:text-[350px] md:text-[450px] font-serif font-black tracking-tighter">
          {name.split(' ').map(n => n[0]).join('')}
        </h1>
      </div>
    </section>
  );
};
