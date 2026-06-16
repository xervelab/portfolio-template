import React, { useState, useEffect } from "react";
import { ArtistProfile } from "../types";
import { Check, Compass, Globe, MapPin, Sparkles, MessageSquare, Plus, ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  profile: ArtistProfile;
  onInquireClick: () => void;
  onAddPostClick: () => void;
}

interface Highlight {
  id: string;
  title: string;
  coverUrl: string;
  stories: {
    url: string;
    type: "image";
    caption: string;
  }[];
}

const HIGHLIGHTS: Highlight[] = [
  {
    id: "h1",
    title: "🎨 Studio Room",
    coverUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=200",
    stories: [
      {
        url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800",
        type: "image",
        caption: "Late night reflections under the canvas lights. Oil odors & jazz playing."
      },
      {
        url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
        type: "image",
        caption: "Palette setup of the day. Pure cadmium, prussian blue & ochres ready."
      }
    ]
  },
  {
    id: "h2",
    title: "🖼️ Paris Show",
    coverUrl: "https://images.unsplash.com/photo-1492037766109-2110e4625a61?auto=format&fit=crop&q=80&w=200",
    stories: [
      {
        url: "https://images.unsplash.com/photo-1492037766109-2110e4625a61?auto=format&fit=crop&q=80&w=800",
        type: "image",
        caption: "Galerie de l'Élysée opening. Grateful for everyone who turned up!"
      },
      {
        url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
        type: "image",
        caption: "'Amaryllis Nocturne' standing on the East gallery wall under museum spotlight."
      }
    ]
  },
  {
    id: "h3",
    title: "✨ Raw Process",
    coverUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=200",
    stories: [
      {
        url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800",
        type: "image",
        caption: "Charcoal underdrawings before the paint glazes settle. The foundation."
      },
      {
        url: "/images/artwork_woodlands_1781577205679.jpg",
        type: "image",
        caption: "Finishing touches on the Gilded Forest woodland canopy using a heavy trowel."
      }
    ]
  },
  {
    id: "h4",
    title: "🍵 Musings",
    coverUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    stories: [
      {
        url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
        type: "image",
        caption: "Answering your DM questions: Yes, I grind my own minerals for the watercolor!"
      }
    ]
  }
];

