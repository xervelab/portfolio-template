import React from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { motion } from 'motion/react';
import { 
  Inbox, 
  Layout, 
  Users, 
  Sparkles, 
  CreditCard, 
  MapPin, 
  FileText, 
  HelpCircle,
  TrendingUp,
  Award
} from 'lucide-react';

const IconMap: Record<string, React.ComponentType<any>> = {
  Inbox: Inbox,
  Layout: Layout,
  Users: Users,
  Sparkles: Sparkles,
  CreditCard: CreditCard,
  MapPin: MapPin,
  FileText: FileText,
};

const renderIcon = (name?: string, description?: string) => {
  // Try direct match from database first
  if (name && IconMap[name]) {
    const Component = IconMap[name];
    return <Component size={20} className="text-gold" />;
  }

  // Keyword parsing
  const desc = (description || '').toLowerCase();
  const title = (name || '').toLowerCase();
  
  if (desc.includes('inbox') || desc.includes('email') || title.includes('email') || title.includes('inbox')) {
    return <Inbox size={20} className="text-gold" />;
  }
  if (desc.includes('notion') || desc.includes('system') || desc.includes('boards') || title.includes('system')) {
    return <Layout size={20} className="text-gold" />;
  }
  if (desc.includes('crm') || desc.includes('client') || desc.includes('user') || title.includes('lead')) {
    return <Users size={20} className="text-gold" />;
  }
  if (desc.includes('pinterest') || desc.includes('instagram') || desc.includes('social') || title.includes('creative')) {
    return <Sparkles size={20} className="text-gold" />;
  }
  if (desc.includes('financial') || desc.includes('invoice') || desc.includes('payment') || title.includes('billing')) {
    return <CreditCard size={20} className="text-gold" />;
  }
  if (desc.includes('travel') || desc.includes('flight') || desc.includes('itinerary') || title.includes('itinerary')) {
    return <MapPin size={20} className="text-gold" />;
  }

  return <Sparkles size={20} className="text-gold" />;
};

export const Services: React.FC = () => {
  const { data, loading } = useGoogleSheet('SERVICES');

  if (loading) {
    return (
      <section className="py-24 bg-cream-light dark:bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 h-64 flex items-center justify-center">
          <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-28 bg-cream-light dark:bg-obsidian border-b border-gold/5 relative overflow-hidden">
      {/* Background soft color panels */}
      <div className="absolute top-[40%] right-[-10%] w-96 h-96 bg-gold/5 dark:bg-gold/2 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-80 h-80 bg-rose-gold/5 dark:bg-rose-gold/2 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <p className="font-mono text-[10px] tracking-widest text-[#9C7956] dark:text-[#E6C29E] uppercase font-semibold">✦ High-Touch Solutions</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-cream-warm">
            Administrative & <span className="italic">Systems Engineering</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light max-w-lg mx-auto leading-relaxed">
            I don't just clear daily tasks—I build systems and filter details, creating the headspace for you to generate raw creative output.
          </p>
        </div>

        {/* Pinterest Masonry inspired dynamic grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance] before:box-inherit after:box-inherit">
          {data.map((srv, index) => {
            const serviceName = srv.serviceName || "Premium Support Scope";
            const description = srv.description || "Executive business organization and digital inbox optimization program.";
            const results = srv.results || "Saves up to 10-15 administrative hours weekly.";
            const iconName = srv.iconName;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.4) }}
                whileHover={{ 
                  y: -6,
                  transition: { duration: 0.2 }
                }}
                className="break-inside-avoid relative p-8 rounded-[32px] bg-cream-warm/95 dark:bg-carbon/90 border border-gold/15 dark:border-gold/10 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5 dark:hover:shadow-black/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon wrap */}
                  <div className="h-11 w-11 rounded-full border border-gold/25 flex items-center justify-center bg-cream-light dark:bg-obsidian shadow-inner mb-6 group-hover:bg-gold/10 transition-colors duration-300">
                    {renderIcon(iconName, description)}
                  </div>

                  {/* Service Title */}
                  <h3 className="font-serif text-xl font-normal text-gray-900 dark:text-cream-warm leading-tight mb-3">
                    {serviceName}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light mb-6">
                    {description}
                  </p>
                </div>

                {/* Outcome indicator badge */}
                <div className="pt-4 border-t border-gold/10 flex items-start gap-2 text-gold">
                  <TrendingUp size={12} className="mt-0.5" />
                  <p className="font-sans text-[10px] uppercase font-semibold tracking-widest leading-normal text-[#9C7956] dark:text-[#E6C29E]">
                    {results}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tailored Custom Retainer Scope Callout */}
        <div className="mt-16 p-8 rounded-sm bg-cream-warm/50 dark:bg-carbon/30 border border-dashed border-gold/25 text-center max-w-3xl mx-auto space-y-4">
          <Award size={18} className="text-gold mx-auto" />
          <h4 className="font-serif text-lg text-gray-900 dark:text-cream-warm font-normal">Need a Custom Retainer Configuration?</h4>
          <p className="font-sans text-xs text-gray-500 dark:text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Retainers start at 15 hours per week. I limit active client partnerships to 5 concurrently to ensure each entrepreneur receives hyper-attentive, executive-level, zero-latency execution.
          </p>
        </div>

      </div>
    </section>
  );
};
