import React, { useState } from 'react';
import { Instagram, Mail, Globe, Compass, ExternalLink, ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    // Fast mock studio list subscribing
    setTimeout(() => {
      setSubscribeStatus(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribeStatus(false), 4500);
    }, 500);
  };

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/clara_moreau_studio_mock',
      icon: Instagram,
      handle: '@clara.moreau.studio'
    },
    {
      name: 'Artsy Profile',
      url: 'https://artsy.net/artist/clara-moreau-mock',
      icon: Compass,
      handle: 'artsy.net/clara-moreau'
    },
    {
      name: 'Private Courier',
      url: 'mailto:acquisitions@claramoreau.studio',
      icon: Mail,
      handle: 'acquisitions@claramoreau.studio'
    },
    {
      name: 'Atelier Archives',
      url: '#gallery',
      icon: Globe,
      handle: 'claramoreau.studio'
    }
  ];

  return (
    <footer className="bg-[#090909] text-[#FAF8F5] border-t border-white/5">
      
      {/* Top Main Section */}
      <div className="max-w-7xl mx-auto py-16 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Brand Statement */}
        <div className="lg:col-span-4 space-y-6 animate-fade-in">
          <div className="space-y-2">
            <span className="font-serif text-2xl tracking-normal text-white uppercase font-light">CLARA MOREAU</span>
            <span className="block font-mono text-[9px] tracking-widest text-[#C5A47E] uppercase font-semibold">ATELIER DE PEINTURE &mdash; EST. 2018</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light max-w-sm">
            Investigating depth, atmospheric volume, and geological remnants using hand-ground mineral pigments, raw Belgian linens, and iron oxidation.
          </p>
          <div className="text-[10px] font-mono text-white/30">
            Lyon &bull; New York &bull; Paris
          </div>
        </div>

        {/* Center-Left Column: Social Portals */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="font-mono text-xs uppercase text-[#C5A47E] tracking-widest font-semibold tracking-wide">Digital Exposures</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialLinks.map(link => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  id={`social-link-${link.name.toLowerCase().replace(' ', '-')}`}
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

        {/* Right Column: Newsletter Catalog Subscription */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="font-mono text-xs uppercase text-[#C5A47E] tracking-widest font-semibold">Exclusive Vernissage Catalog</h4>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
            Subscribe to receive priority digital catalogs, upcoming exhibition coordinates, and private studio collection releases before they open to general bidding.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
            <div className="flex gap-2 relative">
              <input
                id="newsletter-email"
                type="email"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                placeholder="E.g., collector@private.com"
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

            {/* Newsletter Subscription Feedback Banner */}
            {subscribeStatus && (
              <div className="text-[10px] text-emerald-400 font-mono tracking-wide flex items-center gap-2 bg-emerald-950/40 p-2.5 border border-emerald-900/50 rounded-xs">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>Added to Vernissage Priority Access List. Welcome.</span>
              </div>
            )}
          </form>
        </div>

      </div>

      {/* Bottom Legal Section */}
      <div className="border-t border-white/5 bg-black/30 py-8 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-mono">
          <span>&copy; {new Date().getFullYear()} Clara Moreau Studio. All Rights Reserved.</span>
          <div className="flex gap-4">
            <a href="#artist-profile" className="hover:text-[#C5A47E] transition-colors uppercase text-[9px] tracking-widest">The Profile</a>
            <span>&bull;</span>
            <a href="#gallery" className="hover:text-[#C5A47E] transition-colors uppercase text-[9px] tracking-widest">Curated Works</a>
            <span>&bull;</span>
            <a href="#contact-portal" className="hover:text-[#C5A47E] transition-colors uppercase text-[9px] tracking-widest">Correspondence Desk</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
