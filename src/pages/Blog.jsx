// src/pages/Blog.jsx — public blog listing page
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useBlogList } from "../hooks/useBlog";

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// Category → color map
const CAT_COLORS = {
  "Technology":  { bg: "#dbeafe", accent: "#2563eb" },
  "Case Study":  { bg: "#dcfce7", accent: "#16a34a" },
  "Business":    { bg: "#fce7f3", accent: "#db2777" },
  "Design":      { bg: "#fef9c3", accent: "#ca8a04" },
  "DevOps":      { bg: "#ffedd5", accent: "#ea580c" },
  "default":     { bg: "#ede9fe", accent: "#7c3aed" },
};
const catColor = (c) => CAT_COLORS[c] || CAT_COLORS.default;

export default function Blog() {
  const navigate = useNavigate();
  const { posts, loading } = useBlogList();
  const [activeCat, setActiveCat] = useState("All");

  const categories = ["All", ...new Set(posts.map(p => p.category).filter(Boolean))];
  const filtered = activeCat === "All" ? posts : posts.filter(p => p.category === activeCat);

  // Featured = first/most viewed post
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#fafaf8", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        .blog-card{transition:all 0.3s ease;cursor:pointer;}
        .blog-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,0.1)!important;}
        .featured-card{transition:all 0.35s ease;cursor:pointer;}
        .featured-card:hover{transform:translateY(-4px);box-shadow:0 24px 60px rgba(0,0,0,0.15)!important;}
        .cat-pill{transition:all 0.2s;cursor:pointer;}
      `}</style>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "140px 5% 60px", background: "linear-gradient(160deg,#fafaf8 60%,#eff6ff 100%)", borderBottom: "1px solid #e8e8e4" }}>
        <FadeIn>
          <div style={{ display: "inline-block", background: "#eff6ff", color: "#2563eb", fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", marginBottom: 20 }}>
            Insights & Updates
          </div>
          <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, letterSpacing: "-2px", color: "#0a0a0a", margin: "0 0 20px", lineHeight: 1.08 }}>
            The Byte Forge<br/><span style={{ color: "#2563eb" }}>Blog</span>
          </h1>
          <p style={{ fontSize: 18, color: "#666", maxWidth: 520, lineHeight: 1.75, marginBottom: 40 }}>
            Engineering deep-dives, case studies, and thoughts on building software that lasts.
          </p>
          {/* Category filters */}
          {!loading && categories.length > 1 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {categories.map(c => (
                <button key={c} className="cat-pill" onClick={() => setActiveCat(c)} style={{
                  background: activeCat === c ? "#0a0a0a" : "#fff",
                  color: activeCat === c ? "#fff" : "#555",
                  border: "1.5px solid", borderColor: activeCat === c ? "#0a0a0a" : "#e0e0da",
                  borderRadius: 100, padding: "8px 18px", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'Outfit', sans-serif",
                }}>
                  {c}
                </button>
              ))}
            </div>
          )}
        </FadeIn>
      </section>

      {/* Posts */}
      <section style={{ padding: "64px 5% 80px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 80, color: "#888" }}>
            <div style={{ fontSize: 36, animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</div>
            <div style={{ marginTop: 16 }}>Loading posts...</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80, color: "#aaa" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "#666" }}>No posts yet</div>
            <div style={{ fontSize: 14, marginTop: 8 }}>Check back soon for fresh insights!</div>
          </div>
        ) : (
          <>
            {/* Featured post */}
            {featured && (
              <FadeIn>
                <div className="featured-card" onClick={() => navigate(`/blog/${featured.slug}`)} style={{
                  background: "#0a0a0a", borderRadius: 24, overflow: "hidden",
                  display: "grid", gridTemplateColumns: "1.2fr 1fr", marginBottom: 48,
                  minHeight: 320,
                }}>
                  <div style={{ padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                      <span style={{ background: catColor(featured.category).accent, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "1px", padding: "5px 12px", borderRadius: 100, textTransform: "uppercase" }}>
                        {featured.category}
                      </span>
                      <span style={{ color: "#666", fontSize: 13, fontWeight: 600 }}>★ Featured</span>
                    </div>
                    <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.15, marginBottom: 16 }}>
                      {featured.title}
                    </h2>
                    <p style={{ fontSize: 15, color: "#999", lineHeight: 1.7, marginBottom: 28 }}>{featured.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span style={{ color: "#2563eb", fontWeight: 700, fontSize: 14 }}>Read Article →</span>
                      <span style={{ color: "#555", fontSize: 13 }}>
                        {new Date(featured.publishedAt || featured.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })} · {featured.views || 0} views
                      </span>
                    </div>
                  </div>
                  <div style={{ background: `linear-gradient(135deg, ${catColor(featured.category).accent}, #1e3a5f)`, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "24px 24px" }}/>
                    <div style={{ fontSize: 100, opacity: 0.25 }}>
                      {featured.category === "Case Study" ? "📊" : featured.category === "Technology" ? "⚡" : featured.category === "Design" ? "🎨" : featured.category === "DevOps" ? "☁️" : "💡"}
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Grid of rest */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
              {rest.map((post, i) => {
                const c = catColor(post.category);
                return (
                  <FadeIn key={post.id} delay={i * 0.06}>
                    <div className="blog-card" onClick={() => navigate(`/blog/${post.slug}`)} style={{
                      background: "#fff", border: "1.5px solid #e8e8e4", borderRadius: 18, overflow: "hidden", height: "100%",
                    }}>
                      {/* Color banner */}
                      <div style={{ height: 140, background: `linear-gradient(135deg, ${c.bg}, #fff)`, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ fontSize: 48, opacity: 0.6 }}>
                          {post.category === "Case Study" ? "📊" : post.category === "Technology" ? "⚡" : post.category === "Design" ? "🎨" : post.category === "DevOps" ? "☁️" : "💡"}
                        </div>
                        <span style={{ position: "absolute", top: 16, left: 16, background: c.accent, color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "1px", padding: "4px 10px", borderRadius: 100, textTransform: "uppercase" }}>
                          {post.category}
                        </span>
                      </div>
                      <div style={{ padding: "24px" }}>
                        <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.4px", lineHeight: 1.3, marginBottom: 12 }}>
                          {post.title}
                        </h3>
                        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.65, marginBottom: 20 }}>
                          {post.excerpt?.slice(0, 110)}{post.excerpt?.length > 110 ? "..." : ""}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ color: c.accent, fontWeight: 700, fontSize: 13 }}>Read More →</span>
                          <span style={{ color: "#aaa", fontSize: 12 }}>
                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short" })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </>
        )}
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 5%", background: "#0a0a0a", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", marginBottom: 16 }}>
            Have a Project in Mind?
          </h2>
          <p style={{ color: "#888", fontSize: 16, marginBottom: 36 }}>Let's turn your idea into reality.</p>
          <button onClick={() => navigate("/contact")} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 10, padding: "16px 40px", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
            Get in Touch →
          </button>
        </FadeIn>
      </section>

      <Footer />
      <style>{`@media(max-width:768px){.featured-card{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}