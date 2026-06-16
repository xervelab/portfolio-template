import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  activeSection: string;
}

export default function Navbar({ isDark, setIsDark, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "Exhibitions", href: "#exhibitions" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF9F6]/95 dark:bg-[#0F0F0F]/95 backdrop-blur-md border-b border-stone-900/10 dark:border-white/10 py-3.5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="group flex flex-col items-start"
        >
          <span className="font-serif text-xl md:text-2xl font-light tracking-[0.25em] text-stone-950 dark:text-stone-50 transition-colors uppercase">
            ELENA ROSTOVA
          </span>
          <span className="font-sans text-[8px] md:text-[9px] tracking-[0.45em] text-stone-400 dark:text-stone-500 uppercase font-light mt-0.5">
            FINE ARTIST
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative font-sans text-[11px] tracking-[0.2em] uppercase font-light transition-all duration-350 ${
                  isActive
                    ? "text-brand-accent font-medium"
                    : "text-stone-500 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-50"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeSubline"
                    className="absolute -bottom-2.5 left-0 w-full h-[1px] bg-brand-accent"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-stone-900/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-stone-300 hover:text-brand-accent transition-colors" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-stone-600 hover:text-brand-accent transition-colors" />
            )}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-stone-900/5 dark:hover:bg-white/5 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-stone-300" />
            ) : (
              <Moon className="w-4 h-4 text-stone-600" />
            )}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-stone-900/5 dark:hover:bg-white/5 rounded px-2 transition-colors text-stone-850 dark:text-stone-200"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed top-[68px] left-0 w-full bg-[#FAF9F6] dark:bg-[#0F0F0F] border-t border-stone-900/10 dark:border-white/10 z-40 overflow-hidden flex flex-col justify-start pt-12 px-8"
          >
            <nav className="flex flex-col space-y-8 text-center">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="font-serif text-2xl tracking-widest font-light text-stone-850 dark:text-stone-100 hover:text-brand-accent transition-colors py-2 uppercase"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            
            <div className="mt-16 flex flex-col items-center">
              <div className="w-12 h-[1px] bg-stone-900/10 dark:bg-white/15 mb-6"></div>
              <span className="font-serif text-[10px] tracking-[0.3em] text-stone-400 dark:text-stone-500 text-center uppercase">
                New York • Fine Art Gallery
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
