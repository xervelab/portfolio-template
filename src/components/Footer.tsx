import React, { useState } from 'react';
import { Instagram, Mail, Globe, Compass, ExternalLink, ArrowRight, Check } from 'lucide-react';
import { useSheetData, mapSocials, SAMPLE_SOCIALS, type SocialData, type SiteData } from '../hooks/useSheetData';

interface FooterProps {
  site: SiteData;
}

export default function Footer({ site }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(false);
  const { data: socials } = useSheetData<SocialData>("Socials", mapSocials, SAMPLE_SOCIALS, "Handle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setTimeout(() => {
      setSubscribeStatus(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribeStatus(false), 4500);
    }, 500);
  };

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'instagram': return Instagram;
      case 'mail': return Mail;
      case 'globe': return Globe;
      case 'compass': return Compass;
      default: return ExternalLink;
    }
  };

  return (
    <footer className="bg-[#090909] text-[#FAF8F5] border-t border-white/5">
      
      {/* Top Main Section */}
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Brand Statement */}
        <div className="lg:col-span-4 space-y-6 animate-fade-in">
          <div className="space-y-2">
            <span className="font-serif text-2xl tracking-normal text-white uppercase font-light">{site.brandName}</span>
            <span className="block font-mono text-[9px] tracking-widest text-[#C5A47E] uppercase font-semibold">{site.brandSubtitle}</span>
          </div>
        </div>

        {/* Center Column: Social Portals */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="font-mono text-xs uppercase text-[#C5A47E] tracking-widest font-semibold">Links</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socials.map(link => {
              const Icon = getIcon(link.icon);
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-2.5 border border-white/5 hover:border-white/10 bg-white/5 rounded-sm transition-all duration-300"
                >
                  <div className="p-1.5 bg-white/5 text-white/50 group-hover:text-black group-hover:bg-[#C5A47E] transition-colors rounded-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-[#C5A47E] uppercase tracking-wide font-semibold">{link.name}</span>
                    <span className="block text-[11px] text-neutral-400 font-light truncate max-w-[120px]">{link.handle}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Column: Newsletter */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="font-mono text-xs uppercase text-[#C5A47E] tracking-widest font-semibold">Newsletter</h4>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
            Subscribe to receive updates on new works, exhibitions, and releases.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
            <div className="flex gap-2 relative">
              <input
                id="newsletter-email"
                type="email"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-[#0B0B0B] border border-white/10 text-white placeholder-white/30 px-4 py-3 text-xs focus:outline-none focus:border-[#C5A47E] rounded-sm transition-colors"
              />
              <button
                id="newsletter-subscribe-button"
                type="submit"
                className="px-4 bg-[#C5A47E] hover:bg-white text-black font-semibold transition-all duration-300 flex items-center shrink-0 rounded-sm shadow-md cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {subscribeStatus && (
              <div className="text-[10px] text-emerald-400 font-mono tracking-wide flex items-center gap-2 bg-emerald-950/40 p-2.5 border border-emerald-900/50 rounded-xs">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Subscribed successfully!</span>
              </div>
            )}
          </form>
        </div>

      </div>

      {/* Bottom Legal Section */}
      <div className="border-t border-white/5 bg-black/30 py-8 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-mono">
          <span>{site.copyright || `© ${new Date().getFullYear()} All Rights Reserved.`}</span>
          <div className="flex gap-4">
            <a href="#artist-profile" className="hover:text-[#C5A47E] transition-colors uppercase text-[9px] tracking-widest">Profile</a>
            <span>&bull;</span>
            <a href="#gallery" className="hover:text-[#C5A47E] transition-colors uppercase text-[9px] tracking-widest">Works</a>
            <span>&bull;</span>
            <a href="#contact-portal" className="hover:text-[#C5A47E] transition-colors uppercase text-[9px] tracking-widest">Contact</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
