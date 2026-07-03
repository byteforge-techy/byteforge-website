// src/pages/Blog.jsx — Byte Forge (redesigned to match site)
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useBlogList } from "../hooks/useBlog";

import {
  BLUE, BLUE_LIGHT, BLUE_DARK, AMBER, AMBER_LIGHT,
  DARK, INK, INK_SOFT, TEXT_MUTED, TEXT_SOFT,
  TEXT_ON_DARK, BADGE_TEXT, BORDER, BG_ALT,
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
const catColor = (cat) => {
  const m = { "Case Study":{accent:BLUE,icon:"📊"}, "Technology":{accent:BLUE_DARK,icon:"⚡"}, "Design":{accent:BLUE_LIGHT,icon:"🎨"}, "DevOps":{accent:AMBER_LIGHT,icon:"☁️"} };
  return m[cat] || { accent:AMBER, icon:"💡" };
};
const fmtDate = (d) => { try { return new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}); } catch { return d; } };

export default function Blog() {
  const navigate = useNavigate();
  const { posts, loading } = useBlogList();
  const [activeCat, setActiveCat] = useState("All");

  const categories = ["All", ...new Set((posts||[]).map(p => p.category).filter(Boolean))];
  const filtered = activeCat === "All" ? posts : (posts||[]).filter(p => p.category === activeCat);
  const featured = filtered && filtered[0];
  const rest = (filtered || []).slice(1);

  return (
    <div style={{ background:"#fff", ...fontHead, overflowX:"hidden" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ position:"relative", background:`linear-gradient(135deg, ${DARK} 0%, #14172a 55%, #1a2348 100%)`, color:"#fff", paddingTop:150, paddingBottom:90, overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${BLUE}11 1px,transparent 1px),linear-gradient(90deg,${BLUE}11 1px,transparent 1px)`, backgroundSize:"56px 56px", opacity:0.5 }}/>
        <div style={{ position:"absolute", top:-150, right:-100, width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle, ${BLUE}40, transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ ...wrap, position:"relative" }}>
          <Reveal><SectionLabel color={BADGE_TEXT}>Insights & Updates</SectionLabel></Reveal>
          <Reveal delay={0.06}>
            <h1 style={{ ...fontHead, fontSize:"clamp(36px,6vw,68px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-2px", margin:"0 0 10px", color:"#fff" }}>
              The Byte Forge <span style={{ background:`linear-gradient(90deg,${BLUE},${BLUE_LIGHT})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Blog</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}><p style={{ fontSize:"clamp(16px,2vw,19px)", lineHeight:1.7, color:TEXT_ON_DARK, maxWidth:620, margin:"0 auto" }}>Engineering deep-dives, case studies, and thoughts on building software that lasts.</p></Reveal>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background:BG_ALT, padding:"60px 0 100px" }}>
        <div style={{ ...wrap }}>
          {/* Category filters */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", marginBottom:48 }}>
            {categories.map((c,i) => (
              <button key={i} onClick={()=>setActiveCat(c)} style={{ ...fontHead, padding:"10px 24px", borderRadius:30, fontSize:14.5, fontWeight:600, cursor:"pointer", border:activeCat===c?"none":`1px solid ${BORDER}`, background:activeCat===c?INK:"#fff", color:activeCat===c?"#fff":TEXT_MUTED, transition:"all .2s" }}>{c}</button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign:"center", color:TEXT_SOFT, padding:"60px 0" }}>Loading posts…</div>
          ) : (!filtered || filtered.length===0) ? (
            <div style={{ textAlign:"center", color:TEXT_SOFT, padding:"60px 0" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>✍️</div>
              <p style={{ fontSize:18 }}>No posts yet in this category. Check back soon!</p>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <Reveal>
                  <div onClick={()=>navigate(`/blog/${featured.slug}`)} style={{ background:"#fff", borderRadius:20, overflow:"hidden", border:`1px solid ${BORDER}`, cursor:"pointer", display:"grid", gridTemplateColumns:"1.1fr 1fr", marginBottom:40, boxShadow:"0 8px 30px rgba(0,0,0,0.06)", transition:"transform .3s, box-shadow .3s" }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.boxShadow="0 24px 48px rgba(0,0,0,0.12)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 8px 30px rgba(0,0,0,0.06)";}}>
                    <div style={{ padding:"44px 40px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
                      <span style={{ alignSelf:"flex-start", background:catColor(featured.category).accent, color:"#fff", fontSize:11, fontWeight:700, letterSpacing:"1px", padding:"5px 12px", borderRadius:100, textTransform:"uppercase", marginBottom:18 }}>{featured.category}</span>
                      <h2 style={{ ...fontHead, fontSize:30, fontWeight:800, color:INK, lineHeight:1.2, margin:"0 0 14px", letterSpacing:"-0.5px" }}>{featured.title}</h2>
                      <p style={{ fontSize:16, lineHeight:1.65, color:TEXT_MUTED, margin:"0 0 20px" }}>{featured.excerpt}</p>
                      <div style={{ display:"flex", alignItems:"center", gap:16, fontSize:13.5, color:TEXT_SOFT }}>
                        <span>{fmtDate(featured.publishedAt || featured.createdAt)}</span>
                        {featured.views!=null && <span>· {featured.views} views</span>}
                      </div>
                    </div>
                    <div style={{ background:`linear-gradient(135deg, ${catColor(featured.category).accent}, ${INK_SOFT})`, display:"flex", alignItems:"center", justifyContent:"center", minHeight:280, fontSize:80 }}>
                      {catColor(featured.category).icon}
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Rest grid */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(330px,1fr))", gap:24 }}>
                {rest.map((post,i) => {
                  const c = catColor(post.category);
                  return (
                    <Reveal key={post.id||i} delay={0.03+(i%3)*0.06}>
                      <div onClick={()=>navigate(`/blog/${post.slug}`)} style={{ background:"#fff", borderRadius:18, overflow:"hidden", border:`1px solid ${BORDER}`, cursor:"pointer", height:"100%", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", transition:"transform .3s, box-shadow .3s" }}
                        onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow="0 24px 48px rgba(0,0,0,0.12)";}}
                        onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.04)";}}>
                        <div style={{ height:150, background:`linear-gradient(135deg, ${c.accent}, ${INK_SOFT})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:48, position:"relative" }}>
                          {c.icon}
                          <span style={{ position:"absolute", top:14, left:14, background:"rgba(255,255,255,0.2)", color:"#fff", fontSize:11, fontWeight:700, letterSpacing:"0.5px", padding:"5px 12px", borderRadius:100, textTransform:"uppercase", backdropFilter:"blur(10px)" }}>{post.category}</span>
                        </div>
                        <div style={{ padding:"24px" }}>
                          <h3 style={{ ...fontHead, fontSize:19, fontWeight:700, color:INK, lineHeight:1.3, margin:"0 0 10px" }}>{post.title}</h3>
                          <p style={{ fontSize:14.5, lineHeight:1.6, color:TEXT_MUTED, margin:"0 0 16px", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{post.excerpt}</p>
                          <div style={{ display:"flex", alignItems:"center", gap:12, fontSize:13, color:TEXT_SOFT }}>
                            <span>{fmtDate(post.publishedAt || post.createdAt)}</span>
                            {post.views!=null && <span>· {post.views} views</span>}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
      <style>{`@media(max-width:768px){section div[style*="grid-template-columns: 1.1fr"]{grid-template-columns:1fr !important}}`}</style>
    </div>
  );
}