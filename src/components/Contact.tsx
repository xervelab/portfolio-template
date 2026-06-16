import React, { useState, useEffect } from "react";
import { Mail, MapPin, Send, CheckCircle2, RefreshCw, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ContactFormData } from "../types";

interface ContactProps {
  artworkInquiryTitle: string;
}

export default function Contact({ artworkInquiryTitle }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    inquiryType: "general",
    message: "",
    artworkInterest: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Update interested artwork title if passed from state
  useEffect(() => {
    if (artworkInquiryTitle) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: "purchase",
        artworkInterest: artworkInquiryTitle,
        subject: `Inquiry: Acquisition of "${artworkInquiryTitle}"`
      }));
      // Smooth scroll to contact form
      const element = document.querySelector("#contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [artworkInquiryTitle]);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (value && !validateEmail(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    if (emailError) return;

    setIsSubmitting(true);

    // Simulate reliable API call sending inquiry to the artist's studio
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form save for interest
      setFormData({
        name: "",
        email: "",
        subject: "",
        inquiryType: "general",
        message: "",
        artworkInterest: ""
      });
    }, 1800);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#FAF9F6] dark:bg-[#0F0F0F] border-t border-stone-900/10 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Metadata info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-12 xl:col-span-5 space-y-8"
          >
            <div className="space-y-3 border-b border-stone-900/10 dark:border-white/10 pb-6">
              <span className="font-sans text-[10px] tracking-[0.35em] text-brand-accent uppercase block font-semibold">
                Inquiries & Acquisitions
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-stone-950 dark:text-stone-50 tracking-tight leading-none">
                Connect with the Studio
              </h2>
            </div>

            <p className="font-sans text-stone-600 dark:text-stone-300 text-sm leading-relaxed font-light">
              For representation queries, commissioning opportunities, or artwork acquisition details, please connect using the secure portal. Elena welcomes dialogs regarding curated exhibitions, architectural integrations, or bespoke canvas assignments.
            </p>

            <div className="space-y-6 pt-6 font-sans">
              
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-none border border-stone-900/10 dark:border-white/10 bg-stone-900/5 dark:bg-white/5 text-brand-accent">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[9px] tracking-[0.2em] text-stone-400 dark:text-stone-500 uppercase font-light">
                    Direct Email
                  </h4>
                  <a
                    href="mailto:studio@elenarostova.com"
                    className="text-stone-950 dark:text-stone-50 text-sm hover:text-brand-accent transition-colors block font-medium mt-0.5"
                  >
                    studio@elenarostova.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-none border border-stone-900/10 dark:border-white/10 bg-stone-900/5 dark:bg-white/5 text-brand-accent">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[9px] tracking-[0.2em] text-stone-400 dark:text-stone-500 uppercase font-light">
                    Primary Studio
                  </h4>
                  <p className="text-stone-950 dark:text-stone-50 text-sm font-medium mt-0.5">
                    DUMBO Creative Studios, Suite 402<br />
                    Brooklyn, NY 11201
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-none border border-stone-900/10 dark:border-white/10 bg-stone-900/5 dark:bg-white/5 text-brand-accent">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[9px] tracking-[0.2em] text-stone-400 dark:text-stone-500 uppercase font-light">
                    Press & Galleries
                  </h4>
                  <p className="text-stone-950 dark:text-stone-50 text-sm font-medium mt-0.5">
                    +1 (718) 555-0182
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-stone-900/10 dark:bg-white/10 pt-2"></div>

            <div className="text-[10px] font-mono text-stone-400 dark:text-stone-500 leading-relaxed italic">
              Please expect up to 48 hours for studio responses. High-end custom canvas commissions typically require 6-12 weeks for completion.
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-12 xl:col-span-7 bg-stone-900/5 dark:bg-white/5 p-8 md:p-12 rounded-none border border-stone-900/10 dark:border-white/10 shadow-none"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-1.5 font-sans">
                  <label htmlFor="name" className="block text-[10px] tracking-wider text-stone-500 dark:text-stone-400 uppercase font-light">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-stone-100/50 dark:bg-zinc-900/30 border border-stone-900/10 dark:border-white/10 rounded-none px-4 py-3 text-sm text-stone-950 dark:text-stone-100 focus:outline-none focus:border-brand-accent transition-colors font-light"
                    placeholder="Wassily Kandinsky"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5 font-sans">
                  <label htmlFor="email" className="block text-[10px] tracking-wider text-stone-500 dark:text-stone-400 uppercase font-light">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-stone-100/50 dark:bg-zinc-900/30 border rounded-none px-4 py-3 text-sm text-stone-950 dark:text-stone-100 focus:outline-none transition-colors font-light ${
                      emailError ? "border-red-500/50 focus:border-red-500" : "border-stone-900/10 dark:border-white/10 focus:border-brand-accent"
                    }`}
                    placeholder="wassily@kandinsky.org"
                  />
                  {emailError && (
                    <p className="text-red-500 text-[10px] font-mono">{emailError}</p>
                  )}
                </div>
              </div>

              {/* Inquiry Type */}
              <div className="space-y-1.5 font-sans">
                <label htmlFor="inquiryType" className="block text-[10px] tracking-wider text-stone-500 dark:text-stone-400 uppercase font-light">
                  Type of Inquiry *
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-full bg-stone-100/50 dark:bg-zinc-900/30 border border-stone-900/10 dark:border-white/10 rounded-none px-4 py-3 text-sm text-stone-700 dark:text-stone-300 focus:outline-none focus:border-brand-accent transition-colors font-light cursor-pointer"
                >
                  <option value="general" className="bg-stone-50 dark:bg-zinc-900">General Studio Dialogue</option>
                  <option value="purchase" className="bg-stone-50 dark:bg-zinc-900">Acquire Existing Artwork</option>
                  <option value="commission" className="bg-stone-50 dark:bg-zinc-900">Custom Commission Contract</option>
                  <option value="exhibition" className="bg-stone-50 dark:bg-zinc-900">Exhibitions & Media Representation</option>
                </select>
              </div>

              {/* Interested Artwork (conditional / dynamic representation) */}
              {formData.inquiryType === "purchase" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5 font-sans"
                >
                  <label htmlFor="artworkInterest" className="block text-[10px] tracking-wider text-stone-500 dark:text-stone-400 uppercase font-light">
                    Interested Painting Title
                  </label>
                  <input
                    type="text"
                    id="artworkInterest"
                    name="artworkInterest"
                    value={formData.artworkInterest}
                    onChange={handleInputChange}
                    placeholder="e.g. Echoes of Autumn"
                    className="w-full bg-stone-100/50 dark:bg-zinc-900/30 border border-stone-900/10 dark:border-white/10 rounded-none px-4 py-3 text-sm text-stone-950 dark:text-stone-100 focus:outline-none focus:border-brand-accent transition-colors font-light"
                  />
                </motion.div>
              )}

              {/* Subject */}
              <div className="space-y-1.5 font-sans">
                <label htmlFor="subject" className="block text-[10px] tracking-wider text-stone-500 dark:text-stone-400 uppercase font-light">
                  Subject Title
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-stone-100/50 dark:bg-zinc-900/30 border border-stone-900/10 dark:border-white/10 rounded-none px-4 py-3 text-sm text-stone-950 dark:text-stone-100 focus:outline-none focus:border-brand-accent transition-colors font-light"
                  placeholder="Inquiry regarding future representations"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5 font-sans">
                <label htmlFor="message" className="block text-[10px] tracking-wider text-stone-500 dark:text-stone-400 uppercase font-light">
                  Message Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-stone-100/50 dark:bg-zinc-900/30 border border-stone-900/10 dark:border-white/10 rounded-none px-4 py-3 text-sm text-stone-950 dark:text-stone-100 focus:outline-none focus:border-brand-accent transition-colors font-light resize-none"
                  placeholder="Write your artistic queries, collection details, or gallery schedule proposals..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
                className={`py-3.5 px-6 rounded-none font-sans text-[11px] tracking-[0.25em] uppercase font-semibold transition-all duration-300 w-full flex items-center justify-center gap-2 group cursor-pointer ${
                  isSubmitting
                    ? "bg-stone-300 dark:bg-zinc-800 text-stone-500 cursor-not-allowed border border-stone-200 dark:border-zinc-800"
                    : "bg-stone-950 hover:bg-brand-accent text-stone-50 hover:text-stone-950 dark:bg-stone-100 dark:hover:bg-brand-accent dark:text-stone-950 hover:scale-[1.01] active:scale-95"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Transmitting Inquiry...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Floating Success Notification Banner */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 md:right-12 z-50 max-w-sm w-full bg-stone-950 border border-brand-accent/30 text-stone-100 p-5 rounded-none shadow-2xl flex items-start gap-4"
          >
            <CheckCircle2 className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5 flex-1 font-sans">
              <h4 className="font-serif text-base text-stone-50 font-medium">Inquiry Received</h4>
              <p className="font-sans text-xs text-stone-400 leading-relaxed font-light">
                Your message was securely sent to Elena Rostova's studio inbox. A studio manager will reach out within 48 hours.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="font-sans text-[10px] tracking-wider uppercase font-semibold text-brand-accent hover:text-stone-50 transition-colors pt-1.5 block cursor-pointer"
              >
                Acknowledge
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
