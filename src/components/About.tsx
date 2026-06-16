import React, { useState } from "react";
import { MapPin, Calendar, Award, Compass, Eye, Heart } from "lucide-react";
import { motion } from "motion/react";
import { ARTIST_INFO, EXHIBITIONS_DATA } from "../data";

export default function About() {
  const [activeTab, setActiveTab] = useState<"all" | "solo" | "group">("all");

  const filteredExhibitions = EXHIBITIONS_DATA.filter((ex) => {
    if (activeTab === "all") return true;
    return ex.type.toLowerCase() === activeTab;
  });

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#0F0F0F] transition-colors duration-300">
      
      {/* About Section */}
      <section id="about" className="py-24 md:py-32 border-b border-stone-900/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
            
            {/* Image Frame */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-12 xl:col-span-5 relative"
            >
              <div className="relative group">
                {/* Minimal outline decoration */}
                <div className="absolute -inset-3 border border-brand-accent/20 rounded-none transform rotate-1 transition-transform duration-700"></div>
                
                {/* Studio Portrait Frame */}
                <div className="relative overflow-hidden aspect-[4/5] bg-stone-100 border border-stone-900/10 dark:border-white/10 rounded-none shadow-sm">
                  <img
                    src={ARTIST_INFO.portraitUrl}
                    alt={ARTIST_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[35%] hover:grayscale-0 transition-all duration-[1500ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-stone-900/10 hover:bg-stone-900/0 transition-colors duration-500"></div>
                </div>

                {/* Aesthetic Coordinates Label */}
                <div className="absolute bottom-6 right-6 bg-stone-950/95 backdrop-blur-sm text-[8px] tracking-[0.35em] font-mono text-stone-300 py-2 px-4 uppercase pointer-events-none rounded-none border border-white/5">
                  Elena Rostova • Studio v.26
                </div>
              </div>
            </motion.div>

            {/* Biography Copy */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-12 xl:col-span-7 space-y-8"
            >
              <div className="space-y-3 border-b border-stone-900/10 dark:border-white/10 pb-6">
                <span className="font-sans text-[10px] tracking-[0.35em] text-brand-accent uppercase block font-semibold">
                  The Artist
                </span>
                <h2 className="font-serif text-4xl md:text-5xl font-light text-stone-950 dark:text-stone-50 tracking-tight leading-none">
                  Crafting Silent Landscapes of the Human Mind
                </h2>
              </div>

              <div className="space-y-6 text-stone-700 dark:text-stone-300 text-sm md:text-base leading-relaxed font-light">
                <p>{ARTIST_INFO.bio}</p>
                
                {/* Visual quote container */}
                <div className="border-l border-brand-accent pl-6 py-2 italic text-stone-950 dark:text-stone-100 font-serif text-lg leading-relaxed bg-stone-900/5 dark:bg-white/5 pr-4">
                  "{ARTIST_INFO.statement}"
                </div>
              </div>

              {/* Dynamic highlights blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 border border-stone-900/10 dark:border-white/10 rounded-none bg-transparent">
                  <div className="flex items-center space-x-3 text-brand-accent mb-2">
                    <Compass className="w-4 h-4" />
                    <span className="font-sans text-xs tracking-[0.1em] uppercase font-semibold">
                      Medium Synergy
                    </span>
                  </div>
                  <p className="font-sans text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                    Moving gracefully between vibrant, layered palette-knife Oils and traditional, quiet Watercolor washes.
                  </p>
                </div>

                <div className="p-6 border border-stone-900/10 dark:border-white/10 rounded-none bg-transparent">
                  <div className="flex items-center space-x-3 text-brand-accent mb-2">
                    <Award className="w-4 h-4" />
                    <span className="font-sans text-xs tracking-[0.1em] uppercase font-semibold">
                      Fine-Art Pedigree
                    </span>
                  </div>
                  <p className="font-sans text-xs text-stone-500 dark:text-stone-400 font-light leading-relaxed">
                    Exhibited in prestigious solo shows across New York and Boston, featured in premium contemporary biennales.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Exhibition history / Timeline section */}
      <section id="exhibitions" className="py-24 md:py-32 border-b border-stone-900/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0 border-b border-stone-900/10 dark:border-white/10 pb-8">
            <div className="space-y-3">
              <span className="font-sans text-[10px] tracking-[0.35em] text-brand-accent uppercase block font-semibold">
                Schedules & History
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-stone-950 dark:text-stone-50 tracking-tight leading-none">
                Exhibitions Log
              </h2>
            </div>

            {/* Filter controls */}
            <div className="flex gap-2">
              {(["all", "solo", "group"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-[10px] tracking-[0.15em] font-sans uppercase rounded-none border transition-all duration-350 ${
                    activeTab === tab
                      ? "bg-stone-950 dark:bg-stone-50 border-stone-950 dark:border-stone-50 text-stone-50 dark:text-stone-950 font-medium"
                      : "bg-transparent border-stone-900/10 dark:border-white/10 text-stone-500 dark:text-stone-400 hover:border-stone-950 dark:hover:border-stone-50 hover:text-stone-950 dark:hover:text-stone-50"
                  }`}
                >
                  {tab === "all" ? "All Exhibitions" : `${tab} Shows`}
                </button>
              ))}
            </div>
          </div>

          {/* Exhibition Grid List */}
          <div className="space-y-6 max-w-5xl">
            {filteredExhibitions.map((ex, index) => (
              <motion.div
                key={ex.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group p-6 md:p-8 border border-stone-900/10 dark:border-white/10 rounded-none bg-transparent hover:bg-stone-900/5 dark:hover:bg-white/5 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start md:items-center gap-5">
                  {/* Badge */}
                  <div className="flex-shrink-0 text-center py-2 px-3 bg-stone-900/5 dark:bg-white/5 rounded-none border border-stone-900/5 dark:border-white/5 group-hover:bg-brand-accent/10 transition-colors w-16">
                    <span className="font-mono text-sm block font-semibold text-stone-950 dark:text-stone-50">
                      {ex.year}
                    </span>
                    <span className="font-sans text-[8px] text-brand-accent uppercase tracking-widest block mt-0.5">
                      {ex.type}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-lg md:text-xl font-medium text-stone-950 dark:text-stone-50 group-hover:text-brand-accent transition-colors duration-300">
                      {ex.title}
                    </h3>
                    <p className="font-sans text-xs text-stone-500 dark:text-stone-400 font-light flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
                      {ex.venue}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end md:self-auto text-stone-500 dark:text-stone-400 font-mono text-xs">
                  <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                  <span>{ex.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
