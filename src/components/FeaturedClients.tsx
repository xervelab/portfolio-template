import React from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { motion } from 'motion/react';
import { Heart, Command, Milestone, Smile, ShieldAlert } from 'lucide-react';

export const FeaturedClients: React.FC = () => {
  const { data, loading } = useGoogleSheet('CLIENTS');

  if (loading) {
    return (
      <section className="py-16 bg-cream-warm dark:bg-carbon border-b border-gold/5">
        <div className="max-w-7xl mx-auto px-6 h-32 flex items-center justify-center">
          <div className="h-4 w-4 border border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  // Fallbacks if data is dry
  const clients = data && data.length > 0 ? data : [];

  return (
    <section className="py-24 bg-cream-warm dark:bg-carbon/40 border-b border-gold/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Metric Statistics Counters */}
          <div className="lg:col-span-5 space-y-6">
            <p className="font-mono text-[9px] tracking-widest text-[#9C7956] dark:text-[#E6C29E] uppercase font-semibold">✦ High-Touch Retention</p>
            <h3 className="font-serif text-3xl font-light text-gray-900 dark:text-cream-warm leading-tight">
              A Trusted Partner <br />
              <span className="italic">to Creative Founders Globally</span>
            </h3>
            <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              Managing routine tasks results in exponential scale. My client partnerships endure because I solve bottlenecks before they distract.
            </p>

            {/* Static high-end counters block */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gold/10">
              <div className="space-y-1">
                <p className="font-serif text-3xl text-gold italic">150+</p>
                <p className="font-sans text-[10px] uppercase font-medium tracking-widest text-gray-400">Projects Managed</p>
              </div>
              <div className="space-y-1">
                <p className="font-serif text-3xl text-gold italic">99.8%</p>
                <p className="font-sans text-[10px] uppercase font-medium tracking-widest text-gray-400">Response Accuracy</p>
              </div>
              <div className="space-y-1">
                <p className="font-serif text-3xl text-gold italic">400+</p>
                <p className="font-sans text-[10px] uppercase font-medium tracking-widest text-gray-400">Inboxes Flattened</p>
              </div>
              <div className="space-y-1">
                <p className="font-serif text-3xl text-gold italic">100%</p>
                <p className="font-sans text-[10px] uppercase font-medium tracking-widest text-gray-400">Client Discretion</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Logo Cards Layout */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clients.map((client, idx) => {
                const logo = client.clientLogo || "Bespoke Agency";
                const industry = client.industry || "Lifestyle Services";
                const duration = client.partnershipDuration || "Retainer Client";
                const val = client.metricValue || "Active Setup";
                const lbl = client.metricLabel || "Logistics Managed";

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: 'rgba(212, 163, 115, 0.4)'
                    }}
                    className="p-6 bg-cream-light dark:bg-obsidian border border-gold/15 rounded-[24px] flex flex-col justify-between space-y-4 shadow-sm group"
                  >
                    <div className="flex items-center justify-between">
                      {/* Generically beautiful typography logo layout */}
                      <span className="font-display text-sm tracking-[0.15em] font-bold text-gray-800 dark:text-cream-warm uppercase flex items-center gap-1.5">
                        <span className="text-gold group-hover:scale-125 transition-transform">◇</span>
                        {logo}
                      </span>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-gold/10 text-gold uppercase font-bold">
                        {duration}
                      </span>
                    </div>

                    <p className="font-sans text-[11px] text-gray-400 dark:text-gray-500 italic">
                      {industry}
                    </p>

                    <div className="pt-3 border-t border-gold/5 flex items-center justify-between text-gray-500">
                      <span className="font-sans text-[10px] uppercase tracking-wider">{lbl}</span>
                      <span className="font-serif text-base text-gold italic font-semibold">{val}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
