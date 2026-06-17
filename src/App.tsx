/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useDarkMode } from './hooks/useDarkMode';
import { useGoogleSheet } from './hooks/useGoogleSheet';
import { HeroData } from './types';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Services } from './sections/Services';
import { Skills } from './sections/Skills';
import { Clients } from './sections/Clients';
import { Portfolio } from './sections/Portfolio';
import { Testimonials } from './sections/Testimonials';
import { Blog } from './sections/Blog';
import { Resume } from './sections/Resume';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';

export default function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { data: heroData } = useGoogleSheet<HeroData>('HERO');

  const brandName = heroData?.name || 'Sarah Jenkins';

  return (
    <div className="min-h-screen font-sans bg-white dark:bg-[#0F172A] text-slate-850 dark:text-slate-100 transition-colors duration-300 antialiased overflow-x-hidden relative">
      {/* Floating Header */}
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        brandName={brandName}
      />

      {/* Main Single Page Sections Deck */}
      <main className="relative flex flex-col">
        {/* Hero Banner Section */}
        <Hero />

        {/* Professional Summary About Section */}
        <section id="about" className="scroll-mt-20">
          <About />
        </section>

        {/* VA Services Cards Section */}
        <section id="services" className="scroll-mt-20">
          <Services />
        </section>

        {/* Categorized Skills Section */}
        <section id="skills" className="scroll-mt-20">
          <Skills />
        </section>

        {/* Active Client Profiles Section */}
        <section id="clients" className="scroll-mt-20">
          <Clients />
        </section>

        {/* Case Studies / Completed Projects Section */}
        <section id="portfolio" className="scroll-mt-20">
          <Portfolio />
        </section>

        {/* Client Testimonials Slider Section */}
        <section id="testimonials" className="scroll-mt-20">
          <Testimonials />
        </section>

        {/* Publications / Blog Feed Section */}
        <section id="blog" className="scroll-mt-20">
          <Blog />
        </section>

        {/* Chronological Career & Education Resume Section */}
        <section id="resume" className="scroll-mt-20">
          <Resume />
        </section>

        {/* Dynamic Interactive Mail & Call Contact Section */}
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </main>

      {/* Footer Branding & Social Rails */}
      <Footer />
    </div>
  );
}
