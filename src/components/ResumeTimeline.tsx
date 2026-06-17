import React, { useState } from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Briefcase, Award, GraduationCap, Calendar } from 'lucide-react';

interface TimelineRow {
  title?: string;
  role?: string;
  company?: string;
  duration?: string;
  description?: string;
  category?: 'Experience' | 'Certification' | 'Education' | string;
}

export const ResumeTimeline: React.FC = () => {
  const { data, loading } = useGoogleSheet('RESUME');
  const [filter, setFilter] = useState<string>('All');

  // Also query HERO to get the resumeUrl if not present in the items (fallback)
  const { data: heroData } = useGoogleSheet('HERO');
  const resumeUrl = heroData && heroData[0]?.resumeUrl ? heroData[0].resumeUrl : "https://docs.google.com/document/d/1HKVP3AHK0GriHmcPV34xfOhnfMFsUdTPLtFUWprfekU/export?format=pdf";

  if (loading) {
    return (
      <section className="py-24 bg-cream-light dark:bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 h-64 flex items-center justify-center">
          <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  const timelineItems: TimelineRow[] = data || [];

  const categories = ['All', 'Experience', 'Certification', 'Education'];

  const filteredItems = filter === 'All'
    ? timelineItems
    : timelineItems.filter(item => item.category?.toLowerCase() === filter.toLowerCase());

  const getIcon = (cat?: string) => {
    switch (cat?.toLowerCase()) {
      case 'experience': return <Briefcase size={12} />;
      case 'certification': return <Award size={12} />;
      case 'education': return <GraduationCap size={12} />;
      default: return <Briefcase size={12} />;
    }
  };

  return (
    <section id="timeline" className="py-28 bg-cream-light dark:bg-obsidian border-b border-gold/5 relative overflow-hidden">
      <div className="absolute right-0 top-10 w-96 h-96 bg-rose-gold/5 dark:bg-rose-gold/1 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="font-mono text-[10px] tracking-widest text-[#9C7956] dark:text-[#E6C29E] uppercase font-semibold">✦ CREDENTIAL FLOW</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-cream-warm">
            The Operational <span className="italic">Timeline</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light max-w-md mx-auto">
            A high-level record of my clinical training, executive roles, and technical operations consulting.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 font-sans text-[10px] tracking-widest uppercase font-semibold border rounded-full transition-all duration-300 cursor-pointer ${
                filter === cat
                  ? 'bg-gold text-white border-gold shadow-sm'
                  : 'bg-cream-warm dark:bg-carbon text-gray-500 border-gold/10 hover:border-gold/30 hover:text-gold dark:text-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline Line Graphics */}
        <div className="relative border-l border-gold/20 ml-4 md:ml-32 space-y-12 py-4">
          
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const title = item.title || "Operations Lead";
              const role = item.role || "Executive Support";
              const company = item.company || "Agency Retainer Services";
              const duration = item.duration || "2021 - Present";
              const desc = item.description || "Streamlining high-priority systems, files, and calendars.";
              const cat = item.category || "Experience";

              return (
                <motion.div
                  key={idx + '-' + title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="relative pl-8 md:pl-10 group"
                >
                  {/* Left Side: Float Duration Tag representing spacing */}
                  <span className="hidden md:block absolute right-full mr-12 top-1.5 font-mono text-[9px] tracking-widest text-[#9C7956] dark:text-[#E6C29E] uppercase font-bold text-right min-w-[120px]">
                    {duration}
                  </span>

                  {/* Bullet Marker Orbs */}
                  <div className="absolute left-0 -translate-x-[13.5px] top-1.5 h-6 w-6 rounded-full border border-gold/30 bg-cream-light dark:bg-obsidian text-gold flex items-center justify-center shadow-sm group-hover:bg-gold group-hover:text-cream-light transition-all duration-300">
                    {getIcon(cat)}
                  </div>

                  {/* Body Content */}
                  <div className="space-y-2 text-left">
                    {/* Date fallback for responsive mobile viewport */}
                    <span className="md:hidden inline-flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-[#9C7956] dark:text-[#E6C29E] uppercase font-bold mb-1 bg-gold/10 px-2 py-0.5 rounded-sm">
                      <Calendar size={8} />
                      {duration}
                    </span>

                    <h3 className="font-serif text-lg sm:text-xl font-normal text-gray-900 dark:text-cream-warm leading-tight group-hover:text-gold transition-colors">
                      {title}
                    </h3>

                    <p className="font-mono text-[10px] tracking-widest text-gray-400 dark:text-gray-500 uppercase font-semibold">
                      {role} <span className="text-gold">@</span> {company}
                    </p>

                    <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-xl">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="text-center font-sans text-xs text-gray-400 py-12">
              No entries filed for this credential class yet.
            </div>
          )}
        </div>

        {/* Unified Download Trigger Box */}
        <div className="mt-20 text-center">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4A373] hover:bg-[#141414] dark:hover:bg-white dark:hover:text-[#141414] text-white font-sans text-xs tracking-widest font-bold uppercase rounded-full shadow-md transition-all duration-300 border border-[#D4A373] cursor-pointer"
            id="download-resume-trigger-btn"
          >
            <Download size={14} />
            <span>Download PDF Résumé File</span>
          </a>
        </div>

      </div>
    </section>
  );
};
