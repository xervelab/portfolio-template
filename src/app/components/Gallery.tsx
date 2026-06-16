import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Share2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const paintings = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop&auto=format",
    title: "Crimson Tide",
    medium: "Oil on canvas, 36×48in",
    year: 2024,
    likes: 3241,
    comments: 87,
    caption: "Sometimes the canvas bleeds what words can't say. 🎨 #abstractart #oilpainting #contemporaryart",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=600&h=600&fit=crop&auto=format",
    title: "Spectrum No. 7",
    medium: "Acrylic on canvas, 24×30in",
    year: 2024,
    likes: 2187,
    comments: 54,
    caption: "Red, blue, yellow — the whole world in three primary truths. Available at the studio. #spectrum #acrylicpainting",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=600&h=600&fit=crop&auto=format",
    title: "Spring Emergence",
    medium: "Oil on canvas, 30×40in",
    year: 2024,
    likes: 4052,
    comments: 112,
    caption: "Green breaking through. Painted during three consecutive spring mornings. ☀️ #spring #oilpainting",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1618331833071-ce81bd50d300?w=600&h=600&fit=crop&auto=format",
    title: "Ocean Memory",
    medium: "Oil on canvas, 48×60in",
    year: 2023,
    likes: 5890,
    comments: 203,
    caption: "The ocean holds every colour it's ever seen. Large format piece. DM for details. 🌊 #oceanpainting #blueabstract",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1533208087231-c3618eab623c?w=600&h=600&fit=crop&auto=format",
    title: "Fractured Light",
    medium: "Mixed media, 20×24in",
    year: 2023,
    likes: 1923,
    comments: 41,
    caption: "Light doesn't break — it multiplies. Mixed media exploration. #lightpainting #mixedmedia",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=600&h=600&fit=crop&auto=format",
    title: "Midnight Storm",
    medium: "Acrylic on canvas, 36×36in",
    year: 2023,
    likes: 3417,
    comments: 98,
    caption: "Painted entirely at night. Blue and red — tension before the calm. #midnightstudio #acrylicpainting",
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1532640331846-d2da5987c3ee?w=600&h=600&fit=crop&auto=format",
    title: "Carnival Dream",
    medium: "Oil on canvas, 24×36in",
    year: 2023,
    likes: 2761,
    comments: 67,
    caption: "A dream I kept having about a childhood fair. #carnival #oilpainting #figurative",
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1552312097-8ef75595e2a2?w=600&h=600&fit=crop&auto=format",
    title: "Dusk Protocol",
    medium: "Acrylic on board, 18×24in",
    year: 2022,
    likes: 1654,
    comments: 33,
    caption: "The moment between day and not-yet-night. One of my favorites from the 2022 series. #dusk #moodpainting",
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1523372102243-c9426fc31b88?w=600&h=600&fit=crop&auto=format",
    title: "Silent Garden",
    medium: "Oil on canvas, 30×30in",
    year: 2022,
    likes: 4103,
    comments: 145,
    caption: "Gardens remember everything. This piece took 6 weeks. #garden #oilpainting #texture",
  },
];

