/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGoogleSheet } from '../hooks/useGoogleSheet';
import { ContactData } from '../types';
import { Skeleton } from '../components/Skeleton';
import { Icon } from '../components/Icon';

export function Contact() {
  const { data: contactInfo, loading } = useGoogleSheet<ContactData>('CONTACT');

  // Interactive Form State Managers
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API submit delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section id="contact" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Skeleton className="h-6 w-32 rounded" />
              <Skeleton className="h-10 w-2/3 rounded-xl" />
              <Skeleton className="h-32 w-full rounded-2xl" />
            </div>
            <Skeleton className="h-96 w-full rounded-3xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/40 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-sky-400 font-mono">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 font-sans">
            Initiate Operational Partnership
          </h2>
          <p className="text-md text-slate-500 dark:text-slate-400">
            Reclaim your attention. Send a brief message outlines your administrative friction, or schedule a call via WhatsApp.
          </p>
        </div>

        {/* Form and Contact Information Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left: Contact Channels Details (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-tight">
                Direct Communication Rail
              </h3>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-405">
                Have a quick requirement or want to chat details? Use my active accounts below to establish rapid contact.
              </p>
            </div>

            {/* Structured channel cards */}
            <div className="grid grid-cols-1 gap-4">
              
              {/* Email channel */}
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-800/20 flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-sky-500/10 text-blue-600 dark:text-sky-400 flex-shrink-0">
                  <Icon name="mail" size={20} />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-[10px] font-bold font-mono tracking-widest text-slate-400 uppercase leading-none">
                    EMAIL ADDRESS
                  </h4>
                  <a
                    href={`mailto:${contactInfo?.email}`}
                    className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-150 hover:text-blue-600 dark:hover:text-sky-400 transition-colors truncate block"
                  >
                    {contactInfo?.email}
                  </a>
                </div>
              </div>

              {/* WhatsApp Channel */}
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-800/20 flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  <Icon name="phone" size={20} />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-[10px] font-bold font-mono tracking-widest text-slate-400 uppercase leading-none">
                    WHATSAPP CARRIER
                  </h4>
                  <a
                    href={contactInfo?.whatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-150 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors truncate block"
                  >
                    {contactInfo?.whatsApp}
                  </a>
                </div>
              </div>

              {/* LinkedIn channel */}
              <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-800/20 flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  <Icon name="linkedin" size={20} />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-[10px] font-bold font-mono tracking-widest text-slate-400 uppercase leading-none">
                    LINKEDIN NETWORKS
                  </h4>
                  <a
                    href={contactInfo?.linkedIn}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-150 hover:text-indigo-600 dark:hover:text-sky-400 transition-colors truncate block"
                  >
                    Connect Professional profile
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Contact Form submission (Span 7) */}
          <div className="lg:col-span-7 w-full">
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-linear-to-b from-slate-50/20 to-white dark:from-slate-800/20 dark:to-slate-800/5 shadow-xs relative">
              
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-50 font-sans tracking-tight mb-6">
                Transmit Custom Requirement Form
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* Name & Email Group row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name-input" className="text-xs font-bold font-mono text-slate-450 uppercase tracking-wide">
                      YOUR NAME *
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-sky-400 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email-input" className="text-xs font-bold font-mono text-slate-450 uppercase tracking-wide">
                      YOUR EMAIL *
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. john@company.com"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-sky-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Subject block */}
                <div className="space-y-1.5">
                  <label htmlFor="subject-input" className="text-xs font-bold font-mono text-slate-450 uppercase tracking-wide">
                    SUBJECT TOPIC
                  </label>
                  <input
                    id="subject-input"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Inbox zero protocol audit"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-sky-400 focus:border-transparent transition-all"
                  />
                </div>

                {/* Message input */}
                <div className="space-y-1.5">
                  <label htmlFor="message-input" className="text-xs font-bold font-mono text-slate-450 uppercase tracking-wide">
                    YOUR MESSAGE *
                    <span className="text-[10px] lowercase pl-1.5 font-normal text-slate-400">
                      (Describe tasks or bottlenecks)
                    </span>
                  </label>
                  <textarea
                    id="message-input"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Hi Sarah, I would love to audit our CRM system or discuss calendar blockers..."
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-600 dark:focus:ring-sky-400 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Feedback Status */}
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-500/20 bg-emerald-50/55 dark:bg-emerald-500/10 flex items-center space-x-3"
                    >
                      <Icon name="check-circle" className="text-emerald-600 dark:text-emerald-400 shrink-0" size={16} />
                      <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                        Transmission Successful! I will review details and correspond back within 1-2 hours.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submitting button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-sky-400 dark:hover:bg-sky-300 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white dark:text-slate-900 font-bold text-sm tracking-wide shadow flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white dark:border-slate-900/40 dark:border-t-slate-900 animate-spin" />
                  ) : (
                    <>
                      <span>Transmit Message Securely</span>
                      <Icon name="arrow-right" size={15} />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
