// src/pages/Home.jsx — dynamic content from API
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContent } from "../hooks/useContent";
import { usePortfolio } from "../hooks/usePortfolio";

// ── Splash ──────────────────────────────────────────────
function SplashScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => setProgress(p => { if (p >= 100) { clearInterval(iv); return 100; } return p + 2; }), 18);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    if (progress === 100) { setTimeout(() => setFadeOut(true), 300); setTimeout(onDone, 900); }
  }, [progress]);
  return (
    <div style={{ position:"fixed", inset:0, zIndex:9999, background:"#0a0a0a", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", opacity:fadeOut?0:1, transition:"opacity 0.6s ease", pointerEvents:fadeOut?"none":"all" }}>
      <svg width="72" height="72" viewBox="0 0 40 40" fill="none" style={{ marginBottom:32, animation:"pulse 1.5s ease-in-out infinite" }}>
        <rect width="40" height="40" rx="10" fill="#111"/>
        <rect x="10" y="26" width="20" height="4" rx="1.5" fill="#fff"/>
        <rect x="11" y="10" width="3" height="12" rx="1" fill="#2563eb"/>
        <rect x="14" y="10" width="7" height="3" rx="1" fill="#2563eb"/>
        <rect x="14" y="15" width="6" height="3" rx="1" fill="#2563eb"/>
        <rect x="14" y="19" width="7" height="3" rx="1" fill="#2563eb"/>
        <circle cx="29" cy="11" r="2" fill="#f59e0b"/>
      </svg>
      <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:28, color:"#fff", letterSpacing:"-1px", marginBottom:40 }}>
        Byte<span style={{ color:"#2563eb" }}>Forge</span>
      </div>
      <div style={{ width:200, height:3, background:"#1e1e1e", borderRadius:10, overflow:"hidden" }}>
        <div style={{ height:"100%", borderRadius:10, background:"linear-gradient(90deg,#2563eb,#7c3aed)", width:`${progress}%`, transition:"width 0.1s linear" }}/>
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
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) timeout = setTimeout(() => setCharIdx(c => c+1), speed);
    else if (!deleting && charIdx === current.length) timeout = setTimeout(() => setDeleting(true), pause);
    else if (deleting && charIdx > 0) timeout = setTimeout(() => setCharIdx(c => c-1), speed/2);
    else { setDeleting(false); setWordIdx(i => (i+1) % words.length); }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx]);
  return display;
}

// ── Counter hook ────────────────────────────────────────
function useCounter(target, duration=1800, start=false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t = null;
    const s = Date.now();
    const step = (ts) => {
      const p = Math.min((Date.now()-s)/duration, 1);
      setCount(Math.floor((1-Math.pow(1-p,3)) * target));
      if (p < 1) t = requestAnimationFrame(step);
    };
    t = requestAnimationFrame(step);
    return () => cancelAnimationFrame(t);
  }, [start, target]);
  return count;
}

