// src/pages/Contact.jsx
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FadeIn({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const transforms = { up: "translateY(28px)", left: "translateX(-28px)", right: "translateX(28px)" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction] || "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const SERVICES = ["Web Development", "Mobile Apps", "UI/UX Design", "IT Consulting", "Custom Software", "Cloud & DevOps", "Other"];
const BUDGETS = ["< ₹2 Lakhs", "₹2–5 Lakhs", "₹5–15 Lakhs", "₹15–50 Lakhs", "₹50 Lakhs+", "Let's discuss"];
const TIMELINES = ["ASAP", "1–2 months", "3–6 months", "6+ months", "Flexible"];

const CONTACT_INFO = [
  { icon: "🌐", label: "Website", value: "www.byteforgetechnology.com", color: "#dbeafe", accent: "#2563eb" },
  { icon: "✉️", label: "Email", value: "hello@byteforgetechnology.com", color: "#dcfce7", accent: "#16a34a" },
  { icon: "📞", label: "Phone", value: "+91 98765 43210", color: "#fce7f3", accent: "#db2777" },
  { icon: "🕐", label: "Business Hours", value: "Mon–Sat, 9:00 AM – 7:00 PM IST", color: "#ffedd5", accent: "#ea580c" },
];

const STEPS = [
  { num: "01", title: "We review your inquiry", desc: "Within 24 hours, a team member reads your project details carefully." },
  { num: "02", title: "Discovery call", desc: "We schedule a free 30-min call to understand your goals and vision." },
  { num: "03", title: "Detailed proposal", desc: "You receive a clear scope, timeline, and transparent pricing." },
  { num: "04", title: "Kickoff!", desc: "Once aligned, we hit the ground running on your project." },
];

const FAQ = [
  { q: "How quickly do you respond?", a: "We respond to all inquiries within 24 business hours. Urgent requests are prioritized." },
  { q: "Do you work with international clients?", a: "Yes! We work with clients across India, US, UK, UAE and beyond, accommodating different time zones." },
  { q: "What does a typical engagement look like?", a: "We start with a free discovery call, then provide a detailed proposal. Projects begin with a kickoff and weekly updates." },
  { q: "Do you offer ongoing maintenance?", a: "Absolutely. We offer monthly retainer packages for maintenance, updates, and technical support post-launch." },
];

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", service: "", budget: "", timeline: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [focused, setFocused] = useState(null);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
    } catch {
      setSubmitted(true); // fallback for dev without API
    }
  };

  const inputBase = {
    width: "100%", padding: "14px 16px", borderRadius: 12,
    border: "1.5px solid #e0e0da", fontSize: 15, background: "#fff",
    outline: "none", fontFamily: "'Outfit', sans-serif",
    boxSizing: "border-box", color: "#111",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const inputFocused = { borderColor: "#2563eb", boxShadow: "0 0 0 3px rgba(37,99,235,0.1)" };

  const getInputStyle = (name) => ({
    ...inputBase,
    ...(focused === name ? inputFocused : {}),
  });

  const selectStyle = (name) => ({
    ...getInputStyle(name),
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", paddingRight: 44,
  });

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#fafaf8", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`
        .faq-item { transition: border-color 0.2s, box-shadow 0.2s; }
        .faq-item:hover { border-color: #d0d8ff !important; box-shadow: 0 4px 16px rgba(37,99,235,0.08) !important; }
        .submit-btn { transition: all 0.25s ease !important; }
        .submit-btn:hover { background: #2563eb !important; transform: translateY(-2px) !important; box-shadow: 0 8px 24px rgba(37,99,235,0.3) !important; }
        .info-card { transition: all 0.3s ease; }
        .info-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08) !important; }
        @media (max-width: 900px) {
          .contact-main { grid-template-columns: 1fr !important; gap: 48px !important; }
          .form-row { grid-template-columns: 1fr !important; }
          .info-cards-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .info-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        padding: "140px 5% 72px",
        background: "linear-gradient(160deg, #fafaf8 55%, #eff6ff 100%)",
        borderBottom: "1px solid #e8e8e4",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", right: "10%", transform: "translateY(-50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}/>
        <FadeIn>
          <div style={{ display: "inline-block", background: "#eff6ff", color: "#2563eb", fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", padding: "5px 16px", borderRadius: 100, textTransform: "uppercase", marginBottom: 20 }}>
            Contact Us
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 900, letterSpacing: "-2.5px", color: "#0a0a0a", margin: "0 0 20px", lineHeight: 1.05 }}>
            Let's Build Something<br/>
            <span style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Great Together
            </span>
          </h1>
          <p style={{ fontSize: 18, color: "#666", maxWidth: 520, lineHeight: 1.75 }}>
            Tell us about your project. We'll get back to you within 24 hours with a thoughtful response — not a template.
          </p>
        </FadeIn>
      </section>

      {/* ── CONTACT INFO CARDS ── */}
      <section style={{ padding: "64px 5% 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="info-cards-grid">
          {CONTACT_INFO.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.07}>
              <div className="info-card" style={{
                background: "#fff", border: "1.5px solid #e8e8e4", borderRadius: 16,
                padding: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)", minWidth: 0,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: item.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <div style={{ minWidth: 0, width: "100%" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1px", color: item.accent, textTransform: "uppercase", marginBottom: 5 }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: 13, color: "#222", fontWeight: 600, lineHeight: 1.5,
                    wordBreak: "break-word", overflowWrap: "break-word",
                  }}>
                    {item.value}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── MAIN: Process + Form ── */}
      <section style={{ padding: "64px 5% 80px" }}>
        <div className="contact-main" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 48, alignItems: "start" }}>

          {/* Left — What happens next */}
          <FadeIn direction="left">
            <div style={{ background: "#fff", border: "1.5px solid #e8e8e4", borderRadius: 20, padding: "36px 32px", marginBottom: 20 }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#0a0a0a", marginBottom: 8 }}>What happens next?</div>
              <div style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>A simple 4-step process from inquiry to kickoff.</div>
              {STEPS.map((step, i) => (
                <div key={step.num} style={{ display: "flex", gap: 16, marginBottom: i < STEPS.length - 1 ? 28 : 0, position: "relative" }}>
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div style={{ position: "absolute", left: 19, top: 40, width: 2, height: "calc(100% + 4px)", background: "#f0f0ea" }}/>
                  )}
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: "#eff6ff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 900, fontSize: 13, color: "#2563eb", flexShrink: 0, zIndex: 1,
                    border: "2px solid #dbeafe",
                  }}>
                    {step.num}
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#0a0a0a", marginBottom: 4 }}>{step.title}</div>
                    <div style={{ fontSize: 13, color: "#666", lineHeight: 1.65 }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Response time badge */}
            <div style={{
              background: "linear-gradient(135deg, #0a0a0a, #1e3a5f)",
              borderRadius: 16, padding: "24px 28px",
              display: "flex", alignItems: "center", gap: 16,
            }}>
              <div style={{ fontSize: 32 }}>⚡</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>Fast Response Guaranteed</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                  We reply to every inquiry within 24 business hours — no bots, real people.
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right — Form */}
          <FadeIn direction="right" delay={0.1}>
            {submitted ? (
              <div style={{
                background: "#f0fdf4", border: "1.5px solid #bbf7d0",
                borderRadius: 20, padding: "72px 48px", textAlign: "center",
              }}>
                <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
                <div style={{ fontWeight: 900, fontSize: 26, color: "#0a0a0a", marginBottom: 12 }}>Message Sent!</div>
                <div style={{ color: "#555", fontSize: 16, lineHeight: 1.75, marginBottom: 32 }}>
                  Thanks, <strong>{form.name}</strong>! We'll reach out to <strong>{form.email}</strong> within 24 business hours.
                </div>
                <button onClick={() => navigate("/portfolio")} style={{
                  background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 10,
                  padding: "13px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  View Our Portfolio →
                </button>
              </div>
            ) : (
              <div style={{ background: "#fff", border: "1.5px solid #e8e8e4", borderRadius: 20, padding: "44px 40px", boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
                <div style={{ fontWeight: 900, fontSize: 22, color: "#0a0a0a", marginBottom: 6 }}>Tell Us About Your Project</div>
                <div style={{ fontSize: 14, color: "#888", marginBottom: 32 }}>Fields marked with * are required.</div>

                {/* Name + Company */}
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <input style={getInputStyle("name")} placeholder="Your Name *" value={form.name}
                    onChange={e => update("name", e.target.value)}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                  <input style={getInputStyle("company")} placeholder="Company / Startup" value={form.company}
                    onChange={e => update("company", e.target.value)}
                    onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} />
                </div>

                {/* Email + Phone */}
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <input style={getInputStyle("email")} placeholder="Email Address *" value={form.email}
                    onChange={e => update("email", e.target.value)}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                  <input style={getInputStyle("phone")} placeholder="Phone (optional)" value={form.phone}
                    onChange={e => update("phone", e.target.value)}
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
                </div>

                {/* Service */}
                <select style={{ ...selectStyle("service"), marginBottom: 14, color: form.service ? "#111" : "#999" }}
                  value={form.service} onChange={e => update("service", e.target.value)}
                  onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}>
                  <option value="" disabled>Service Needed *</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                {/* Budget + Timeline */}
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <select style={{ ...selectStyle("budget"), color: form.budget ? "#111" : "#999" }}
                    value={form.budget} onChange={e => update("budget", e.target.value)}
                    onFocus={() => setFocused("budget")} onBlur={() => setFocused(null)}>
                    <option value="" disabled>Budget Range</option>
                    {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <select style={{ ...selectStyle("timeline"), color: form.timeline ? "#111" : "#999" }}
                    value={form.timeline} onChange={e => update("timeline", e.target.value)}
                    onFocus={() => setFocused("timeline")} onBlur={() => setFocused(null)}>
                    <option value="" disabled>Timeline</option>
                    {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Message */}
                <textarea
                  style={{ ...getInputStyle("message"), resize: "vertical", minHeight: 130, marginBottom: 24 }}
                  placeholder="Describe your project... *"
                  value={form.message} onChange={e => update("message", e.target.value)}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                />

                {/* Submit */}
                <button className="submit-btn" onClick={handleSubmit} style={{
                  width: "100%", background: "#0a0a0a", color: "#fff", border: "none",
                  borderRadius: 12, padding: "17px", fontWeight: 800, fontSize: 16,
                  cursor: "pointer", fontFamily: "'Outfit', sans-serif", letterSpacing: "0.2px",
                }}>
                  Send Message →
                </button>

                {/* Trust line */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16 }}>
                  <span style={{ fontSize: 13, color: "#bbb" }}>🔒 Your information is private and never shared.</span>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "72px 5% 80px", background: "#f4f4f0" }}>
        <FadeIn>
          <div style={{ display: "inline-block", background: "#fff", color: "#555", fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", marginBottom: 16, border: "1px solid #e8e8e4" }}>
            FAQs
          </div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-1px", color: "#0a0a0a", margin: "0 0 40px" }}>
            Common Questions
          </h2>
        </FadeIn>
        <div style={{ maxWidth: 740, display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQ.map((f, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="faq-item"
                style={{ background: "#fff", border: "1.5px solid #e8e8e4", borderRadius: 14, overflow: "hidden", cursor: "pointer" }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#0a0a0a", paddingRight: 16 }}>{f.q}</div>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8, background: openFaq === i ? "#eff6ff" : "#f4f4f0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, color: openFaq === i ? "#2563eb" : "#888",
                    transform: openFaq === i ? "rotate(45deg)" : "none",
                    transition: "all 0.3s", flexShrink: 0, fontWeight: 400,
                  }}>+</div>
                </div>
                {openFaq === i && (
                  <div style={{ padding: "0 24px 22px", fontSize: 14, color: "#555", lineHeight: 1.8 }}>{f.a}</div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}