/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Icon } from './Icon';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function ThemeToggle({ isDarkMode, toggleDarkMode }: ThemeToggleProps) {
  return (
    <button
      id="theme-toggle"
      onClick={toggleDarkMode}
      type="button"
      className="relative p-2.5 rounded-full border bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-sky-400 cursor-pointer"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex items-center justify-center"
      >
        {isDarkMode ? (
          // Sun Icon
          <Icon name="sun" className="text-amber-500" size={18} />
        ) : (
          // Moon Icon
          <Icon name="moon" className="text-blue-600" size={18} />
        )}
      </motion.div>
    </button>
  );
}
