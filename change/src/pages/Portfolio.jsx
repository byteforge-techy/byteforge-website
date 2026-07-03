// src/pages/Portfolio.jsx — Byte Forge (redesigned to match Home)
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePortfolio } from "../hooks/usePortfolio";

import {
  BLUE, AMBER, AMBER_LIGHT, DARK, INK,
  TEXT_MUTED, TEXT_SOFT, TEXT_ON_DARK, BADGE_TEXT, BORDER,
  BG_ALT,
} from "../theme";
const wrap = { maxWidth:1200, margin:"0 auto", padding:"0 24px" };
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

export default function Portfolio() {
  const navigate = useNavigate();
  const { items, loading } = usePortfolio();
  const [filter, setFilter] = useState("All");

  const tags = ["All", ...Array.from(new Set((items||[]).map(i => i.tag).filter(Boolean)))];
  const filtered = filter === "All" ? items : (items||[]).filter(i => i.tag === filter);

  return (
    <div style={{ background:"#fff", ...fontHead, overflowX:"hidden" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ position:"relative", background:`linear-gradient(135deg, ${DARK} 0%, #14172a 55%, #1a2348 100%)`, color:"#fff", paddingTop:150, paddingBottom:100, overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${BLUE}11 1px,transparent 1px),linear-gradient(90deg,${BLUE}11 1px,transparent 1px)`, backgroundSize:"56px 56px", opacity:0.5 }}/>
        <div style={{ position:"absolute", top:-150, right:-100, width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle, ${BLUE}40, transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ ...wrap, position:"relative" }}>
          <Reveal><SectionLabel color={BADGE_TEXT}>Selected Work</SectionLabel></Reveal>
          <Reveal delay={0.06}>
            <h1 style={{ ...fontHead, fontSize:"clamp(36px,6vw,72px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-2px", margin:"0 0 22px", color:"#fff" }}>
              Apps I've Shipped
            </h1>
          </Reveal>
          <Reveal delay={0.12}><p style={{ fontSize:"clamp(16px,2vw,19px)", lineHeight:1.7, color:TEXT_ON_DARK, maxWidth:660, margin:"0 auto" }}>Real products, used by real people — across healthcare, e-commerce, logistics, and enterprise.</p></Reveal>
        </div>
      </section>

      {/* FILTER + GRID */}
      <section style={{ background:BG_ALT, padding:"70px 0 100px" }}>
        <div style={{ ...wrap }}>
          {/* filter tabs */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", marginBottom:48 }}>
            {tags.map((t,i) => (
              <button key={i} onClick={()=>setFilter(t)} style={{ ...fontHead, padding:"10px 24px", borderRadius:30, fontSize:14.5, fontWeight:600, cursor:"pointer", border:filter===t?"none":`1px solid ${BORDER}`, background:filter===t?INK:"#fff", color:filter===t?"#fff":TEXT_MUTED, transition:"all .2s" }}>{t}</button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign:"center", color:TEXT_SOFT, padding:"60px 0" }}>Loading projects…</div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:24 }}>
              {filtered.map((p,i) => {
                const results = (() => { try { return p.results ? JSON.parse(p.results) : []; } catch { return String(p.results||"").split(",").map(s=>s.trim()).filter(Boolean); } })();
                return (
                  <Reveal key={p.id||i} delay={0.03+(i%3)*0.06}>
                    <div style={{ background:"#fff", borderRadius:18, overflow:"hidden", border:`1px solid ${BORDER}`, height:"100%", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", transition:"transform .3s, box-shadow .3s" }}
                      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow="0 24px 48px rgba(0,0,0,0.12)";}}
                      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.04)";}}>
                      <div style={{ height:170, background:`linear-gradient(135deg, ${p.backgroundColor||INK}, ${p.accentColor||BLUE})`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", padding:"0 20px" }}>
                        <span style={{ ...fontHead, fontSize:26, fontWeight:800, color:"#fff", textAlign:"center" }}>{p.title}</span>
                        {p.tag && <span style={{ position:"absolute", top:14, right:14, background:"rgba(255,255,255,0.2)", color:"#fff", fontSize:12, fontWeight:600, padding:"5px 12px", borderRadius:20, backdropFilter:"blur(10px)" }}>{p.tag}</span>}
                      </div>
                      <div style={{ padding:"26px 24px" }}>
                        <p style={{ fontSize:15, lineHeight:1.6, color:TEXT_MUTED, margin:"0 0 16px" }}>{p.description}</p>
                        {p.techStack && (
                          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:results.length?16:0 }}>
                            {String(p.techStack).split(",").map((t,j) => (
                              <span key={j} style={{ background:"#f0f3fa", color:BLUE, fontSize:12, fontWeight:600, padding:"4px 10px", borderRadius:8 }}>{t.trim()}</span>
                            ))}
                          </div>
                        )}
                        {results.length > 0 && (
                          <div style={{ display:"flex", flexDirection:"column", gap:7, borderTop:`1px solid ${BORDER}`, paddingTop:16 }}>
                            {results.map((r,j) => (
                              <div key={j} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13.5, color:TEXT_MUTED }}>
                                <span style={{ color:AMBER_LIGHT, fontWeight:700 }}>✓</span>{r}
                              </div>
                            ))}
                          </div>
                        )}
                        {p.duration && <div style={{ marginTop:14, fontSize:13, color:TEXT_SOFT }}>⏱ {p.duration}</div>}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:`linear-gradient(135deg, ${INK}, #1a2348)`, padding:"90px 0", position:"relative", overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute", top:-100, right:-60, width:360, height:360, borderRadius:"50%", background:`radial-gradient(circle,${AMBER}30,transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ position:"absolute", bottom:-100, left:-60, width:360, height:360, borderRadius:"50%", background:`radial-gradient(circle,${BLUE}40,transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ ...wrap, position:"relative" }}>
          <Reveal><h2 style={{ ...fontHead, fontSize:"clamp(30px,4.5vw,48px)", fontWeight:800, color:"#fff", letterSpacing:"-1px", margin:"0 0 18px" }}>Want Something Like This Built?</h2></Reveal>
          <Reveal delay={0.08}><p style={{ fontSize:18, color:TEXT_ON_DARK, maxWidth:540, margin:"0 auto 34px" }}>Let's talk about your project — I respond personally within 24 hours.</p></Reveal>
          <Reveal delay={0.16}>
            <button onClick={()=>navigate("/contact")} style={{ ...fontHead, background:`linear-gradient(90deg,${AMBER},#fbbf24)`, color:INK, border:"none", padding:"16px 38px", borderRadius:12, fontSize:16, fontWeight:800, cursor:"pointer", boxShadow:"0 10px 30px rgba(245,158,11,0.4)" }}>Start a Conversation →</button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}