/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { ServiceData } from '../types';
import { SectionSkeleton } from '../components/Skeleton';
import { Icon } from '../components/Icon';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
};

export function Services() {
  const { data: services, loading } = useGoogleSheet<ServiceData[]>('SERVICES');

  const handleConsultationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      window.scrollTo({
        top: contactSec.offsetTop - 85,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <section id="services" className="py-20 bg-slate-50 dark:bg-slate-900/10">
        <SectionSkeleton />
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-slate-50 dark:bg-slate-900/10 border-t border-slate-100 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 font-mono">
            Direct Assistance Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 font-sans">
            Streamlining Workflows, Empowering Business
          </h2>
          <p className="text-md text-slate-500 dark:text-slate-400">
            Tailored, modular administrative support structures designed to fit busy founders, remote freelancers, and scaling executive teams.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {services?.map((service) => {
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-800/50 hover:bg-slate-50/20 dark:hover:bg-slate-800/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left h-full relative overflow-hidden group"
              >
                {/* Visual accent backdrop line in hover */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-linear-to-r from-blue-600 to-indigo-500 dark:from-sky-400 dark:to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Service Icon Container */}
                  <div className="p-3 w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50/50 dark:bg-sky-500/10 text-blue-600 dark:text-sky-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-sky-400 dark:group-hover:text-slate-950 transition-colors">
                    <Icon name={service.icon || 'briefcase'} size={22} />
                  </div>

                  {/* Text Details */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-sans leading-snug group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Pricing / Starting price */}
                {service.startingPrice && (
                  <div className="pt-4 mt-4 border-t border-slate-100/60 dark:border-slate-800/60 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                      INVESTMENT
                    </span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Starts {service.startingPrice}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Custom Service Callout footer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 rounded-3xl border border-blue-50 dark:border-sky-500/10 bg-blue-50/30 dark:bg-sky-500/5 max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:justify-between gap-6"
        >
          <div className="text-left space-y-1">
            <h4 className="text-md font-bold text-slate-900 dark:text-slate-50">
              Need a completely bespoke, custom-contracted assembly?
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
              I collaborate directly with teams to create hybrid retainer contracts combining operations management, calendar audits, and specialized support lines.
            </p>
          </div>
          <a
            href="#contact"
            onClick={handleConsultationClick}
            className="shrink-0 px-5 py-3 text-xs font-bold rounded-xl bg-blue-600 dark:bg-sky-400 text-white dark:text-slate-900 hover:bg-blue-700 dark:hover:bg-sky-300 transition-colors cursor-pointer"
          >
            Request Custom Quote
          </a>
        </motion.div>

      </div>
    </section>
  );
}
