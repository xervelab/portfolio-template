import { motion } from "motion/react";
import { type ProcessStep, type StudioImage, type SiteData } from "../hooks/useSheetData";

interface ProcessProps {
  steps: ProcessStep[];
  studioImages: StudioImage[];
  site: SiteData;
}

export function Process({ steps, studioImages, site }: ProcessProps) {
  return (
    <section id="process" className="py-32 px-6 bg-[#0f0d0b]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <p className="font-['DM_Mono'] text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-4">{site.processLabel}</p>
          <h2
            className="font-['Playfair_Display'] text-[#f0ebe3] leading-tight max-w-xl"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}
          >
            {site.processTitle}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="border-t border-[rgba(201,169,110,0.15)] pt-8 pr-8 pb-8 group"
            >
              <p className="font-['Playfair_Display'] text-[#c9a96e]/30 text-6xl mb-6 group-hover:text-[#c9a96e]/60 transition-colors duration-500"
                style={{ fontWeight: 400 }}>
                {step.number}
              </p>
              <h3 className="font-['Playfair_Display'] text-[#f0ebe3] text-xl mb-4" style={{ fontWeight: 500 }}>
                {step.title}
              </h3>
              <p className="font-['DM_Sans'] text-[#9c8e7e] text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Studio image strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-3 gap-1 h-48 md:h-72 overflow-hidden"
        >
          {studioImages.map((img, i) => (
            <div key={i} className="overflow-hidden bg-[#1a1714]">
              <img
                src={img.url}
                alt="Studio detail"
                className="w-full h-full object-cover opacity-60 hover:opacity-90 transition-opacity duration-500 scale-105 hover:scale-100"
                style={{ transition: "opacity 0.5s, transform 0.7s" }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
