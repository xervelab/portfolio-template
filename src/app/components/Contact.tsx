import { useState } from "react";
import { motion } from "motion/react";
import { Send, Instagram, Facebook, Twitter, Linkedin, Youtube, Globe } from "lucide-react";
import { type SiteData, type SocialLink } from "../hooks/useSheetData";

function getSocialIcon(iconName: string) {
  const map: Record<string, any> = {
    instagram: Instagram,
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
    globe: Globe,
  };
  return map[iconName.toLowerCase()] || null;
}

interface ContactProps {
  site: SiteData;
  socials: SocialLink[];
}

type FormState = "idle" | "submitting" | "sent";

export function Contact({ site, socials }: ContactProps) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setTimeout(() => setState("sent"), 1800);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-[#0d0b09]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="font-['DM_Mono'] text-[#c9a96e] text-xs tracking-[0.3em] uppercase mb-4">{site.contactLabel}</p>
          <h2
            className="font-['Playfair_Display'] text-[#f0ebe3] leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400 }}
          >
            {site.contactTitle}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-16">
          {/* Form — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-3"
          >
            {state === "sent" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16 text-center border border-[rgba(201,169,110,0.2)]"
              >
                <p className="font-['Playfair_Display'] text-[#c9a96e] text-2xl mb-3" style={{ fontWeight: 400 }}>
                  Thank you, {form.name}.
                </p>
                <p className="font-['DM_Sans'] text-[#9c8e7e] text-sm" style={{ fontWeight: 300 }}>
                  I'll be in touch within 2–3 days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FieldGroup label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  <FieldGroup label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>

                <div>
                  <label className="font-['DM_Mono'] text-[#9c8e7e] text-xs tracking-widest uppercase block mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#1a1714] border border-[rgba(201,169,110,0.2)] text-[#f0ebe3] px-4 py-3 font-['DM_Sans'] text-sm focus:outline-none focus:border-[#c9a96e] transition-colors appearance-none cursor-pointer"
                    style={{ fontWeight: 300 }}
                  >
                    <option value="" disabled>Select a reason…</option>
                    <option value="commission">Commission a new work</option>
                    <option value="available">Inquire about available work</option>
                    <option value="exhibition">Exhibition / collaboration</option>
                    <option value="studio">Studio visit</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-['DM_Mono'] text-[#9c8e7e] text-xs tracking-widest uppercase block mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project or question…"
                    className="w-full bg-[#1a1714] border border-[rgba(201,169,110,0.2)] text-[#f0ebe3] px-4 py-3 font-['DM_Sans'] text-sm leading-relaxed resize-none focus:outline-none focus:border-[#c9a96e] transition-colors placeholder:text-[#9c8e7e]/40"
                    style={{ fontWeight: 300 }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="font-['DM_Sans'] text-sm tracking-widest uppercase px-8 py-4 bg-[#c9a96e] text-[#0f0d0b] hover:bg-[#e0c080] disabled:opacity-50 transition-colors duration-300 flex items-center gap-3"
                  style={{ fontWeight: 500 }}
                >
                  {state === "submitting" ? (
                    <>Sending…</>
                  ) : (
                    <>
                      Send Message
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-2 space-y-10"
          >
            <div>
              <p className="font-['DM_Mono'] text-[#9c8e7e] text-xs tracking-widest uppercase mb-4">Studio</p>
              <p className="font-['DM_Sans'] text-[#f0ebe3] text-sm leading-relaxed whitespace-pre-line" style={{ fontWeight: 300 }}>
                {site.studioAddress}
              </p>
            </div>
            <div>
              <p className="font-['DM_Mono'] text-[#9c8e7e] text-xs tracking-widest uppercase mb-4">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="font-['DM_Sans'] text-[#c9a96e] text-sm hover:text-[#e0c080] transition-colors"
              >
                {site.email}
              </a>
            </div>

            <div>
              <p className="font-['DM_Mono'] text-[#9c8e7e] text-xs tracking-widest uppercase mb-5">Follow</p>
              <div className="space-y-4">
                {socials.map((link) => {
                  const IconComponent = getSocialIcon(link.icon);
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-9 h-9 border border-[rgba(201,169,110,0.2)] flex items-center justify-center text-[#9c8e7e] group-hover:border-[#c9a96e] group-hover:text-[#c9a96e] transition-colors duration-300">
                        {IconComponent ? (
                          <IconComponent size={16} />
                        ) : (
                          <span className="font-['DM_Mono'] text-xs">{link.name.slice(0, 2)}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-['DM_Sans'] text-[#f0ebe3] text-sm group-hover:text-[#c9a96e] transition-colors duration-300" style={{ fontWeight: 400 }}>
                          {link.name}
                        </p>
                        <p className="font-['DM_Mono'] text-[#9c8e7e] text-xs">{link.handle}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-[rgba(201,169,110,0.15)] pt-8">
              <p className="font-['DM_Sans'] text-[#9c8e7e] text-xs leading-relaxed" style={{ fontWeight: 300 }}>
                {site.responseNote}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface FieldGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

function FieldGroup({ label, name, value, onChange, placeholder, type = "text", required }: FieldGroupProps) {
  return (
    <div>
      <label className="font-['DM_Mono'] text-[#9c8e7e] text-xs tracking-widest uppercase block mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[#1a1714] border border-[rgba(201,169,110,0.2)] text-[#f0ebe3] px-4 py-3 font-['DM_Sans'] text-sm focus:outline-none focus:border-[#c9a96e] transition-colors placeholder:text-[#9c8e7e]/40"
        style={{ fontWeight: 300 }}
      />
    </div>
  );
}