// ── FadeIn ──────────────────────────────────────────────
function FadeIn({ children, delay=0, direction="up", className="" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold:0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const t = { up:"translateY(32px)", left:"translateX(-32px)", right:"translateX(32px)" };
  return (
    <div ref={ref} className={className} style={{ opacity:visible?1:0, transform:visible?"none":t[direction]||"translateY(32px)", transition:`opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ── StatCard ────────────────────────────────────────────
function StatCard({ num, suffix="+", label }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const count = useCounter(parseInt(num)||0, 1600, started);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold:0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <div style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:800, color:"#0a0a0a", letterSpacing:"-1.5px", lineHeight:1 }}>{count}{suffix}</div>
      <div style={{ fontSize:13, color:"#888", fontWeight:500, marginTop:6 }}>{label}</div>
    </div>
  );
}

const TYPING_WORDS = ["Web Apps","Mobile Apps","Cloud Solutions","Custom Software","UI/UX Design","IT Strategy"];
const SERVICES = [
  { icon:"◈", title:"Web Development", desc:"Scalable, high-performance web apps built with React, Next.js & ASP.NET.", color:"#dbeafe", accent:"#2563eb" },
  { icon:"◉", title:"Mobile Apps", desc:"Cross-platform iOS & Android apps with smooth UX and robust backend integrations.", color:"#dcfce7", accent:"#16a34a" },
  { icon:"◇", title:"UI/UX Design", desc:"Research-driven design that converts. Wireframes, prototypes, and pixel-perfect interfaces.", color:"#fef9c3", accent:"#ca8a04" },
  { icon:"◎", title:"IT Consulting", desc:"Strategic technology guidance — architecture reviews and digital transformation planning.", color:"#fce7f3", accent:"#db2777" },
  { icon:"▣", title:"Custom Software", desc:"Bespoke solutions engineered for your exact workflows. ERPs, CRMs, and automation pipelines.", color:"#ede9fe", accent:"#7c3aed" },
  { icon:"⬡", title:"Cloud & DevOps", desc:"CI/CD pipelines, Kubernetes, AWS/Azure. Reliable infrastructure at every stage.", color:"#ffedd5", accent:"#ea580c" },
];
const TESTIMONIALS = [
  { name:"Ravi Mehta", role:"CEO, FinTrack", text:"Byte Forge delivered a product that exceeded our expectations — on time and within budget.", initials:"RM", color:"#dbeafe", accent:"#2563eb" },
  { name:"Priya Shah", role:"Founder, MediConnect", text:"From wireframes to launch, the team was transparent, fast, and genuinely invested in our success.", initials:"PS", color:"#dcfce7", accent:"#16a34a" },
  { name:"Arjun Desai", role:"CTO, LogiFlow", text:"The ERP system they built transformed our operations. We went from spreadsheets to fully automated in 3 months.", initials:"AD", color:"#ede9fe", accent:"#7c3aed" },
];

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const typedWord = useTyping(TYPING_WORDS);

  // ── API data ──
  const { get, loading: contentLoading } = useContent();
  const { items: portfolioItems } = usePortfolio();

  useEffect(() => { if (splashDone) setTimeout(() => setPageVisible(true), 50); }, [splashDone]);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box;} body{margin:0;}
        .btn-primary{transition:all 0.25s ease!important;}
        .btn-primary:hover{background:#2563eb!important;transform:translateY(-2px)!important;box-shadow:0 8px 24px rgba(37,99,235,0.35)!important;}
        .btn-outline:hover{border-color:#2563eb!important;color:#2563eb!important;transform:translateY(-2px)!important;}
        .svc-card{transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1)!important;cursor:pointer;}
        .svc-card:hover{transform:translateY(-10px) scale(1.02)!important;box-shadow:0 24px 60px rgba(0,0,0,0.12)!important;}
        .t-card{transition:all 0.3s ease!important;}
        .t-card:hover{transform:translateY(-6px)!important;box-shadow:0 20px 50px rgba(0,0,0,0.1)!important;}
        .proj-card{transition:transform 0.35s cubic-bezier(0.34,1.2,0.64,1),box-shadow 0.35s ease;cursor:pointer;}
        .hero-float{animation:hf 6s ease-in-out infinite;}
        .hero-float-2{animation:hf 8s ease-in-out infinite reverse;}
        .hero-float-3{animation:hf 5s ease-in-out infinite 1s;}
        @keyframes hf{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        .cursor-blink{animation:blink 1s step-end infinite;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        .gradient-text{background:linear-gradient(135deg,#2563eb 0%,#7c3aed 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .grid-bg{background-image:linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px);background-size:48px 48px;}
        .dot-bg{background-image:radial-gradient(circle,rgba(37,99,235,0.12) 1px,transparent 1px);background-size:28px 28px;}
        @media(max-width:768px){.hero-deco{display:none!important}.stats-row{gap:28px!important}.about-grid{grid-template-columns:1fr!important;gap:40px!important}}
      `}</style>

      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      <div style={{ fontFamily:"'Outfit',sans-serif", color:"#111", background:"#fafaf8", minHeight:"100vh", opacity:pageVisible?1:0, transition:"opacity 0.6s ease" }}>
        <Navbar />

        {/* ── HERO ── */}
        <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"0 5%", position:"relative", overflow:"hidden", background:"linear-gradient(160deg,#fafaf8 55%,#eff6ff 100%)" }}>
          <div className="grid-bg" style={{ position:"absolute", inset:0 }}/>
          <div style={{ position:"absolute", top:"20%", left:"30%", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(37,99,235,0.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
          <div style={{ maxWidth:700, position:"relative", zIndex:2, paddingTop:80 }}>
            <FadeIn>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#fff", border:"1px solid #e0e0da", borderRadius:100, padding:"6px 16px", fontSize:13, color:"#555", fontWeight:500, marginBottom:28, boxShadow:"0 2px 8px rgba(0,0,0,0.05)" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 0 3px rgba(34,197,94,0.2)", display:"inline-block" }}/>
                {get("Hero","badge","Now accepting new clients — 2025")}
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 style={{ fontSize:"clamp(44px,6.5vw,82px)", fontWeight:900, lineHeight:1.02, letterSpacing:"-3px", margin:"0 0 10px", color:"#0a0a0a" }}>
                {get("Hero","headline1","We Build")}
              </h1>
              <h1 style={{ fontSize:"clamp(44px,6.5vw,82px)", fontWeight:900, lineHeight:1.02, letterSpacing:"-3px", margin:"0 0 10px" }}>
                <span className="gradient-text">{typedWord}</span>
                <span className="cursor-blink" style={{ color:"#2563eb", marginLeft:4 }}>|</span>
              </h1>
              <h1 style={{ fontSize:"clamp(44px,6.5vw,82px)", fontWeight:900, lineHeight:1.02, letterSpacing:"-3px", margin:"0 0 32px", color:"#0a0a0a" }}>
                {get("Hero","headline2","That Last.")}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontSize:18, color:"#555", lineHeight:1.8, maxWidth:520, marginBottom:44 }}>
                {get("Hero","subtitle","Byte Forge is a service-based IT firm building world-class software, apps, and cloud infrastructure for startups and enterprises across India and beyond.")}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("services")} style={{ background:"#0a0a0a", color:"#fff", border:"none", borderRadius:12, padding:"16px 36px", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                  {get("Hero","cta1","Explore Services →")}
                </button>
                <button className="btn-outline" onClick={() => navigate("/portfolio")} style={{ background:"transparent", color:"#0a0a0a", border:"1.5px solid #ccc", borderRadius:12, padding:"16px 36px", fontWeight:600, fontSize:15, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.25s" }}>
                  {get("Hero","cta2","View Our Work")}
                </button>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="stats-row" style={{ display:"flex", gap:48, marginTop:64, paddingTop:48, borderTop:"1px solid #e8e8e4", flexWrap:"wrap" }}>
                <StatCard num={get("Stats","projects","50")} suffix="+" label="Projects Delivered" />
                <StatCard num={get("Stats","clients","30")} suffix="+" label="Happy Clients" />
                <StatCard num={get("Stats","domains","6")} suffix="+" label="Tech Domains" />
                <StatCard num={get("Stats","delivery","100")} suffix="%" label="On-time Delivery" />
              </div>
            </FadeIn>
          </div>
          {/* Floating decorations */}
          <div className="hero-deco" style={{ position:"absolute", right:"4%", top:"50%", transform:"translateY(-50%)", zIndex:1 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {[{bg:"linear-gradient(135deg,#dbeafe,#eff6ff)",cls:"hero-float"},{bg:"linear-gradient(135deg,#ede9fe,#fce7f3)",cls:"hero-float-2"},{bg:"linear-gradient(135deg,#dcfce7,#fef9c3)",cls:"hero-float-3"},{bg:"linear-gradient(135deg,#ffedd5,#fef9c3)",cls:"hero-float"}].map((d,i)=>(
                <div key={i} className={d.cls} style={{ width:110, height:110, background:d.bg, borderRadius:20, border:"1px solid rgba(0,0,0,0.05)", boxShadow:"0 8px 32px rgba(0,0,0,0.06)" }}/>
              ))}
            </div>
            {["React",".NET","Azure","Flutter"].map((t,i)=>(
              <div key={t} className="hero-float" style={{ position:"absolute", top:i<2?-40:"auto", bottom:i>=2?-40:"auto", left:i%2===0?0:"auto", right:i%2!==0?0:"auto", background:"#fff", border:"1px solid #e8e8e4", borderRadius:100, padding:"6px 14px", fontSize:12, fontWeight:700, color:"#555", boxShadow:"0 4px 16px rgba(0,0,0,0.08)", animationDelay:`${i*0.3}s`, whiteSpace:"nowrap" }}>{t}</div>
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" style={{ padding:"110px 5%", background:"#fafaf8" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:64 }}>
              <div style={{ display:"inline-block", background:"#eff6ff", color:"#2563eb", fontSize:12, fontWeight:700, letterSpacing:"1.2px", padding:"5px 16px", borderRadius:100, textTransform:"uppercase", marginBottom:20 }}>What We Do</div>
              <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:800, letterSpacing:"-1.8px", margin:"0 0 16px", color:"#0a0a0a" }}>End-to-End IT Services</h2>
              <p style={{ fontSize:17, color:"#666", maxWidth:500, margin:"0 auto", lineHeight:1.7 }}>
                {get("Services","tagline","From ideation to deployment, we cover every layer of your digital product.")}
              </p>
            </div>
          </FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
            {SERVICES.map((s,i) => (
              <FadeIn key={s.title} delay={i*0.07}>
                <div className="svc-card" onMouseEnter={()=>setHoveredCard(i)} onMouseLeave={()=>setHoveredCard(null)} onClick={()=>navigate("/services")} style={{ background:hoveredCard===i?s.color:"#fff", border:`1.5px solid ${hoveredCard===i?s.accent+"40":"#e8e8e4"}`, borderRadius:20, padding:"36px 30px", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:0, right:0, width:80, height:80, background:`radial-gradient(circle at top right,${s.accent}18,transparent 70%)` }}/>
                  <div style={{ fontSize:32, marginBottom:20, color:s.accent }}>{s.icon}</div>
                  <div style={{ fontWeight:800, fontSize:18, marginBottom:12, letterSpacing:"-0.4px", color:"#0a0a0a" }}>{s.title}</div>
                  <div style={{ fontSize:14, color:"#666", lineHeight:1.75 }}>{s.desc}</div>
                  <div style={{ marginTop:24, fontSize:13, fontWeight:700, color:s.accent, opacity:hoveredCard===i?1:0, transition:"opacity 0.3s" }}>Learn more →</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section style={{ padding:"100px 5%", background:"#f4f4f0" }}>
          <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
            <FadeIn direction="left">
              <div style={{ background:"linear-gradient(145deg,#0a0a0a 0%,#1e3a5f 100%)", borderRadius:24, padding:"52px 44px", position:"relative", overflow:"hidden", minHeight:400, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                <div className="dot-bg" style={{ position:"absolute", inset:0, opacity:0.4 }}/>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#2563eb,#7c3aed,#ec4899)" }}/>
                <div style={{ position:"relative", zIndex:2 }}>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:"2.5px", textTransform:"uppercase", marginBottom:20 }}>Ahmedabad · Gujarat · India</div>
                  <div style={{ fontSize:"clamp(24px,3vw,36px)", fontWeight:900, color:"#fff", letterSpacing:"-1px", lineHeight:1.2 }}>
                    "We forge the tools<br/>that forge your future."
                  </div>
                </div>
                <div style={{ position:"relative", zIndex:2 }}>
                  <div style={{ display:"flex", gap:20, marginTop:40 }}>
                    {[["20+","Engineers"],["5★","Avg Rating"],["2020","Founded"]].map(([n,l])=>(
                      <div key={l}><div style={{ fontSize:20, fontWeight:800, color:"#fff" }}>{n}</div><div style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>{l}</div></div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div style={{ display:"inline-block", background:"#fff", color:"#555", fontSize:12, fontWeight:700, letterSpacing:"1.2px", padding:"5px 14px", borderRadius:100, textTransform:"uppercase", marginBottom:20, border:"1px solid #e8e8e4" }}>About Us</div>
              <h2 style={{ fontSize:"clamp(26px,3.5vw,44px)", fontWeight:800, letterSpacing:"-1.5px", color:"#0a0a0a", margin:"0 0 20px" }}>
                {get("About","tagline","A Team That Thinks in Solutions")}
              </h2>
              <p style={{ fontSize:16, color:"#555", lineHeight:1.8, marginBottom:36 }}>
                {get("About","body","Byte Forge was born from a belief that great software should be accessible to every business.")}
              </p>
              {["Transparent communication at every stage","Agile methodology for faster delivery","Dedicated post-launch support","Security-first approach"].map(t=>(
                <div key={t} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:16 }}>
                  <div style={{ width:24, height:24, borderRadius:7, background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#2563eb", fontWeight:800, flexShrink:0 }}>✓</div>
                  <div style={{ fontSize:15, color:"#444", lineHeight:1.6 }}>{t}</div>
                </div>
              ))}
              <button className="btn-primary" onClick={()=>navigate("/about")} style={{ background:"#0a0a0a", color:"#fff", border:"none", borderRadius:10, padding:"14px 30px", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"'Outfit',sans-serif", marginTop:20 }}>
                Meet the Team →
              </button>
            </FadeIn>
          </div>
        </section>

        {/* ── PORTFOLIO ── */}
        <section id="portfolio" style={{ padding:"110px 5%", background:"#0a0a0a" }}>
          <FadeIn>
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:56, flexWrap:"wrap", gap:20 }}>
              <div>
                <div style={{ display:"inline-block", background:"#1e1e1e", color:"#888", fontSize:12, fontWeight:700, letterSpacing:"1.2px", padding:"5px 14px", borderRadius:100, textTransform:"uppercase", marginBottom:16 }}>Our Work</div>
                <h2 style={{ fontSize:"clamp(28px,4vw,52px)", fontWeight:800, letterSpacing:"-1.8px", color:"#fff", margin:0 }}>Projects We're<br/>Proud Of</h2>
              </div>
              <button onClick={()=>navigate("/portfolio")} style={{ background:"transparent", color:"#fff", border:"1.5px solid #333", borderRadius:10, padding:"12px 26px", fontWeight:600, fontSize:14, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.25s", whiteSpace:"nowrap" }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#2563eb";e.currentTarget.style.color="#2563eb";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#333";e.currentTarget.style.color="#fff";}}>
                View All Cases →
              </button>
            </div>
          </FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
            {portfolioItems.slice(0,4).map((p,i)=>(
              <FadeIn key={p.id||i} delay={i*0.08}>
                <div className="proj-card" onClick={()=>navigate("/portfolio")} style={{ background:p.backgroundColor||"#0f172a", borderRadius:20, padding:"40px 32px", minHeight:220, position:"relative", overflow:"hidden", border:"1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px) scale(1.02)";e.currentTarget.style.boxShadow=`0 24px 60px ${p.accentColor||"#2563eb"}30`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                  <div style={{ position:"absolute", top:0, right:0, width:120, height:120, background:`radial-gradient(circle at top right,${p.accentColor||"#2563eb"}30,transparent 70%)` }}/>
                  <div style={{ fontSize:11, fontWeight:700, color:p.accentColor||"#2563eb", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:14 }}>{p.tag}</div>
                  <div style={{ fontSize:22, fontWeight:800, color:"#fff", letterSpacing:"-0.5px", marginBottom:12, lineHeight:1.2 }}>{p.title}</div>
                  <div style={{ fontSize:14, color:"rgba(255,255,255,0.55)", lineHeight:1.7 }}>{p.description}</div>
                  <div style={{ marginTop:28, fontSize:13, fontWeight:700, color:p.accentColor||"#2563eb" }}>View Case Study →</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="testimonials" style={{ padding:"110px 5%", background:"#fafaf8" }}>
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:64 }}>
              <div style={{ display:"inline-block", background:"#eff6ff", color:"#2563eb", fontSize:12, fontWeight:700, letterSpacing:"1.2px", padding:"5px 16px", borderRadius:100, textTransform:"uppercase", marginBottom:20 }}>Client Love</div>
              <h2 style={{ fontSize:"clamp(28px,4vw,50px)", fontWeight:800, letterSpacing:"-1.8px", margin:"0 0 16px", color:"#0a0a0a" }}>What Our Clients Say</h2>
            </div>
          </FadeIn>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
            {TESTIMONIALS.map((t,i)=>(
              <FadeIn key={t.name} delay={i*0.1}>
                <div className="t-card" style={{ background:"#fff", border:"1.5px solid #e8e8e4", borderRadius:20, padding:"36px 32px", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", top:0, right:0, width:100, height:100, background:`radial-gradient(circle at top right,${t.accent}10,transparent 70%)` }}/>
                  <div style={{ fontSize:52, color:t.accent, opacity:0.3, fontFamily:"Georgia,serif", lineHeight:1, marginBottom:8 }}>"</div>
                  <p style={{ fontSize:15, color:"#444", lineHeight:1.85, marginBottom:24, fontStyle:"italic" }}>{t.text}</p>
                  <div style={{ marginBottom:20 }}>{"★★★★★".split("").map((_,j)=><span key={j} style={{ color:"#f59e0b", fontSize:16 }}>★</span>)}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                    <div style={{ width:48, height:48, borderRadius:"50%", background:t.color, border:`2px solid ${t.accent}30`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:15, color:t.accent }}>{t.initials}</div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:15, color:"#0a0a0a" }}>{t.name}</div>
                      <div style={{ fontSize:13, color:"#888" }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding:"100px 5%", textAlign:"center", background:"linear-gradient(135deg,#0a0a0a 0%,#1e3a5f 50%,#0a0a0a 100%)", position:"relative", overflow:"hidden" }}>
          <div className="dot-bg" style={{ position:"absolute", inset:0, opacity:0.2 }}/>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:300, background:"radial-gradient(ellipse,rgba(37,99,235,0.15) 0%,transparent 70%)", pointerEvents:"none" }}/>
          <FadeIn>
            <div style={{ position:"relative", zIndex:2 }}>
              <h2 style={{ fontSize:"clamp(30px,5vw,58px)", fontWeight:900, color:"#fff", letterSpacing:"-2px", margin:"0 0 20px", lineHeight:1.1 }}>
                {get("CTA","headline","Ready to Build Something")} <span className="gradient-text">Great?</span>
              </h2>
              <p style={{ color:"#888", fontSize:17, marginBottom:48, maxWidth:440, margin:"0 auto 48px" }}>
                {get("CTA","subtext","Tell us about your project — we'll respond within 24 hours.")}
              </p>
              <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
                <button className="btn-primary" onClick={()=>navigate("/contact")} style={{ background:"#2563eb", color:"#fff", border:"none", borderRadius:12, padding:"18px 44px", fontWeight:700, fontSize:16, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                  {get("CTA","btnText","Get a Free Consultation →")}
                </button>
                <button onClick={()=>navigate("/portfolio")} style={{ background:"transparent", color:"#fff", border:"1.5px solid rgba(255,255,255,0.2)", borderRadius:12, padding:"18px 44px", fontWeight:600, fontSize:16, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.25s" }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.5)"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"}>
                  See Our Work
                </button>
              </div>
            </div>
          </FadeIn>
        </section>

        <Footer />
      </div>
    </>
  );
}