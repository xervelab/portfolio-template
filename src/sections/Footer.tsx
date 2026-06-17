/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { ContactData } from '../types';
import { Icon } from '../components/Icon';

const FOOT_LINKS = [
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

export function Footer() {
  const { data: contactInfo } = useGoogleSheet<ContactData>('CONTACT');

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 85,
        behavior: 'smooth',
      });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-100 dark:border-slate-900">
          
          {/* Brand/Logo Column */}
          <div className="space-y-3 max-w-sm">
            <a
              href="#hero"
              onClick={(e) => handleAnchorClick(e, '#hero')}
              className="flex items-center space-x-2 group focus:outline-none"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 dark:bg-sky-400 text-white dark:text-slate-950 font-bold text-md">
                V
              </div>
              <span className="text-md font-bold tracking-tight text-slate-900 dark:text-slate-50 font-sans">
                VA Portfolio
              </span>
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Premium administrative consulting, inbox architecture, active calendars balancing, and custom system automations for high-growth leaders.
            </p>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center space-x-3.5">
            {contactInfo?.linkedIn && (
              <a
                href={contactInfo.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-blue-600 dark:hover:text-sky-400 transition-all cursor-pointer"
                aria-label="LinkedIn Profile"
              >
                <Icon name="linkedin" size={17} />
              </a>
            )}

            {contactInfo?.facebook && (
              <a
                href={contactInfo.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-blue-600 dark:hover:text-sky-400 transition-all cursor-pointer"
                aria-label="Facebook Profile"
              >
                <Icon name="facebook" size={17} />
              </a>
            )}

            {contactInfo?.phone && (
              <a
                href={`tel:${contactInfo.phone}`}
                className="p-3 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-blue-600 dark:hover:text-sky-400 transition-all cursor-pointer"
                aria-label="Phone Callback"
              >
                <Icon name="phone" size={17} />
              </a>
            )}
          </div>
        </div>

        {/* Navigation list and Copyright */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <nav className="flex flex-wrap gap-x-4.5 gap-y-2">
            {FOOT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-xs font-semibold font-sans text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="space-y-0.5">
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase font-mono tracking-wider">
              Copyright © {currentYear} Sarah Jenkins VA. All Rights Reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
