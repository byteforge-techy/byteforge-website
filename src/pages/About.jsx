// src/pages/About.jsx — dynamic team from API
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTeam } from "../hooks/usePortfolio";

function FadeIn({ children, delay=0, style={} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold:0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:visible?1:0, transform:visible?"none":"translateY(24px)", transition:`opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

const VALUES = [
  { icon:"◈", title:"Transparency", desc:"No surprises. We communicate openly at every stage — good news and bad alike." },
  { icon:"◉", title:"Craftsmanship", desc:"We obsess over details. Every component, every API, every pixel is considered." },
  { icon:"◇", title:"Partnership", desc:"We treat your business goals as our own. Your success is the only metric that matters." },
  { icon:"◎", title:"Agility", desc:"Markets change fast. We build flexible teams and processes that adapt with you." },
];

const MILESTONES = [
  { year:"2020", title:"Founded in Ahmedabad", desc:"Byte Forge started as a 3-person team with a single mission: build software that lasts." },
  { year:"2021", title:"First 10 Clients", desc:"Expanded to serve startups across Gujarat." },
  { year:"2022", title:"Cloud Practice Launched", desc:"Added dedicated DevOps & Cloud team." },
  { year:"2023", title:"50+ Projects Delivered", desc:"Grew team to 20+ engineers and designers." },
  { year:"2024", title:"Enterprise Clients", desc:"Onboarded first enterprise contracts." },
  { year:"2025", title:"Expanding Nationally", desc:"Opening operations in Mumbai and Bangalore." },
];

export default function About() {
  const navigate = useNavigate();
  const { members, loading } = useTeam();

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:"#fafaf8", minHeight:"100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <Navbar />

      {/* Hero */}
      <section style={{ padding:"140px 5% 80px", background:"linear-gradient(160deg,#fafaf8 60%,#f0fdf4 100%)", borderBottom:"1px solid #e8e8e4" }}>
        <FadeIn>
          <div style={{ display:"inline-block", background:"#dcfce7", color:"#16a34a", fontSize:12, fontWeight:700, letterSpacing:"1.2px", padding:"5px 14px", borderRadius:100, textTransform:"uppercase", marginBottom:20 }}>Our Story</div>
          <h1 style={{ fontSize:"clamp(36px,5vw,64px)", fontWeight:800, letterSpacing:"-2px", color:"#0a0a0a", margin:"0 0 24px", lineHeight:1.08, maxWidth:700 }}>
            We Believe Great Software<br/><span style={{ color:"#2563eb" }}>Changes Businesses</span>
          </h1>
          <p style={{ fontSize:18, color:"#666", maxWidth:580, lineHeight:1.75 }}>
            Byte Forge was founded in Ahmedabad with a simple belief: every business deserves access to world-class technology.
          </p>
        </FadeIn>
      </section>

      {/* Values */}
      <section style={{ padding:"80px 5%", background:"#f4f4f0" }}>
        <FadeIn>
          <h2 style={{ fontSize:"clamp(26px,3.5vw,42px)", fontWeight:800, letterSpacing:"-1.2px", color:"#0a0a0a", margin:"0 0 48px" }}>Our Core Values</h2>
        </FadeIn>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20 }}>
          {VALUES.map((v,i) => (
            <FadeIn key={v.title} delay={i*0.07}>
              <div style={{ background:"#fff", border:"1px solid #e8e8e4", borderRadius:16, padding:"32px 28px" }}>
                <div style={{ fontSize:28, color:"#2563eb", marginBottom:16 }}>{v.icon}</div>
                <div style={{ fontWeight:700, fontSize:17, marginBottom:10 }}>{v.title}</div>
                <div style={{ fontSize:14, color:"#666", lineHeight:1.7 }}>{v.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Team — from API */}
      <section style={{ padding:"100px 5%" }}>
        <FadeIn>
          <div style={{ display:"inline-block", background:"#eff6ff", color:"#2563eb", fontSize:12, fontWeight:700, letterSpacing:"1.2px", padding:"5px 14px", borderRadius:100, textTransform:"uppercase", marginBottom:16 }}>The People</div>
          <h2 style={{ fontSize:"clamp(26px,3.5vw,42px)", fontWeight:800, letterSpacing:"-1.2px", color:"#0a0a0a", margin:"0 0 12px" }}>Meet the Team</h2>
          <p style={{ fontSize:16, color:"#666", marginBottom:52, maxWidth:480 }}>A tight-knit group of engineers, designers, and strategists who care deeply about craft.</p>
        </FadeIn>
        {loading ? (
          <div style={{ textAlign:"center", padding:60, color:"#888" }}>Loading team...</div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:24 }}>
            {members.map((t,i) => (
              <FadeIn key={t.id||i} delay={i*0.08}>
                <div style={{ background:"#fff", border:"1px solid #e8e8e4", borderRadius:16, overflow:"hidden" }}>
                  <div style={{ background:t.color||"#dbeafe", padding:"36px 28px 28px", display:"flex", alignItems:"center", gap:16 }}>
                    <div style={{ width:56, height:56, borderRadius:"50%", background:t.accentColor||t.accent||"#2563eb", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:18 }}>{t.initials}</div>
                    <div>
                      <div style={{ fontWeight:800, fontSize:16, color:"#0a0a0a" }}>{t.name}</div>
                      <div style={{ fontSize:13, color:t.accentColor||t.accent||"#2563eb", fontWeight:600 }}>{t.role}</div>
                    </div>
                  </div>
                  <div style={{ padding:"20px 28px 28px" }}>
                    <p style={{ fontSize:14, color:"#555", lineHeight:1.7, margin:0 }}>{t.bio}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      {/* Timeline */}
      <section style={{ padding:"80px 5%", background:"#0a0a0a" }}>
        <FadeIn>
          <h2 style={{ fontSize:"clamp(26px,3.5vw,42px)", fontWeight:800, letterSpacing:"-1.2px", color:"#fff", margin:"0 0 52px" }}>How We Got Here</h2>
        </FadeIn>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20 }}>
          {MILESTONES.map((m,i) => (
            <FadeIn key={m.year} delay={i*0.07}>
              <div style={{ border:"1px solid #1e1e1e", borderRadius:16, padding:"28px 24px" }}>
                <div style={{ fontSize:13, fontWeight:800, color:"#2563eb", letterSpacing:"1px", marginBottom:12 }}>{m.year}</div>
                <div style={{ fontSize:16, fontWeight:700, color:"#fff", marginBottom:10 }}>{m.title}</div>
                <div style={{ fontSize:14, color:"#666", lineHeight:1.7 }}>{m.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section style={{ padding:"100px 5%", textAlign:"center" }}>
        <FadeIn>
          <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:800, letterSpacing:"-1.5px", color:"#0a0a0a", marginBottom:16 }}>Want to Work With Us?</h2>
          <p style={{ color:"#666", fontSize:17, marginBottom:40, maxWidth:480, margin:"0 auto 40px" }}>We're always looking for interesting projects and great people to collaborate with.</p>
          <button onClick={()=>navigate("/contact")} style={{ background:"#0a0a0a", color:"#fff", border:"none", borderRadius:10, padding:"16px 40px", fontWeight:700, fontSize:16, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
            Let's Talk →
          </button>
        </FadeIn>
      </section>
      <Footer />
    </div>
  );
}