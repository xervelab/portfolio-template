import { useState } from "react";
import "../styles/fonts.css";
import { Navbar } from "./components/Navbar";
import { Header } from "./components/Header";
import { Gallery } from "./components/Gallery";
import { ContactForm } from "./components/ContactForm";
import { SocialLinks } from "./components/SocialLinks";
import { AnimatePresence, motion } from "motion/react";
import { useSheetSingle, mapSite, DEFAULT_SITE, type SiteData } from "./hooks/useSheetData";

type Page = "home" | "explore" | "contact" | "notifications";
type Tab = "posts" | "reels" | "saved" | "tagged";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const { data: site } = useSheetSingle<SiteData>("Site", mapSite, DEFAULT_SITE);

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
              <Header activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)} />
              {activeTab === "posts" && <Gallery />}
              {activeTab === "reels" && (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(236,72,152,0.15))" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--muted-foreground)" }}><path d="M5 3l14 9-14 9V3z"/></svg>
                  </div>
                  <p style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>
                    Reels coming soon
                  </p>
                  <p style={{ color: "var(--muted-foreground)", fontFamily: "'DM Serif Display', serif", fontSize: "13px", fontStyle: "italic", opacity: 0.6 }}>
                    Studio time-lapses & behind the easel
                  </p>
                </div>
              )}
              {activeTab === "saved" && (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(139,92,246,0.15))" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--muted-foreground)" }}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                  </div>
                  <p style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>
                    Saved posts appear here
                  </p>
                </div>
              )}
              {activeTab === "tagged" && (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(59,130,246,0.15))" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--muted-foreground)" }}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/></svg>
                  </div>
                  <p style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>
                    No tagged posts yet
                  </p>
                </div>
              )}
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
