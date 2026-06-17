/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { ClientData } from '../types';
import { SectionSkeleton } from '../components/Skeleton';
import { Icon } from '../components/Icon';

export function Clients() {
  const { data: clients, loading } = useGoogleSheet<ClientData[]>('CLIENTS');

  if (loading) {
    return (
      <section id="clients" className="py-20 bg-slate-50 dark:bg-slate-900/10">
        <SectionSkeleton />
      </section>
    );
  }

  // Monogram color styles for clients who don't have visual logos
  const monogramStyleClasses = [
    'from-blue-500 to-indigo-500 text-white',
    'from-purple-500 to-pink-500 text-white',
    'from-emerald-500 to-teal-500 text-white',
    'from-amber-500 to-orange-500 text-white',
  ];

  return (
    <section id="clients" className="py-24 bg-slate-50 dark:bg-slate-900/10 border-t border-slate-100 dark:border-slate-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 font-mono">
            Active Partnerships
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 font-sans">
            Client Collaborations & Operational Outcomes
          </h2>
          <p className="text-md text-slate-500 dark:text-slate-400">
            A window into active retainers. See who is currently supported, their market niches, and how virtual support boosts their day-to-day work.
          </p>
        </div>

        {/* Current Clients Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients?.map((client, index) => {
            const isLogoUrl = client.logo && (client.logo.startsWith('http://') || client.logo.startsWith('https://'));
            const randomColorClass = monogramStyleClasses[index % monogramStyleClasses.length];

            return (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:bg-slate-50/10 dark:hover:bg-slate-800/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left h-full relative"
              >
                <div className="space-y-6">
                  {/* Client Identification Box */}
                  <div className="flex items-center space-x-4.5">
                    {isLogoUrl ? (
                      <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-xs border border-slate-100 dark:border-slate-800 flex-shrink-0 bg-slate-50">
                        <img
                          src={client.logo}
                          alt={client.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg select-none shadow-xs bg-gradient-to-tr ${randomColorClass} flex-shrink-0`}>
                        {client.logo ? client.logo.substring(0, 2).toUpperCase() : client.name.charAt(0)}
                      </div>
                    )}
                    <div className="space-y-0.5 truncate">
                      <h3 className="text-md font-bold text-slate-900 dark:text-slate-50 font-sans tracking-tight truncate">
                        {client.name}
                      </h3>
                      <p className="text-xs text-blue-600 dark:text-sky-450 font-mono uppercase tracking-wider truncate">
                        {client.industry}
                      </p>
                    </div>
                  </div>

                  {/* Services Provided Description */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/30 flex items-start space-x-3 text-left">
                    <div className="p-1 rounded bg-blue-100/50 dark:bg-sky-400/10 text-blue-600 dark:text-sky-400 mt-0.5 flex-shrink-0">
                      <Icon name="check-circle" size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest leading-none mb-1">
                        SERVICES PROVIDED
                      </p>
                      <p className="text-xs text-slate-650 dark:text-slate-300 font-medium">
                        {client.servicesProvided}
                      </p>
                    </div>
                  </div>

                  {/* Feedback Testimonial */}
                  <div className="relative pt-2 text-left">
                    <Icon name="message-square" className="text-slate-200 dark:text-slate-800 absolute -top-1 -left-2 -z-10" size={32} />
                    <p className="text-sm italic leading-relaxed text-slate-600 dark:text-slate-400 relative z-10 pl-2">
                      "{client.testimonial}"
                    </p>
                  </div>
                </div>

                {/* Rating badge */}
                <div className="flex items-center space-x-0.5 pt-4 mt-6 border-t border-slate-100/60 dark:border-slate-850/50">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="star" className="text-amber-400 fill-amber-400" size={14} />
                  ))}
                  <span className="text-[10px] font-mono font-bold text-slate-450 pl-2 uppercase">
                    verified retainer partner
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
