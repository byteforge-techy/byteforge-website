// src/pages/Services.jsx — Byte Forge (redesigned to match Home)
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContent } from "../hooks/useContent";

import {
  BLUE, BLUE_LIGHT, BLUE_DARK, AMBER, AMBER_LIGHT,
  AMBER_DARK, DARK, INK, TEXT_MUTED, TEXT_ON_DARK,
  BADGE_TEXT, BORDER,
  CONTAINER,
} from "../theme";
const wrap = CONTAINER; // shared with Navbar/Footer — keeps every section aligned
const fontHead = { fontFamily:"'Outfit',sans-serif" };

function useReveal() {
  const ref = useRef(null); const [shown, setShown] = useState(false);
  useEffect(() => { const el=ref.current; if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setShown(true);obs.disconnect();}},{threshold:0.1});
    obs.observe(el); return ()=>obs.disconnect();
  }, []); return [ref, shown];
}
function Reveal({ children, delay=0, style={} }) {
  const [ref, shown] = useReveal();
  return <div ref={ref} style={{ opacity:shown?1:0, transform:shown?"translateY(0)":"translateY(30px)", transition:`all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style }}>{children}</div>;
}
function SectionLabel({ children, color=BLUE }) {
  return <div style={{ display:"inline-block", ...fontHead, fontWeight:700, fontSize:14, letterSpacing:"2px", textTransform:"uppercase", color, marginBottom:16 }}>{children}</div>;
}

export default function Services() {
  const navigate = useNavigate();
  const { get } = useContent();
  const servicesTag = get("Services","tagline","From ideation to deployment, I cover every layer of your digital product.");

  const services = [
    { icon:"📱", title:"Mobile App Development", desc:"Native Android (Java/Kotlin) and cross-platform Flutter apps — ship to Android, iOS, and web from one clean codebase.", points:["Flutter & native Android","iOS via Flutter","Material Design & custom UI"], c:BLUE },
    { icon:"🌐", title:"Web Development", desc:"Responsive, modern web apps with React and Angular. Fast, accessible, and built to scale with your business.", points:["React & Angular","Responsive design","Performance-optimized"], c:BLUE_DARK },
    { icon:"⚙️", title:"Backend & APIs", desc:"Robust server-side systems and REST APIs in .NET Core and Laravel, with secure JWT authentication.", points:[".NET Core & Laravel","REST API design","JWT auth & security"], c:AMBER },
    { icon:"☁️", title:"Cloud & DevOps", desc:"AWS deployment, CI/CD pipelines, and reliable infrastructure that keeps your product running smoothly.", points:["AWS (Lambda, S3, more)","CI/CD pipelines","Monitoring & scaling"], c:AMBER_LIGHT },
    { icon:"🏥", title:"Healthcare Apps", desc:"Diagnostic booking, report tracking, and patient-facing health apps — a domain with proven delivery.", points:["Booking & scheduling","Report tracking","HIPAA-aware design"], c:BLUE_LIGHT },
    { icon:"🛒", title:"E-Commerce & POS", desc:"Shopping platforms, marketplaces, and restaurant POS systems with payments and real-time inventory.", points:["Online stores","Marketplaces","POS & inventory"], c:AMBER_DARK },
  ];

  const process = [
    { n:"01", t:"Discovery", d:"We talk through your idea, goals, and constraints — honestly." },
    { n:"02", t:"Architecture", d:"I design a clean, scalable structure before writing a line of code." },
    { n:"03", t:"Build & Iterate", d:"Development with regular check-ins so you're never in the dark." },
    { n:"04", t:"Ship & Support", d:"Deployment to production, plus support to keep it running." },
  ];

  return (
    <div style={{ background:"#fff", ...fontHead, overflowX:"hidden" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ position:"relative", background:`linear-gradient(135deg, ${DARK} 0%, #14172a 55%, #1a2348 100%)`, color:"#fff", paddingTop:150, paddingBottom:110, overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${BLUE}11 1px,transparent 1px),linear-gradient(90deg,${BLUE}11 1px,transparent 1px)`, backgroundSize:"56px 56px", opacity:0.5 }}/>
        <div style={{ position:"absolute", top:-150, left:-100, width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle, ${BLUE}40, transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ ...wrap, position:"relative" }}>
          <Reveal><SectionLabel color={BADGE_TEXT}>What I Offer</SectionLabel></Reveal>
          <Reveal delay={0.06}>
            <h1 style={{ ...fontHead, fontSize:"clamp(36px,6vw,72px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-2px", margin:"0 0 10px", color:"#fff" }}>
              End-to-End IT Services
            </h1>
            <div style={{ ...fontHead, fontSize:"clamp(28px,4.5vw,56px)", fontWeight:800, letterSpacing:"-2px", marginBottom:24, background:`linear-gradient(90deg,${BLUE},${BLUE_LIGHT})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Built to Scale</div>
          </Reveal>
          <Reveal delay={0.12}><p style={{ fontSize:"clamp(16px,2vw,19px)", lineHeight:1.7, color:TEXT_ON_DARK, maxWidth:680, margin:"0 auto" }}>{servicesTag}</p></Reveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ background:"#fff", padding:"100px 0" }}>
        <div style={{ ...wrap }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(330px,1fr))", gap:24 }}>
            {services.map((s,i) => (
              <Reveal key={i} delay={0.04+i*0.06}>
                <div style={{ background:"#fff", border:`1px solid ${BORDER}`, borderRadius:18, padding:"36px 30px", height:"100%", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", transition:"transform .3s, box-shadow .3s", borderTop:`3px solid ${s.c}` }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow="0 24px 48px rgba(0,0,0,0.12)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.04)";}}>
                  <div style={{ width:60, height:60, borderRadius:14, background:`${s.c}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, marginBottom:20 }}>{s.icon}</div>
                  <h3 style={{ ...fontHead, fontSize:22, fontWeight:700, color:INK, margin:"0 0 12px" }}>{s.title}</h3>
                  <p style={{ fontSize:15.5, lineHeight:1.65, color:TEXT_MUTED, margin:"0 0 18px" }}>{s.desc}</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {s.points.map((p,j) => (
                      <div key={j} style={{ display:"flex", alignItems:"center", gap:10, fontSize:14.5, color:TEXT_MUTED }}>
                        <span style={{ width:6, height:6, borderRadius:"50%", background:s.c, flexShrink:0 }}/>{p}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS (dark band) */}
      <section style={{ background:`linear-gradient(160deg, ${INK}, #1a1f3a)`, padding:"100px 0", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle at 20% 30%, ${BLUE}18, transparent 40%)`, opacity:0.7 }}/>
        <div style={{ ...wrap, position:"relative", textAlign:"center" }}>
          <Reveal><SectionLabel color={AMBER}>How I Work</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2 style={{ ...fontHead, fontSize:"clamp(30px,4vw,46px)", fontWeight:800, color:"#fff", letterSpacing:"-1px", margin:"0 0 56px" }}>A Clear, Honest Process</h2></Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:24, textAlign:"left" }}>
            {process.map((p,i) => (
              <Reveal key={i} delay={0.05+i*0.08}>
                <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"30px 26px", height:"100%", backdropFilter:"blur(10px)" }}>
                  <div style={{ ...fontHead, fontSize:40, fontWeight:800, color:`${BLUE}`, opacity:0.5, marginBottom:12 }}>{p.n}</div>
                  <h3 style={{ ...fontHead, fontSize:20, fontWeight:700, color:"#fff", margin:"0 0 8px" }}>{p.t}</h3>
                  <p style={{ fontSize:14.5, lineHeight:1.6, color:TEXT_ON_DARK, margin:0 }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:`linear-gradient(135deg, ${BLUE}, #1e40af)`, padding:"90px 0", position:"relative", overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(#ffffff0a 1px,transparent 1px),linear-gradient(90deg,#ffffff0a 1px,transparent 1px)`, backgroundSize:"40px 40px" }}/>
        <div style={{ ...wrap, position:"relative" }}>
          <Reveal><h2 style={{ ...fontHead, fontSize:"clamp(30px,4.5vw,48px)", fontWeight:800, color:"#fff", letterSpacing:"-1px", margin:"0 0 18px" }}>Ready to Start Your Project?</h2></Reveal>
          <Reveal delay={0.08}><p style={{ fontSize:18, color:BADGE_TEXT, maxWidth:540, margin:"0 auto 34px" }}>Tell me what you're building. I'll give you honest, practical advice within 24 hours.</p></Reveal>
          <Reveal delay={0.16}>
            <button onClick={()=>navigate("/contact")} style={{ ...fontHead, background:`linear-gradient(90deg,${AMBER},#fbbf24)`, color:INK, border:"none", padding:"16px 38px", borderRadius:12, fontSize:16, fontWeight:800, cursor:"pointer", boxShadow:"0 10px 30px rgba(245,158,11,0.4)" }}>Start a Conversation →</button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}