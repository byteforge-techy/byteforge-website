// src/pages/Portfolio.jsx — dynamic from API
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePortfolio } from "../hooks/usePortfolio";

function FadeIn({ children, delay=0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold:0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:visible?1:0, transform:visible?"none":"translateY(24px)", transition:`opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const navigate = useNavigate();
  const { items, loading } = usePortfolio();
  const [active, setActive] = useState("All");

  const tags = ["All", ...new Set(items.map(p => p.tag).filter(Boolean))];
  const filtered = active === "All" ? items : items.filter(p => p.tag === active);

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:"#fafaf8", minHeight:"100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}} .proj-row{transition:all 0.3s;} @media(max-width:768px){.proj-row{grid-template-columns:1fr!important;}}`}</style>
      <Navbar />

      <section style={{ padding:"140px 5% 60px", background:"linear-gradient(160deg,#fafaf8 60%,#ede9fe 100%)", borderBottom:"1px solid #e8e8e4" }}>
        <FadeIn>
          <div style={{ display:"inline-block", background:"#ede9fe", color:"#7c3aed", fontSize:12, fontWeight:700, letterSpacing:"1.2px", padding:"5px 14px", borderRadius:100, textTransform:"uppercase", marginBottom:20 }}>Case Studies</div>
          <h1 style={{ fontSize:"clamp(36px,5vw,64px)", fontWeight:800, letterSpacing:"-2px", color:"#0a0a0a", margin:"0 0 20px", lineHeight:1.08 }}>
            Work We're<br/><span style={{ color:"#2563eb" }}>Proud Of</span>
          </h1>
          <p style={{ fontSize:18, color:"#666", maxWidth:520, lineHeight:1.75, marginBottom:48 }}>Real projects. Real results. A selection of engagements that made a measurable difference.</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {tags.map(f => (
              <button key={f} onClick={() => setActive(f)} style={{ background:active===f?"#0a0a0a":"#fff", color:active===f?"#fff":"#555", border:"1.5px solid", borderColor:active===f?"#0a0a0a":"#e0e0da", borderRadius:100, padding:"8px 18px", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.2s" }}>
                {f}
              </button>
            ))}
          </div>
        </FadeIn>
      </section>

      <section style={{ padding:"60px 5% 80px" }}>
        {loading ? (
          <div style={{ textAlign:"center", padding:80, color:"#888" }}>
            <div style={{ fontSize:36, animation:"spin 1s linear infinite", display:"inline-block" }}>⟳</div>
            <div style={{ marginTop:16 }}>Loading projects...</div>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
            {filtered.map((p,i) => (
              <FadeIn key={p.id||i} delay={i*0.05}>
                <div className="proj-row" style={{ background:"#fff", border:"1px solid #e8e8e4", borderRadius:20, overflow:"hidden", display:"grid", gridTemplateColumns:"300px 1fr" }}>
                  <div style={{ background:p.backgroundColor||"#0a0a0a", padding:"40px 32px", display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight:200 }}>
                    <div>
                      <div style={{ fontSize:11, fontWeight:700, color:p.accentColor||"#2563eb", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:14 }}>{p.tag}</div>
                      <div style={{ fontSize:22, fontWeight:800, color:"#fff", letterSpacing:"-0.5px", lineHeight:1.2, marginBottom:12 }}>{p.title}</div>
                      <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.6 }}>{p.description}</div>
                    </div>
                    <div style={{ marginTop:32 }}>
                      <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)" }}>Duration · {p.duration || "—"}</div>
                    </div>
                  </div>
                  <div style={{ padding:"36px 40px" }}>
                    {p.results && (
                      <div style={{ marginBottom:24 }}>
                        <div style={{ fontSize:11, fontWeight:700, letterSpacing:"1.2px", color:"#999", textTransform:"uppercase", marginBottom:14 }}>Key Results</div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 20px" }}>
                          {(typeof p.results === "string" ? p.results.split(",") : p.results).map((r,j) => (
                            <div key={j} style={{ display:"flex", gap:8, alignItems:"center" }}>
                              <div style={{ width:6, height:6, borderRadius:"50%", background:p.accentColor||"#2563eb", flexShrink:0 }}/>
                              <span style={{ fontSize:13, color:"#333", fontWeight:500 }}>{r.trim()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                      {(p.techStack||"").split(",").filter(Boolean).map(t => (
                        <span key={t} style={{ background:"#f4f4f0", color:"#555", fontSize:12, fontWeight:600, padding:"4px 12px", borderRadius:100 }}>{t.trim()}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>

      <section style={{ padding:"80px 5%", background:"#0a0a0a", textAlign:"center" }}>
        <FadeIn>
          <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:800, color:"#fff", letterSpacing:"-1.5px", marginBottom:16 }}>Your Project Could Be Next</h2>
          <p style={{ color:"#888", fontSize:17, marginBottom:40 }}>Let's discuss what we can build together.</p>
          <button onClick={()=>navigate("/contact")} style={{ background:"#2563eb", color:"#fff", border:"none", borderRadius:10, padding:"16px 40px", fontWeight:700, fontSize:16, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
            Start Your Project →
          </button>
        </FadeIn>
      </section>
      <Footer />
    </div>
  );
}