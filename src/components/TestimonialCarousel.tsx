import React, { useState } from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';

interface TestimonialRow {
  clientPhoto?: string;
  name?: string;
  position?: string;
  testimonial?: string;
  rotation?: string | number;
}

export const TestimonialCarousel: React.FC = () => {
  const { data, loading } = useGoogleSheet('TESTIMONIALS');
  const [currentIndex, setCurrentIndex] = useState(0);

  if (loading) {
    return (
      <section className="py-24 bg-cream-warm dark:bg-carbon">
        <div className="max-w-7xl mx-auto px-6 h-64 flex items-center justify-center">
          <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  const testimonials: TestimonialRow[] = data || [];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  if (testimonials.length === 0) {
    return null;
  }

  const active = testimonials[currentIndex];
  // Calculate polaroid custom rotation
  const customRotation = active.rotation ? Number(active.rotation) : (currentIndex % 2 === 0 ? -2 : 2);

  return (
    <section id="testimonials" className="py-28 bg-cream-warm dark:bg-carbon/60 border-b border-gold/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="font-mono text-[10px] tracking-widest text-gold uppercase font-semibold">✦ KIND WORDS</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-cream-warm">
            Client <span className="italic font-normal">Love Stories</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light max-w-lg mx-auto">
            Honest feedback from the visionary agency directors and independent operators who have trusted me with their operations.
          </p>
        </div>

        {/* Carousel Showcase Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          
          {/* Left Block: Narrative snippet / details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-gold shadow-sm">
              <Quote size={14} className="fill-current" />
            </div>
            
            <h3 className="font-serif text-2xl font-light text-gray-900 dark:text-cream-warm leading-snug">
              "An elite standard of daily business coordination."
            </h3>

            <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              Every testimonial reflects a dedicated workflow audit. I don't just solve immediate task tickets—I curate a premium operational partnership.
            </p>

            {/* Pagination Sliders */}
            <div className="flex items-center gap-3 pt-4">
              <button
                onClick={handlePrev}
                className="h-10 w-10 rounded-full border border-gold/20 hover:border-gold/50 bg-cream-light dark:bg-obsidian text-gold flex items-center justify-center transition-colors cursor-pointer"
                id="testimonial-prev-btn"
              >
                <ChevronLeft size={16} />
              </button>
              
              <span className="font-mono text-xs tracking-widest text-[#9C7956] dark:text-[#E6C29E] font-medium min-w-[40px] text-center">
                {currentIndex + 1} / {testimonials.length}
              </span>

              <button
                onClick={handleNext}
                className="h-10 w-10 rounded-full border border-gold/20 hover:border-gold/50 bg-cream-light dark:bg-obsidian text-gold flex items-center justify-center transition-colors cursor-pointer"
                id="testimonial-next-btn"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Block: Animated Polaroid Testimonial Frame */}
          <div className="lg:col-span-7 flex justify-center py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  rotate: customRotation 
                }}
                exit={{ opacity: 0, scale: 0.95, y: -15, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="p-6 pb-8 bg-white dark:bg-zinc-800 shadow-2xl border border-gold/10 hover:shadow-gold/5 transition-shadow duration-300 max-w-[340px] sm:max-w-[400px] text-center rounded-[32px]"
                style={{ originX: 0.5, originY: 0.5 }}
              >
                {/* Image block inside the Polaroids */}
                <div className="aspect-square w-full overflow-hidden border border-gray-100 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-900 rounded-[24px] relative">
                  <img
                    src={active.clientPhoto || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"}
                    alt={active.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute top-3 right-3 h-5 w-5 bg-cream-light/30 rounded-full flex items-center justify-center text-rose-gold/60">
                    <Heart size={10} className="fill-current" />
                  </div>
                </div>

                {/* polaroid tape look / text description */}
                <div className="pt-6 space-y-4 text-left">
                  <p className="font-serif text-sm sm:text-base text-gray-700 dark:text-zinc-200 italic font-light leading-relaxed">
                    "{active.testimonial}"
                  </p>
                  
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-base font-medium text-gray-900 dark:text-cream-warm">{active.name}</h4>
                    <p className="font-sans text-[10px] uppercase tracking-widest text-[#9C7956] dark:text-gold font-semibold">
                      {active.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
