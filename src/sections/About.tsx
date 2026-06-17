/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { AboutData } from '../types';
import { Skeleton } from '../components/Skeleton';
import { Icon } from '../components/Icon';

export function About() {
  const { data, loading } = useGoogleSheet<AboutData>('ABOUT');

  if (loading) {
    return (
      <section id="about" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Skeleton className="h-6 w-32 rounded" />
              <Skeleton className="h-12 w-5/6 rounded-xl" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-4/5 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[...Array(4)].map((_, idx) => (
                <Skeleton key={idx} className="h-32 rounded-2xl w-full" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const statItems = [
    {
      label: 'Years of Experience',
      value: `${data?.yearsOfExperience || 7}+`,
      sub: 'In Elite Admin Support',
      icon: 'briefcase',
      color: 'text-blue-500 dark:text-sky-400 bg-blue-50 dark:bg-sky-500/10',
    },
    {
      label: 'Projects Completed',
      value: data?.projectsCompleted || 142,
      sub: 'Inbox reboots & custom hubs',
      icon: 'list-todo',
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10',
    },
    {
      label: 'Happy Clients',
      value: `${data?.happyClients || 54}+`,
      sub: 'Active & continuous contracts',
      icon: 'star',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10',
    },
    {
      label: 'Response Rate',
      value: data?.responseRate || '100% / 1hr',
      sub: 'Strict correspondence window',
      icon: 'clock',
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10',
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Summary and Industry list (Grid Span 7) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-3 text-left">
              <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 font-mono">
                My Professional DNA
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-sans">
                The Engine behind Your Administrative Calm
              </h2>
            </div>

            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 text-left">
              {data?.summary}
            </p>

            {/* Industries Served */}
            <div className="space-y-4 text-left">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Primary Industries Partnered & Served
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {data?.industriesServed?.map((industry, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 text-sm font-medium rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-blue-200 dark:hover:border-sky-500/30 hover:scale-101 hover:text-blue-600 dark:hover:text-sky-400 transition-all cursor-default"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bento Statistics Grid (Grid Span 5) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
          >
            {statItems.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-xs flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-800/70 transition-all text-left"
              >
                {/* Icon Circle */}
                <div className={`p-3 rounded-2xl w-12 h-12 flex items-center justify-center ${stat.color}`}>
                  <Icon name={stat.icon} size={22} />
                </div>

                {/* Text Values */}
                <div className="space-y-1">
                  <p className="text-3xl font-black text-slate-900 dark:text-slate-50 font-sans tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {stat.label}
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    {stat.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
