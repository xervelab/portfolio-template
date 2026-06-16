import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowDown, Sparkles, Paintbrush, FileText, Calendar, MessageSquare, Flame } from 'lucide-react';

import StudioIntro from './components/StudioIntro';
import Gallery from './components/Gallery';
import StudioSim from './components/StudioSim';
import Exhibitions from './components/Exhibitions';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

import { useSheetSingle, useSheetData, mapProfile, mapSite, mapArtworks, DEFAULT_PROFILE, DEFAULT_SITE, SAMPLE_ARTWORKS, type ProfileData, type SiteData, type ArtworkData } from './hooks/useSheetData';

export default function App() {
  const [selectedArtworkTitle, setSelectedArtworkTitle] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Fetch data from Google Sheets
  const { data: profile, loading: profileLoading } = useSheetSingle<ProfileData>("Profile", mapProfile, DEFAULT_PROFILE, "Name");
  const { data: site, loading: siteLoading } = useSheetSingle<SiteData>("Site", mapSite, DEFAULT_SITE, "Brand Name");
  const { data: artworks, loading: artworksLoading } = useSheetData<ArtworkData>("Artworks", mapArtworks, SAMPLE_ARTWORKS, "Title");

  // Minimum 3 second loading
  const [minLoadingDone, setMinLoadingDone] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMinLoadingDone(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Monitor Scroll for Glassmorphism Navigation Background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isInitialLoading = profileLoading || siteLoading || !minLoadingDone;

  // Loading screen
  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <div className="relative w-16 h-16">
            <div
              className="w-16 h-16 rounded-full border-2 border-transparent"
              style={{ borderTopColor: '#C5A47E', borderRightColor: 'rgba(197,164,126,0.3)', animation: 'spin 1.5s linear infinite' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#C5A47E] animate-pulse" />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono">
              Loading portfolio
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
              className="w-24 h-[1px] origin-center"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(197,164,126,0.6), transparent)' }}
            />
          </motion.div>
        </motion.div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Scroll function pointing clients dynamically to form desk
  const handleInquireAboutArtwork = (artworkTitle: string) => {
    setSelectedArtworkTitle(artworkTitle);
    
    setTimeout(() => {
      const element = document.getElementById('contact-portal');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const clearSelectedArtwork = () => {
    setSelectedArtworkTitle(null);
  };

  const navLinks = [
    { name: 'Profile', href: '#artist-profile', icon: Paintbrush },
    { name: 'Works', href: '#gallery', icon: FileText },
    { name: 'Lightroom', href: '#studio-simulation', icon: Flame },
    { name: 'Exhibitions', href: '#exhibitions', icon: Calendar },
    { name: 'Correspondence', href: '#contact-portal', icon: MessageSquare }
  ];

  const handleNavLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#D1D1D1] select-none selection:bg-[#C5A47E]/30 selection:text-white overflow-x-hidden font-sans">
      
      {/* Structural Floating Navigation Header */}
      <nav 
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 border-b ${
          scrolled 
            ? 'bg-[#0A0A0A]/90 backdrop-blur-md py-4 border-white/10 shadow-md' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Name block */}
          <a 
            id="brand-logo"
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col group"
          >
            <span className="font-serif text-lg md:text-xl tracking-normal text-white group-hover:text-[#C5A47E] transition-colors duration-300">
              {site.brandName || 'PORTFOLIO'}
            </span>
            <span className="font-mono text-[7px] tracking-widest text-[#C5A47E] uppercase mt-0.5">
              {site.brandSubtitle}
            </span>
          </a>

          {/* Large Screen Desktop Links */}
          <div className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest">
            {navLinks.map(link => (
              <a
                key={link.name}
                id={`nav-${link.name.toLowerCase()}`}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavLinkClick(link.href);
                }}
                className="text-white/65 hover:text-white transition-colors duration-200 border-b border-transparent hover:border-[#C5A47E] py-1"
              >
                {link.name}
              </a>
            ))}
            
            <button
              id="desktop-direct-inquire"
              onClick={() => handleNavLinkClick('#contact-portal')}
              className="px-4 py-2 bg-[#C5A47E] text-black hover:bg-white font-medium text-[9px] tracking-widest font-mono uppercase transition-colors duration-300 rounded-sm shadow-xs cursor-pointer"
            >
              Acquire
            </button>
          </div>

          {/* Toggle Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#C5A47E] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu Layer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-[#0D0D0D] border-b border-white/10 shadow-2xl md:hidden py-8 px-6 space-y-6"
          >
            <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-widest animate-fade-in">
              {navLinks.map(link => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    id={`mobile-nav-${link.name.toLowerCase()}`}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavLinkClick(link.href);
                    }}
                    className="flex items-center gap-3 text-white/70 hover:text-white hover:bg-white/5 p-3 rounded-xs transition-colors"
                  >
                    <Icon className="w-4 h-4 text-[#C5A47E]" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>
            
            <button
              id="mobile-nav-cta-acquire"
              onClick={() => handleNavLinkClick('#contact-portal')}
              className="w-full bg-[#C5A47E] text-black hover:bg-white hover:text-black text-xs py-3.5 tracking-widest font-mono uppercase text-center block transition-colors rounded-sm cursor-pointer font-medium"
            >
              Consult Acquisitions Desk
            </button>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Atmospheric Split Screen Hero Section */}
      <header className="min-h-screen relative flex items-center justify-center pt-20 pb-12 px-6 md:px-12 bg-[#0C0C0C] overflow-hidden border-b border-white/10">
        
        {/* Subtle decorative grid backing */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Atmospheric Typography */}
          <div className="lg:col-span-6 space-y-8 select-none">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-[#C5A47E]" />
                <span className="font-mono text-xs text-[#C5A47E] tracking-widest uppercase">{site.heroTag || 'EXHIBITION'}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-extralight tracking-tight text-white leading-none">
                {site.heroTitle || 'Welcome'} <span className="font-serif italic font-light block mt-2 text-[#C5A47E]">{site.heroSubtitle}</span>
              </h1>
              
              <div className="w-20 h-[1px] bg-[#C5A47E] mt-6" />
            </div>

            <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-sans font-light max-w-lg">
              {site.heroDescription}
            </p>

            {/* Micro Call to actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-[10px] uppercase tracking-widest">
              <button
                id="hero-view-catalog"
                onClick={() => handleNavLinkClick('#gallery')}
                className="px-6 py-3 bg-[#C5A47E] text-black hover:bg-white font-medium transition-all duration-300 rounded-sm shadow-md cursor-pointer"
              >
                {site.heroCta1 || 'View Catalog'}
              </button>
              <button
                id="hero-profile-read"
                onClick={() => handleNavLinkClick('#artist-profile')}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all duration-300 rounded-sm cursor-pointer"
              >
                {site.heroCta2 || 'Read Biography'}
              </button>
            </div>
          </div>

          {/* Right Column: High Quality Large Piece Floating Preview */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[4/5] bg-[#121212] border border-white/5 shadow-2xl p-6 relative group overflow-hidden">
              <div className="absolute inset-0 shadow-inner pointer-events-none z-[5]" />
              
              {/* Painting Canvas */}
              <div className="w-full h-full bg-[#1A1A1A] overflow-hidden relative">
                {artworks[0]?.imageUrl && (
                  <img
                    src={artworks[0].imageUrl}
                    alt={artworks[0]?.title || 'Featured artwork'}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-1000 ease-out"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Visual gloss overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
              </div>

              {/* Floating micro info placement */}
              {artworks[0] && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#0D0D0D]/95 px-4 py-2 border border-white/10 shadow-md rounded-[1px] flex flex-col items-center pointer-events-none text-center">
                  <span className="font-serif text-xs text-white">{artworks[0].title.toUpperCase()}</span>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-[#C5A47E] mt-1">{artworks[0].medium} &mdash; {artworks[0].dimensions}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Scroll down mouse cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 font-mono text-[8px] tracking-widest uppercase text-white/40 cursor-pointer pointer-events-none">
          <span>Enter Atelier</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#C5A47E]" />
          </motion.div>
        </div>

      </header>


      {/* Section Array */}
      <StudioIntro />
      
      <Gallery artworks={artworks} onInquireAboutArtwork={handleInquireAboutArtwork} site={site} />
      
      <StudioSim artworks={artworks} site={site} />
      
      <Exhibitions site={site} />
      
      <ContactForm 
        artworks={artworks}
        selectedArtworkTitle={selectedArtworkTitle} 
        clearSelectedArtwork={clearSelectedArtwork}
        site={site}
      />
      
      <Footer site={site} />

    </div>
  );
}
