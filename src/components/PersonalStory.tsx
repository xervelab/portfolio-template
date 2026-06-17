import React from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { motion } from 'motion/react';
import { Quote, Compass, Eye, ShieldCheck, Heart } from 'lucide-react';

export const PersonalStory: React.FC = () => {
  const { data, loading } = useGoogleSheet('STORY');

  const storyItem = data && data[0] ? data[0] : {};

  const title = storyItem.title || "My Journey: Forging Order from Creative Chaos.";
  const story = storyItem.story || "Before establishing my virtual assistant agency, I spent years working inside fast-paced corporate boardrooms and scaling digital agencies. Time and time again, I saw highly creative, visionary founders gets bogged down by administrative bottleneck—spending nearly 4 to 5 hours daily dealing with email calendars, invoices, and scheduling conflicts.\n\nThat was why I launched this boutique operations agency. I specialize in building sustainable backend workflows, purifying messy calendars, and establishing clear operational procedures. I don't just clear lists; I restore focus, structural serenity, and peace of mind.";
  const mission = storyItem.mission || "To streamline operations for elite visionaries, transforming chaotic routines into beautiful self-sustaining frameworks.";
  const values = storyItem.values || "Pristine execution, absolute client confidentiality, forward-looking anticipation, and minimalist structure.";
  const quoteText = storyItem.quoteText || "True freedom starts when you have a trusted partner managing the details.";
  const quoteAuthor = storyItem.quoteAuthor || "Cecilia Vance, Executive VA";

  // Split story into paragraphs to render elegantly
  const paragraphs = story.split('\n\n').filter(Boolean);

  if (loading) {
    return (
      <section className="py-24 bg-cream-warm dark:bg-carbon border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6 h-64 flex items-center justify-center">
          <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="story" className="py-28 bg-cream-warm dark:bg-carbon/60 relative border-b border-gold/5 overflow-hidden">
      {/* Decorative floral or geometric back markings */}
      <div className="absolute right-0 top-1/4 translate-x-1/2 w-80 h-80 rounded-full border border-gold/5 pointer-events-none" />
      <div className="absolute left-0 bottom-10 -translate-x-1/3 w-96 h-96 rounded-full border border-rose-gold/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-[10px] tracking-widest text-gold uppercase font-semibold mb-3">◇ Behind the operations</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-cream-warm leading-tight">
            {title}
          </h2>
        </div>

        {/* Narrative Split Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Story paragraphs */}
          <div className="lg:col-span-7 space-y-6">
            {paragraphs.map((p, idx) => (
              <p 
                key={idx} 
                className="font-sans text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light first-letter:text-3xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:text-gold"
              >
                {p}
              </p>
            ))}

            {/* Mission & Core Values Bento Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="p-8 rounded-[32px] bg-cream-light/60 dark:bg-obsidian/45 border border-gold/15 space-y-3">
                <div className="p-3 rounded-full w-fit bg-[#D4A373]/15 text-[#D4A373] shadow-inner">
                  <Compass size={16} />
                </div>
                <h4 className="font-serif text-lg text-gray-900 dark:text-cream-warm">Mission Outline</h4>
                <p className="font-sans text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                  {mission}
                </p>
              </div>

              <div className="p-8 rounded-[32px] bg-cream-light/60 dark:bg-obsidian/45 border border-gold/15 space-y-3">
                <div className="p-3 rounded-full w-fit bg-[#D4A373]/15 text-[#D4A373] shadow-inner">
                  <ShieldCheck size={16} />
                </div>
                <h4 className="font-serif text-lg text-gray-900 dark:text-cream-warm">Core Values</h4>
                <p className="font-sans text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                  {values}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Quote & Why Partner Frame */}
          <div className="lg:col-span-5 space-y-8">
            {/* Elegant luxury Quote card block */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="relative p-10 rounded-[32px] bg-cream-light dark:bg-obsidian border border-gold/15 shadow-xl flex flex-col justify-between"
            >
              <Quote size={28} className="text-gold/20 absolute top-6 right-6" />
              
              <p className="font-serif text-lg sm:text-xl italic text-gray-800 dark:text-cream-warm leading-relaxed mb-6">
                "{quoteText}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="h-6 w-[1px] bg-[#D4A373]" />
                <span className="font-mono text-[10px] tracking-widest text-[#B5838D] uppercase font-bold">
                  {quoteAuthor}
                </span>
              </div>
            </motion.div>

            {/* Accompanying Editorial Callout */}
            <div className="space-y-4 pt-4">
              <h3 className="font-serif text-xl font-normal text-gray-900 dark:text-cream-warm">Why Strategic Leaders Partner With Me</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xs mt-1.5">✦</span>
                  <p className="font-sans text-xs text-gray-600 dark:text-gray-400"><strong className="text-gray-800 dark:text-cream-warm font-medium">Predictive Response:</strong> I don't wait for your instructions. I study your workflows, anticipate logistical double-bookings, and solve them in real-time.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xs mt-1.5">✦</span>
                  <p className="font-sans text-xs text-gray-600 dark:text-gray-400"><strong className="text-gray-800 dark:text-cream-warm font-medium">Extreme Privacy:</strong> High-net-worth schedules demand strict privacy. I maintain absolute compliance and digital security wrappers.</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xs mt-1.5">✦</span>
                  <p className="font-sans text-xs text-gray-600 dark:text-gray-400"><strong className="text-gray-800 dark:text-cream-warm font-medium">Polished Brand Aesthetic:</strong> My client communications are premium, respectful, and fully consistent with your brand's luxury tone.</p>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