export default function Header({ profile, onInquireClick, onAddPostClick }: HeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(profile.followersCount);
  const [activeHighlight, setActiveHighlight] = useState<Highlight | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [storyProgress, setStoryProgress] = useState(0);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowers((prev) => prev - 1);
    } else {
      setFollowers((prev) => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };

  // Story autoplay effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timer: NodeJS.Timeout;

    if (activeHighlight) {
      setStoryProgress(0);
      const storyDuration = 5000; // 5s per story
      const steps = 100;
      const stepDuration = storyDuration / steps;

      interval = setInterval(() => {
        setStoryProgress((prev) => {
          if (prev >= 100) {
            handleNextStory();
            return 0;
          }
          return prev + 1;
        });
      }, stepDuration);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [activeHighlight, currentStoryIndex]);

  const handleNextStory = () => {
    if (!activeHighlight) return;
    if (currentStoryIndex < activeHighlight.stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setStoryProgress(0);
    } else {
      // Loop or close
      setActiveHighlight(null);
    }
  };

  const handlePrevStory = () => {
    if (!activeHighlight) return;
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setStoryProgress(0);
    } else {
      setCurrentStoryIndex(0);
      setStoryProgress(0);
    }
  };

  const startStory = (highlight: Highlight) => {
    setActiveHighlight(highlight);
    setCurrentStoryIndex(0);
    setStoryProgress(0);
  };

  const formatStats = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <header className="py-6 sm:py-10 md:py-14 border-b border-white/10" id="artist-profile-header">
      {/* Top Profile Card Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center md:items-start md:gap-16 gap-5 sm:gap-8">
          
          {/* Avatar Area with Elegant Minimal gold-cream Border */}
          <div className="relative group flex-shrink-0 cursor-pointer">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand-gold to-brand-cream rounded-full opacity-70 group-hover:opacity-100 transition duration-500 blur-xs"></div>
            <div className="relative p-1.5 bg-[#0A0A0A] rounded-full">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded-full filter grayscale-[15%] group-hover:grayscale-0 transition duration-500"
                id="artist-avatar"
              />
            </div>
            {profile.availableForCommissions && (
              <span className="absolute bottom-1 right-1 bg-[#0A0A0A] border border-brand-gold/60 text-brand-gold text-[9px] uppercase tracking-widest font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-ping"></span>
                Active
              </span>
            )}
          </div>

          {/* Biography & Metrics Content Grid */}
          <div className="flex-1 text-center md:text-left min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-4 sm:mb-6">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-light tracking-tight text-[#E5E5E5] font-display" id="artist-title">
                  {profile.username}
                </h1>
                <span className="text-brand-gold border border-brand-gold/30 p-1 rounded-full inline-flex items-center justify-center text-[8px]" title="Represented Artist">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              </div>

              {/* Action Callouts */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                <button
                  onClick={handleFollowToggle}
                  className={`text-[10px] sm:text-xs font-medium uppercase tracking-widest px-4 sm:px-6 py-2 rounded-md transition-all duration-300 font-sans cursor-pointer ${
                    isFollowing
                      ? "bg-neutral-900 text-brand-gold border border-brand-gold/20 hover:bg-neutral-800"
                      : "bg-[#E5E5E5] text-black hover:bg-brand-cream"
                  }`}
                  id="follow-button"
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
                <button
                  onClick={onInquireClick}
                  className="text-[10px] sm:text-xs font-medium uppercase tracking-widest px-3 sm:px-5 py-2 bg-neutral-950 border border-white/10 hover:border-brand-gold/50 text-[#E5E5E5] hover:text-brand-gold rounded-md transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2 font-sans"
                  id="inquire-button"
                >
                  <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  Inquire
                </button>
                <button
                  onClick={onAddPostClick}
                  className="p-2 bg-neutral-950 border border-white/10 hover:border-brand-gold/50 text-[#E5E5E5] hover:text-brand-gold rounded-md transition-all duration-300 cursor-pointer"
                  title="Upload artwork"
                  id="upload-button"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Metrics List */}
            <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-8 mb-6 border-y md:border-y-0 border-white/10 py-3 md:py-0 text-[#E5E5E5]/60 font-sans font-light text-[11px] sm:text-xs tracking-wider">
              <span>
                <strong className="text-white font-medium">9</strong> masterpieces
              </span>
              <span>
                <strong className="text-white font-medium">
                  {formatStats(followers)}
                </strong> followers
              </span>
              <span>
                <strong className="text-white font-medium">
                  {profile.followingCount}
                </strong> following
              </span>
            </div>

            {/* Detailed Credentials & Bio */}
            <div className="text-xs sm:text-sm space-y-2 sm:space-y-3 mt-3 sm:mt-4">
              <p className="font-serif italic text-base sm:text-lg text-brand-cream/90 font-light tracking-wide">{profile.name}</p>
              <p className="text-brand-gold/80 italic text-[11px] sm:text-xs tracking-wide font-serif">{profile.tagline}</p>
              <p className="whitespace-pre-line leading-relaxed text-[#E5E5E5]/80 font-light max-w-xl text-center md:text-left text-xs sm:text-sm">
                {profile.bio}
              </p>

              {/* Sub-details Row */}
              <div className="pt-3 flex flex-wrap justify-center md:justify-start gap-3 sm:gap-5 text-[11px] sm:text-xs text-[#E5E5E5]/50 font-sans tracking-wide">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold/60" />
                  {profile.location}
                </span>
                <a
                  href={`https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-brand-gold hover:text-brand-cream transition-colors duration-300"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {profile.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Story Bubbles Row */}
        <div className="mt-8 sm:mt-12 overflow-x-auto scrollbar-none flex justify-start md:justify-center gap-4 sm:gap-8 py-3 px-2 border-t border-white/10">
          {HIGHLIGHTS.map((highlight) => (
            <button
              key={highlight.id}
              onClick={() => startStory(highlight)}
              className="flex flex-col items-center gap-2 group flex-shrink-0 cursor-pointer"
            >
              <div className="relative p-[1px] rounded-full transition-transform duration-300 group-hover:scale-105">
                <div className="absolute inset-0 bg-white/10 rounded-full"></div>
                {/* Elegant gold ring for highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/40 to-brand-cream/30 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-[3px] bg-[#0A0A0A] rounded-full">
                  <img
                    src={highlight.coverUrl}
                    alt={highlight.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded-full filter grayscale contrast-[110%] group-hover:grayscale-0 transition duration-300"
                  />
                </div>
              </div>
              <span className="text-[10px] tracking-widest uppercase text-[#E5E5E5]/60 group-hover:text-brand-gold transition-colors duration-300">
                {highlight.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Interactive Stories Overlay */}
      <AnimatePresence>
        {activeHighlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-55 flex items-center justify-center p-0 md:p-6 backdrop-blur-md"
            onKeyDown={(e) => {
              if (e.key === "Escape") setActiveHighlight(null);
            }}
          >
            {/* Background click closes */}
            <div className="absolute inset-0 cursor-default" onClick={() => setActiveHighlight(null)}></div>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-sm h-full md:max-h-[85vh] bg-[#111111] md:rounded-lg overflow-hidden flex flex-col shadow-2xl z-10 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header inside story banner */}
              <div className="absolute top-0 inset-x-0 p-5 bg-gradient-to-b from-black/90 to-transparent z-20 flex flex-col gap-4">
                
                {/* Story Indicators */}
                <div className="flex gap-1.5 w-full">
                  {activeHighlight.stories.map((story, idx) => (
                    <div key={idx} className="h-[2px] flex-1 bg-white/20 overflow-hidden">
                      <div
                        className="h-full bg-brand-gold transition-all duration-75 ease-linear"
                        style={{
                          width:
                            idx < currentStoryIndex
                              ? "100%"
                              : idx === currentStoryIndex
                              ? `${storyProgress}%`
                              : "0%",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Profile indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full border border-white/10 object-cover"
                    />
                    <div>
                      <span className="text-xs font-medium tracking-wider text-[#E5E5E5] block font-display">{profile.username}</span>
                      <span className="text-[9px] uppercase tracking-widest text-[#E5E5E5]/50 block font-sans">{activeHighlight.title}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveHighlight(null)}
                    className="p-1.5 text-[#E5E5E5]/60 hover:text-white cursor-pointer transition-colors duration-250"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Story Visual Frame */}
              <div className="relative flex-1 flex items-center justify-center bg-black select-none">
                {/* Navigation left/right clicking areas */}
                <div className="absolute inset-y-0 left-0 w-1/4 z-10 cursor-pointer" onClick={handlePrevStory}></div>
                <div className="absolute inset-y-0 right-0 w-1/4 z-10 cursor-pointer" onClick={handleNextStory}></div>

                <img
                  src={activeHighlight.stories[currentStoryIndex].url}
                  alt="Story content"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                />

                {/* Overlay Caption on Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-6 pt-16 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10 text-center">
                  <p className="text-brand-cream text-xs leading-relaxed tracking-wide font-sans font-light">
                    {activeHighlight.stories[currentStoryIndex].caption}
                  </p>
                </div>
              </div>

              {/* Story navigation helpers */}
              <div className="absolute inset-y-1/2 left-2 -translate-y-1/2 z-20 hidden md:block">
                <button
                  onClick={handlePrevStory}
                  className="p-2 rounded-full bg-black/50 border border-white/5 text-[#E5E5E5] hover:text-white hover:bg-black/80 transition-all duration-350 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute inset-y-1/2 right-2 -translate-y-1/2 z-20 hidden md:block">
                <button
                  onClick={handleNextStory}
                  className="p-2 rounded-full bg-black/50 border border-white/5 text-[#E5E5E5] hover:text-white hover:bg-black/80 transition-all duration-350 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
