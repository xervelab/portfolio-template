import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MapPin, Mail, Sparkles, Check, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { ARTWORKS } from '../data/artworks';
import { Inquiry } from '../types';

interface ContactFormProps {
  selectedArtworkTitle: string | null;
  clearSelectedArtwork: () => void;
}

export default function ContactForm({ selectedArtworkTitle, clearSelectedArtwork }: ContactFormProps) {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    messageType: 'Acquisition' as Inquiry['messageType'],
    artworkId: '',
    message: ''
  });

  const [transmittedMessages, setTransmittedMessages] = useState<Inquiry[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync with selected artwork from curator prompt
  useEffect(() => {
    if (selectedArtworkTitle) {
      const art = ARTWORKS.find(a => a.title === selectedArtworkTitle);
      setFormData(prev => ({
        ...prev,
        messageType: 'Acquisition',
        artworkId: art ? art.id : '',
        subject: `Acquisition Exploration: ${selectedArtworkTitle}`
      }));
    }
  }, [selectedArtworkTitle]);

  // Load existing inquiries from localStorage for realistic offline persistence
  useEffect(() => {
    const saved = localStorage.getItem('clara_studio_inquiries');
    if (saved) {
      try {
        setTransmittedMessages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderName || !formData.senderEmail || !formData.message) return;

    setIsSubmitting(true);

    // Simulate luxury studio server transmission delay
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: `inq-${Date.now()}`,
        senderName: formData.senderName,
        senderEmail: formData.senderEmail,
        subject: formData.subject || `${formData.messageType} Consultation`,
        artworkId: formData.artworkId || undefined,
        messageType: formData.messageType,
        message: formData.message,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const updated = [newInquiry, ...transmittedMessages];
      setTransmittedMessages(updated);
      localStorage.setItem('clara_studio_inquiries', JSON.stringify(updated));

      // Reset Form State
      setFormData({
        senderName: '',
        senderEmail: '',
        subject: '',
        messageType: 'General',
        artworkId: '',
        message: ''
      });
      clearSelectedArtwork();
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Dismiss Success alert after delay
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleClearInquiries = () => {
    localStorage.removeItem('clara_studio_inquiries');
    setTransmittedMessages([]);
  };

  return (
    <section id="contact-portal" className="py-24 px-6 md:px-12 bg-[#0D0D0D] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Studio Desk details, office hours and correspondence info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs text-[#C5A47E] tracking-widest uppercase block">CORRESPONDENCE DESK</span>
              <h2 className="text-3xl md:text-4xl font-sans font-extralight tracking-tight text-white">
                Initiate Dialogue
              </h2>
              <div className="w-16 h-[1px] bg-[#C5A47E]" />
            </div>

            <p className="text-white/70 leading-relaxed font-sans font-light">
              Acquisition files, commissions, and private workshop visits are addressed personally. Let us know how we can curate your workspace.
            </p>

            <div className="space-y-5 pt-4">
              <div className="flex gap-4 items-start">
                <div className="mt-1 p-2 bg-white/5 border border-white/10 text-[#C5A47E] rounded-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white font-medium mb-1">C. Moreau Studio Residence</h4>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    14 Rue Des Capucins, Croix-Rousse, 69001 Lyon, France
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1 p-2 bg-white/5 border border-white/10 text-[#C5A47E] rounded-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white font-medium mb-1">Direct Courier Email</h4>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    acquisitions@claramoreau.studio
                  </p>
                  <p className="text-[10px] text-[#C5A47E] font-mono uppercase mt-1">Reply timeframe: 48 Hours</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="mt-1 p-2 bg-white/5 border border-white/10 text-[#C5A47E] rounded-xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white font-medium mb-1">Atelier Hours by Appointment</h4>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                    Thursday &mdash; Saturday: 11:00 am &mdash; 6:00 pm
                  </p>
                </div>
              </div>
            </div>

            {/* Simulated Ledger of Sent Messages */}
            {transmittedMessages.length > 0 && (
              <div className="border-t border-white/10 pt-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white font-medium flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#C5A47E]" />
                    Transmitted Courier Ledger ({transmittedMessages.length})
                  </h4>
                  <button 
                    id="clear-ledger-button"
                    onClick={handleClearInquiries}
                    className="text-[9px] font-mono uppercase tracking-widest text-[#C5A47E] hover:text-white border-b border-transparent hover:border-white transition-all cursor-pointer"
                  >
                    Clear Ledger
                  </button>
                </div>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                  {transmittedMessages.map(inq => {
                    const artContext = ARTWORKS.find(a => a.id === inq.artworkId);
                    return (
                      <motion.div
                        key={inq.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#121212] border border-white/5 p-3 rounded-sm text-xs space-y-2 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">{inq.senderName}</span>
                          <span className="text-[10px] font-mono text-white/40">{inq.date}</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-mono uppercase">
                          <span className="text-[#C5A47E] font-semibold">{inq.messageType}</span>
                          {artContext && <span className="text-neutral-500">REF: {artContext.title}</span>}
                        </div>
                        <p className="text-white/60 leading-relaxed font-sans italic text-[11px] truncate-2-lines">
                          &ldquo;{inq.message}&rdquo;
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Block: Core Form Sheet */}
          <div className="lg:col-span-7 bg-[#121212] p-6 md:p-10 border border-white/5 shadow-2xl relative">
            <div className="absolute top-0 right-0 h-1 w-1/3 bg-[#C5A47E]" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Succession Notification for Successful Submits */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-emerald-950/40 text-emerald-300 p-4 border border-emerald-900/50 text-xs flex gap-3 items-center rounded-sm"
                  >
                    <div className="p-1 bg-emerald-700 text-white rounded-full">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="block font-mono tracking-wider uppercase mb-0.5">Transmission Completed Successfully</strong>
                      Your inquiry has been logged in Clara Moreau's ledger. A studio response will be dispatched within 48 hours.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input: Sender Name & Email Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="senderName" className="font-mono text-[10px] uppercase text-[#C5A47E] tracking-wider block font-semibold">
                    Your Full Name *
                  </label>
                  <input
                    id="senderName"
                    type="text"
                    name="senderName"
                    required
                    value={formData.senderName}
                    onChange={handleChange}
                    placeholder="E.g., Julian Mercer"
                    className="w-full bg-[#0B0B0B] border border-white/10 px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A47E] focus:bg-[#141414] transition-all rounded-xs font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="senderEmail" className="font-mono text-[10px] uppercase text-[#C5A47E] tracking-wider block font-semibold">
                    Email Address *
                  </label>
                  <input
                    id="senderEmail"
                    type="email"
                    name="senderEmail"
                    required
                    value={formData.senderEmail}
                    onChange={handleChange}
                    placeholder="E.g., julian@example.com"
                    className="w-full bg-[#0B0B0B] border border-white/10 px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A47E] focus:bg-[#141414] transition-all rounded-xs font-sans"
                  />
                </div>
              </div>

              {/* Selector: Subject type & Artwork Reference */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="messageType" className="font-mono text-[10px] uppercase text-[#C5A47E] tracking-wider block font-semibold">
                    Topic of Interest
                  </label>
                  <select
                    id="messageType"
                    name="messageType"
                    value={formData.messageType}
                    onChange={handleChange}
                    className="w-full bg-[#0B0B0B] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A47E] focus:bg-[#141414] transition-all rounded-xs font-mono"
                  >
                    <option value="Acquisition" className="bg-[#0D0D0D] text-white">Acquisition Inquiry</option>
                    <option value="Commission" className="bg-[#0D0D0D] text-white">Bespoke Commission Consultation</option>
                    <option value="Studio Visit" className="bg-[#0D0D0D] text-white">Exhibition or Studio Visit Booking</option>
                    <option value="General" className="bg-[#0D0D0D] text-white">General Artistic Dialog</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="artworkId" className="font-mono text-[10px] uppercase text-[#C5A47E] tracking-wider block flex justify-between font-semibold">
                    <span>Artwork Reference</span>
                    {selectedArtworkTitle && <span className="text-[#C5A47E] font-normal leading-tight">Linked From Lightbox</span>}
                  </label>
                  <select
                    id="artworkId"
                    name="artworkId"
                    value={formData.artworkId}
                    onChange={handleChange}
                    className="w-full bg-[#0B0B0B] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-[#C5A47E] focus:bg-[#141414] transition-all rounded-xs font-mono"
                  >
                    <option value="" className="bg-[#0D0D0D] text-white">-- No Direct Canvas Reference --</option>
                    {ARTWORKS.map(art => (
                      <option key={art.id} value={art.id} className="bg-[#0D0D0D] text-white">
                        {art.title} ({art.category} &mdash; {art.status})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Input: Subject Line */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="font-mono text-[10px] uppercase text-[#C5A47E] tracking-wider block font-semibold">
                  Subject Header
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="E.g., Acquisition Inquiry: Vesper Whisper"
                  className="w-full bg-[#0B0B0B] border border-white/10 px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A47E] focus:bg-[#141414] transition-all rounded-xs font-sans"
                />
              </div>

              {/* Input: Main Message Content */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="font-mono text-[10px] uppercase text-[#C5A47E] tracking-wider block font-semibold">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Detail your inquiry, collection aesthetic, wall specs, or proposed studio tour dates..."
                  className="w-full bg-[#0B0B0B] border border-white/10 px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#C5A47E] focus:bg-[#141414] transition-all rounded-xs font-sans resize-y leading-relaxed"
                />
              </div>

              {/* Submitting button */}
              <button
                id="submit-inquiry-button"
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 text-xs font-mono tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-sm shadow-sm cursor-pointer ${
                  isSubmitting
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-[#C5A47E] text-black font-semibold hover:bg-white'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    TRANSMITTING MESSAGE LEDGER...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    SEND SECURE COURIER DISPATCH
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
