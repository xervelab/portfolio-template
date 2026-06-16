import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal, Grid3X3, PlaySquare, Bookmark as BookmarkIcon, UserSquare2 } from "lucide-react";
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
      {/* Profile section */}
      <div className="max-w-[935px] mx-auto px-4 py-8">
        <div className="flex items-start gap-8 md:gap-20">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 md:w-36 md:h-36 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-black" style={{ ring: "var(--border)" }}>
              <img
                src={AVATAR_URL}
                alt="Maya Chen — artist portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Username row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "20px", fontWeight: 300, color: "var(--foreground)", lineHeight: 1 }}>
                maya.chen.art
              </h1>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setFollowing(!following)}
                className="px-4 py-1.5 rounded-lg text-sm transition-colors"
                style={{
                  background: following ? "var(--secondary)" : "var(--accent)",
                  color: following ? "var(--foreground)" : "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
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

            {/* Stats */}
            <div className="flex gap-6 mb-4">
              {[
                { value: "248", label: "posts" },
                { value: "42.5K", label: "followers" },
                { value: "312", label: "following" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center md:text-left md:flex md:gap-1 md:items-baseline">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "16px", color: "var(--foreground)" }}>
                    {value}
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "var(--foreground)" }}>
                    {" "}{label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--foreground)", marginBottom: "2px" }}>
                Maya Chen
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--foreground)", lineHeight: 1.6 }}>
                Contemporary painter · Oil & acrylic on canvas<br />
                New York · Exhibitions in NYC, Paris & Tokyo<br />
                <span style={{ color: "var(--accent)" }}>Available for commissions</span>
              </p>
            </div>
          </div>
        </div>

        {/* Stories highlights */}
        <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide">
          {["Abstract", "Portraits", "Landscapes", "Process", "Studio"].map((name, i) => (
            <div key={name} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
              <div
                className="w-16 h-16 rounded-full overflow-hidden"
                style={{ border: "2px solid var(--border)" }}
              >
                <img
                  src={`https://images.unsplash.com/photo-${["1541961017774-22349e4a1262","1605721911519-3dfeb3be25e7","1618331835717-801e976710b2","1533208087231-c3618eab623c","1531913764164-f85c52e6e654"][i]}?w=80&h=80&fit=crop&auto=format`}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--foreground)" }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-t" style={{ borderColor: "var(--border)" }}>
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="flex items-center gap-1.5 px-4 py-3 text-xs tracking-widest relative transition-colors"
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
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "var(--foreground)" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
