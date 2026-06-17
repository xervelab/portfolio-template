/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeToggle } from '../components/ThemeToggle';
import { Icon } from '../components/Icon';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  brandName: string;
}

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Clients', href: '#clients' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Blog', href: '#blog' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

export function Header({ isDarkMode, toggleDarkMode, brandName }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section highlights
      const scrollPosition = window.scrollY + 120;
      const sections = ['about', 'services', 'skills', 'clients', 'portfolio', 'testimonials', 'blog', 'resume', 'contact', 'hero'];
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 85,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#hero"
            onClick={(e) => handleAnchorClick(e, '#hero')}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 dark:bg-sky-400 text-white dark:text-slate-950 font-bold text-lg shadow-sm group-hover:scale-105 transition-transform duration-200">
              {brandName ? brandName.charAt(0) : 'S'}
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 hover:text-blue-600 dark:hover:text-sky-400 font-sans transition-colors">
              {brandName || 'Sarah Jenkins'}
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-blue-600 dark:text-sky-400 bg-blue-50/50 dark:bg-sky-500/10'
                      : 'text-slate-600 dark:text-slate-350 hover:text-slate-900 dark:hover:text-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Controls & Mini Trigger */}
          <div className="flex items-center space-x-3">
            <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-blue-600 dark:bg-sky-400 hover:bg-blue-700 dark:hover:bg-sky-300 text-white dark:text-slate-950 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            >
              Hire Me
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-350 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              <Icon name={mobileMenuOpen ? 'x' : 'menu'} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60 shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'text-blue-600 dark:text-sky-400 bg-blue-50/70 dark:bg-sky-500/10 pl-6'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-3 px-4">
                <a
                  href="#contact"
                  onClick={(e) => handleAnchorClick(e, '#contact')}
                  className="w-full text-center py-3.5 rounded-xl bg-blue-600 dark:bg-sky-400 hover:bg-blue-700 dark:hover:bg-sky-300 text-white dark:text-slate-950 font-bold text-sm shadow transition-colors cursor-pointer"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
