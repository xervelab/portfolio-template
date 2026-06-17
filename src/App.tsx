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

import {
  useSheetSingle,
  useSheetData,
  mapSite,
  mapArtworks,
  mapExhibitions,
  mapSocials,
  type SiteData,
  type ArtworkData,
  type ExhibitionData,
  type SocialLink,
} from "./hooks/useSheetData";

export default function App() {
  // ── Fetch all sheet data ──
  const { data: site, loading: siteLoading, error: siteError } = useSheetSingle<SiteData>(
    "Site", mapSite, "Brand Name"
  );
  const { data: artworks, loading: artworksLoading, error: artworksError } = useSheetData<ArtworkData>(
    "Artworks", mapArtworks, "Title"
  );
  const { data: exhibitions } = useSheetData<ExhibitionData>(
    "Exhibitions", mapExhibitions, "Title"
  );
  const { data: socials } = useSheetData<SocialLink>(
    "Socials", mapSocials, "Name"
  );

  // ── Minimum 3-second loading ──
  const [minTimerDone, setMinTimerDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMinTimerDone(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const [isDark, setIsDark] = useState<boolean>(() => {
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

  const isLoading = siteLoading || artworksLoading || !minTimerDone;
  const sourceError = siteError || artworksError;

  // ── Loading screen ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <div className="relative w-14 h-14">
            <div
              className="w-14 h-14 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: "#d4af37",
                borderRightColor: "rgba(212,175,55,0.25)",
                animation: "spin 1.4s linear infinite",
              }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-stone-500/60">
              Loading
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
              className="w-20 h-px origin-center"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (sourceError || !site) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-stone-100 flex items-center justify-center px-6">
        <div className="max-w-xl text-center space-y-4">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-accent">Data Source Error</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light">Unable to load Google Sheets content</h1>
          <p className="font-sans text-sm text-stone-400 leading-relaxed">
            {sourceError || "The Site sheet is empty or missing required columns."}
          </p>
          <p className="font-mono text-[11px] text-stone-500">
            Check sheet sharing and required column headers, then refresh.
          </p>
        </div>
      </div>
    );
  }

  const handleInquireAboutArtwork = (title: string) => {
    setArtworkInquiryTitle(title);
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

  // Get featured pieces
  const featuredArtworks = artworks.filter((art) => art.featured);

  return (
    <div className="bg-[#FAF9F6] dark:bg-[#0F0F0F] text-stone-900 dark:text-stone-100 min-h-screen transition-colors duration-300 overflow-x-hidden selection:bg-brand-accent selection:text-black">
      
      {/* Sticky Header Navigation */}
      <Navbar isDark={isDark} setIsDark={setIsDark} activeSection={activeSection} site={site} />

      {/* Main Container */}
      <main>
        
        {/* Home / Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#FAF9F6] dark:bg-[#0F0F0F] transition-colors duration-300"
        >
          {/* Subtle artistic light orbs */}
          <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-stone-200/40 dark:from-zinc-950/20 to-transparent pointer-events-none" />
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand-accent/5 dark:bg-brand-accent/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] rounded-full bg-stone-200 dark:bg-zinc-950 blur-3xl pointer-events-none" />

          {/* Grid-mesh texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

          {/* Hero Content Grid */}
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Title & Introduction */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-sans text-xs md:text-sm tracking-[0.35em] text-brand-accent uppercase block font-medium"
                >
                  {site.tagline}
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-stone-950 dark:text-stone-50 tracking-tight leading-[1.05]"
                  dangerouslySetInnerHTML={{ __html: site.heroSubtitle }}
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-sans text-stone-600 dark:text-stone-300 text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-xl"
              >
                {site.heroDescription}
              </motion.p>

              {/* Action Buttons */}
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
                  {site.heroCta1}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                
                <button
                  onClick={() => handleScrollTo("#contact")}
                  className="px-6 py-3.5 border border-stone-900/15 dark:border-white/15 text-stone-700 dark:text-stone-300 hover:border-brand-accent hover:text-brand-accent text-xs tracking-widest font-sans uppercase font-medium rounded-none transition-all duration-300 hover:bg-stone-900/5 dark:hover:bg-white/5 cursor-pointer"
                >
                  {site.heroCta2}
                </button>
              </motion.div>
            </div>

            {/* Curatorial Collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="relative w-full aspect-[4/5] max-w-sm mx-auto bg-stone-100 dark:bg-zinc-900 rounded-none shadow-none overflow-hidden border border-stone-900/10 dark:border-white/10">
                <img
                  src={site.heroImageUrl}
                  alt="Studio Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[10%] hover:scale-105 hover:grayscale-0 transition-all duration-[2000ms]"
                />
                
                <div className="absolute inset-x-0 bottom-0 bg-stone-950/90 backdrop-blur-sm p-6 text-stone-100 flex justify-between items-center border-t border-stone-900/15">
                  <div className="space-y-0.5 font-sans">
                    <span className="font-sans text-[8px] tracking-[0.25em] text-stone-400 uppercase block font-light">
                      Current Work on Display
                    </span>
                    <span className="font-serif text-sm block font-light text-brand-accent italic">
                      {featuredArtworks[0]?.title}
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
            </motion.div>
          </div>
        </section>

        {/* Featured Painting Grid Strip */}
        {featuredArtworks.length > 0 && (
          <section className="py-16 md:py-24 bg-[#FAF9F6] dark:bg-[#0F0F0F] border-t border-b border-stone-900/10 dark:border-white/10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                {featuredArtworks.slice(0, 3).map((artwork) => (
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
        )}

        {/* Gallery Section */}
        <Gallery onInquireAboutArtwork={handleInquireAboutArtwork} artworks={artworks} site={site} />

        {/* About & Exhibitions Section */}
        <About site={site} exhibitions={exhibitions} />

        {/* Contact Portal Section */}
        <Contact artworkInquiryTitle={artworkInquiryTitle} site={site} />

      </main>

      {/* Footer */}
      <Footer site={site} socials={socials} />
    </div>
  );
}
