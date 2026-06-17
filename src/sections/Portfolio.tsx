/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { ProjectData } from '../types';
import { PortfolioSkeleton } from '../components/Skeleton';
import { Icon } from '../components/Icon';

export function Portfolio() {
  const { data: projects, loading } = useGoogleSheet<ProjectData[]>('PORTFOLIO');

  if (loading) {
    return (
      <section id="portfolio" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PortfolioSkeleton />
            <PortfolioSkeleton />
            <PortfolioSkeleton />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 font-mono">
            Operation Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 font-sans">
            Streamlining in Action: Completed Implementations
          </h2>
          <p className="text-md text-slate-500 dark:text-slate-400">
            A selective showcase of client integrations, workflow automations, and space rebuilds that successfully recovered executive bandwidth.
          </p>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:bg-slate-50/10 dark:hover:bg-slate-800/80 shadow-xs hover:shadow-md overflow-hidden flex flex-col hover:-translate-y-1 transition-all group font-sans text-left"
              >
                {/* Project Image block with hover zoom */}
                <div className="h-48 md:h-56 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  
                  {/* Technology Overlay category */}
                  <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider bg-slate-950/70 text-slate-100 backdrop-blur-xs uppercase uppercase">
                      CASE STUDY #{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {project.description}
                    </p>
                  </div>

                  {/* Tools used block tags */}
                  {project.toolsUsed && project.toolsUsed.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <p className="text-[10px] font-bold font-mono text-slate-450 uppercase tracking-widest leading-none">
                        TOOLS EMPLOYED
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.toolsUsed.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 text-[11px] font-medium font-mono rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Results achieved */}
                  <div className="pt-4  border-t border-slate-100 dark:border-slate-800/80 flex flex-col space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                      <Icon name="award" size={12} />
                      <span>METRIC ACHIEVED</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-205 leading-relaxed">
                      {project.resultsAchieved}
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
}
