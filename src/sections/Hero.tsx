/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { HeroData } from '../types';
import { Skeleton } from '../components/Skeleton';
import { Icon } from '../components/Icon';

export function Hero() {
  const { data, loading } = useGoogleSheet<HeroData>('HERO');
  
  // Custom typing animation logic
  const [skillIndex, setSkillIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const skillsList = data?.skills || [];

  useEffect(() => {
    if (skillsList.length === 0) return;

    let timer: NodeJS.Timeout;
    const currentSkill = skillsList[skillIndex];
    const typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && currentText === currentSkill) {
      // Pause at full text
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setSkillIndex((prev) => (prev + 1) % skillsList.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : currentSkill.slice(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, skillIndex, skillsList]);

  const handleHireMeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-16 w-5/6 rounded-2xl" />
              <Skeleton className="h-6 w-2/3 rounded" />
              <Skeleton className="h-24 w-full rounded-2xl" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32 rounded-xl" />
                <Skeleton className="h-12 w-44 rounded-xl" />
              </div>
            </div>
            <div className="flex justify-center">
              <Skeleton className="h-[450px] w-full max-w-[400px] rounded-[32px]" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 flex items-center bg-transparent overflow-hidden"
    >
      {/* Dynamic background accents */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-blue-400/10 dark:bg-sky-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Contents */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-6 text-left"
          >
            {/* Status Indicator */}
            <div className="inline-flex items-center space-x-2 self-start px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-sky-500/10 text-blue-700 dark:text-sky-400 border border-blue-100/40 dark:border-sky-500/20 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold font-mono tracking-wider uppercase">
                Available for New Contracts
              </span>
            </div>

            {/* Name & Job Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 leading-none">
              Hi, I'm <span className="text-blue-600 dark:text-sky-400">{data?.name}</span>
              <span className="block mt-3 text-2xl sm:text-3xl lg:text-4xl font-medium text-slate-600 dark:text-slate-300">
                {data?.jobTitle}
              </span>
            </h1>

            {/* Animated Typing Skills */}
            <div className="h-8 flex items-center">
              <p className="text-md sm:text-lg text-slate-500 dark:text-slate-400 font-medium">
                Expert in:{' '}
                <span className="inline-block text-blue-600 dark:text-sky-400 font-mono font-bold border-r-2 border-blue-600 dark:border-sky-400 pr-1 animate-pulse">
                  {currentText || '\u00a0'}
                </span>
              </p>
            </div>

            {/* Introductory Text */}
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-350 max-w-xl">
              {data?.intro}
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={handleHireMeClick}
                type="button"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-400 dark:hover:bg-sky-300 text-white dark:text-slate-900 shadow-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer focus:outline-none"
              >
                Hire Me Today
                <Icon name="arrow-right" className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>

              <a
                href={data?.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-bold rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all"
              >
                Download Resume
                <Icon name="download" className="ml-2" size={18} />
              </a>
            </div>

            {/* Trust badge tags */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-3 gap-4 max-w-lg">
              <div className="space-y-1">
                <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 font-sans">99.8%</p>
                <p className="text-xs text-slate-500 dark:text-slate-450 font-medium uppercase font-mono tracking-wider">Client Retention</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 font-sans">1-Hr</p>
                <p className="text-xs text-slate-500 dark:text-slate-450 font-medium uppercase font-mono tracking-wider">Average response</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 font-sans">GMT-7/5</p>
                <p className="text-xs text-slate-500 dark:text-slate-450 font-medium uppercase font-mono tracking-wider">Global coverage</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Picture Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative flex justify-center lg:justify-end select-none"
          >
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5]">
              {/* Outer border/frame effect */}
              <div className="absolute inset-0 rounded-[40px] border border-blue-100 dark:border-slate-800 transform rotate-2 pointer-events-none" />
              <div className="absolute inset-0 rounded-[40px] border border-indigo-100 dark:border-slate-800/50 transform -rotate-2 pointer-events-none" />

              {/* Central image shell */}
              <div className="w-full h-full rounded-[36px] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl relative bg-slate-100 dark:bg-slate-800">
                <img
                  src={data?.imageUrl}
                  alt={data?.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-10 hover:grayscale-0 transition-all duration-500 hover:scale-103"
                />
                
                {/* Visual shade overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute top-24 -left-8 md:-left-12 bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl flex items-center space-x-3.5 shadow-lg border border-slate-100/50 dark:border-slate-700/60"
              >
                <div className="p-2 bg-gradient-to-tr from-green-500/10 to-green-500/20 rounded-xl text-green-500">
                  <Icon name="check-circle" size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Inbox System Status</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-150">Inbox Zero Active</p>
                </div>
              </motion.div>

              {/* Floating Badge Right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75, duration: 0.5 }}
                className="absolute bottom-12 -right-8 md:-right-10 bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl flex items-center space-x-3.5 shadow-lg border border-slate-100/50 dark:border-slate-700/60"
              >
                <div className="p-2 bg-gradient-to-tr from-blue-500/10 to-blue-500/20 rounded-xl text-blue-500 dark:text-sky-400">
                  <Icon name="calendar" size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Weekly Reclaimed</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-150">20+ Hours / Client</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
