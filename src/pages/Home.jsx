// src/pages/Home.jsx — Byte Forge homepage (redesigned, clearly-partitioned sections)
// Brand: blue #2563eb · amber #f59e0b · dark #0a0a0a · Outfit font
// Keeps all API wiring: useContent (get key,field,fallback), usePortfolio
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContent } from "../hooks/useContent";
import { usePortfolio } from "../hooks/usePortfolio";

// ── Brand tokens ────────────────────────────────────────
const BLUE = "#2563eb";
const AMBER = "#f59e0b";
const DARK = "#0a0a0a";
const INK = "#0f172a";

// ── Splash ──────────────────────────────────────────────
function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(iv); return 100; } return p + 2; }), 16);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    if (progress === 100) { setTimeout(() => setFadeOut(true), 250); setTimeout(onDone, 850); }
  }, [progress]);
  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, background:DARK, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", opacity:fadeOut?0:1, transition:"opacity 0.6s ease", pointerEvents:fadeOut?"none":"all" }}>
      <svg width="72" height="72" viewBox="0 0 40 40" fill="none" style={{ marginBottom:32, animation:"pulse 1.5s ease-in-out infinite" }}>
        <rect width="40" height="40" rx="10" fill="#111"/>
        <rect x="10" y="26" width="20" height="4" rx="1.5" fill="#fff"/>
        <rect x="11" y="10" width="3" height="12" rx="1" fill={BLUE}/>
        <rect x="14" y="10" width="7" height="3" rx="1" fill={BLUE}/>
        <rect x="14" y="15" width="6" height="3" rx="1" fill={BLUE}/>
        <rect x="14" y="19" width="7" height="3" rx="1" fill={BLUE}/>
        <circle cx="29" cy="11" r="2" fill={AMBER}/>
      </svg>
      <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:28, color:"#fff", letterSpacing:"-1px", marginBottom:40 }}>
        Byte<span style={{ color:BLUE }}>Forge</span>
      </div>
      <div style={{ width:200, height:3, background:"#1e1e1e", borderRadius:10, overflow:"hidden" }}>
        <div style={{ height:"100%", borderRadius:10, background:`linear-gradient(90deg,${BLUE},#7c3aed)`, width:`${progress}%`, transition:"width 0.1s linear" }}/>
      </div>
      <div style={{ color:"#444", fontSize:13, fontFamily:"'Outfit',sans-serif", marginTop:16 }}>
        {progress < 40 ? "Initializing..." : progress < 80 ? "Loading assets..." : "Almost ready..."}
      </div>
      <style>{`@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.06);opacity:0.85}}`}</style>
    </div>
  );
}

// ── Typing hook ─────────────────────────────────────────
function useTyping(words, speed=80, pause=1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx] || "";
    let timeout;
    if (!deleting && charIdx < current.length) timeout = setTimeout(() => setCharIdx(c => c+1), speed);
    else if (!deleting && charIdx === current.length) timeout = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0) timeout = setTimeout(() => setCharIdx(c => c-1), speed/2);
    else { setDeleting(false); setWordIdx(i => (i+1) % words.length); }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

