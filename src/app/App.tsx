import { useState } from "react";
import "../styles/fonts.css";
import { Navbar } from "./components/Navbar";
import { Header } from "./components/Header";
import { Gallery } from "./components/Gallery";
import { ContactForm } from "./components/ContactForm";
import { SocialLinks } from "./components/SocialLinks";
import { AnimatePresence, motion } from "motion/react";

type Page = "home" | "explore" | "contact" | "notifications";
type Tab = "posts" | "reels" | "saved" | "tagged";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [activeTab, setActiveTab] = useState<Tab>("posts");

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
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
                <div className="flex items-center justify-center py-24" style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>
                  Reels coming soon
                </div>
              )}
              {activeTab === "saved" && (
                <div className="flex items-center justify-center py-24" style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>
                  Saved posts appear here
                </div>
              )}
              {activeTab === "tagged" && (
                <div className="flex items-center justify-center py-24" style={{ color: "var(--muted-foreground)", fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>
                  No tagged posts yet
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

      <footer
        className="border-t py-8 text-center hidden md:block"
        style={{ borderColor: "var(--border)" }}
      >
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--muted-foreground)", letterSpacing: "0.05em" }}>
          © 2024 MAYA CHEN · ALL RIGHTS RESERVED · NEW YORK, NY
        </p>
      </footer>
    </div>
  );
}
