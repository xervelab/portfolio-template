import { useState, useEffect, useCallback } from "react";
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Grid3X3, PlaySquare, Bookmark as BookmarkIcon, UserSquare2, Paintbrush, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useSheetSingle, useSheetData, mapProfile, mapHighlights, DEFAULT_PROFILE, type ProfileData, type HighlightItem } from "../hooks/useSheetData";

// ── Story Viewer Modal ──
interface StoryViewerProps {
  highlights: HighlightItem[];
  startIndex: number;
  onClose: () => void;
}

function StoryViewer({ highlights, startIndex, onClose }: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);

  const STORY_DURATION = 5000; // 5 seconds per story

  const goNext = useCallback(() => {
    if (currentIndex < highlights.length - 1) {
      setCurrentIndex((i) => i + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, highlights.length, onClose]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  // Auto-advance timer
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          goNext();
          return 0;
        }
        return p + (100 / (STORY_DURATION / 50));
      });
    }, 50);
    return () => clearInterval(interval);
  }, [currentIndex, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  const current = highlights[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.95)" }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] p-2 rounded-full hover:bg-white/10 transition-colors"
        style={{ color: "#fff" }}
      >
        <X size={24} />
      </button>

      {/* Story container */}
      <motion.div
        key={currentIndex}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-[420px] mx-4"
        style={{ aspectRatio: "9/16", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 z-20 flex gap-1">
          {highlights.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.3)" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  background: "#fff",
                  width: i < currentIndex ? "100%" : i === currentIndex ? `${progress}%` : "0%",
                  transition: i === currentIndex ? "none" : "width 0.2s",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header info */}
        <div className="absolute top-8 left-3 right-3 z-20 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30">
            <img
              src={current.imageUrl}
              alt={current.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#fff" }}>
            {current.name}
          </span>
        </div>

        {/* Image */}
        <div className="w-full h-full rounded-xl overflow-hidden">
          <img
            src={current.imageUrl}
            alt={current.name}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 rounded-xl" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 70%, rgba(0,0,0,0.6) 100%)" }} />
        </div>

        {/* Story title at bottom */}
        <div className="absolute bottom-6 left-4 right-4 z-20 text-center">
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "20px", color: "#fff", fontStyle: "italic" }}>
            {current.name}
          </p>
        </div>

        {/* Navigation tap zones */}
        <div
          className="absolute top-0 left-0 w-1/3 h-full z-10 cursor-pointer"
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
        />
        <div
          className="absolute top-0 right-0 w-1/3 h-full z-10 cursor-pointer"
          onClick={(e) => { e.stopPropagation(); goNext(); }}
        />
      </motion.div>

      {/* Desktop arrow buttons */}
      {currentIndex > 0 && (
        <button
          className="absolute left-4 md:left-8 z-[110] p-2 rounded-full hidden md:flex items-center justify-center hover:bg-white/10 transition-colors"
          style={{ color: "#fff" }}
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
        >
          <ChevronLeft size={28} />
        </button>
      )}
      {currentIndex < highlights.length - 1 && (
        <button
          className="absolute right-4 md:right-8 z-[110] p-2 rounded-full hidden md:flex items-center justify-center hover:bg-white/10 transition-colors"
          style={{ color: "#fff" }}
          onClick={(e) => { e.stopPropagation(); goNext(); }}
        >
          <ChevronRight size={28} />
        </button>
      )}
    </motion.div>
  );
}

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onMessageClick?: () => void;
}

