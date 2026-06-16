import React, { useState, useEffect } from "react";
import { initialArtworks, artistProfile, initialExhibitions, initialJournalPosts } from "./data";
import { Artwork, JournalPost, Exhibition } from "./types";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import GalleryGrid from "./components/GalleryGrid";
import ArtworkModal from "./components/ArtworkModal";
import ExhibitionsList from "./components/ExhibitionsList";
import JournalList from "./components/JournalList";
import AddPostModal from "./components/AddPostModal";
import InquiryModal from "./components/InquiryModal";
import { Sun, Moon, Sparkles, Image as ImageIcon, BookOpen, Calendar, Instagram, Grid, Bookmark, Award, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"masterpieces" | "journal" | "exhibitions">("masterpieces");

  // Stateful collections to support live local mutations
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
  const [journalPosts, setJournalPosts] = useState<JournalPost[]>(initialJournalPosts);
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(initialExhibitions);

  // Filter state for masterpieces
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Modal target triggers
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [showAddPost, setShowAddPost] = useState<boolean>(false);
  const [showInquiry, setShowInquiry] = useState<boolean>(false);
  const [inquirySubject, setInquirySubject] = useState<string>("");

  // Set system dark mode preference as default on launch
  useEffect(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(systemPrefersDark);
  }, []);

  // Sync selected artwork whenever primary collection mutates (so comments/likes show up live in modal too)
  const syncSelectedArtwork = () => {
    if (selectedArtwork) {
      const updated = artworks.find((art) => art.id === selectedArtwork.id);
      if (updated) {
        setSelectedArtwork(updated);
      }
    }
  };

  useEffect(() => {
    syncSelectedArtwork();
  }, [artworks]);

  // Double-tap or normal like handlers for artworks
  const handleLikeToggle = (id: string) => {
    setArtworks((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const alreadyLiked = !!art.hasLiked;
          return {
            ...art,
            hasLiked: !alreadyLiked,
            likes: alreadyLiked ? art.likes - 1 : art.likes + 1
          };
        }
        return art;
      })
    );
  };

  // Add real comments into artwork objects
  const handleAddComment = (artworkId: string, text: string, username: string) => {
    const avatarList = [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    ];
    // Grab pseudo random avatar for user
    const randomAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];

    const newCommentItem = {
      id: `comment-${Date.now()}`,
      username: username.replace(/\s+/g, "_").toLowerCase(),
      avatar: randomAvatar,
      text,
      timestamp: "Just now"
    };

    setArtworks((prev) =>
      prev.map((art) => {
        if (art.id === artworkId) {
          return {
            ...art,
            comments: [...art.comments, newCommentItem]
          };
        }
        return art;
      })
    );
  };

  // Live Post Addition by guests
  const handleAddArtworkPost = (newArt: Omit<Artwork, "id" | "likes" | "hasLiked" | "comments" | "views">) => {
    // Generate organic starting views & likes
    const startingViews = Math.floor(Math.random() * 250) + 40;
    const startingLikes = Math.floor(startingViews * 0.4);

    const fullNewArtItem: Artwork = {
      ...newArt,
      id: `art-custom-${Date.now()}`,
      likes: startingLikes,
      hasLiked: false,
      comments: [],
      views: startingViews
    };

    setArtworks((prev) => [fullNewArtItem, ...prev]);
  };

  // Increment likes count on journal essays
  const handleLikeJournalPost = (id: string) => {
    setJournalPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            likes: post.likes + 1
          };
        }
        return post;
      })
    );
  };

  const handleTriggerInquiry = (subjectTitle: string) => {
    setInquirySubject(subjectTitle);
    setShowInquiry(true);
  };

  // Compile active categories for filter chips dynamically based on actual catalog
  const categoriesList: { name: string; count: number }[] = [
    { name: "All", count: artworks.length },
    ...Array.from(new Set(artworks.map((a) => a.category as string))).map((cat: string) => ({
      name: cat,
      count: artworks.filter((a) => a.category === cat).length
    }))
  ];

  // Filter actual artworks
  const filteredArtworks = activeFilter === "All"
    ? artworks
    : artworks.filter((art) => art.category === activeFilter);

  return (
    <div className="dark" id="app-root-container">
      
      {/* Background Wrapper of pure editorial dark */}
      <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] flex flex-col font-sans">
        
        {/* Nav Header */}
        <nav className="sticky top-0 z-30 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base tracking-[0.2em] font-light text-[#E5E5E5] uppercase font-display select-none">
                Elena Rostova Studio
              </span>
            </div>

            {/* Config controls floating bar */}
            <div className="flex items-center gap-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-brand-gold transition-colors duration-300"
                title="Follow Elena on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Theme toggle slider button */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-1.5 border border-white/10 hover:border-brand-gold/40 text-white/40 hover:text-brand-cream transition-colors cursor-pointer rounded-none"
                title={darkMode ? "Switch to Light Mode" : "Dark/Light Contrast Toggle"}
                id="theme-switcher-toggle"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Inner page content container */}
        <main className="flex-1 pb-16">
          
          {/* Section 1: Top Bio Card & Highlights */}
          <Header
            profile={artistProfile}
            onInquireClick={() => handleTriggerInquiry("")}
            onAddPostClick={() => setShowAddPost(true)}
          />

          {/* Section 2: Interactive Tabs Row (Editorial Identity Layout) */}
          <div className="max-w-4xl mx-auto px-6 mt-4 border-t border-white/10 flex justify-center gap-10 md:gap-16">
            
            <button
              onClick={() => setActiveTab("masterpieces")}
              className={`py-4 text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-2 border-t border-transparent select-none cursor-pointer transition-all duration-300 ${
                activeTab === "masterpieces"
                  ? "border-white text-white font-semibold scale-102"
                  : "text-[#E5E5E5]/40 hover:text-[#E5E5E5]"
              }`}
            >
              <Grid className="w-3.5 h-3.5 text-brand-gold/60" />
              Masterpieces
            </button>

            <button
              onClick={() => setActiveTab("journal")}
              className={`py-4 text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-2 border-t border-transparent select-none cursor-pointer transition-all duration-300 ${
                activeTab === "journal"
                  ? "border-white text-white font-semibold scale-102"
                  : "text-[#E5E5E5]/40 hover:text-[#E5E5E5]"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-brand-gold/60" />
              Studio Journal
            </button>

            <button
              onClick={() => setActiveTab("exhibitions")}
              className={`py-4 text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-2 border-t border-transparent select-none cursor-pointer transition-all duration-300 ${
                activeTab === "exhibitions"
                  ? "border-white text-white font-semibold scale-102"
                  : "text-[#E5E5E5]/40 hover:text-[#E5E5E5]"
              }`}
            >
              <Award className="w-3.5 h-3.5 text-brand-gold/60" />
              Exhibitions
            </button>

          </div>

          {/* Section 3: Content switch rendering with animations */}
          <div className="mt-2 min-h-[400px]">
            {activeTab === "masterpieces" && (
              <motion.div
                key="masterpieces-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Filter chip bar */}
                <div className="max-w-4xl mx-auto px-4">
                  <FilterBar
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    categories={categoriesList}
                  />
                </div>

                {/* Grid listing */}
                <GalleryGrid
                  artworks={filteredArtworks}
                  onArtworkClick={(art) => setSelectedArtwork(art)}
                />
              </motion.div>
            )}

            {activeTab === "journal" && (
              <motion.div
                key="journal-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <JournalList
                  posts={journalPosts}
                  onLikePost={handleLikeJournalPost}
                />
              </motion.div>
            )}

            {activeTab === "exhibitions" && (
              <motion.div
                key="exhibitions-panel"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ExhibitionsList
                  exhibitions={exhibitions}
                />
              </motion.div>
            )}
          </div>

        </main>

        {/* Styled footer bar */}
        <footer className="py-12 bg-[#060606] border-t border-white/5 mt-auto text-center space-y-3.5 select-none font-sans">
          <div className="flex items-center justify-center gap-2 text-brand-gold/60">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Elena Rostova Studio</span>
          </div>
          <p className="text-[10px] text-zinc-500 font-serif italic tracking-wide">
            © 2026 Elena Rostova. Co-represented globally by Galerie de l'Élysée, Paris.
          </p>
          <p className="text-[9px] text-neutral-600 font-mono uppercase tracking-[0.18em]">
            Powered by Antigravity and Gemini Models. All original studies protected.
          </p>
        </footer>

        {/* MODAL VIEWERS */}
        
        {/* Full post detailed drawer (Instagram detail viewer) */}
        <AnimatePresence>
          {selectedArtwork && (
            <ArtworkModal
              artwork={selectedArtwork}
              onClose={() => setSelectedArtwork(null)}
              onLikeToggle={handleLikeToggle}
              onAddComment={handleAddComment}
              onInquireClick={(title) => {
                // Focus inquiry with name
                setSelectedArtwork(null);
                handleTriggerInquiry(title);
              }}
            />
          )}
        </AnimatePresence>

        {/* Host upload new masterpiece modal */}
        <AnimatePresence>
          {showAddPost && (
            <AddPostModal
              onClose={() => setShowAddPost(false)}
              onPostAdd={handleAddArtworkPost}
            />
          )}
        </AnimatePresence>

        {/* Dynamic secure inquiry modal */}
        <AnimatePresence>
          {showInquiry && (
            <InquiryModal
              initialSubject={inquirySubject}
              onClose={() => {
                setShowInquiry(false);
                setInquirySubject("");
              }}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
