import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  const inputStyle = {
    background: "var(--input-background)",
    border: "1px solid var(--border)",
    borderRadius: "4px",
    color: "var(--foreground)",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    padding: "10px 12px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div className="max-w-[935px] mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto">
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "28px",
            fontWeight: 400,
            color: "var(--foreground)",
            marginBottom: "8px",
          }}
        >
          Get in Touch
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--muted-foreground)", marginBottom: "32px" }}>
          Commission a piece, inquire about availability, or just say hello.
        </p>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 py-16"
            >
              <CheckCircle2 size={48} style={{ color: "var(--accent)" }} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "18px", color: "var(--foreground)" }}>
                Message sent!
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--muted-foreground)", textAlign: "center" }}>
                Thanks for reaching out. I'll reply within 48 hours.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                style={{ color: "var(--accent)", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: "14px", marginTop: "8px" }}
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>
                <div>
                  <label
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}
                >
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                >
                  <option value="" style={{ background: "#111" }}>Select a topic…</option>
                  <option value="commission" style={{ background: "#111" }}>Commission a piece</option>
                  <option value="purchase" style={{ background: "#111" }}>Purchase existing work</option>
                  <option value="exhibition" style={{ background: "#111" }}>Exhibition / gallery inquiry</option>
                  <option value="press" style={{ background: "#111" }}>Press & media</option>
                  <option value="other" style={{ background: "#111" }}>Other</option>
                </select>
              </div>

              <div>
                <label
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "var(--muted-foreground)", display: "block", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}
                >
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your vision, timeline, and any specific requirements…"
                  style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg transition-opacity"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? (
                  <span>Sending…</span>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