export function Header({ activeTab, onTabChange, onMessageClick }: HeaderProps) {
  const [following, setFollowing] = useState(false);
  const [storyIndex, setStoryIndex] = useState<number | null>(null);
  const { data: profile } = useSheetSingle<ProfileData>("Profile", mapProfile, DEFAULT_PROFILE);
  const { data: highlights } = useSheetData<HighlightItem>("Highlights", mapHighlights, []);

  const tabs = [
    { id: "posts", icon: Grid3X3, label: "POSTS" },
    { id: "reels", icon: PlaySquare, label: "REELS" },
  ];

  return (
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      {/* Artistic Mood Strip - personalized "currently" status */}
      {profile.currentlyWorking && (
        <div className="flex items-center justify-center gap-2 py-2.5 px-4" style={{ background: "linear-gradient(90deg, rgba(245,158,11,0.08), rgba(236,72,152,0.08), rgba(139,92,246,0.08))" }}>
          <Paintbrush size={12} style={{ color: "#f59e0b" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "var(--muted-foreground)", letterSpacing: "0.03em" }}>
            Currently painting: <span style={{ color: "var(--foreground)", fontWeight: 500 }}>{profile.currentlyWorking}</span>
          </span>
          <span className="pulse-glow inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
        </div>
      )}

      {/* Profile section */}
      <div className="max-w-[935px] mx-auto px-4 py-8">
        <div className="flex items-start gap-8 md:gap-20">
          {/* Avatar with animated gradient ring */}
          <div className="flex-shrink-0">
            <div className="relative">
              {/* Animated gradient ring */}
              <div className="avatar-ring absolute -inset-[3px] rounded-full" />
              <div className="relative w-20 h-20 md:w-36 md:h-36 rounded-full overflow-hidden ring-[3px] ring-offset-[3px]" style={{ ringColor: "transparent", ringOffsetColor: "var(--background)" }}>
                <img
                  src={profile.avatarUrl}
                  alt={`${profile.displayName} — artist portrait`}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online/Active indicator */}
              <span className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-3.5 h-3.5 md:w-5 md:h-5 rounded-full border-2 md:border-3 flex items-center justify-center" style={{ background: "#10b981", borderColor: "var(--background)" }}>
                <Sparkles size={8} color="#fff" className="hidden md:block" />
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Username row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "20px", fontWeight: 300, color: "var(--foreground)", lineHeight: 1 }}>
                {profile.username}
              </h1>
              {/* Verified badge with gradient */}
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full" style={{ background: "linear-gradient(135deg, #f59e0b, #ec4899)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </span>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setFollowing(!following)}
                className="px-4 py-1.5 rounded-lg text-sm transition-all duration-300"
                style={{
                  background: following ? "var(--secondary)" : "linear-gradient(135deg, #f59e0b, #ec4899)",
                  color: following ? "var(--foreground)" : "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  boxShadow: following ? "none" : "0 4px 12px rgba(236,72,152,0.3)",
                }}
              >
                {following ? "Following" : "Follow"}
              </motion.button>
              <button
                onClick={onMessageClick}
                className="px-4 py-1.5 rounded-lg text-sm cursor-pointer transition-all duration-200 hover:opacity-80"
                style={{
                  background: "var(--secondary)",
                  color: "var(--foreground)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Message
              </button>
              <button style={{ color: "var(--foreground)" }}>
                <MoreHorizontal size={24} />
              </button>
            </div>

            {/* Stats with subtle hover highlights */}
            <div className="flex gap-6 mb-4">
              {[
                { value: profile.posts, label: "posts" },
                { value: profile.followers, label: "followers" },
                { value: profile.following, label: "following" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center md:text-left md:flex md:gap-1 md:items-baseline group cursor-pointer">
                  <span className="transition-colors duration-200 group-hover:gradient-text" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "16px", color: "var(--foreground)" }}>
                    {value}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "var(--foreground)" }}>
                    {" "}{label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bio with artistic flair */}
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--foreground)", marginBottom: "2px" }}>
                {profile.displayName}
              </p>
              {profile.quote && (
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "13px", color: "var(--muted-foreground)", fontStyle: "italic", marginBottom: "4px" }}>
                  "{profile.quote}"
                </p>
              )}
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--foreground)", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {profile.bio}
                {profile.availableForCommissions && (
                  <>
                    {"\n"}<span className="gradient-text" style={{ fontWeight: 500 }}>✦ Available for commissions</span>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Stories highlights with enhanced rings */}
        {highlights.length > 0 && (
          <div className="flex gap-5 mt-8 overflow-x-auto pb-2 scrollbar-hide">
            {highlights.map((hl, idx) => (
              <div
                key={hl.id}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group"
                onClick={() => setStoryIndex(idx)}
              >
                <div className="relative">
                  {/* Gradient ring on hover */}
                  <div
                    className="absolute -inset-[2px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "conic-gradient(from 0deg, #f59e0b, #ec4899, #8b5cf6, #3b82f6, #10b981, #f59e0b)" }}
                  />
                  <div
                    className="relative w-16 h-16 rounded-full overflow-hidden"
                    style={{ border: "3px solid var(--background)" }}
                  >
                    <img
                      src={hl.imageUrl}
                      alt={hl.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <span className="group-hover:gradient-text transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--foreground)" }}>
                  {hl.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Story Viewer */}
      <AnimatePresence>
        {storyIndex !== null && highlights.length > 0 && (
          <StoryViewer
            highlights={highlights}
            startIndex={storyIndex}
            onClose={() => setStoryIndex(null)}
          />
        )}
      </AnimatePresence>

      {/* Tabs with brush-stroke underline */}
      <div className="flex justify-center border-t" style={{ borderColor: "var(--border)" }}>
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-xs tracking-widest relative transition-all duration-300 ${activeTab === id ? "brush-underline" : ""}`}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              color: activeTab === id ? "var(--foreground)" : "var(--muted-foreground)",
            }}
          >
            <Icon size={12} />
            <span className="hidden md:inline">{label}</span>
            {activeTab === id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, #f59e0b, #ec4899)" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
