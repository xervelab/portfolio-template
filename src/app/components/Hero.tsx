import { motion } from "motion/react";
import { type SiteData } from "../hooks/useSheetData";

interface HeroProps {
  onNavigate: (section: string) => void;
  site: SiteData;
}

export function Hero({ onNavigate, site }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 70% 50%, #1f1208 0%, #0f0d0b 60%)",
      }}
    >
      {/* Background image — artist in studio */}
      <div className="absolute inset-0 z-0">
        <img
          src={site.heroImageUrl}
          alt="Artist at work in studio"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0d0b] via-[#0f0d0b]/70 to-transparent" />
      </div>

      {/* Decorative vertical rule */}
      <div className="absolute left-16 top-1/4 bottom-1/4 w-px bg-[#c9a96e]/30 hidden lg:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-['DM_Mono'] text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-8"
          >
            {site.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-['Playfair_Display'] text-[#f0ebe3] leading-[1.1] mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 400 }}
            dangerouslySetInnerHTML={{ __html: site.heroSubtitle }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="font-['DM_Sans'] text-[#9c8e7e] text-lg leading-relaxed mb-12 max-w-md"
            style={{ fontWeight: 300 }}
          >
            {site.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => onNavigate("work")}
              className="font-['DM_Sans'] text-sm tracking-widest uppercase px-8 py-4 bg-[#c9a96e] text-[#0f0d0b] hover:bg-[#e0c080] transition-colors duration-300"
              style={{ fontWeight: 500 }}
            >
              {site.heroCta1}
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="font-['DM_Sans'] text-sm tracking-widest uppercase px-8 py-4 border border-[#c9a96e]/40 text-[#c9a96e] hover:border-[#c9a96e] hover:bg-[#c9a96e]/10 transition-all duration-300"
              style={{ fontWeight: 500 }}
            >
              {site.heroCta2}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-['DM_Mono'] text-[#9c8e7e] text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#c9a96e] to-transparent"
        />
      </motion.div>
    </section>
  );
}
