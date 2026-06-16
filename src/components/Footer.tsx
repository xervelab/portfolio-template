import React from "react";
import { ArrowUp, Instagram, Grid, Layout, Award, Compass, Sparkles, Heart } from "lucide-react";
import { SOCIAL_LINKS } from "../data";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF9F6] dark:bg-[#0F0F0F] text-stone-600 dark:text-stone-400 py-16 md:py-24 border-t border-stone-900/10 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start mb-16">
          
          {/* Brand/Inquiries */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-1">
              <span className="font-serif text-lg tracking-[0.2em] font-medium text-stone-950 dark:text-stone-50 uppercase">
                ELENA ROSTOVA
              </span>
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-stone-400 dark:text-stone-500 font-light">
                FINE ART STUDIO
              </p>
            </div>
            
            <p className="font-sans text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-light max-w-sm">
              Exploring tactile geometries, micro-atmospheric watercolor wash patterns, and expressions of consciousness. Available for worldwide acquisitions, custom fine-art commissions, and gallery projects.
            </p>
          </div>

          {/* Social connections */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="font-sans text-[10px] tracking-[0.15em] text-stone-950 dark:text-stone-200 uppercase font-semibold">
              Digital Portals
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              {SOCIAL_LINKS.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs font-light text-stone-500 dark:text-stone-400 hover:text-brand-accent dark:hover:text-brand-accent transition-colors flex items-center gap-2 group cursor-pointer"
                >
                  <Instagram className="w-3.5 h-3.5 text-stone-400 group-hover:text-brand-accent transition-colors" />
                  <div>
                    <span className="block font-medium text-stone-700 dark:text-stone-300 group-hover:text-brand-accent transition-colors">
                      {link.name}
                    </span>
                    <span className="block text-[9px] text-stone-400 dark:text-stone-500">
                      {link.handle}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation/Scroll to Top */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between self-stretch gap-6">
            <button
              onClick={scrollToTop}
              className="px-4 py-3 border border-stone-900/10 dark:border-white/10 rounded-none text-stone-800 dark:text-stone-200 hover:border-brand-accent/40 hover:text-brand-accent hover:dark:text-brand-accent transition-all text-xs tracking-wider uppercase font-sans flex items-center gap-2 group self-start md:self-auto hover:-translate-y-1 cursor-pointer"
            >
              Scroll To Top
              <ArrowUp className="w-3.5 h-3.5 group-hover:animate-bounce" />
            </button>

            <div className="font-mono text-[10px] text-stone-400 dark:text-stone-500 md:text-right space-y-1">
              <div>New York, Chelsea • Brooklyn, DUMBO</div>
              <div>Available for Global representation</div>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-[1px] bg-stone-900/10 dark:bg-white/10 mb-10"></div>

        {/* Copyright notice and metadata credentials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[10px] text-stone-400 dark:text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Elena Rostova Art. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 font-light">
            Made with <Heart className="w-2.5 h-2.5 text-brand-accent fill-brand-accent" /> in modern workspace
          </div>
        </div>
      </div>
    </footer>
  );
}
