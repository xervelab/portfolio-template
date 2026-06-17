/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { SkillData } from '../types';
import { SectionSkeleton } from '../components/Skeleton';
import { Icon } from '../components/Icon';

export function Skills() {
  const { data: skills, loading } = useGoogleSheet<SkillData[]>('SKILLS');

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-white dark:bg-slate-900">
        <SectionSkeleton />
      </section>
    );
  }

  // Dynamic Grouping of Skills by Category
  const groupedSkills: Record<string, SkillData[]> = {};
  if (skills && Array.isArray(skills)) {
    skills.forEach((skill) => {
      const category = skill.category || 'General Administration';
      if (!groupedSkills[category]) {
        groupedSkills[category] = [];
      }
      groupedSkills[category].push(skill);
    });
  }

  // Visual decorative symbols or icons for standard categories
  const categoryHeaderIcons: Record<string, string> = {
    'administrative': 'briefcase',
    'communication': 'mail',
    'marketing': 'share-2',
    'crm tools': 'cpu',
    'project management': 'list-todo',
    'technical skills': 'database',
  };

  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 font-mono">
            Core Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 font-sans">
            Technical Stack & Specialized Expertise
          </h2>
          <p className="text-md text-slate-500 dark:text-slate-400">
            A comprehensive matrix of administrative workflows, business CRMs, and project coordination frameworks mapped by proficiency level and seniority.
          </p>
        </div>

        {/* Grouped Skills Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([catName, list], grpIdx) => {
            const normalizedCatKey = catName.toLowerCase().trim();
            const headerIcon = categoryHeaderIcons[normalizedCatKey] || 'sparkles';
            
            return (
              <motion.div
                key={catName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: grpIdx * 0.05 }}
                className="p-6 rounded-3xl border border-slate-150/60 dark:border-slate-800 bg-linear-to-b from-slate-50/50 to-white dark:from-slate-800/20 dark:to-slate-800/5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center space-x-3 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="p-2 rounded-xl bg-blue-50/60 dark:bg-sky-500/10 text-blue-600 dark:text-sky-400">
                      <Icon name={headerIcon} size={18} />
                    </div>
                    <h3 className="text-md font-bold text-slate-900 dark:text-slate-50 font-sans tracking-wide uppercase">
                      {catName}
                    </h3>
                  </div>

                  {/* Skills List inside Category */}
                  <div className="space-y-6">
                    {list.map((skill, sIdx) => {
                      return (
                        <div key={sIdx} className="space-y-2 text-left">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-slate-850 dark:text-slate-200">
                              {skill.name}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-450">
                              {skill.yearsOfExperience}
                            </span>
                          </div>

                          {/* Animated Progress Bar */}
                          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeOut', delay: sIdx * 0.05 }}
                              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-sky-400 dark:to-cyan-400 absolute left-0 top-0"
                            />
                          </div>

                          {/* Score Label */}
                          <div className="flex justify-end">
                            <span className="text-[10px] font-bold font-mono tracking-wider text-blue-600 dark:text-sky-450 uppercase">
                              PROFICIENCY: {skill.progress}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
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