// ── Scroll reveal hook ──────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, shown];
}
function Reveal({ children, delay=0, style={} }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} style={{ opacity:shown?1:0, transform:shown?"translateY(0)":"translateY(30px)", transition:`all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// ── Counter ─────────────────────────────────────────────
function Counter({ end, suffix="" }) {
  const [val, setVal] = useState(0);
  const [ref, shown] = useReveal();
  useEffect(() => {
    if (!shown) return;
    const target = parseInt(end) || 0; let cur = 0;
    const step = Math.max(1, Math.ceil(target/40));
    const iv = setInterval(() => { cur += step; if (cur >= target) { cur = target; clearInterval(iv); } setVal(cur); }, 28);
    return () => clearInterval(iv);
  }, [shown, end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ── Section heading helper ──────────────────────────────
function SectionLabel({ children, color=BLUE }) {
  return (
    <div style={{ display:"inline-block", fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:14, letterSpacing:"2px", textTransform:"uppercase", color, marginBottom:16 }}>
      {children}
    </div>
  );
}

const wrap = { maxWidth:1200, margin:"0 auto", padding:"0 24px" };
const fontHead = { fontFamily:"'Outfit',sans-serif" };

// ════════════════════════════════════════════════════════
export default function Home() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const { get } = useContent();
  const { items: portfolioItems } = usePortfolio();

  const typed = useTyping(["Mobile Apps", "Web Platforms", ".NET Backends", "Cloud Systems"], 90, 1600);

  // Content (API with fallbacks)
  const heroBadge = get("Hero","badge","Available for new projects — 2026");
  const heroH1 = get("Hero","headline1","I Build Apps");
  const heroH2 = get("Hero","headline2","That Ship & Scale.");
  const heroSub = get("Hero","subtitle","I'm Chintan Joshi — a senior engineer with 10+ years and 9+ live apps across healthcare, e-commerce, and enterprise. From Flutter mobile apps to .NET backends and cloud deployment, you work directly with the person building your product.");
  const cta1 = get("Hero","cta1","Explore Services →");
  const cta2 = get("Hero","cta2","View Our Work");

  const statsProjects = get("Stats","projects","9");
  const statsClients = get("Stats","clients","10");
  const statsDomains = get("Stats","domains","5");
  const statsDelivery = get("Stats","delivery","10");

  const aboutTag = get("About","tagline","One Senior Engineer. End-to-End Ownership.");
  const aboutBody = get("About","body","Byte Forge is led by Chintan Joshi — a senior software engineer who's spent 10+ years shipping real products. When you work with Byte Forge, you don't get handed to a junior team. You get a seasoned engineer who handles architecture, development, and deployment personally.");

  const servicesTag = get("Services","tagline","From ideation to deployment, I cover every layer of your digital product.");

  const ctaHead = get("CTA","headline","Have a Project in Mind?");
  const ctaSub = get("CTA","subtext","Tell me about it — I respond personally within 24 hours.");
  const ctaBtn = get("CTA","btnText","Start a Conversation →");

  const techs = ["Flutter","Android",".NET","React JS","Angular JS","Laravel","AWS"];

  const services = [
    { icon:"📱", title:"Mobile App Development", desc:"Native Android and cross-platform Flutter apps that ship to Android, iOS, and web from one codebase.", color:BLUE },
    { icon:"🌐", title:"Web Platforms", desc:"Modern, responsive web apps with React and Angular — fast, scalable, and built to last.", color:"#7c3aed" },
    { icon:"⚙️", title:"Backend & APIs", desc:"Robust REST APIs and server-side systems in .NET Core and Laravel, designed to scale.", color:AMBER },
    { icon:"☁️", title:"Cloud & DevOps", desc:"AWS deployment, CI/CD pipelines, and infrastructure that keeps your product reliable.", color:"#16a34a" },
    { icon:"🏥", title:"Healthcare Solutions", desc:"Diagnostic booking, report tracking, and health apps — a domain I know deeply.", color:"#db2777" },
    { icon:"🛒", title:"E-Commerce & POS", desc:"Shopping platforms, marketplaces, and point-of-sale systems with real-time inventory.", color:"#0891b2" },
  ];

  const featured = (portfolioItems && portfolioItems.length ? portfolioItems : []).slice(0, 6);

  return (
    <div style={{ background:"#fff", fontFamily:"'Outfit',sans-serif", overflowX:"hidden" }}>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section style={{ position:"relative", background:`linear-gradient(135deg, ${DARK} 0%, #14172a 55%, #1a2348 100%)`, color:"#fff", paddingTop:140, paddingBottom:110, overflow:"hidden" }}>
        {/* grid texture */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${BLUE}11 1px,transparent 1px),linear-gradient(90deg,${BLUE}11 1px,transparent 1px)`, backgroundSize:"56px 56px", opacity:0.5 }}/>
        {/* glow */}
        <div style={{ position:"absolute", top:-150, right:-100, width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle, ${BLUE}40, transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ position:"absolute", bottom:-120, left:-80, width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle, ${AMBER}25, transparent 70%)`, filter:"blur(40px)" }}/>

        <div style={{ ...wrap, position:"relative", textAlign:"center" }}>
          <Reveal>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(37,99,235,0.15)", border:`1px solid ${BLUE}55`, color:"#bcd0ff", padding:"8px 20px", borderRadius:30, fontSize:14, fontWeight:600, marginBottom:32 }}>
              <span style={{ width:8, height:8, borderRadius:"50%", background:"#22c55e", display:"inline-block" }}/>
              {heroBadge}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 style={{ ...fontHead, fontSize:"clamp(40px,7vw,88px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-2px", margin:"0 0 8px", color:"#fff" }}>
              {heroH1}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ ...fontHead, fontSize:"clamp(34px,6vw,76px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-2px", marginBottom:8, minHeight:"1.1em" }}>
              <span style={{ background:`linear-gradient(90deg,${BLUE},#7c3aed)`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{typed}</span>
              <span style={{ color:AMBER, fontWeight:300 }}>|</span>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <h2 style={{ ...fontHead, fontSize:"clamp(28px,5vw,64px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-2px", margin:"0 0 28px", color:"#fff" }}>
              {heroH2}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize:"clamp(16px,2vw,19px)", lineHeight:1.7, color:"#aab4cf", maxWidth:720, margin:"0 auto 40px" }}>
              {heroSub}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
              <button onClick={() => navigate("/services")} style={{ ...fontHead, background:`linear-gradient(90deg,${BLUE},#3b82f6)`, color:"#fff", border:"none", padding:"16px 34px", borderRadius:12, fontSize:16, fontWeight:700, cursor:"pointer", boxShadow:"0 10px 30px rgba(37,99,235,0.4)" }}>
                {cta1}
              </button>
              <button onClick={() => navigate("/portfolio")} style={{ ...fontHead, background:"rgba(255,255,255,0.08)", color:"#fff", border:"1px solid rgba(255,255,255,0.2)", padding:"16px 34px", borderRadius:12, fontSize:16, fontWeight:700, cursor:"pointer", backdropFilter:"blur(10px)" }}>
                {cta2}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ STATS BAND ═══════ */}
      <section style={{ background:"#fff", padding:"0", marginTop:-50, position:"relative", zIndex:2 }}>
        <div style={{ ...wrap }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:0, background:"#fff", borderRadius:20, boxShadow:"0 20px 60px rgba(0,0,0,0.1)", overflow:"hidden", border:"1px solid #eee" }}>
            {[
              { n:statsProjects, s:"+", l:"Live Projects", c:BLUE },
              { n:statsDelivery, s:"+", l:"Years Experience", c:AMBER },
              { n:statsClients, s:"+", l:"Happy Clients", c:"#7c3aed" },
              { n:statsDomains, s:"", l:"Industries Served", c:"#16a34a" },
            ].map((st, i) => (
              <div key={i} style={{ padding:"40px 24px", textAlign:"center", borderRight:i<3?"1px solid #f0f0f0":"none" }}>
                <div style={{ ...fontHead, fontSize:48, fontWeight:800, color:st.c, lineHeight:1 }}>
                  <Counter end={st.n} suffix={st.s} />
                </div>
                <div style={{ fontSize:15, color:"#666", marginTop:8, fontWeight:500 }}>{st.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ABOUT / PILLARS ═══════ */}
      <section style={{ background:"#fff", padding:"100px 0 90px" }}>
        <div style={{ ...wrap, textAlign:"center" }}>
          <Reveal><SectionLabel>Why Byte Forge</SectionLabel></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ ...fontHead, fontSize:"clamp(30px,4vw,46px)", fontWeight:800, color:INK, letterSpacing:"-1px", margin:"0 0 20px", maxWidth:760, marginInline:"auto" }}>
              {aboutTag}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize:18, lineHeight:1.7, color:"#555", maxWidth:720, margin:"0 auto 56px" }}>{aboutBody}</p>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
            {[
              { icon:"🎯", t:"Senior Expertise", d:"10+ years and 9+ shipped apps. You work directly with the engineer building your product — no juniors, no middlemen.", c:BLUE },
              { icon:"🚀", t:"Ships & Scales", d:"Real products that go live and grow. From first wireframe to production deployment and beyond.", c:AMBER },
              { icon:"🤝", t:"End-to-End Ownership", d:"Architecture, development, deployment — handled personally with full accountability at every step.", c:"#7c3aed" },
            ].map((p, i) => (
              <Reveal key={i} delay={0.1 + i*0.08}>
                <div style={{ background:"#fff", border:"1px solid #ececec", borderRadius:18, padding:"36px 28px", textAlign:"left", height:"100%", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", transition:"transform 0.3s, box-shadow 0.3s" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow="0 20px 40px rgba(0,0,0,0.1)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.04)";}}>
                  <div style={{ width:60, height:60, borderRadius:14, background:`${p.c}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, marginBottom:20 }}>{p.icon}</div>
                  <h3 style={{ ...fontHead, fontSize:21, fontWeight:700, color:INK, margin:"0 0 12px" }}>{p.t}</h3>
                  <p style={{ fontSize:15.5, lineHeight:1.65, color:"#666", margin:0 }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SERVICES (dark band) ═══════ */}
      <section style={{ background:`linear-gradient(160deg, ${INK}, #1a1f3a)`, padding:"100px 0", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle at 20% 30%, ${BLUE}18, transparent 40%)`, opacity:0.7 }}/>
        <div style={{ ...wrap, position:"relative", textAlign:"center" }}>
          <Reveal><SectionLabel color={AMBER}>What I Offer</SectionLabel></Reveal>
          <Reveal delay={0.05}>
            <h2 style={{ ...fontHead, fontSize:"clamp(30px,4vw,46px)", fontWeight:800, color:"#fff", letterSpacing:"-1px", margin:"0 0 16px" }}>
              End-to-End IT Services
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontSize:18, color:"#9aa6c4", maxWidth:640, margin:"0 auto 56px" }}>{servicesTag}</p>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24, textAlign:"left" }}>
            {services.map((s, i) => (
              <Reveal key={i} delay={0.05 + i*0.06}>
                <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:18, padding:"32px 28px", height:"100%", backdropFilter:"blur(10px)", transition:"transform 0.3s, border-color 0.3s, background 0.3s" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.borderColor=s.color;e.currentTarget.style.background="rgba(255,255,255,0.07)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor="rgba(255,255,255,0.1)";e.currentTarget.style.background="rgba(255,255,255,0.04)";}}>
                  <div style={{ width:56, height:56, borderRadius:14, background:`${s.color}22`, border:`1px solid ${s.color}55`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, marginBottom:20 }}>{s.icon}</div>
                  <h3 style={{ ...fontHead, fontSize:20, fontWeight:700, color:"#fff", margin:"0 0 10px" }}>{s.title}</h3>
                  <p style={{ fontSize:15, lineHeight:1.65, color:"#9aa6c4", margin:0 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TECH STACK (blue band) ═══════ */}
      <section style={{ background:`linear-gradient(135deg, ${BLUE}, #1e40af)`, padding:"70px 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(#ffffff0a 1px,transparent 1px),linear-gradient(90deg,#ffffff0a 1px,transparent 1px)`, backgroundSize:"40px 40px" }}/>
        <div style={{ ...wrap, position:"relative", textAlign:"center" }}>
          <Reveal>
            <SectionLabel color="#cdd9ff">Technologies I Work With</SectionLabel>
            <h2 style={{ ...fontHead, fontSize:"clamp(26px,3.5vw,38px)", fontWeight:800, color:"#fff", margin:"0 0 36px", letterSpacing:"-1px" }}>
              A Full Stack, One Engineer
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:14, justifyContent:"center" }}>
              {techs.map((t, i) => (
                <div key={i} style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", color:"#fff", padding:"12px 26px", borderRadius:30, fontSize:16, fontWeight:600, backdropFilter:"blur(10px)" }}>
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FEATURED WORK ═══════ */}
      {featured.length > 0 && (
        <section style={{ background:"#f8f9fc", padding:"100px 0" }}>
          <div style={{ ...wrap }}>
            <div style={{ textAlign:"center" }}>
              <Reveal><SectionLabel>Selected Work</SectionLabel></Reveal>
              <Reveal delay={0.05}>
                <h2 style={{ ...fontHead, fontSize:"clamp(30px,4vw,46px)", fontWeight:800, color:INK, letterSpacing:"-1px", margin:"0 0 16px" }}>
                  Apps I've Shipped
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ fontSize:18, color:"#666", maxWidth:600, margin:"0 auto 56px" }}>
                  Real products, used by real people — across healthcare, e-commerce, and enterprise.
                </p>
              </Reveal>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:24 }}>
              {featured.map((p, i) => (
                <Reveal key={p.id || i} delay={0.05 + i*0.06}>
                  <div onClick={() => navigate("/portfolio")} style={{ background:"#fff", borderRadius:18, overflow:"hidden", border:"1px solid #ececec", cursor:"pointer", height:"100%", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", transition:"transform 0.3s, box-shadow 0.3s" }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow="0 24px 48px rgba(0,0,0,0.12)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.04)";}}>
                    <div style={{ height:160, background:`linear-gradient(135deg, ${p.backgroundColor||INK}, ${p.accentColor||BLUE})`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                      <span style={{ ...fontHead, fontSize:26, fontWeight:800, color:"#fff", padding:"0 20px", textAlign:"center" }}>{p.title}</span>
                      {p.tag && <span style={{ position:"absolute", top:14, right:14, background:"rgba(255,255,255,0.2)", color:"#fff", fontSize:12, fontWeight:600, padding:"5px 12px", borderRadius:20, backdropFilter:"blur(10px)" }}>{p.tag}</span>}
                    </div>
                    <div style={{ padding:"24px" }}>
                      <p style={{ fontSize:15, lineHeight:1.6, color:"#555", margin:"0 0 16px", display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                        {p.description}
                      </p>
                      {p.techStack && (
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                          {String(p.techStack).split(",").slice(0,3).map((t,j) => (
                            <span key={j} style={{ background:"#f0f3fa", color:BLUE, fontSize:12, fontWeight:600, padding:"4px 10px", borderRadius:8 }}>{t.trim()}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ textAlign:"center", marginTop:48 }}>
              <button onClick={() => navigate("/portfolio")} style={{ ...fontHead, background:INK, color:"#fff", border:"none", padding:"15px 34px", borderRadius:12, fontSize:16, fontWeight:700, cursor:"pointer" }}>
                View All Projects →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ═══════ CTA BAND ═══════ */}
      <section style={{ background:`linear-gradient(135deg, ${INK}, #1a2348)`, padding:"90px 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-100, right:-60, width:360, height:360, borderRadius:"50%", background:`radial-gradient(circle,${AMBER}30,transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ position:"absolute", bottom:-100, left:-60, width:360, height:360, borderRadius:"50%", background:`radial-gradient(circle,${BLUE}40,transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ ...wrap, position:"relative", textAlign:"center" }}>
          <Reveal>
            <h2 style={{ ...fontHead, fontSize:"clamp(30px,4.5vw,52px)", fontWeight:800, color:"#fff", letterSpacing:"-1px", margin:"0 0 18px" }}>
              {ctaHead}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p style={{ fontSize:19, color:"#aab4cf", maxWidth:560, margin:"0 auto 36px" }}>{ctaSub}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <button onClick={() => navigate("/contact")} style={{ ...fontHead, background:`linear-gradient(90deg,${AMBER},#fbbf24)`, color:INK, border:"none", padding:"17px 40px", borderRadius:12, fontSize:17, fontWeight:800, cursor:"pointer", boxShadow:"0 10px 30px rgba(245,158,11,0.4)" }}>
              {ctaBtn}
            </button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}