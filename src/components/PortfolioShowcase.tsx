import React from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { motion } from 'motion/react';
import { Target, Lightbulb, CheckCircle2, TrendingUp } from 'lucide-react';

interface PortfolioRow {
  title?: string;
  coverImage?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  metrics?: string;
}

export const PortfolioShowcase: React.FC = () => {
  const { data, loading } = useGoogleSheet('PORTFOLIO');

  if (loading) {
    return (
      <section className="py-24 bg-cream-light dark:bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 h-64 flex items-center justify-center">
          <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  const projects: PortfolioRow[] = data || [];

  return (
    <section id="portfolio" className="py-28 bg-cream-light dark:bg-obsidian border-b border-gold/5 relative overflow-hidden">
      {/* Background design accents */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-amber/5 dark:bg-amber/2 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <p className="font-mono text-[10px] tracking-widest text-[#B5838D] uppercase font-bold mb-3">✦ Behance Case Logs</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-cream-warm leading-tight">
            Case Studies in <br />
            <span className="italic font-normal text-shine font-serif">Structural Excellence</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light max-w-xl mt-4 leading-relaxed">
            Detailed breakdowns of operational problems solved, dashboard models launched, and administrative metrics achieved for active businesses.
          </p>
        </div>

        {/* Large Project Vertical List */}
        <div className="space-y-24">
          {projects.map((proj, idx) => {
            const title = proj.title || "Custom Case Study";
            const image = proj.coverImage || "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1200";
            const challenge = proj.challenge || "Active business suffering from system misalignment and high-priority timing discrepancies.";
            const solution = proj.solution || "Formulated custom standard operating procedures (SOPs), integrated clean CRM links, and automated schedules.";
            const outcome = proj.outcome || "Total recovery of executive mental space and streamlined communication loglines.";
            const rawMetrics = proj.metrics || "↑ 60% operational speed | ↓ 80% email delay";
            
            // Split metrics by separator
            const metricsList = rawMetrics.split('|').map(m => m.trim()).filter(Boolean);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-gold/10 pb-20 last:border-b-0 last:pb-0"
              >
                {/* Left block: Huge elegant image zoom */}
                <div className={`lg:col-span-6 relative ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
                  <div className="w-full aspect-video rounded-[36px] sm:rounded-[48px] overflow-hidden border-[8px] border-white dark:border-[#181A1F] bg-gray-200 dark:bg-zinc-800 shadow-2xl group cursor-pointer relative">
                    <img
                      src={image}
                      alt={title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Right block: Case Text Details */}
                <div className="lg:col-span-6 space-y-6 text-left">
                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-gray-900 dark:text-cream-warm leading-tight">
                    {title}
                  </h3>

                  {/* Horizontal metrics highlights */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    {metricsList.map((met, mIdx) => (
                      <span 
                        key={mIdx}
                        className="font-mono text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 bg-gold/10 text-gold border border-gold/25 rounded-sm"
                      >
                        {met}
                      </span>
                    ))}
                  </div>

                  <div className="h-[1px] bg-gold/15 my-6" />

                  {/* Challenge Column */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-rose-gold font-mono text-[10px] tracking-widest uppercase font-semibold">
                      <Target size={12} />
                      <span>The Challenge</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                      {challenge}
                    </p>
                  </div>

                  {/* Solution Column */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gold font-mono text-[10px] tracking-widest uppercase font-semibold">
                      <Lightbulb size={12} />
                      <span>The Solution</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                      {solution}
                    </p>
                  </div>

                  {/* Outcome Column */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-mono text-[10px] tracking-widest uppercase font-semibold">
                      <CheckCircle2 size={12} />
                      <span>The Outcome</span>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                      {outcome}
                    </p>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
