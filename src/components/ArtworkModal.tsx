import React, { useState, useRef, useEffect } from "react";
import { Artwork, Comment } from "../types";
import { Heart, MessageCircle, Send, X, ShoppingBag, Share2, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ArtworkModalProps {
  artwork: Artwork;
  onClose: () => void;
  onLikeToggle: (id: string) => void;
  onAddComment: (id: string, text: string, username: string) => void;
  onInquireClick: (artworkTitle: string) => void;
}

export default function ArtworkModal({
  artwork,
  onClose,
  onLikeToggle,
  onAddComment,
  onInquireClick
}: ArtworkModalProps) {
  const [commentText, setCommentText] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const commentsEndRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto scroll comments
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [artwork.comments]);

  // Handle double-click for like trigger (like Instagram)
  const handleImageClick = (e: React.MouseEvent) => {
    if (clickTimeoutRef.current) {
      // It's a double click!
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      
      if (!artwork.hasLiked) {
        onLikeToggle(artwork.id);
      }
      setShowHeartOverlay(true);
      setTimeout(() => setShowHeartOverlay(false), 800);
    } else {
      // First click
      clickTimeoutRef.current = setTimeout(() => {
        clickTimeoutRef.current = null;
      }, 300);
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const finalName = visitorName.trim() || "Visitor";
    onAddComment(artwork.id, commentText.trim(), finalName);
    setCommentText("");
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(`${url}#artwork-${artwork.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-0 md:p-12 bg-black/90 backdrop-blur-md overflow-hidden" id="artwork-modal-overlay">
      {/* Click background to close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose}></div>

      {/* Main Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ type: "spring", speed: 10, bounciness: 3 }}
        className="relative bg-[#111111] border border-white/10 w-full max-w-5xl h-full md:h-[80vh] md:max-h-[660px] flex flex-col md:flex-row md:rounded-lg overflow-hidden shadow-2xl z-10 max-h-[100dvh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button (Top right float over art on mobile/tablet) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden z-30 p-2.5 bg-[#0A0A0A]/80 border border-white/10 text-white rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT PANEL: Responsive Canvas View */}
        <div className="relative flex-[1.4] bg-[#0A0A0A] flex items-center justify-center h-[35%] sm:h-[42%] md:h-full group select-none overflow-hidden p-3 sm:p-6 md:p-12 border-b md:border-b-0 md:border-r border-white/10 min-h-0">
          <div className="w-full h-full max-w-md max-h-md flex items-center justify-center bg-[#151515] shadow-inner border border-white/5 relative">
            <img
              src={artwork.imageUrl}
              alt={artwork.title}
              referrerPolicy="no-referrer"
              onClick={handleImageClick}
              className="w-full h-full object-contain cursor-pointer select-none filter contrast-[105%]"
              id={`modal-art-img-${artwork.id}`}
            />
          </div>
          
          {/* Heart overlay pulse animation on double click */}
          <AnimatePresence>
            {showHeartOverlay && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0, scale: 1.6 }}
                transition={{ type: "spring", stiffness: 450, damping: 15 }}
                className="absolute text-[#E5E5E5] pointer-events-none z-20 flex flex-col items-center gap-2"
              >
                <Heart className="w-16 h-16 fill-brand-gold stroke-brand-gold drop-shadow-lg" />
                <span className="text-[9px] font-sans font-light uppercase tracking-widest bg-black/60 px-3 py-1 border border-brand-gold/30 rounded-full backdrop-blur-xs">
                  Liked
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Left Info Indicator on Canvas Screen */}
          <div className="absolute bottom-4 left-4 text-[9px] text-white/30 uppercase tracking-widest pointer-events-none hidden md:block">
            {artwork.title} • {artwork.medium}
          </div>
        </div>

        {/* RIGHT PANEL: Instagram-style Comments Sidebar */}
        <div className="flex-1 h-[65%] sm:h-[58%] md:h-full flex flex-col bg-[#111111] min-h-0 overflow-hidden">
          
          {/* Sidebar Header: Artist Intro */}
          <div className="p-4 border-b border-white/5 bg-[#111111] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10 overflow-hidden">
                <span className="text-xs text-brand-gold font-serif italic">E</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-[#E5E5E5] font-display">vance_studio</span>
                  <span className="text-brand-gold border border-brand-gold/20 leading-none rounded-full p-0.5 inline-flex items-center justify-center text-[7px]" title="Represented Artist">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </span>
                </div>
                <span className="text-[9px] text-[#E5E5E5]/40 uppercase tracking-wider block font-sans">{artwork.category}</span>
              </div>
            </div>

            {/* Close button for larger screens */}
            <button
              onClick={onClose}
              className="hidden md:flex p-1.5 hover:bg-neutral-900 border border-transparent hover:border-white/5 rounded-md text-[#E5E5E5]/60 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable feed: Statement Description + Comments */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-track-transparent" id="comments-scroller">
            
            {/* The Original Artist Statement Post */}
            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
                <span className="text-[10px] text-brand-gold font-serif italic">E</span>
              </div>
              <div className="text-xs text-[#E5E5E5]/80 leading-relaxed flex-1">
                <p className="font-medium text-[#E5E5E5] mb-1 font-display">vance_studio</p>
                <p className="text-[#E5E5E5]/70 font-sans font-light">{artwork.description}</p>
                <div className="mt-2 text-[10px] text-[#E5E5E5]/30 block font-sans mb-1">
                  Dimensions: {artwork.dimensions} • Year: {artwork.year}
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {artwork.tags.map((tg) => (
                    <span key={tg} className="text-[9px] uppercase tracking-wider text-brand-gold/60">
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Display Divider */}
            <div className="border-t border-white/5 pt-3">
              <span className="text-[9px] uppercase font-medium text-[#E5E5E5]/30 tracking-widest block">
                Comments ({artwork.comments.length})
              </span>
            </div>

            {/* Comments Stream */}
            {artwork.comments.length === 0 ? (
              <div className="text-center py-8 text-white/20">
                <MessageCircle className="w-5 h-5 mx-auto mb-2 opacity-50 text-brand-gold" />
                <p className="text-[10px] font-sans font-light tracking-wide uppercase">No discussion yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {artwork.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-gold/20 to-neutral-800 flex items-center justify-center text-[9px] text-[#E5E5E5] border border-white/5 shrink-0 uppercase font-sans font-semibold">
                      {comment.username.slice(0, 2)}
                    </div>
                    <div className="text-xs text-[#E5E5E5]/80 bg-neutral-900/40 border border-white/5 p-3 rounded flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-semibold text-[#E5E5E5]">{comment.username}</span>
                        <span className="text-[8px] text-[#E5E5E5]/30 font-light font-mono">{comment.timestamp}</span>
                      </div>
                      <p className="text-[#E5E5E5]/70 font-light">{comment.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={commentsEndRef} />
              </div>
            )}
          </div>

          {/* Transaction & Acquisition Callout Banner */}
          <div className="bg-[#0A0A0A] px-5 py-3 border-t border-white/5 text-xs flex items-center justify-between">
            <div>
              <span className="text-white/30 uppercase tracking-widest text-[8px] block font-sans mb-0.5">Acquisition Status</span>
              {artwork.isSold ? (
                <span className="text-[#E5E5E5]/50 flex items-center gap-1 font-serif italic text-[11px] font-light">
                  Private Exhibition (Sold)
                </span>
              ) : (
                <span className="text-brand-gold font-sans uppercase tracking-widest text-[9px] font-semibold flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Acquisition Available
                </span>
              )}
            </div>

            {artwork.price && (
              <div className="text-right">
                <span className="text-white/30 text-[8px] uppercase tracking-widest block font-sans mb-0.5">Est. Valuation</span>
                <span className="font-light font-sans text-brand-cream text-xs">
                  ${artwork.price.toLocaleString()} USD
                </span>
              </div>
            )}
          </div>

          {/* Social Interactions Strip (Likes, Share, Inquire) */}
          <div className="px-5 py-4 border-t border-white/15 bg-[#0A0A0A] flex items-center justify-between text-[#E5E5E5]/70 mt-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onLikeToggle(artwork.id)}
                className="hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                title={artwork.hasLiked ? "Unlike Piece" : "Like Piece"}
              >
                <Heart
                  className={`w-4 h-4 ${
                    artwork.hasLiked
                      ? "fill-brand-gold text-brand-gold"
                      : "text-[#E5E5E5]/60 hover:text-white"
                  }`}
                />
              </button>
              <button
                onClick={() => commentInputRef.current?.focus()}
                className="hover:scale-110 active:scale-95 transition-transform cursor-pointer hover:text-white"
                title="Comment"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={handleShare}
                className="hover:scale-110 active:scale-95 transition-transform relative cursor-pointer hover:text-white"
                title="Copy secure link"
              >
                <Share2 className="w-4 h-4" />
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -25, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-5 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-brand-gold border border-brand-gold/30 text-[8px] font-sans uppercase tracking-widest rounded shadow-md whitespace-nowrap"
                    >
                      Security Link Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {!artwork.isSold && (
              <button
                onClick={() => onInquireClick(artwork.title)}
                className="text-[10px] uppercase tracking-widest font-medium bg-brand-gold text-black hover:bg-brand-cream px-4 py-2 transition-all duration-300 cursor-pointer flex items-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-black" />
                Inquire Acquisition
              </button>
            )}
          </div>

          {/* COMMENT SUBMISSION FORM */}
          <form
            onSubmit={handlePostComment}
            className="p-4 border-t border-white/5 flex flex-col gap-2 bg-[#111111]"
          >
            {/* Expanded Visitor Name Signature */}
            <div className="flex items-center gap-1.5 px-1 pb-1">
              <span className="text-[8px] text-[#E5E5E5]/40 uppercase tracking-widest block font-sans font-medium">Signing as:</span>
              <input
                type="text"
                placeholder="Collector / Visitor"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                maxLength={20}
                className="w-full bg-transparent border-none p-0 text-[10px] font-sans font-medium text-brand-gold focus:outline-none focus:ring-0 placeholder-white/20"
              />
            </div>

            {/* Main input and button */}
            <div className="flex items-center gap-2">
              <input
                ref={commentInputRef}
                type="text"
                placeholder="Write an editorial comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 text-xs bg-[#0A0A0A]/65 border border-white/5 px-3 py-2.5 focus:outline-none focus:border-brand-gold/30 text-[#E5E5E5] placeholder-white/20 rounded-none font-sans font-light"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className={`p-2.5 rounded-none transition-colors cursor-pointer ${
                  commentText.trim()
                    ? "bg-[#E5E5E5] text-black hover:bg-brand-gold"
                    : "bg-neutral-900 text-white/20 select-none cursor-not-allowed"
                }`}
                title="Post comment"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

        </div>
      </motion.div>
    </div>
  );
}
