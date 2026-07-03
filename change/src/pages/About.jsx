// src/pages/About.jsx — Byte Forge (redesigned to match Home)
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTeam } from "../hooks/usePortfolio";
import { useContent } from "../hooks/useContent";

import {
  BLUE, BLUE_DARK, AMBER, AMBER_LIGHT, DARK,
  INK, TEXT_MUTED, TEXT_ON_DARK, BADGE_TEXT, BORDER,
  BG_ALT,
} from "../theme";
const wrap = { maxWidth:1200, margin:"0 auto", padding:"0 24px" };
const fontHead = { fontFamily:"'Outfit',sans-serif" };

function useReveal() {
  const ref = useRef(null); const [shown, setShown] = useState(false);
  useEffect(() => { const el=ref.current; if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setShown(true);obs.disconnect();}},{threshold:0.12});
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

export default function About() {
  const navigate = useNavigate();
  const { members } = useTeam();
  const { get } = useContent();

  const aboutTag = get("About","tagline","One Senior Engineer. End-to-End Ownership.");
  const aboutBody = get("About","body","Byte Forge is led by Chintan — a senior software engineer who's spent 10+ years shipping real products. When you work with Byte Forge, you don't get handed to a junior team. You get a seasoned engineer who handles architecture, development, and deployment personally.");

  const values = [
    { icon:"🎯", t:"Senior Expertise", d:"A decade-plus of real production experience. You always work directly with the engineer building your product.", c:BLUE },
    { icon:"📦", t:"Ships & Scales", d:"Real products that reach users and grow with the business — not prototypes that stall.", c:AMBER },
    { icon:"🔍", t:"Honest & Clear", d:"Straight answers, realistic timelines, and transparent communication at every step.", c:BLUE_DARK },
    { icon:"🤝", t:"Full Ownership", d:"From architecture to deployment, I take complete responsibility for what I build.", c:AMBER_LIGHT },
  ];

  const journey = [
    { y:"2013–2015", t:"MCA — Foundations", d:"Master's in Computer Application. Where the engineering discipline began." },
    { y:"2016+", t:"Enterprise Systems", d:"Built ERP, streaming, and data-prep systems serving large institutions." },
    { y:"2023+", t:"Senior Engineer", d:"Leading enterprise dashboards, scalable APIs, and cross-platform apps." },
    { y:"2026", t:"Byte Forge", d:"Bringing a decade of shipped products directly to businesses that need them." },
  ];

  return (
    <div style={{ background:"#fff", ...fontHead, overflowX:"hidden" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ position:"relative", background:`linear-gradient(135deg, ${DARK} 0%, #14172a 55%, #1a2348 100%)`, color:"#fff", paddingTop:150, paddingBottom:110, overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${BLUE}11 1px,transparent 1px),linear-gradient(90deg,${BLUE}11 1px,transparent 1px)`, backgroundSize:"56px 56px", opacity:0.5 }}/>
        <div style={{ position:"absolute", top:-150, right:-100, width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle, ${BLUE}40, transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ ...wrap, position:"relative" }}>
          <Reveal><SectionLabel color={BADGE_TEXT}>Our Story</SectionLabel></Reveal>
          <Reveal delay={0.06}>
            <h1 style={{ ...fontHead, fontSize:"clamp(36px,5.5vw,68px)", fontWeight:800, lineHeight:1.08, letterSpacing:"-2px", margin:"0 0 24px", color:"#fff" }}>
              {aboutTag}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{ fontSize:"clamp(16px,2vw,19px)", lineHeight:1.7, color:TEXT_ON_DARK, maxWidth:720, margin:"0 auto" }}>{aboutBody}</p>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background:"#fff", padding:"100px 0" }}>
        <div style={{ ...wrap, textAlign:"center" }}>
          <Reveal><SectionLabel>What I Stand For</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2 style={{ ...fontHead, fontSize:"clamp(30px,4vw,46px)", fontWeight:800, color:INK, letterSpacing:"-1px", margin:"0 0 56px" }}>Principles Behind Every Project</h2></Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:24 }}>
            {values.map((v,i) => (
              <Reveal key={i} delay={0.05+i*0.07}>
                <div style={{ background:"#fff", border:`1px solid ${BORDER}`, borderRadius:18, padding:"34px 26px", textAlign:"left", height:"100%", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", transition:"transform .3s, box-shadow .3s" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow="0 20px 40px rgba(0,0,0,0.1)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.04)";}}>
                  <div style={{ width:58, height:58, borderRadius:14, background:`${v.c}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, marginBottom:18 }}>{v.icon}</div>
                  <h3 style={{ ...fontHead, fontSize:20, fontWeight:700, color:INK, margin:"0 0 10px" }}>{v.t}</h3>
                  <p style={{ fontSize:15, lineHeight:1.6, color:TEXT_MUTED, margin:0 }}>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY (dark band) */}
      <section style={{ background:`linear-gradient(160deg, ${INK}, #1a1f3a)`, padding:"100px 0", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle at 80% 20%, ${BLUE}18, transparent 40%)`, opacity:0.7 }}/>
        <div style={{ ...wrap, position:"relative", textAlign:"center" }}>
          <Reveal><SectionLabel color={AMBER}>The Journey</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2 style={{ ...fontHead, fontSize:"clamp(30px,4vw,46px)", fontWeight:800, color:"#fff", letterSpacing:"-1px", margin:"0 0 56px" }}>A Decade of Building</h2></Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:24, textAlign:"left" }}>
            {journey.map((j,i) => (
              <Reveal key={i} delay={0.05+i*0.08}>
                <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"28px 24px", height:"100%", backdropFilter:"blur(10px)" }}>
                  <div style={{ ...fontHead, fontSize:15, fontWeight:700, color:AMBER, marginBottom:10 }}>{j.y}</div>
                  <h3 style={{ ...fontHead, fontSize:19, fontWeight:700, color:"#fff", margin:"0 0 8px" }}>{j.t}</h3>
                  <p style={{ fontSize:14.5, lineHeight:1.6, color:TEXT_ON_DARK, margin:0 }}>{j.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER / TEAM */}
      <section style={{ background:BG_ALT, padding:"100px 0" }}>
        <div style={{ ...wrap, textAlign:"center" }}>
          <Reveal><SectionLabel>Who You Work With</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2 style={{ ...fontHead, fontSize:"clamp(30px,4vw,46px)", fontWeight:800, color:INK, letterSpacing:"-1px", margin:"0 0 56px" }}>The Person Behind Byte Forge</h2></Reveal>
          <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:24 }}>
            {(members||[]).map((m,i) => (
              <Reveal key={m.id||i} delay={0.05+i*0.08}>
                <div style={{ background:"#fff", border:`1px solid ${BORDER}`, borderRadius:20, padding:"40px 36px", maxWidth:members && members.length===1 ? 480 : 320, textAlign:"center", boxShadow:"0 8px 30px rgba(0,0,0,0.06)" }}>
                  <div style={{ width:96, height:96, borderRadius:"50%", background:m.color||"#dbeafe", color:m.accentColor||BLUE, display:"flex", alignItems:"center", justifyContent:"center", fontSize:34, fontWeight:800, margin:"0 auto 20px", ...fontHead }}>
                    {m.initials || (m.name||"").split(" ").map(w=>w[0]).join("").slice(0,2)}
                  </div>
                  <h3 style={{ ...fontHead, fontSize:24, fontWeight:800, color:INK, margin:"0 0 6px" }}>{m.name}</h3>
                  <div style={{ color:m.accentColor||BLUE, fontWeight:600, fontSize:15, marginBottom:16 }}>{m.role}</div>
                  <p style={{ fontSize:15.5, lineHeight:1.7, color:TEXT_MUTED, margin:0 }}>{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:`linear-gradient(135deg, ${INK}, #1a2348)`, padding:"90px 0", position:"relative", overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute", top:-100, right:-60, width:360, height:360, borderRadius:"50%", background:`radial-gradient(circle,${AMBER}30,transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ position:"absolute", bottom:-100, left:-60, width:360, height:360, borderRadius:"50%", background:`radial-gradient(circle,${BLUE}40,transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ ...wrap, position:"relative" }}>
          <Reveal><h2 style={{ ...fontHead, fontSize:"clamp(30px,4.5vw,48px)", fontWeight:800, color:"#fff", letterSpacing:"-1px", margin:"0 0 18px" }}>Let's Build Something Together</h2></Reveal>
          <Reveal delay={0.08}><p style={{ fontSize:18, color:TEXT_ON_DARK, maxWidth:540, margin:"0 auto 34px" }}>Have a project in mind? I respond personally within 24 hours.</p></Reveal>
          <Reveal delay={0.16}>
            <button onClick={()=>navigate("/contact")} style={{ ...fontHead, background:`linear-gradient(90deg,${AMBER},#fbbf24)`, color:INK, border:"none", padding:"16px 38px", borderRadius:12, fontSize:16, fontWeight:800, cursor:"pointer", boxShadow:"0 10px 30px rgba(245,158,11,0.4)" }}>Get in Touch →</button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}