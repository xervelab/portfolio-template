import { motion } from "motion/react";
import { type SiteData } from "../hooks/useSheetData";

interface AboutProps {
  site: SiteData;
}

export function About({ site }: AboutProps) {
  const stats = [
    { number: site.stat1Number, label: site.stat1Label },
    { number: site.stat2Number, label: site.stat2Label },
    { number: site.stat3Number, label: site.stat3Label },
  ];

  return (
    <section id="about" className="py-32 px-6 bg-[#0d0b09]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden bg-[#1a1714]">
              <img
                src={site.aboutImageUrl}
                alt={`${site.brandName} in studio`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#c9a96e]/20 -z-10" />
            <div className="absolute top-6 -right-5 bg-[#0f0d0b] border border-[rgba(201,169,110,0.2)] px-4 py-3 hidden md:block">
              <p className="font-['DM_Mono'] text-[#c9a96e] text-xs tracking-wider">{site.aboutYear}</p>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="font-['DM_Mono'] text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-6">{site.aboutLabel}</p>
            <h2
              className="font-['Playfair_Display'] text-[#f0ebe3] mb-8 leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400 }}
              dangerouslySetInnerHTML={{ __html: site.aboutHeading }}
            />

            <div className="space-y-5 font-['DM_Sans'] text-[#9c8e7e] leading-relaxed" style={{ fontWeight: 300 }}>
              {site.aboutBio1 && <p>{site.aboutBio1}</p>}
              {site.aboutBio2 && <p>{site.aboutBio2}</p>}
              {site.aboutBio3 && <p>{site.aboutBio3}</p>}
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[rgba(201,169,110,0.15)] pt-8">
              {stats.map(({ number, label }) => (
                <div key={label}>
                  <p className="font-['Playfair_Display'] text-[#c9a96e] text-3xl mb-1">{number}</p>
                  <p className="font-['DM_Mono'] text-[#9c8e7e] text-xs tracking-wider uppercase">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
