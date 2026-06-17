/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { ResumeItem, HeroData } from '../types';
import { SectionSkeleton } from '../components/Skeleton';
import { Icon } from '../components/Icon';

export function Resume() {
  const { data: resumeItems, loading } = useGoogleSheet<ResumeItem[]>('RESUME');
  const { data: heroData } = useGoogleSheet<HeroData>('HERO');

  const items = resumeItems || [];
  
  // Categorization
  const experiences = items.filter((item) => item.type === 'experience');
  const educations = items.filter((item) => item.type === 'education');
  const certifications = items.filter((item) => item.type === 'certification');

  if (loading) {
    return (
      <section id="resume" className="py-20 bg-slate-50 dark:bg-slate-900/10">
        <SectionSkeleton />
      </section>
    );
  }

  return (
    <section id="resume" className="py-24 bg-slate-50 dark:bg-slate-900/10 border-t border-slate-100 dark:border-slate-800/40 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 font-mono">
            Professional History
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 font-sans">
            Career Chronicle & Educational Milestones
          </h2>
          <p className="text-md text-slate-500 dark:text-slate-400">
            A comprehensive blueprint of my corporate achievements, specialized academic disciplines, and certified credentials.
          </p>
        </div>

        {/* Dual-Column chronological layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Work Experience Chronology (Grid Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-200 dark:border-slate-800 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-sky-500/10 text-blue-600 dark:text-sky-400">
                <Icon name="briefcase" size={18} />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-wide uppercase">
                Work Experience
              </h3>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="relative space-y-2"
                >
                  {/* Calendar dot node indicator */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-[3px] border-white dark:border-slate-900 bg-blue-600 dark:bg-sky-400 shadow-sm" />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div>
                      <h4 className="text-md font-bold text-slate-900 dark:text-slate-50 leading-tight">
                        {exp.title}
                      </h4>
                      <p className="text-xs text-blue-600 dark:text-sky-450 font-semibold uppercase font-mono tracking-wider">
                        {exp.organization}
                      </p>
                    </div>
                    <span className="shrink-0 inline-block px-3 py-1 text-[11px] font-bold font-mono tracking-wide rounded-full border border-slate-150 bg-white dark:bg-slate-850 dark:border-slate-800 text-slate-500 dark:text-slate-350 self-start">
                      {exp.dateRange}
                    </span>
                  </div>

                  {exp.description && (
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed pr-2">
                      {exp.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Certifications (Grid Span 5) */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Academic Panel */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="p-2.5 rounded-xl bg-purple-50/60 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  <Icon name="graduation-cap" size={18} />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-wide uppercase">
                  Education
                </h3>
              </div>

              <div className="space-y-6 pl-2">
                {educations.map((edu, idx) => (
                  <motion.div
                    key={edu.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="space-y-2 border-l border-slate-100 dark:border-slate-800/80 pl-4"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50">
                          {edu.title}
                        </h4>
                        <span className="text-[10px] font-bold font-mono text-slate-400 sm:self-start shrink-0">
                          {edu.dateRange}
                        </span>
                      </div>
                      <p className="text-xs text-purple-650 dark:text-purple-400 font-semibold uppercase font-mono tracking-wider mb-1.5">
                        {edu.organization}
                      </p>
                      {edu.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications Panel */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Icon name="award" size={18} />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-wide uppercase">
                  Certifications
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 pl-2">
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="p-4 rounded-2xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-800/30 flex items-start space-x-3"
                  >
                    <div className="p-2 rounded-xl bg-amber-100/40 dark:bg-amber-500/10 text-amber-500 mt-0.5 flex-shrink-0">
                      <Icon name="check" size={14} />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-50">
                        {cert.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-450 dark:text-slate-400">
                        <span className="font-medium font-mono">{cert.organization}</span>
                        <span>•</span>
                        <span className="font-mono">{cert.dateRange}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Central download bottom bar */}
        {heroData?.resumeUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <a
              href={heroData.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold rounded-2xl bg-blue-600 dark:bg-sky-400 hover:bg-blue-700 dark:hover:bg-sky-300 text-white dark:text-slate-900 shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer"
            >
              <span>Download Master Resume Guide</span>
              <Icon name="download" className="ml-2" size={16} />
            </a>
          </motion.div>
        )}

      </div>
    </section>
  );
}
