import { useState, useEffect } from "react";
import "../styles/fonts.css";
import { Navbar } from "./components/Navbar";
import { Header } from "./components/Header";
import { Gallery } from "./components/Gallery";
import { Reels } from "./components/Reels";
import { ContactForm } from "./components/ContactForm";
import { SocialLinks } from "./components/SocialLinks";
import { AnimatePresence, motion } from "motion/react";
import { useSheetSingle, mapSite, DEFAULT_SITE, type SiteData } from "./hooks/useSheetData";

type Page = "home" | "explore" | "contact" | "notifications";
type Tab = "posts" | "reels";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const { data: site, loading: siteLoading } = useSheetSingle<SiteData>("Site", mapSite, DEFAULT_SITE);

  // Minimum loading duration (3 seconds)
  const [minLoadingDone, setMinLoadingDone] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMinLoadingDone(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Show loading screen while data is being fetched or minimum time hasn't passed
  const isInitialLoading = siteLoading || !minLoadingDone;

  if (isInitialLoading) {
    return (
      <div
        className="noise-overlay"
        style={{
          background: "var(--background)",
          minHeight: "100vh",
          fontFamily: "'Inter', sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}
        >
          {/* Animated spinner ring */}
          <div style={{ position: "relative", width: "64px", height: "64px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                border: "2px solid transparent",
                borderTopColor: "#f59e0b",
                borderRightColor: "rgba(245, 158, 11, 0.3)",
                animation: "spin 1.5s linear infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#f59e0b", fontSize: "18px", animation: "pulse 2s ease-in-out infinite" }}>✦</span>
            </div>
          </div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
          >
            <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.25em", color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif" }}>
              Loading portfolio
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
              style={{ width: "96px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.6), transparent)", transformOrigin: "center" }}
            />
          </motion.div>
        </motion.div>

        {/* Inline keyframes for spin and pulse */}
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="noise-overlay" style={{ background: "var(--background)", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <Navbar activePage={page} onPageChange={(p) => setPage(p as Page)} />

      <main className="pb-16 md:pb-0">
        <AnimatePresence mode="wait">
          {page !== "contact" ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Header activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)} onMessageClick={() => setPage("contact")} />
              {activeTab === "posts" && <Gallery />}
              {activeTab === "reels" && <Reels />}
              <SocialLinks />
            </motion.div>
          ) : (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ContactForm />
              <SocialLinks />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Personalized artistic footer with signature */}
      <footer
        className="border-t py-10 hidden md:block"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-[935px] mx-auto px-4 flex flex-col items-center gap-4">
          {/* Artistic signature */}
          <div className="signature-float">
            <span className="gradient-text" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "24px", fontStyle: "italic" }}>
              {site.brandName}
            </span>
          </div>
          {/* Decorative separator */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--border))" }} />
            <span style={{ color: "#f59e0b", fontSize: "10px" }}>✦</span>
            <div className="w-12 h-px" style={{ background: "linear-gradient(90deg, var(--border), transparent)" }} />
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "var(--muted-foreground)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {site.copyright}
          </p>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "12px", color: "var(--muted-foreground)", fontStyle: "italic", opacity: 0.6 }}>
            "{site.footerQuote}"
          </p>
        </div>
      </footer>
    </div>
  );
}
