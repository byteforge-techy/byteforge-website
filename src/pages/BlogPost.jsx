// src/pages/BlogPost.jsx — Byte Forge (redesigned to match site)
import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useBlogPost } from "../hooks/useBlog";

const BLUE = "#2563eb", AMBER = "#f59e0b", DARK = "#0a0a0a", INK = "#0f172a";
const wrap = { maxWidth:820, margin:"0 auto", padding:"0 24px" };
const fontHead = { fontFamily:"'Outfit',sans-serif" };

const catColor = (cat) => {
  const m = { "Case Study":{accent:BLUE,icon:"📊"}, "Technology":{accent:"#7c3aed",icon:"⚡"}, "Design":{accent:"#db2777",icon:"🎨"}, "DevOps":{accent:"#16a34a",icon:"☁️"} };
  return m[cat] || { accent:AMBER, icon:"💡" };
};
const fmtDate = (d) => { try { return new Date(d).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}); } catch { return d; } };

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { post, loading, error } = useBlogPost(slug);

  if (loading) {
    return (
      <div style={{ background:"#fff", ...fontHead, minHeight:"100vh" }}>
        <Navbar />
        <div style={{ textAlign:"center", padding:"180px 0", color:"#888" }}>Loading article…</div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ background:"#fff", ...fontHead, minHeight:"100vh" }}>
        <Navbar />
        <div style={{ textAlign:"center", padding:"160px 24px" }}>
          <div style={{ fontSize:56, marginBottom:20 }}>🔍</div>
          <h1 style={{ ...fontHead, fontSize:32, fontWeight:800, color:INK, margin:"0 0 12px" }}>Article Not Found</h1>
          <p style={{ fontSize:17, color:"#666", marginBottom:28 }}>This post may have moved or been removed.</p>
          <button onClick={()=>navigate("/blog")} style={{ ...fontHead, background:INK, color:"#fff", border:"none", padding:"14px 30px", borderRadius:12, fontSize:15, fontWeight:700, cursor:"pointer" }}>← Back to Blog</button>
        </div>
        <Footer />
      </div>
    );
  }

  const c = catColor(post.category);
  const bodyText = post.body || post.content || "";

  return (
    <div style={{ background:"#fff", ...fontHead, overflowX:"hidden" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ position:"relative", background:`linear-gradient(135deg, ${DARK} 0%, #14172a 55%, #1a2348 100%)`, color:"#fff", paddingTop:140, paddingBottom:70, overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${BLUE}11 1px,transparent 1px),linear-gradient(90deg,${BLUE}11 1px,transparent 1px)`, backgroundSize:"56px 56px", opacity:0.5 }}/>
        <div style={{ position:"absolute", top:-150, right:-100, width:480, height:480, borderRadius:"50%", background:`radial-gradient(circle, ${c.accent}40, transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ ...wrap, position:"relative", textAlign:"center" }}>
          <button onClick={()=>navigate("/blog")} style={{ ...fontHead, background:"rgba(255,255,255,0.08)", color:"#cdd9ff", border:"1px solid rgba(255,255,255,0.18)", padding:"8px 18px", borderRadius:30, fontSize:13.5, fontWeight:600, cursor:"pointer", marginBottom:24 }}>← Back to Blog</button>
          <div>
            <span style={{ background:c.accent, color:"#fff", fontSize:12, fontWeight:700, letterSpacing:"1px", padding:"6px 16px", borderRadius:100, textTransform:"uppercase" }}>{post.category}</span>
          </div>
          <h1 style={{ ...fontHead, fontSize:"clamp(28px,4.5vw,52px)", fontWeight:800, lineHeight:1.15, letterSpacing:"-1px", margin:"22px auto 18px", color:"#fff", maxWidth:760 }}>{post.title}</h1>
          <div style={{ display:"flex", alignItems:"center", gap:16, justifyContent:"center", fontSize:14, color:"#9aa6c4" }}>
            <span>{fmtDate(post.publishedAt || post.createdAt)}</span>
            {post.views!=null && <span>· {post.views} views</span>}
          </div>
        </div>
      </section>

      {/* BODY */}
      <article style={{ background:"#fff", padding:"70px 0 90px" }}>
        <div style={{ ...wrap }}>
          {post.excerpt && (
            <p style={{ fontSize:21, lineHeight:1.6, color:INK, fontWeight:500, margin:"0 0 36px", paddingBottom:32, borderBottom:"1px solid #eee" }}>{post.excerpt}</p>
          )}
          <div style={{ fontSize:17.5, lineHeight:1.85, color:"#333", whiteSpace:"pre-wrap" }}>
            {bodyText}
          </div>
        </div>
      </article>

      {/* CTA */}
      <section style={{ background:`linear-gradient(135deg, ${INK}, #1a2348)`, padding:"80px 0", position:"relative", overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute", top:-100, right:-60, width:340, height:340, borderRadius:"50%", background:`radial-gradient(circle,${AMBER}30,transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", position:"relative" }}>
          <h2 style={{ ...fontHead, fontSize:"clamp(26px,3.5vw,40px)", fontWeight:800, color:"#fff", letterSpacing:"-1px", margin:"0 0 16px" }}>Have a Similar Project?</h2>
          <p style={{ fontSize:17, color:"#aab4cf", maxWidth:520, margin:"0 auto 30px" }}>Let's talk about what you're building. I respond personally within 24 hours.</p>
          <button onClick={()=>navigate("/contact")} style={{ ...fontHead, background:`linear-gradient(90deg,${AMBER},#fbbf24)`, color:INK, border:"none", padding:"15px 36px", borderRadius:12, fontSize:16, fontWeight:800, cursor:"pointer", boxShadow:"0 10px 30px rgba(245,158,11,0.4)" }}>Start a Conversation →</button>
        </div>
      </section>

      <Footer />
    </div>
  );
}