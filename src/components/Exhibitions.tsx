import { Calendar, MapPin, Grid, Layers } from 'lucide-react';
import { EXHIBITIONS } from '../data/artworks';

export default function Exhibitions() {
  return (
    <section id="exhibitions" className="py-24 px-6 md:px-12 bg-[#0A0A0A] border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block Section */}
        <div className="space-y-4 mb-16 text-center max-w-xl mx-auto">
          <span className="font-mono text-xs text-[#C5A47E] tracking-widest uppercase block">WORLDWIDE EXHIBITS</span>
          <h2 className="text-3xl md:text-4xl font-sans font-extralight tracking-tight text-white font-light">
            Exhibition Calendar
          </h2>
          <div className="w-16 h-[1px] bg-[#C5A47E] mx-auto" />
          <p className="text-xs text-neutral-450 font-sans font-light leading-relaxed">
            Curated shows displaying experimental canvases and organic watercolor sediment structures to the public. Contact the hosting galleries below for primary bidding.
          </p>
        </div>

        {/* Chronological List Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {EXHIBITIONS.map(ex => (
            <div
              key={ex.id}
              id={`exhibition-card-${ex.id}`}
              className="bg-[#121212] border border-white/5 p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative rounded-sm group overflow-hidden hover:border-[#C5A47E]/40"
            >
              {/* Dynamic Exhibition Status Tag */}
              <div className="absolute top-0 right-0 p-3 flex gap-2">
                <span className={`px-2.5 py-0.5 text-[8px] font-mono tracking-widest uppercase font-semibold border rounded-sm ${
                  ex.status === 'Current'
                    ? 'bg-emerald-950/40 border-emerald-900/50 text-emerald-400'
                    : ex.status === 'Upcoming'
                    ? 'bg-amber-950/40 border-amber-900/50 text-amber-400'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                }`}>
                  {ex.status}
                </span>
              </div>

              <div className="space-y-6">
                {/* Visual Accent Graphic */}
                <div className="text-white/30 flex items-center justify-between">
                  <span className="font-mono text-xs">{ex.dates.split(' – ')[0]}</span>
                  <div className="h-[1px] w-1/3 bg-white/10 group-hover:w-1/2 transition-all duration-500" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-serif tracking-tight text-white group-hover:text-[#C5A47E] transition-colors duration-350 font-light">
                    {ex.title}
                  </h3>
                  <p className="text-xs font-mono text-white/40">
                    Hosted by {ex.venue}
                  </p>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                  {ex.description}
                </p>
              </div>

              {/* Geo location descriptor footer */}
              <div className="border-t border-white/5 mt-8 pt-4 flex items-center gap-2 text-white/40 text-[10px] font-mono tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#C5A47E]" />
                <span>{ex.location.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Fine Art representation notice info-badge */}
        <div className="mt-12 bg-[#121212] border border-white/10 p-6 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 rounded-sm text-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C5A47E] rounded-full text-black shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <p className="text-white/70 font-sans leading-relaxed text-center md:text-left">
              Clara Moreau is represented exclusively in North America by <strong className="text-white">The Broadhurst Gallery (NY)</strong> and in Europe by <strong className="text-white">Espace Contemporain (Paris)</strong>. For primary acquisitions, please query the curators directly or initiate a dialogue.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
