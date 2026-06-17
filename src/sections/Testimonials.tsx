/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { TestimonialData } from '../types';
import { Skeleton } from '../components/Skeleton';
import { Icon } from '../components/Icon';

export function Testimonials() {
  const { data: testimonials, loading } = useGoogleSheet<TestimonialData[]>('TESTIMONIALS');
  const [activeIndex, setActiveIndex] = useState(0);

  const lists = testimonials || [];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % lists.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + lists.length) % lists.length);
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-20 bg-slate-50 dark:bg-slate-900/10">
        <div className="max-w-4xl mx-auto px-4">
          <Skeleton className="h-4 p-2 w-32 rounded mx-auto mb-4" />
          <Skeleton className="h-8 w-1/2 rounded mx-auto mb-8" />
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 space-y-4">
            <Skeleton className="h-6 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <div className="flex items-center space-x-4 pt-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const current = lists[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-900/10 border-t border-slate-100 dark:border-slate-800/40 relative overflow-hidden">
      {/* Decorative quotes graphic backgrounds */}
      <div className="absolute top-1/2 left-4 md:left-24 -translate-y-1/2 -z-10 text-slate-100/30 dark:text-slate-800/10 select-none text-[150px] md:text-[240px] font-black leading-none pointer-events-none font-serif">
        “
      </div>
      <div className="absolute top-1/2 right-4 md:right-24 -translate-y-1/2 -z-10 text-slate-100/30 dark:text-slate-800/10 select-none text-[150px] md:text-[240px] font-black leading-none pointer-events-none font-serif">
        ”
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 font-mono">
            Client Words
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 font-sans">
            Reviews That Inspire Administrative Excellence
          </h2>
        </div>

        {/* Testimonials Slider Area */}
        {current && (
          <div className="relative max-w-4xl mx-auto flex flex-col justify-center">
            
            {/* Active Card Body */}
            <div className="min-h-[220px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id || activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 p-8 sm:p-12 shadow-sm relative text-center md:text-left flex flex-col md:flex-row gap-8 items-center"
                >
                  {/* Photo representation */}
                  {current.imageUrl ? (
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-blue-500/10 dark:border-sky-400/20 bg-slate-100 flex-shrink-0 shadow-sm">
                      <img
                        src={current.imageUrl}
                        alt={current.clientName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex-shrink-0 flex items-center justify-center font-bold text-2xl shadow-sm">
                      {current.clientName.charAt(0)}
                    </div>
                  )}

                  {/* Feedback summary */}
                  <div className="flex-1 space-y-4">
                    {/* Stars bar */}
                    <div className="flex justify-center md:justify-start items-center space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="star" className="text-amber-400 fill-amber-400" size={16} />
                      ))}
                    </div>

                    <p className="text-base sm:text-lg leading-relaxed font-sans text-slate-700 dark:text-slate-350 italic">
                      "{current.feedback}"
                    </p>

                    <div>
                      <h4 className="font-bold text-md text-slate-900 dark:text-slate-50">
                        {current.clientName}
                      </h4>
                      <p className="text-xs text-slate-450 dark:text-slate-400 font-medium">
                        {current.position}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls (Chevron Buttons overlay or underneath) */}
            <div className="flex justify-center items-center gap-6 mt-10">
              <button
                onClick={handlePrev}
                type="button"
                className="p-3.5 rounded-full border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-800 text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center cursor-pointer focus:outline-none"
                aria-label="Previous Testimonial"
              >
                <Icon name="chevron-left" size={18} />
              </button>

              {/* Dot Trackers */}
              <div className="flex items-center space-x-2">
                {lists.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    type="button"
                    className={`h-2.5 rounded-full transition-all duration-300 outline-none cursor-pointer ${
                      idx === activeIndex
                        ? 'w-6 bg-blue-600 dark:bg-sky-400'
                        : 'w-2.5 bg-slate-250 dark:bg-slate-800 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to Testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                type="button"
                className="p-3.5 rounded-full border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-800 text-slate-650 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center cursor-pointer focus:outline-none"
                aria-label="Next Testimonial"
              >
                <Icon name="chevron-right" size={18} />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
