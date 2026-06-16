import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Sparkles, Moon, Lightbulb, Info } from 'lucide-react';
import { type ArtworkData, type SiteData } from '../hooks/useSheetData';

type LightingMode = 'gallery' | 'daylight' | 'golden' | 'spotlight';

interface StudioSimProps {
  artworks: ArtworkData[];
  site: SiteData;
}

export default function StudioSim({ artworks, site }: StudioSimProps) {
  const [activeMode, setActiveMode] = useState<LightingMode>('gallery');
  const [displayArtId, setDisplayArtId] = useState<string>(artworks[0]?.id || '');

  const selectedArt = artworks.find(a => a.id === displayArtId) || artworks[0];

  if (!selectedArt || artworks.length === 0) return null;

  const lightingProfiles = [
    {
      id: 'gallery' as LightingMode,
      name: 'Gallery Spotlight',
      icon: Lightbulb,
      description: 'CRI 98 neutral 4000K museum spotlights designed for complete chromatic fidelity.',
      overlayClass: 'bg-black/5 opacity-20 brightness-100 contrast-100 mix-blend-normal',
      containerClass: 'bg-[#181818] border-white/10 shadow-lg',
      glowColor: 'shadow-[#C5A47E]/10',
      wallColor: 'bg-[#121212]',
      lightTint: 'rgba(255,255,255,0.1)'
    },
    {
      id: 'daylight' as LightingMode,
      name: 'Morning Daylight',
      icon: Sun,
      description: 'Cool, crisp 6000K north-facing window light emphasizing cold blue and white tones.',
      overlayClass: 'bg-cyan-500/10 opacity-30 brightness-110 contrast-105 saturate-95 mix-blend-soft-light',
      containerClass: 'bg-[#1a2228] border-cyan-900/40 shadow-cyan-950/20',
      glowColor: 'shadow-cyan-500/5',
      wallColor: 'bg-[#101418]',
      lightTint: 'rgba(186,230,253,0.12)'
    },
    {
      id: 'golden' as LightingMode,
      name: 'Golden Hour',
      icon: Sparkles,
      description: 'Warm, low-angle late-afternoon solar rays (3000K) making amber and gold leaf shimmer.',
      overlayClass: 'bg-amber-500/20 opacity-40 brightness-100 contrast-95 saturate-125 mix-blend-color-burn',
      containerClass: 'bg-[#221810] border-amber-900/40 shadow-amber-950/20',
      glowColor: 'shadow-amber-500/10',
      wallColor: 'bg-[#14100c]',
      lightTint: 'rgba(245,158,11,0.18)'
    },
    {
      id: 'spotlight' as LightingMode,
      name: 'Midnight Studio',
      icon: Moon,
      description: 'Mysterious 2700K candlelit studio atmosphere highlighting rich bone-blacks and deep under-drawings.',
      overlayClass: 'bg-indigo-950/40 opacity-55 brightness-75 contrast-110 saturate-105 mix-blend-multiply',
      containerClass: 'bg-[#0f0f15] border-indigo-950/60 shadow-black/80',
      glowColor: 'shadow-black/70',
      wallColor: 'bg-[#0a0a0d]',
      lightTint: 'rgba(99,102,241,0.05)'
    }
  ];

  const currentProfile = lightingProfiles.find(p => p.id === activeMode) || lightingProfiles[0];

  return (
    <section id="studio-simulation" className="py-24 px-6 md:px-12 bg-[#0A0A0A] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Detail Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#C5A47E] tracking-widest uppercase">{site.lightroomLabel || 'INTERACTIVE LIGHTROOM'}</span>
              <h2 className="text-3xl md:text-4xl font-sans font-extralight tracking-tight text-white">
                {site.lightroomTitle || 'Chiaroscuro Simulator'}
              </h2>
              <div className="w-16 h-[1px] bg-[#C5A47E]" />
            </div>

            <p className="text-white/70 leading-relaxed font-sans font-light">
              {site.lightroomDescription || 'Select an artwork below, then choose different environmental lighting profiles to see how the painting adapts.'}
            </p>

            <p className="text-neutral-400 text-sm italic font-sans font-light">
              Select an artwork below, then choose different environmental lighting profiles to see how the painting's atmospheric resonance adapts.
            </p>

            {/* Artwork Selector Buttons */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase text-[#C5A47E] tracking-wider">Select Canvas to Frame</h4>
              <div className="flex flex-wrap gap-2">
                {artworks.slice(0, 4).map(art => (
                  <button
                    key={art.id}
                    id={`art-toggle-${art.id}`}
                    onClick={() => setDisplayArtId(art.id)}
                    className={`px-4 py-2 border text-xs tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer ${
                      displayArtId === art.id
                        ? 'bg-[#C5A47E] text-black border-[#C5A47E] font-medium scale-[1.02]'
                        : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    {art.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Selection Buttons */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs uppercase text-[#C5A47E] tracking-wider">Ambient Lighting Engine</h4>
              <div className="grid grid-cols-2 gap-3">
                {lightingProfiles.map(mode => {
                  const Icon = mode.icon;
                  const isSelected = activeMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      id={`lighting-mode-${mode.id}`}
                      onClick={() => setActiveMode(mode.id)}
                      className={`flex items-center gap-3 p-3 text-left border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-[#121212] text-white border-[#C5A47E] shadow-sm font-medium'
                          : 'bg-white/5 text-neutral-400 border-transparent hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                      <div className={`p-1.5 rounded-full ${isSelected ? 'bg-[#C5A47E] text-black' : 'bg-white/10 text-white/60'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs uppercase font-mono tracking-wider">{mode.name}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description of current light environment */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex gap-3 bg-[#121212] p-4 border border-white/10 rounded-sm text-xs text-neutral-300 shadow-md"
              >
                <Info className="w-4 h-4 text-[#C5A47E] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-mono block uppercase text-white mb-1">{currentProfile.name} Mode</strong>
                  <span className="font-light leading-relaxed text-neutral-400">{currentProfile.description}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Visual Frame Column */}
          <div className="lg:col-span-7 flex justify-center">
            <div 
              className={`w-full max-w-lg aspect-square flex items-center justify-center p-8 md:p-12 transition-all duration-1000 border rounded-sm relative overflow-hidden ${currentProfile.containerClass} ${currentProfile.glowColor}`}
            >
              {/* Radial Wall Light Gradient Overlay in background */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-1000 mix-blend-screen opacity-60"
                style={{
                  background: `radial-gradient(circle at center, ${currentProfile.lightTint} 0%, rgba(0,0,0,0) 70%)`
                }}
              />

              {/* Physical Picture Shadow Frame */}
              <div className="w-full relative shadow-2xl transition-all duration-1000 border border-neutral-900/40 pointer-events-none">
                <div className="absolute inset-0 shadow-inner z-[5] pointer-events-none" />
                
                {/* Light reflection gloss shine overlay */}
                <div 
                  className="absolute inset-0 z-[10] pointer-events-none transition-all duration-1000"
                  style={{
                    background: activeMode === 'golden' 
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%, rgba(251,191,36,0.1) 100%)' 
                      : activeMode === 'daylight'
                      ? 'linear-gradient(105deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)'
                      : activeMode === 'spotlight'
                      ? 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.01) 50%, rgba(0,0,0,0.5) 100%)'
                      : 'linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)'
                  }}
                />

                {/* Animated transition of image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedArt.id}-${activeMode}`}
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.85 }}
                    transition={{ duration: 0.6 }}
                    className="relative block"
                  >
                    <img
                      src={selectedArt.imageUrl}
                      alt={selectedArt.title}
                      className="w-full aspect-[4/5] object-cover scale-[1.01]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* The dynamic color filter overlay that tints the painting */}
                    <div className={`absolute inset-0 z-[8] transition-all duration-1000 ${currentProfile.overlayClass}`} />
                  </motion.div>
                </AnimatePresence>
                
                {/* Wooden Frame Border Border */}
                <div className="absolute -inset-1.5 border border-amber-950/50 rounded-[1px] pointer-events-none opacity-80" />
                <div className="absolute -inset-4 border-8 border-black/40 hover:border-black/50 transition-colors rounded-[1px] pointer-events-none" />
              </div>

              {/* Little Museum Plaque Under Frame */}
              <div className="absolute bottom-1 md:bottom-2 left-1/2 -translate-x-1/2 bg-[#090909]/95 px-3 py-1 border border-white/10 shadow-lg rounded-[1px] flex flex-col items-center pointer-events-none">
                <span className="font-serif text-[9px] uppercase tracking-wide text-white">{selectedArt.title}</span>
                <span className="font-mono text-[7px] uppercase tracking-widest text-[#C5A47E] mt-0.5">{selectedArt.medium}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
