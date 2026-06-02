// src/pages/Services.jsx
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SERVICES = [
  {
    icon: "◈", title: "Web Development", color: "#dbeafe", accent: "#2563eb",
    tagline: "Fast, scalable, beautiful web applications.",
    desc: "We craft high-performance web apps using React, Next.js, and ASP.NET — from marketing sites to full enterprise portals. Every line of code is written for speed, accessibility, and long-term maintainability.",
    features: ["React / Next.js / Vue frontends", "ASP.NET Core & Node.js backends", "REST & GraphQL APIs", "SEO-optimized architecture", "CMS integration (WordPress, Contentful)", "Progressive Web Apps (PWA)"],
    tech: ["React", "Next.js", "ASP.NET", "TypeScript", "PostgreSQL", "Redis"],
  },
  {
    icon: "◉", title: "Mobile Apps", color: "#dcfce7", accent: "#16a34a",
    tagline: "Cross-platform apps your users will love.",
    desc: "From concept to App Store, we build polished iOS and Android apps using React Native and Flutter. Our mobile apps are built for performance, offline support, and seamless backend integration.",
    features: ["React Native & Flutter", "iOS & Android deployment", "Push notifications & analytics", "Offline-first architecture", "In-app payments", "App Store optimization"],
    tech: ["React Native", "Flutter", "Firebase", "Swift", "Kotlin", "Expo"],
  },
  {
    icon: "◇", title: "UI/UX Design", color: "#fef9c3", accent: "#ca8a04",
    tagline: "Design that converts, not just impresses.",
    desc: "We research, prototype, and design interfaces that guide users intuitively to their goals. Our design process is rooted in user behavior, business objectives, and aesthetic precision.",
    features: ["User research & personas", "Wireframing & prototyping", "Figma design systems", "Usability testing", "Accessibility (WCAG 2.1)", "Brand identity & guidelines"],
    tech: ["Figma", "FigJam", "Maze", "Hotjar", "Lottie", "Storybook"],
  },
  {
    icon: "◎", title: "IT Consulting", color: "#fce7f3", accent: "#db2777",
    tagline: "Strategic technology decisions that actually matter.",
    desc: "We help CTOs and founders make the right technology choices. From architecture reviews to digital transformation roadmaps, our consultants bring real-world experience across dozens of industries.",
    features: ["Technology stack evaluation", "Architecture design & review", "Digital transformation planning", "Legacy system modernization", "Vendor selection & management", "Tech team hiring support"],
    tech: ["Azure", "AWS", "GCP", "Docker", "Kubernetes", "Terraform"],
  },
  {
    icon: "▣", title: "Custom Software", color: "#ede9fe", accent: "#7c3aed",
    tagline: "Software built for your exact workflows.",
    desc: "Off-the-shelf tools aren't always the answer. We build bespoke software — ERPs, CRMs, internal tools, and automation pipelines — engineered precisely for how your business operates.",
    features: ["ERP & CRM systems", "Internal dashboards & tools", "Workflow automation", "Data pipelines & ETL", "Third-party integrations", "Reporting & analytics"],
    tech: ["C#", ".NET", "Python", "Power BI", "SQL Server", "RabbitMQ"],
  },
  {
    icon: "⬡", title: "Cloud & DevOps", color: "#ffedd5", accent: "#ea580c",
    tagline: "Reliable infrastructure that scales with you.",
    desc: "We design, deploy, and manage cloud infrastructure that's fast, secure, and cost-efficient. CI/CD pipelines, container orchestration, monitoring — we handle the ops so you can focus on building.",
    features: ["AWS / Azure / GCP setup", "Docker & Kubernetes", "CI/CD pipelines (GitHub Actions)", "Infrastructure as Code", "Monitoring & alerting", "Security & compliance"],
    tech: ["AWS", "Azure", "Kubernetes", "Terraform", "GitHub Actions", "Datadog"],
  },
];

function useInView() {
  const { useRef, useState, useEffect } = require("react");
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

import { useRef, useState, useEffect } from "react";

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function Services() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#fafaf8", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <Navbar />

      {/* Hero */}
      <section style={{
        paddingTop: 140, paddingBottom: 80, padding: "140px 5% 80px",
        background: "linear-gradient(160deg, #fafaf8 60%, #eff6ff 100%)",
        borderBottom: "1px solid #e8e8e4",
      }}>
        <FadeIn>
          <div style={{ display: "inline-block", background: "#eff6ff", color: "#2563eb", fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", marginBottom: 20 }}>
            What We Offer
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-2px", color: "#0a0a0a", margin: "0 0 20px", lineHeight: 1.08 }}>
            End-to-End IT Services<br />
            <span style={{ color: "#2563eb" }}>Built to Scale</span>
          </h1>
          <p style={{ fontSize: 18, color: "#666", maxWidth: 560, lineHeight: 1.75 }}>
            From wireframes to cloud deployment — Byte Forge covers every layer of your digital product with senior-level expertise.
          </p>
        </FadeIn>
      </section>

      {/* Services */}
      <section style={{ padding: "80px 5%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={0.05}>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 0,
                background: "#fff", border: "1px solid #e8e8e4", borderRadius: 20,
                overflow: "hidden",
              }} className="service-row">
                {/* Left panel */}
                <div style={{ background: s.color, padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 48, marginBottom: 20, color: s.accent }}>{s.icon}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.5px", marginBottom: 10 }}>{s.title}</div>
                    <div style={{ fontSize: 14, color: "#555", fontStyle: "italic" }}>{s.tagline}</div>
                  </div>
                  <div style={{ marginTop: 40 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", color: "#888", textTransform: "uppercase", marginBottom: 14 }}>Tech Stack</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {s.tech.map(t => (
                        <span key={t} style={{ background: "#fff", border: `1px solid ${s.accent}33`, color: s.accent, fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 100 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Right panel */}
                <div style={{ padding: "48px 44px" }}>
                  <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 32 }}>{s.desc}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
                    {s.features.map(f => (
                      <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{ width: 20, height: 20, borderRadius: 5, background: `${s.accent}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: s.accent, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</div>
                        <span style={{ fontSize: 14, color: "#444", lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 5%", background: "#0a0a0a", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", marginBottom: 16 }}>
            Ready to Start a Project?
          </h2>
          <p style={{ color: "#888", fontSize: 17, marginBottom: 40 }}>Tell us what you need — we'll respond within 24 hours.</p>
          <button
            onClick={() => navigate("/contact")}
            style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 10, padding: "16px 40px", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}
          >
            Get a Free Consultation →
          </button>
        </FadeIn>
      </section>

      <Footer />
      <style>{`
        @media (max-width: 768px) { .service-row { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}