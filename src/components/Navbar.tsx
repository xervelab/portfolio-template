import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon, Menu, X, HelpCircle, Activity } from 'lucide-react';

interface NavbarProps {
  onOpenDiagnostics: () => void;
  brandName?: string;
  hasDiagnostics?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenDiagnostics, 
  brandName = "CECILIA VANCE",
  hasDiagnostics = true 
}) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Background sticky trigger
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Progress bar percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Story", href: "#story" },
    { label: "Services", href: "#services" },
    { label: "Skills", href: "#skills" },
    { label: "Love", href: "#testimonials" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Insights", href: "#blog" },
    { label: "Timeline", href: "#timeline" },
    { label: "Contact", href: "#contact" }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-cream-light/80 dark:bg-obsidian/85 backdrop-blur-md border-b border-gold/10' 
        : 'py-6 bg-transparent'
    }`}>
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home')}
          className="font-display font-bold text-lg tracking-[0.2em] text-gray-900 dark:text-cream-warm flex items-center gap-1 group"
        >
          <span className="text-gold transition-transform group-hover:rotate-12 duration-300">◇</span>
          {brandName.toUpperCase()}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans text-xs tracking-widest font-medium text-gray-500 hover:text-gold dark:text-gray-400 dark:hover:text-gold transition-colors duration-200 uppercase relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-rose-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-gold/20" />

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            {/* Dark mode slider switch */}
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-full border border-gold/10 hover:border-gold/30 bg-cream-warm dark:bg-carbon text-gold hover:text-rose-gold transition-all duration-200 shadow-sm"
              aria-label="Toggle visual mode"
              id="theme-toggle-btn"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* Diagnostic trigger */}
            {hasDiagnostics && (
              <button
                onClick={onOpenDiagnostics}
                className="p-2 rounded-full border border-rose-gold/20 bg-cream-warm dark:bg-carbon text-rose-gold hover:text-gold hover:border-gold/30 transition-all duration-200"
                title="Spreadsheet Diagnostic Panel"
                id="diagnostics-toggle-btn"
              >
                <Activity size={14} />
              </button>
            )}

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="hidden xl:inline-block px-5 py-2 text-xs font-medium tracking-widest uppercase bg-gold text-cream-warm hover:bg-rose-gold transition-colors duration-300 rounded-sm shadow-sm"
            >
              Inquire
            </a>
          </div>
        </nav>

        {/* Mobile Actions Container */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Theme toggle mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 mr-1 rounded-full border border-gold/10 bg-cream-warm dark:bg-carbon text-gold"
            id="mobile-theme-toggle-btn"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Diagnostic status mobile */}
          {hasDiagnostics && (
            <button
              onClick={onOpenDiagnostics}
              className="p-2 rounded-full border border-rose-gold/20 bg-cream-warm dark:bg-carbon text-rose-gold"
              id="mobile-diagnostics-btn"
            >
              <Activity size={12} />
            </button>
          )}

          {/* Mobile Menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-sm text-gray-700 dark:text-cream-warm border border-gold/10"
            aria-label="Toggle menu"
            id="mobile-hamburger-btn"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-cream-warm dark:bg-carbon border-b border-gold/10 px-6 py-8 flex flex-col gap-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans text-sm tracking-widest font-semibold text-gray-700 hover:text-gold dark:text-gray-300 dark:hover:text-gold uppercase py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="h-[1px] bg-gold/10" />

          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="w-full text-center py-3 text-xs font-semibold tracking-widest uppercase bg-gold text-cream-warm hover:bg-rose-gold transition-colors duration-200"
          >
            Let's Collaborate
          </a>
        </div>
      )}
    </header>
  );
};
