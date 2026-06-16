import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Grid3X3, PlaySquare, Bookmark as BookmarkIcon, UserSquare2, Paintbrush, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const AVATAR_URL = "https://images.unsplash.com/photo-1551180452-aea351b23949?w=150&h=150&fit=crop&auto=format";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const [following, setFollowing] = useState(false);

  const tabs = [
    { id: "posts", icon: Grid3X3, label: "POSTS" },
    { id: "reels", icon: PlaySquare, label: "REELS" },
    { id: "saved", icon: BookmarkIcon, label: "SAVED" },
    { id: "tagged", icon: UserSquare2, label: "TAGGED" },
  ];

  return (
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      {/* Artistic Mood Strip - personalized "currently" status */}
      <div className="flex items-center justify-center gap-2 py-2.5 px-4" style={{ background: "linear-gradient(90deg, rgba(245,158,11,0.08), rgba(236,72,152,0.08), rgba(139,92,246,0.08))" }}>
        <Paintbrush size={12} style={{ color: "#f59e0b" }} />
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "var(--muted-foreground)", letterSpacing: "0.03em" }}>
          Currently painting: <span style={{ color: "var(--foreground)", fontWeight: 500 }}>"Untitled No. 31"</span> — Oil on linen, 48×60in
        </span>
        <span className="pulse-glow inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#10b981" }} />
      </div>

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
                  src={AVATAR_URL}
                  alt="Maya Chen — artist portrait"
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
                maya.chen.art
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
                className="px-4 py-1.5 rounded-lg text-sm"
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
                { value: "248", label: "posts" },
                { value: "42.5K", label: "followers" },
                { value: "312", label: "following" },
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
                Maya Chen
              </p>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "13px", color: "var(--muted-foreground)", fontStyle: "italic", marginBottom: "4px" }}>
                "Every canvas is a conversation with silence"
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--foreground)", lineHeight: 1.6 }}>
                Contemporary painter · Oil & acrylic on canvas<br />
                New York · Exhibitions in NYC, Paris & Tokyo<br />
                <span className="gradient-text" style={{ fontWeight: 500 }}>✦ Available for commissions</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stories highlights with enhanced rings */}
        <div className="flex gap-5 mt-8 overflow-x-auto pb-2 scrollbar-hide">
          {["Abstract", "Portraits", "Landscapes", "Process", "Studio"].map((name, i) => (
            <div key={name} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group">
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
                    src={`https://images.unsplash.com/photo-${["1541961017774-22349e4a1262","1605721911519-3dfeb3be25e7","1618331835717-801e976710b2","1533208087231-c3618eab623c","1531913764164-f85c52e6e654"][i]}?w=80&h=80&fit=crop&auto=format`}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              <span className="group-hover:gradient-text transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--foreground)" }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

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
