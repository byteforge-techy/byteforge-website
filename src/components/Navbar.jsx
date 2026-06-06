// src/components/Navbar.jsx — with Blog link added
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ByteForgeLogo from "../assets/ByteForgeLogo";

const NAV_LINKS = [
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Highlight Blog tab also when on /blog/:slug
  const isActive = (path) => location.pathname === path || (path === "/blog" && location.pathname.startsWith("/blog/"));

  return (
    <>
      <style>{`
        .nav-link-item { transition: color 0.2s; }
        .nav-link-item:hover { color: #2563eb !important; }
        .nav-cta-btn:hover { background: #2563eb !important; transform: translateY(-1px); }
        .hamburger-bar { transition: all 0.3s; }
        .mobile-nav-link:hover { color: #2563eb !important; }
      `}</style>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "12px 5%" : "20px 5%",
        background: scrolled ? "rgba(250,250,248,0.93)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid #e8e8e4" : "none",
        transition: "all 0.35s ease",
      }}>
        <div style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <ByteForgeLogo size={36} showText={true} />
        </div>

        <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 }} className="desktop-nav">
          {NAV_LINKS.map(({ label, path }) => (
            <li key={label}
              className="nav-link-item"
              style={{
                cursor: "pointer", fontSize: 14, fontWeight: isActive(path) ? 700 : 500,
                color: isActive(path) ? "#2563eb" : "#555",
                fontFamily: "'Outfit', sans-serif",
                borderBottom: isActive(path) ? "2px solid #2563eb" : "2px solid transparent",
                paddingBottom: 2,
              }}
              onClick={() => navigate(path)}
            >
              {label}
            </li>
          ))}
        </ul>

        <button
          className="nav-cta-btn"
          style={{
            background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 8,
            padding: "10px 22px", fontWeight: 700, fontSize: 13, cursor: "pointer",
            fontFamily: "'Outfit', sans-serif", letterSpacing: "0.3px", transition: "all 0.2s",
          }}
          onClick={() => navigate("/contact")}
        >
          Get in Touch
        </button>

        <div style={{ display: "none", flexDirection: "column", gap: 5, cursor: "pointer" }}
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="hamburger-bar" style={{
              width: 24, height: 2, background: "#0a0a0a",
              transform: i === 0 && menuOpen ? "rotate(45deg) translateY(7px)"
                : i === 2 && menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
              opacity: i === 1 && menuOpen ? 0 : 1,
            }} />
          ))}
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 99,
          background: "rgba(250,250,248,0.97)", backdropFilter: "blur(14px)",
          borderBottom: "1px solid #e8e8e4", padding: "12px 5% 20px",
          display: "flex", flexDirection: "column", gap: 0,
        }}>
          {NAV_LINKS.map(({ label, path }) => (
            <div key={label}
              className="mobile-nav-link"
              style={{
                padding: "14px 0", fontSize: 16, fontWeight: 600,
                color: isActive(path) ? "#2563eb" : "#222",
                borderBottom: "1px solid #f0f0ea", cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
              }}
              onClick={() => navigate(path)}
            >
              {label}
            </div>
          ))}
          <button
            style={{
              marginTop: 16, background: "#0a0a0a", color: "#fff", border: "none",
              borderRadius: 8, padding: "14px", fontWeight: 700, fontSize: 15,
              cursor: "pointer", fontFamily: "'Outfit', sans-serif",
            }}
            onClick={() => navigate("/contact")}
          >
            Get in Touch
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .nav-cta-btn { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}