function formatCount(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

interface ModalProps {
  painting: typeof paintings[0];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

function PaintingModal({ painting, onClose, onPrev, onNext, hasPrev, hasNext }: ModalProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full"
        style={{ color: "var(--foreground)" }}
      >
        <X size={24} />
      </button>

      {hasPrev && (
        <button
          className="absolute left-4 md:left-8 z-50 p-2 rounded-full"
          style={{ color: "var(--foreground)", background: "rgba(0,0,0,0.5)" }}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {hasNext && (
        <button
          className="absolute right-4 md:right-8 z-50 p-2 rounded-full"
          style={{ color: "var(--foreground)", background: "rgba(0,0,0,0.5)" }}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <ChevronRight size={24} />
        </button>
      )}

      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        className="flex flex-col md:flex-row w-full max-w-5xl overflow-hidden rounded-sm"
        style={{ maxHeight: "90vh", background: "var(--card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="w-full md:w-[60%] bg-black flex-shrink-0 flex items-center justify-center" style={{ minHeight: "300px" }}>
          <img
            src={painting.url}
            alt={painting.title}
            className="w-full h-full object-cover"
            style={{ maxHeight: "90vh" }}
          />
        </div>

        {/* Info panel */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: "var(--border)" }}>
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1551180452-aea351b23949?w=80&h=80&fit=crop&auto=format"
                alt="maya.chen.art"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--foreground)" }}>
                maya.chen.art
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--muted-foreground)" }}>
                {painting.medium}
              </p>
            </div>
          </div>

          {/* Caption */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1551180452-aea351b23949?w=80&h=80&fit=crop&auto=format"
                  alt="maya.chen.art"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--foreground)" }}>
                  maya.chen.art{" "}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--foreground)" }}>
                  {painting.caption}
                </span>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "var(--muted-foreground)", marginTop: "4px" }}>
                  {painting.year}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { user: "artlover_nyc", comment: "This is absolutely stunning! 😍" },
                { user: "gallery_21", comment: "Would love to feature this piece in our upcoming show." },
                { user: "paint_obsessed", comment: "The texture in this piece is incredible. What brushes do you use?" },
              ].map(({ user, comment: c }) => (
                <div key={user} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: "var(--muted)" }} />
                  <div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--foreground)" }}>
                      {user}{" "}
                    </span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--foreground)" }}>
                      {c}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="border-t" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-4">
                <button onClick={() => setLiked(!liked)} style={{ color: liked ? "#ed4956" : "var(--foreground)" }}>
                  <Heart size={24} fill={liked ? "#ed4956" : "none"} />
                </button>
                <button style={{ color: "var(--foreground)" }}>
                  <MessageCircle size={24} />
                </button>
                <button style={{ color: "var(--foreground)" }}>
                  <Share2 size={24} />
                </button>
              </div>
              <button onClick={() => setSaved(!saved)} style={{ color: "var(--foreground)" }}>
                <Bookmark size={24} fill={saved ? "var(--foreground)" : "none"} />
              </button>
            </div>
            <div className="px-4 pb-2">
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", color: "var(--foreground)" }}>
                {formatCount(painting.likes + (liked ? 1 : 0))} likes
              </p>
            </div>
            <div className="flex gap-2 px-4 pb-4">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment…"
                className="flex-1 bg-transparent outline-none"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "var(--foreground)",
                  caretColor: "var(--foreground)",
                }}
              />
              {comment && (
                <button
                  onClick={() => setComment("")}
                  style={{ color: "var(--accent)", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px" }}
                >
                  Post
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="max-w-[935px] mx-auto">
      <div className="grid grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
        {paintings.map((p, i) => (
          <motion.div
            key={p.id}
            className="relative cursor-pointer overflow-hidden"
            style={{ aspectRatio: "1/1", background: "var(--muted)" }}
            onClick={() => setSelectedIdx(i)}
            onHoverStart={() => setHoveredId(p.id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            <img
              src={p.url}
              alt={p.title}
              className="w-full h-full object-cover transition-transform duration-300"
              style={{ transform: hoveredId === p.id ? "scale(1.04)" : "scale(1)" }}
            />
            <AnimatePresence>
              {hoveredId === p.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center gap-6"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  <div className="flex items-center gap-1.5" style={{ color: "#fff" }}>
                    <Heart size={20} fill="#fff" />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "15px" }}>
                      {formatCount(p.likes)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5" style={{ color: "#fff" }}>
                    <MessageCircle size={20} fill="#fff" />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "15px" }}>
                      {p.comments}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <PaintingModal
            painting={paintings[selectedIdx]}
            onClose={() => setSelectedIdx(null)}
            onPrev={() => setSelectedIdx((i) => (i !== null ? i - 1 : null))}
            onNext={() => setSelectedIdx((i) => (i !== null ? i + 1 : null))}
            hasPrev={selectedIdx > 0}
            hasNext={selectedIdx < paintings.length - 1}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
