import { motion } from 'motion/react';
import { ARTIST_BIO, STUDIO_IMAGE } from '../data/artworks';

export default function StudioIntro() {
  return (
    <section id="artist-profile" className="py-24 px-6 md:px-12 bg-[#0A0A0A] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Studio Photo Frame */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative group">
              {/* Aesthetic Backdrop Border Grid lines */}
              <div className="absolute -top-4 -left-4 w-2/3 h-2/3 border-t border-l border-[#C5A47E]/30 pointer-events-none group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border-b border-r border-[#C5A47E]/30 pointer-events-none group-hover:scale-105 transition-transform duration-500" />
              
              {/* Studio Workspace Image */}
              <div className="overflow-hidden bg-[#121212] border border-white/5 shadow-xl relative aspect-[4/3]">
                <img
                  src={STUDIO_IMAGE}
                  alt={`${ARTIST_BIO.name} Workplace`}
                  className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 hover:scale-105 transition-all duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating badge inside workspace image */}
                <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-xs px-4 py-2 border border-white/10 rounded-sm shadow-md md:block hidden animate-pulse">
                  <span className="font-mono text-[9px] tracking-widest text-[#C5A47E] uppercase block mb-0.5">THE ENVIRONMENT</span>
                  <span className="font-serif text-xs text-white/90">Studio No. 4, Lyon, France</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Artist Biography Narratives */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#C5A47E] tracking-widest uppercase block">THE ARTIST</span>
              <h2 className="text-4xl md:text-5xl font-sans font-extralight tracking-tight text-white">
                {ARTIST_BIO.name}
              </h2>
              <p className="font-mono text-xs text-neutral-400 tracking-wider">
                {ARTIST_BIO.role} &mdash; {ARTIST_BIO.location}
              </p>
              <div className="w-16 h-[1.5px] bg-[#C5A47E]" />
            </div>

            <p className="text-lg text-white/80 leading-relaxed font-serif font-light italic">
              &ldquo;{ARTIST_BIO.narrative}&rdquo;
            </p>

            {/* Structured Philosophical Principles */}
            <div className="border-t border-white/10 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {ARTIST_BIO.philosophies.map((p, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#C5A47E] bg-white/5 px-2 py-0.5 border border-white/10 rounded-xs">0{index + 1}</span>
                    <h4 className="font-mono text-[11px] uppercase tracking-wider text-white font-medium">
                      {p.title}
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
