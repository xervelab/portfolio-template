import React, { useState } from "react";
import { X, CheckCircle2, Send, ShieldCheck, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface InquiryModalProps {
  initialSubject?: string;
  onClose: () => void;
}

export default function InquiryModal({ initialSubject = "", onClose }: InquiryModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(
    initialSubject ? `Inquiry: "${initialSubject}"` : "General/Commission Inquiries"
  );
  const [budget, setBudget] = useState("3000-5000");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setLoading(true);
    // Simulate API delivery
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md" id="inquiry-modal-overlay">
      <div className="absolute inset-0 cursor-default" onClick={onClose}></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative bg-[#111111] border border-white/15 w-full max-w-md overflow-hidden shadow-2xl z-10 rounded-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-8 space-y-6"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-light text-[#E5E5E5] font-display uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-5 h-5 text-brand-gold" />
                    STUDIO INQUIRY
                  </h3>
                  <p className="text-xs text-[#E5E5E5]/40 mt-1.5 font-sans font-light">
                    Direct communication with Elara Vance's curation desk.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-neutral-950 border border-transparent hover:border-white/5 rounded text-[#E5E5E5]/60 hover:text-white cursor-pointer transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[8px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-1.5">Subject / Study Title</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/50 text-[#E5E5E5] font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[8px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Jean Porter"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/50 text-[#E5E5E5] font-light placeholder-white/10"
                    />
                  </div>

                  <div>
                    <label className="text-[8px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., jean@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/50 text-[#E5E5E5] font-light placeholder-white/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[8px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-1.5">Estimated Acquisition Range</label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/30 text-[#E5E5E5] font-medium cursor-pointer"
                  >
                    <option value="under-1500" className="bg-[#111111]">Under $1,500 USD (Sketches & Studies)</option>
                    <option value="1500-3000" className="bg-[#111111]">$1,500 - $3,000 USD (Mid-size Canvas study)</option>
                    <option value="3000-5000" className="bg-[#111111]">$3,000 - $5,000 USD (Signature Oil Work)</option>
                    <option value="above-5000" className="bg-[#111111]">Above $5,000 USD (Large installations & Private commission)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[8px] uppercase tracking-[0.2em] font-medium text-brand-gold block mb-1.5">Proposal Details</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details on your interest or secure shipping questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs bg-[#0A0A0A] border border-white/10 rounded-none py-2.5 px-3 focus:outline-none focus:border-brand-gold/50 text-[#E5E5E5] leading-relaxed font-light placeholder-white/10"
                  />
                </div>

                <div className="flex items-center gap-2.5 py-1 text-[9px] uppercase tracking-wider text-[#E5E5E5]/40 bg-[#0A0A0A] border border-white/5 w-full px-3 py-2.5">
                  <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  Request encrypted & secured via Galerie de l'Élysée servers.
                </div>

                <button
                  type="submit"
                  disabled={loading || !name.trim() || !email.trim() || !message.trim()}
                  className={`w-full py-4 text-[10px] uppercase font-bold tracking-[0.15em] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    loading
                      ? "bg-neutral-800 text-white/30 cursor-wait"
                      : "bg-brand-gold text-black hover:bg-brand-cream"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  {loading ? "TRANSMITTING TO DESK..." : "SECURE TRANSMISSION"}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center space-y-6"
            >
              <div className="inline-flex p-4 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold rounded-full">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              
              <div className="space-y-3">
                <h4 className="text-xl font-light text-[#E5E5E5] font-display uppercase tracking-widest leading-tight">
                  TRANSMISSION COMPLETED
                </h4>
                <p className="text-xs text-[#E5E5E5]/60 font-sans font-light leading-relaxed max-w-xs mx-auto">
                  Thank you, <strong className="text-brand-cream font-medium">{name}</strong>. Curation managers will contact you at <strong className="text-brand-cream font-medium">{email}</strong> within 24 business hours with certified courier guides.
                </p>
              </div>

              <div className="border-t border-white/5 pt-5 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#E5E5E5] text-black hover:bg-brand-gold font-medium text-[9px] uppercase tracking-widest cursor-pointer transition-colors"
                >
                  Close Console
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
