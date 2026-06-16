import { useState, useEffect } from "react";
import { Heart, MessageCircle, Bookmark, Share2, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const SHEET_API_URL =
  "https://sheetdb.io/api/v1/de7mxzfmbvmy7";

interface Painting {
  id: number;
  url: string;
  title: string;
  medium: string;
  year: number;
  likes: number;
  comments: number;
  caption: string;
}

function usePaintings() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchPaintings() {
      try {
        const res = await fetch(SHEET_API_URL, { redirect: "follow" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Support both array directly or { data: [...] } wrapper
        const rows: any[] = Array.isArray(data) ? data : data.data ?? data.rows ?? [];

        if (rows.length === 0) throw new Error("Empty response");

        const mapped: Painting[] = rows.map((row: any, idx: number) => ({
          id: Number(row.ID ?? row.id) || idx + 1,
          url: row["Image URL"] ?? row.url ?? row.image ?? row.imageUrl ?? "",
          title: row.Title ?? row.title ?? row.name ?? "Untitled",
          medium: row.Medium ?? row.medium ?? "",
          year: Number(row.Year ?? row.year) || new Date().getFullYear(),
          likes: Number(String(row.Likes ?? row.likes ?? 0).replace(/,/g, "")) || 0,
          comments: Number(String(row.Comments ?? row.comments ?? 0).replace(/,/g, "")) || 0,
          caption: row.Caption ?? row.caption ?? "",
        }));

        if (!cancelled) {
          setPaintings(mapped);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setPaintings([]);
          setLoading(false);
        }
      }
    }

    fetchPaintings();
    return () => { cancelled = true; };
  }, []);

  return { paintings, loading };
}

function formatCount(n: number) {
  return n >= 1000 ? (n / 1000).toFixed(1) + "K" : String(n);
}

interface ModalProps {
  painting: Painting;
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
  const { paintings, loading } = usePaintings();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  if (loading) {
    return (
      <div className="max-w-[935px] mx-auto flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin" style={{ color: "var(--muted-foreground)" }} />
      </div>
    );
  }

  return (
    <div className="max-w-[935px] mx-auto">
      <div className="grid grid-cols-3 gap-[2px] md:gap-1 stagger-fade" style={{ background: "var(--border)" }}>
        {paintings.map((p, i) => (
          <motion.div
            key={p.id}
            className="relative cursor-pointer overflow-hidden painting-hover"
            style={{ aspectRatio: "1/1", background: "var(--muted)" }}
            onClick={() => setSelectedIdx(i)}
            onHoverStart={() => setHoveredId(p.id)}
            onHoverEnd={() => setHoveredId(null)}
          >
            <img
              src={p.url}
              alt={p.title}
              className="w-full h-full object-cover"
            />
            <AnimatePresence>
              {hoveredId === p.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.6), rgba(139,92,246,0.3))" }}
                >
                  {/* Title overlay */}
                  <motion.p
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{ delay: 0.05 }}
                    style={{ fontFamily: "'DM Serif Display', serif", fontSize: "14px", color: "#fff", fontStyle: "italic", textAlign: "center", padding: "0 8px" }}
                  >
                    {p.title}
                  </motion.p>
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1.5" style={{ color: "#fff" }}>
                      <Heart size={18} fill="#fff" />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "14px" }}>
                        {formatCount(p.likes)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5" style={{ color: "#fff" }}>
                      <MessageCircle size={18} fill="#fff" />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "14px" }}>
                        {p.comments}
                      </span>
                    </div>
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
