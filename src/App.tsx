import { useState } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PersonalStory } from './components/PersonalStory';
import { Services } from './components/Services';
import { FeaturedClients } from './components/FeaturedClients';
import { SkillsUniverse } from './components/SkillsUniverse';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { InsightsSection } from './components/InsightsSection';
import { ResumeTimeline } from './components/ResumeTimeline';
import { ContactSection } from './components/ContactSection';
import { DataDiagnosticPanel } from './components/DataDiagnosticPanel';
import { Heart, Globe, Lock, Code } from 'lucide-react';

export default function App() {
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);

  const handleWorkClick = () => {
    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      const offset = contactElem.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-cream-light dark:bg-obsidian transition-colors duration-500 flex flex-col justify-between selection:bg-gold/20 selection:text-gold selection:dark:text-[#E6C29E]">
        {/* Navigation Layer */}
        <Navbar 
          onOpenDiagnostics={() => setDiagnosticsOpen(true)} 
          brandName="CECILIA VANCE" 
          hasDiagnostics={true}
        />

        {/* Master Section Track */}
        <main className="flex-grow">
          {/* Viewport Landing */}
          <Hero onWorkClick={handleWorkClick} />

          {/* Magazine Chronicles Column */}
          <PersonalStory />

          {/* Solution Blueprints Column */}
          <Services />

          {/* Retainer Directories Info */}
          <FeaturedClients />

          {/* Specialized Skill nodes */}
          <SkillsUniverse />

          {/* Polaroid Carousel Row */}
          <TestimonialCarousel />

          {/* Behance Case Studies List */}
          <PortfolioShowcase />

          {/* Editorial Articles Feed List */}
          <InsightsSection />

          {/* Track Credentials Timeline */}
          <ResumeTimeline />

          {/* Digital Intake Frame Mesh */}
          <ContactSection />
        </main>

        {/* Real-Time Sheet debug panel overlay */}
        <DataDiagnosticPanel 
          isOpen={diagnosticsOpen} 
          onClose={() => setDiagnosticsOpen(false)} 
        />

        {/* Pure Luxury Editorial Footer */}
        <footer className="bg-cream-warm dark:bg-carbon py-16 border-t border-gold/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gold/2 dark:to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-8">
            {/* Branding diamond */}
            <div className="font-display font-semibold text-lg tracking-[0.25em] text-gray-900 dark:text-cream-warm uppercase flex items-center justify-center gap-2">
              <span className="text-gold">◇</span>
              <span>CECILIA VANCE</span>
              <span className="text-gold">◇</span>
            </div>

            <p className="font-serif text-sm italic text-gray-500 max-w-sm mx-auto leading-relaxed">
              "Bringing order, structural peace, and predictive execution to scaling businesses."
            </p>

            {/* Links and standards */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[9px] tracking-widest text-[#9C7956] dark:text-gold uppercase font-bold">
              <a href="#story" className="hover:text-rose-gold transition-colors">Biography</a>
              <a href="#services" className="hover:text-rose-gold transition-colors">Services</a>
              <a href="#skills" className="hover:text-rose-gold transition-colors">Qualifications</a>
              <a href="#portfolio" className="hover:text-rose-gold transition-colors">Case Logs</a>
              <a href="#blog" className="hover:text-rose-gold transition-colors text-gradient">Editorial</a>
              <a href="#contact" className="hover:text-rose-gold transition-colors">Intake Reception</a>
            </div>

            <div className="h-[1px] bg-gold/10 max-w-sm mx-auto" />

            {/* Regulatory constraints */}
            <div className="space-y-2 text-gray-400 dark:text-gray-500 font-sans text-[10px] tracking-wide font-light">
              <p className="flex items-center justify-center gap-1">
                <span>© {new Date().getFullYear()} Cecilia Vance. All executive rights reserved.</span>
              </p>
              <p className="flex items-center justify-center gap-4 text-[9px] uppercase font-mono tracking-widest pt-1">
                <span className="flex items-center gap-1"><Lock size={10} className="text-gold" /> High-discretion Encrypted logs</span>
                <span className="text-gold/30">•</span>
                <span className="flex items-center gap-1"><Code size={10} className="text-gold" /> Standard SPA layout template</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
