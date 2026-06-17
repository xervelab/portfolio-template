import React, { useState } from 'react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Linkedin, Facebook, Send, CheckCircle2, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data, loading } = useGoogleSheet('CONTACT');
  const details = data && data[0] ? data[0] : {};

  const email = details.email || "cecilia.vance@valuxe.com";
  const whatsapp = details.whatsApp || details.whatsapp || "+1 (555) 489-3294";
  const linkedin = details.linkedIn || details.linkedin || "linkedin.com/in/cecilia-vance";
  const facebook = details.facebook || "facebook.com/cecilia-vance-va";
  const description = details.description || "I operate with high-precision schedules. Send a note to discuss active calendar partnerships, Notion architectural designs, or business structure retainers.";

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', company: '', scope: 'Calendar & Inbox', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate premium API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', scope: 'Calendar & Inbox', message: '' });
    }, 1500);
  };

  if (loading) {
    return (
      <section className="py-24 bg-cream-light dark:bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 h-64 flex items-center justify-center">
          <div className="h-6 w-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-28 relative gradient-mesh overflow-hidden border-b border-gold/10">
      {/* Background large floating meshes */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-gold/5 dark:bg-gold/2 rounded-full blur-[140px] pointer-events-none glow-orb" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-rose-gold/5 dark:bg-rose-gold/2 rounded-full blur-[120px] pointer-events-none glow-orb" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Premium Digital Channels Info */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <p className="font-mono text-[10px] tracking-widest text-[#9C7956] dark:text-[#E6C29E] uppercase font-semibold">✦ CLIENT RECEPTION</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-gray-900 dark:text-cream-warm leading-tight">
                Initiate a <br />
                <span className="italic font-normal">Partnership</span>
              </h2>
              <p className="font-sans text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed max-w-sm">
                {description}
              </p>
            </div>

            {/* Channels Card List */}
            <div className="space-y-4 pt-4">
              {/* Mail */}
              <a 
                href={`mailto:${email}`}
                className="flex items-center gap-4 p-4 rounded-[24px] bg-cream-warm/80 dark:bg-carbon/80 border border-gold/15 hover:border-gold/40 transition-all duration-300 shadow-sm max-w-sm group"
              >
                <div className="h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="font-sans text-[9px] tracking-wider uppercase text-gray-400">EMAIL DIRECT</p>
                  <p className="font-serif text-[15px] text-gray-800 dark:text-cream-warm">{email}</p>
                </div>
              </a>

              {/* Whatsapp */}
              <a 
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-[24px] bg-cream-warm/80 dark:bg-carbon/80 border border-gold/15 hover:border-gold/40 transition-all duration-300 shadow-sm max-w-sm group"
              >
                <div className="h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="font-sans text-[9px] tracking-wider uppercase text-gray-400">WHATSAPP CHAT</p>
                  <p className="font-serif text-[15px] text-gray-800 dark:text-cream-warm">{whatsapp}</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a 
                href={`https://${linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-[24px] bg-cream-warm/80 dark:bg-carbon/80 border border-gold/15 hover:border-gold/40 transition-all duration-300 shadow-sm max-w-sm group"
              >
                <div className="h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Linkedin size={16} />
                </div>
                <div>
                  <p className="font-sans text-[9px] tracking-wider uppercase text-gray-400">LINKEDIN PROFILE</p>
                  <p className="font-serif text-[15px] text-gray-800 dark:text-cream-warm hover:text-gold">{linkedin.split('/').pop() || linkedin}</p>
                </div>
              </a>

              {/* Facebook */}
              <a 
                href={`https://${facebook}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-[24px] bg-cream-warm/80 dark:bg-carbon/80 border border-gold/15 hover:border-gold/40 transition-all duration-300 shadow-sm max-w-sm group"
              >
                <div className="h-10 w-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Facebook size={16} />
                </div>
                <div>
                  <p className="font-sans text-[9px] tracking-wider uppercase text-gray-400">FACEBOOK BUSINESS</p>
                  <p className="font-serif text-[15px] text-gray-800 dark:text-cream-warm hover:text-gold">{facebook.split('/').pop() || facebook}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Premium Inquiry Card Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-[36px] bg-cream-warm/95 dark:bg-carbon/95 border border-gold/20 shadow-2xl relative">
              <div className="absolute top-4 right-4 h-5 w-5 text-gold/30">
                <Sparkles size={16} />
              </div>

              <h3 className="font-serif text-2xl font-light text-gray-900 dark:text-cream-warm leading-tight mb-6">
                Client Intake Inquiry
              </h3>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2 text-left">
                        <label className="font-mono text-[9px] tracking-widest text-[#B5838D] uppercase font-bold">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Elizabeth Bennett"
                          className="w-full px-5 py-3.5 bg-cream-light dark:bg-obsidian/60 border border-gold/15 focus:border-gold outline-none font-sans text-xs sm:text-sm text-gray-800 dark:text-cream-warm transition-all rounded-full focus:ring-1 focus:ring-gold"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2 text-left">
                        <label className="font-mono text-[9px] tracking-widest text-[#B5838D] uppercase font-bold">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="elizabeth@pemberley.com"
                          className="w-full px-5 py-3.5 bg-cream-light dark:bg-obsidian/60 border border-gold/15 focus:border-gold outline-none font-sans text-xs sm:text-sm text-gray-800 dark:text-cream-warm transition-all rounded-full focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Company Name */}
                      <div className="space-y-2 text-left">
                        <label className="font-mono text-[9px] tracking-widest text-[#B5838D] uppercase font-bold">Company / Agency</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Pemberley Creative"
                          className="w-full px-5 py-3.5 bg-cream-light dark:bg-obsidian/60 border border-gold/15 focus:border-gold outline-none font-sans text-xs sm:text-sm text-gray-800 dark:text-cream-warm transition-all rounded-full"
                        />
                      </div>

                      {/* Service Scope Selection */}
                      <div className="space-y-2 text-left">
                        <label className="font-mono text-[9px] tracking-widest text-[#B5838D] uppercase font-bold">Inquiry Scope</label>
                        <select
                          value={formData.scope}
                          onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                          className="w-full px-5 py-3.5 bg-cream-light dark:bg-obsidian/60 border border-gold/15 focus:border-gold outline-none font-sans text-xs sm:text-sm text-gray-500 dark:text-cream-warm transition-all rounded-full cursor-pointer"
                        >
                          <option value="Calendar & Inbox">Executive Calendar/Inbox</option>
                          <option value="System Design (Notion/Asana)">Operational System Redesign</option>
                          <option value="Retainer Partnership (20h+/wk)">Bespoke VA Retainer Block</option>
                          <option value="Social Content & Travel">Social/Creative Logistics</option>
                        </select>
                      </div>
                    </div>

                    {/* Briefing message */}
                    <div className="space-y-2 text-left">
                      <label className="font-mono text-[9px] tracking-widest text-[#B5838D] uppercase font-bold">Project Goals & Retainer Needs</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me briefly about your business operations..."
                        className="w-full px-5 py-4 bg-cream-light dark:bg-obsidian/60 border border-gold/15 focus:border-gold outline-none font-sans text-xs text-gray-800 dark:text-cream-warm transition-all rounded-[24px] focus:ring-1 focus:ring-gold"
                      />
                    </div>

                    {/* Submit slider btn */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#D4A373] hover:bg-[#141414] dark:hover:bg-white dark:hover:text-[#141414] text-white font-sans text-xs tracking-widest font-bold uppercase rounded-full shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      id="contact-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send size={12} />
                          <span>Submit Invitation</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <CheckCircle2 size={48} className="text-gold mx-auto animate-bounce" />
                    <h4 className="font-serif text-2xl text-gray-900 dark:text-cream-warm">Intake Received</h4>
                    <p className="font-sans text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                      Thank you for sharing your business context. Cecilia will review your system bottlenecks and reply with calendar scheduler links in under 12 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 text-[10px] tracking-widest uppercase font-semibold text-gold bg-gold/10 border border-gold/30 hover:bg-gold hover:text-white transition-colors rounded-sm cursor-pointer"
                      id="reset-contact-btn"
                    >
                      Send Another File
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
