import { motion } from "motion/react";

export function About() {
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
                src="https://images.unsplash.com/photo-1740710543611-80b658171bc3?w=800&h=1066&fit=crop&auto=format"
                alt="Elena Vasquez in her Barcelona studio"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative offset border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#c9a96e]/20 -z-10" />
            {/* Year badge */}
            <div className="absolute top-6 -right-5 bg-[#0f0d0b] border border-[rgba(201,169,110,0.2)] px-4 py-3 hidden md:block">
              <p className="font-['DM_Mono'] text-[#c9a96e] text-xs tracking-wider">Est. 2011</p>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="font-['DM_Mono'] text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-6">About</p>
            <h2
              className="font-['Playfair_Display'] text-[#f0ebe3] mb-8 leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 400 }}
            >
              Painting is how I
              <em className="italic"> remember</em> and
              <em className="italic"> forget</em> at the same time.
            </h2>

            <div className="space-y-5 font-['DM_Sans'] text-[#9c8e7e] leading-relaxed" style={{ fontWeight: 300 }}>
              <p>
                Born in Seville, trained at the Escola de Belles Arts de Sant Jordi in Barcelona.
                My work lives in the tension between control and surrender — hours of deliberate
                mark-making interrupted by moments where I step back and let the canvas breathe.
              </p>
              <p>
                I work primarily in oil, sometimes cold wax, occasionally collaged with found
                materials. The Spanish landscape — its particular quality of light, its silences —
                runs through everything I make, even work that looks nothing like a landscape.
              </p>
              <p>
                Exhibited across Spain, Germany, and the UK. Available for commissions, studio visits,
                and select residencies.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[rgba(201,169,110,0.15)] pt-8">
              {[
                { number: "12+", label: "Years Practicing" },
                { number: "40+", label: "Exhibitions" },
                { number: "200+", label: "Works Sold" },
              ].map(({ number, label }) => (
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
