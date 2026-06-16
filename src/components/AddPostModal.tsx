import React, { useState } from "react";
import { ArtMedium, ArtCategory, Artwork } from "../types";
import { X, Sparkles, Send } from "lucide-react";
import { motion } from "motion/react";

interface AddPostModalProps {
  onClose: () => void;
  onPostAdd: (newArt: Omit<Artwork, "id" | "likes" | "hasLiked" | "comments" | "views">) => void;
}

const SAMPLE_CANVAS_TEMPLATES = [
  {
    name: "Crimson Expressionism",
    url: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Prussian Sea Waves",
    url: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Watercolor Blossom",
    url: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Vibrant Fluid Acrylics",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Contemporary Botanical",
    url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Abstract Canvas Splatter",
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600"
  }
];

export default function AddPostModal({ onClose, onPostAdd }: AddPostModalProps) {
  const [title, setTitle] = useState("");
  const [medium, setMedium] = useState<ArtMedium>("Oil on Canvas");
  const [category, setCategory] = useState<ArtCategory>("Landscape");
  const [year, setYear] = useState("2026");
  const [dimensions, setDimensions] = useState("100 × 100 cm");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(SAMPLE_CANVAS_TEMPLATES[0].url);
  const [price, setPrice] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const finalImage = customUrl.trim() || imageUrl;
    const parsedTags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onPostAdd({
      title: title.trim(),
      medium,
      category,
      year,
      dimensions,
      description: description.trim(),
      imageUrl: finalImage,
      price: price ? parseFloat(price) : undefined,
      isSold: false,
      tags: parsedTags.length > 0 ? parsedTags : [category, medium.replace(/\s+/g, "")],
      featured: false
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" id="add-post-modal-overlay">
      <div className="absolute inset-0 cursor-default" onClick={onClose}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative bg-[#111111] border border-white/15 w-full max-w-lg overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-gold animate-pulse" />
            <h3 className="text-base font-light tracking-widest text-[#E5E5E5] font-display uppercase">PUBLISH MASTERPIECE</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-950 border border-transparent hover:border-white/5 rounded text-[#E5E5E5]/60 hover:text-white cursor-pointer transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#111111]">
          
          {/* Template Selection Grid */}
          <div>
            <label className="text-[9px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-3">
              Step 1: Canvas Study Cover
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_CANVAS_TEMPLATES.map((tmpl) => {
                const isSelected = customUrl === "" && imageUrl === tmpl.url;
                return (
                  <button
                    key={tmpl.name}
                    type="button"
                    onClick={() => {
                      setImageUrl(tmpl.url);
                      setCustomUrl("");
                    }}
                    className={`relative aspect-square border overflow-hidden cursor-pointer transition-all ${
                      isSelected ? "border-brand-gold scale-[0.98]" : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={tmpl.url}
                      alt={tmpl.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter grayscale"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-center text-[7px] text-[#E5E5E5] truncate font-sans tracking-wide uppercase">
                      {tmpl.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom URL Input fallback */}
            <div className="mt-3">
              <input
                type="url"
                placeholder="Or enter custom artwork image URL..."
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/50 text-[#E5E5E5] font-light placeholder-white/10"
              />
            </div>
          </div>

          {/* Core Metadata */}
          <div className="space-y-3.5 pt-3 border-t border-white/5">
            <label className="text-[9px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-3">
              Step 2: Studio Specifications
            </label>

            <div>
              <input
                type="text"
                required
                placeholder="Masterpiece Title (e.g., Midnight Nocturne)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/50 text-[#E5E5E5] placeholder-white/25 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[8px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-1.5">Medium Material</label>
                <select
                  value={medium}
                  onChange={(e) => setMedium(e.target.value as ArtMedium)}
                  className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/30 text-[#E5E5E5]"
                >
                  <option value="Oil on Canvas" className="bg-[#111111]">Oil on Canvas</option>
                  <option value="Watercolor" className="bg-[#111111]">Watercolor</option>
                  <option value="Abstract Acrylic" className="bg-[#111111]">Abstract Acrylic</option>
                  <option value="Mixed Media" className="bg-[#111111]">Mixed Media</option>
                  <option value="Charcoal Sketch" className="bg-[#111111]">Charcoal Sketch</option>
                </select>
              </div>

              <div>
                <label className="text-[8px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-1.5">Category Section</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ArtCategory)}
                  className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/30 text-[#E5E5E5]"
                >
                  <option value="Landscape" className="bg-[#111111]">Landscape</option>
                  <option value="Portrait" className="bg-[#111111]">Portrait</option>
                  <option value="Abstract" className="bg-[#111111]">Abstract</option>
                  <option value="Floral" className="bg-[#111111]">Floral</option>
                  <option value="Minimalist" className="bg-[#111111]">Minimalist</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[8px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-1.5">Canvas Geometry</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 90 × 120 cm"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/50 text-[#E5E5E5] placeholder-white/25"
                />
              </div>

              <div>
                <label className="text-[8px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-1.5">Acquisition Valuation (USD)</label>
                <input
                  type="number"
                  placeholder="Private collection if empty"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/50 text-[#E5E5E5] placeholder-white/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[8px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-1.5">Year of Work</label>
                <input
                  type="text"
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/50 text-[#E5E5E5]"
                />
              </div>

              <div>
                <label className="text-[8px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-1.5">Search Keywords</label>
                <input
                  type="text"
                  placeholder="studio, wild, texture"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/50 text-[#E5E5E5] placeholder-white/20"
                />
              </div>
            </div>

            <div>
              <label className="text-[8px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-1.5">Easel Commentary / Description</label>
              <textarea
                required
                rows={3}
                placeholder="Palette setups, mineral textures, or conceptual ideas behind the canvas..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/50 text-[#E5E5E5] leading-relaxed font-light placeholder-white/20"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-white/5">
            <button
              type="submit"
              disabled={!title.trim() || !description.trim()}
              className={`w-full py-4 text-[10px] uppercase font-bold tracking-[0.18em] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                title.trim() && description.trim()
                  ? "bg-brand-gold text-black hover:bg-brand-cream"
                  : "bg-neutral-800 text-[#E5E5E5]/20 cursor-not-allowed"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              CONFIRM & PUBLISH STUDY
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
