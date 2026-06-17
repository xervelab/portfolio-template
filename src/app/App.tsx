import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Gallery } from "./components/Gallery";
import { About } from "./components/About";
import { Process } from "./components/Process";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import {
  useSheetSingle,
  useSheetData,
  mapSite,
  mapArtworks,
  mapProcessSteps,
  mapSocials,
  mapStudioImages,
  DEFAULT_SITE,
  type SiteData,
  type ArtworkData,
  type ProcessStep,
  type SocialLink,
  type StudioImage,
} from "./hooks/useSheetData";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  // ── Fetch all sheet data ──
  const { data: site, loading: siteLoading } = useSheetSingle<SiteData>(
    "Site", mapSite, DEFAULT_SITE, "Brand Name"
  );
  const { data: artworks, loading: artworksLoading } = useSheetData<ArtworkData>(
    "Artworks", mapArtworks, [], "Title"
  );
  const { data: processSteps } = useSheetData<ProcessStep>(
    "Process", mapProcessSteps, [], "Title"
  );
  const { data: socials } = useSheetData<SocialLink>(
    "Socials", mapSocials, [], "Name"
  );
  const { data: studioImages } = useSheetData<StudioImage>(
    "Studio Images", mapStudioImages, [], "Image URL"
  );

  // ── Minimum 3-second loading ──
  const [minTimerDone, setMinTimerDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMinTimerDone(true), 3000);
    return () => clearTimeout(t);
  }, []);

  // ── Intersection observer for active section ──
  useEffect(() => {
    const ids = ["hero", "work", "about", "process", "contact"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const handleNavigate = (section: string) => {
    if (section === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  const isLoading = siteLoading || artworksLoading || !minTimerDone;

  // ── Loading screen ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0d0b] flex flex-col items-center justify-center">
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
                borderTopColor: "#c9a96e",
                borderRightColor: "rgba(201,169,110,0.25)",
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
            <p className="font-['DM_Mono'] text-[10px] tracking-[0.3em] uppercase text-[#9c8e7e]/60">
              Loading
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
              className="w-20 h-px origin-center"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)",
              }}
            />
          </motion.div>
        </motion.div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="bg-[#0f0d0b] min-h-screen">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} site={site} />
      <Hero onNavigate={handleNavigate} site={site} />
      <Gallery artworks={artworks} site={site} />
      <About site={site} />
      <Process steps={processSteps} studioImages={studioImages} site={site} />
      <Contact site={site} socials={socials} />
      <Footer site={site} socials={socials} />
    </div>
  );
}
