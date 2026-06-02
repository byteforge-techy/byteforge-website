// src/pages/BlogPost.jsx — single blog post page
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useBlogPost, useBlogList } from "../hooks/useBlog";

const CAT_COLORS = {
  "Technology":  { bg: "#dbeafe", accent: "#2563eb" },
  "Case Study":  { bg: "#dcfce7", accent: "#16a34a" },
  "Business":    { bg: "#fce7f3", accent: "#db2777" },
  "Design":      { bg: "#fef9c3", accent: "#ca8a04" },
  "DevOps":      { bg: "#ffedd5", accent: "#ea580c" },
  "default":     { bg: "#ede9fe", accent: "#7c3aed" },
};
const catColor = (c) => CAT_COLORS[c] || CAT_COLORS.default;
const catEmoji = (c) => c === "Case Study" ? "📊" : c === "Technology" ? "⚡" : c === "Design" ? "🎨" : c === "DevOps" ? "☁️" : "💡";

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { post, loading, error } = useBlogPost(slug);
  const { posts: allPosts } = useBlogList();

  // Related posts (same category, exclude current)
  const related = allPosts.filter(p => p.slug !== slug).slice(0, 3);

  if (loading) return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#fafaf8", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ textAlign: "center", padding: "200px 20px", color: "#888" }}>
        <div style={{ fontSize: 36, animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</div>
        <div style={{ marginTop: 16 }}>Loading article...</div>
        <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  if (error || !post) return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#fafaf8", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <Navbar />
      <div style={{ textAlign: "center", padding: "180px 20px" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>🔍</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0a0a0a", marginBottom: 12 }}>Article Not Found</h1>
        <p style={{ color: "#888", fontSize: 16, marginBottom: 32 }}>This post may have been moved or unpublished.</p>
        <button onClick={() => navigate("/blog")} style={{ background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 10, padding: "14px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>
          ← Back to Blog
        </button>
      </div>
      <Footer />
    </div>
  );

  const c = catColor(post.category);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: "#fafaf8", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`.related-card{transition:all 0.3s ease;cursor:pointer;}.related-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.1)!important;}`}</style>
      <Navbar />

      {/* Article header */}
      <article>
        <header style={{ padding: "130px 5% 50px", background: `linear-gradient(160deg, #fafaf8 50%, ${c.bg} 100%)`, borderBottom: "1px solid #e8e8e4" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <button onClick={() => navigate("/blog")} style={{ background: "none", border: "none", color: "#888", fontSize: 14, cursor: "pointer", fontFamily: "'Outfit', sans-serif", marginBottom: 28, padding: 0, fontWeight: 600 }}>
              ← Back to Blog
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ background: c.accent, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "1px", padding: "5px 12px", borderRadius: 100, textTransform: "uppercase" }}>
                {post.category}
              </span>
              <span style={{ color: "#888", fontSize: 13 }}>
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" })}
              </span>
              <span style={{ color: "#aaa", fontSize: 13 }}>· {post.views || 0} views</span>
            </div>
            <h1 style={{ fontSize: "clamp(30px,4.5vw,52px)", fontWeight: 800, color: "#0a0a0a", letterSpacing: "-1.5px", lineHeight: 1.12, marginBottom: 24 }}>
              {post.title}
            </h1>
            <p style={{ fontSize: 19, color: "#555", lineHeight: 1.7, fontWeight: 400 }}>
              {post.excerpt}
            </p>
            {/* Author byline */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 32, paddingTop: 28, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15 }}>BF</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#0a0a0a" }}>Byte Forge Team</div>
                <div style={{ fontSize: 13, color: "#888" }}>byteforgetechnology.com</div>
              </div>
            </div>
          </div>
        </header>

        {/* Feature visual */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 5%" }}>
          <div style={{ height: 280, borderRadius: 20, marginTop: -20, background: `linear-gradient(135deg, ${c.accent}, #1e3a5f)`, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "24px 24px" }}/>
            <div style={{ fontSize: 100, opacity: 0.3 }}>{catEmoji(post.category)}</div>
          </div>
        </div>

        {/* Body content */}
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "56px 5% 80px" }}>
          {post.body ? (
            <div style={{ fontSize: 17, color: "#333", lineHeight: 1.85 }}>
              {post.body.split("\n").filter(p => p.trim()).map((para, i) => (
                <p key={i} style={{ marginBottom: 24 }}>{para}</p>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 17, color: "#888", lineHeight: 1.85, fontStyle: "italic" }}>
              {post.excerpt}
            </p>
          )}

          {/* Share row */}
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid #e8e8e4", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a" }}>Share:</span>
            {[
              { label: "Twitter", url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}` },
              { label: "LinkedIn", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
              { label: "WhatsApp", url: `https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}` },
            ].map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{ background: "#f4f4f0", color: "#555", textDecoration: "none", fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 100 }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section style={{ padding: "64px 5% 80px", background: "#f4f4f0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0a0a0a", letterSpacing: "-0.5px", marginBottom: 32 }}>More Articles</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {related.map(p => {
                const rc = catColor(p.category);
                return (
                  <div key={p.id} className="related-card" onClick={() => { navigate(`/blog/${p.slug}`); window.scrollTo(0,0); }} style={{ background: "#fff", border: "1.5px solid #e8e8e4", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ height: 100, background: `linear-gradient(135deg, ${rc.bg}, #fff)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, opacity: 0.7 }}>
                      {catEmoji(p.category)}
                    </div>
                    <div style={{ padding: "20px" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: rc.accent, letterSpacing: "1px", textTransform: "uppercase" }}>{p.category}</span>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0a0a0a", lineHeight: 1.3, marginTop: 8 }}>{p.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}