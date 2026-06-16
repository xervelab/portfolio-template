/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ArrowRight, Compass, Eye, Heart, Milestone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ARTIST_INFO, ARTWORKS_DATA } from "./data";

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Elegant art-focused portfolios defaults to a clean, luxurious dark theme
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return true; 
  });

  const [activeSection, setActiveSection] = useState("home");
  const [artworkInquiryTitle, setArtworkInquiryTitle] = useState("");

  // Sync state with HTML dark class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Handle intersection scroll highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "gallery", "about", "exhibitions", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInquireAboutArtwork = (title: string) => {
    setArtworkInquiryTitle(title);
    // Force reset after a tick so that user can select the same again if needed
    setTimeout(() => {
      setArtworkInquiryTitle("");
    }, 100);
  };

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Get featured pieces (our generated art assets!)
  const featuredArtworks = ARTWORKS_DATA.filter((art) => art.featured);

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#0F0F0F] text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-300 overflow-x-hidden selection:bg-brand-accent selection:text-black">
      
      {/* Sticky Header Navigation */}
      <Navbar isDark={isDark} setIsDark={setIsDark} activeSection={activeSection} />

      {/* Main Container */}
      <main>
        
        {/* Home / Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#FAF9F6] dark:bg-[#0F0F0F] transition-colors duration-300"
        >
          {/* Subtle artistic light orbs in black/white mode for ambient depth */}
          <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-stone-200/40 dark:from-zinc-950/20 to-transparent pointer-events-none" />
          
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand-accent/5 dark:bg-brand-accent/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] rounded-full bg-stone-200 dark:bg-zinc-950 blur-3xl pointer-events-none" />

          {/* Grid-mesh texture to resemble canvas threads */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

          {/* Hero Content Grid */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Title & Introduction columns */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-sans text-xs md:text-sm tracking-[0.35em] text-brand-accent uppercase block font-medium"
                >
                  {ARTIST_INFO.title}
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-stone-950 dark:text-stone-50 tracking-tight leading-[1.05]"
                >
                  Curating <br />
                  <span className="italic block font-normal text-brand-accent text-gold-glow">Silence</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sans text-stone-600 dark:text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-xl"
              >
                {ARTIST_INFO.subtitle}
              </motion.p>

              {/* Action Coordinates */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <button
                  onClick={() => handleScrollTo("#gallery")}
                  className="px-6 py-3.5 bg-stone-950 text-stone-50 hover:bg-brand-accent hover:text-stone-950 dark:bg-stone-50 dark:hover:bg-brand-accent dark:text-stone-950 text-xs tracking-widest font-sans font-semibold uppercase rounded-none transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-none hover:translate-y-[-1px] active:translate-y-0"
                >
                  Explore Gallery
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                
                <button
                  onClick={() => handleScrollTo("#contact")}
                  className="px-6 py-3.5 border border-stone-900/15 dark:border-white/15 text-stone-700 dark:text-stone-300 hover:border-brand-accent hover:text-brand-accent text-xs tracking-widest font-sans uppercase font-medium rounded-none transition-all duration-300 hover:bg-stone-900/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  Commission Inquiry
                </button>
              </motion.div>
            </div>

            {/* Impressive visual accent (Curatorial Collage) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="relative w-full aspect-[4/5] max-w-sm mx-auto bg-stone-100 dark:bg-zinc-900 rounded-none shadow-none overflow-hidden border border-stone-900/10 dark:border-white/10">
                {/* Embedded premier painting */}
                <img
                  src={featuredArtworks[0]?.imageUrl || "https://picsum.photos/seed/curator/600/800"}
                  alt="Elena Rostova Studio Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[10%] hover:scale-105 hover:grayscale-0 transition-all duration-[2000ms]"
                />
                
                {/* Studio coordinates banner */}
                <div className="absolute inset-x-0 bottom-0 bg-stone-950/90 backdrop-blur-sm p-6 text-stone-100 flex justify-between items-center border-t border-stone-900/15">
                  <div className="space-y-0.5 font-sans">
                    <span className="font-sans text-[8px] tracking-[0.25em] text-stone-400 uppercase block font-light">
                      Current Work on Display
                    </span>
                    <span className="font-serif text-sm block font-light text-brand-accent italic">
                      {featuredArtworks[0]?.title || "Echoes of Autumn"}
                    </span>
                  </div>
                  <button
                    onClick={() => handleScrollTo("#gallery")}
                    className="p-2 border border-stone-800 text-stone-300 hover:border-brand-accent hover:text-brand-accent rounded-none transition-colors cursor-pointer"
                  >
                    <Compass className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Floating aesthetic credentials card */}
              <div className="absolute -bottom-6 -left-12 bg-[#FAF9F6] dark:bg-[#0F0F0F] border border-stone-900/15 dark:border-white/15 p-4 rounded-none shadow-none flex items-center space-x-3 max-w-[210px] pointer-events-none">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <span className="font-sans text-[9px] tracking-widest text-stone-500 dark:text-stone-400 uppercase font-light">
                  Active representation: Chelsea NYC Gallery
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Painting Grid Strip (Creates a wonderful transition experience) */}
        <section className="py-16 md:py-24 bg-[#FAF9F6] dark:bg-[#0F0F0F] border-t border-b border-stone-900/10 dark:border-white/10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <span className="font-sans text-[10px] tracking-[0.3em] text-stone-400 uppercase block font-light">Curatorial Statement</span>
              <p className="font-serif text-lg md:text-2xl text-stone-700 dark:text-stone-200 italic max-w-2xl font-light">
                “Art should hover on the boundary edge of form and pure emotion, translating the silences we carry in the mind.”
              </p>
              <div className="w-8 h-[1px] bg-brand-accent"></div>
            </div>

            {/* Mini Horizontal Showcase of Featured items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              {featuredArtworks.map((artwork, i) => (
                <div
                  key={artwork.id}
                  onClick={() => handleScrollTo("#gallery")}
                  className="group block cursor-pointer"
                >
                  <div className="aspect-[16/10] bg-stone-100 dark:bg-zinc-900/40 rounded-none overflow-hidden border border-stone-900/10 dark:border-white/10 shadow-none relative">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition-colors duration-500"></div>
                  </div>
                  <div className="mt-3 flex items-center justify-between font-sans">
                    <div>
                      <span className="font-serif text-sm font-medium text-stone-800 dark:text-stone-200 group-hover:text-brand-accent transition-colors">
                        {artwork.title}
                      </span>
                      <span className="font-sans text-[10px] text-stone-500 block font-light">
                        {artwork.medium}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-stone-400">
                      {artwork.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <Gallery onInquireAboutArtwork={handleInquireAboutArtwork} />

        {/* About & Exhibitions Section */}
        <About />

        {/* Contact Portal Section */}
        <Contact artworkInquiryTitle={artworkInquiryTitle} />

      </main>

      {/* Footer Connectivity */}
      <Footer />
    </div>
  );
}
