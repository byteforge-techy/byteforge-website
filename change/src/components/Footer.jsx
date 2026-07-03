// src/components/Footer.jsx
import { useNavigate } from "react-router-dom";
import ByteForgeLogo from "./ByteForgeLogo";
import { BLUE, DARK, TEXT_ON_DARK_SOFT, BORDER_DARK } from "../theme";

const LINKS = {
  Company: ["About Us", "Portfolio", "Careers", "Blog"],
  Services: ["Web Development", "Mobile Apps", "UI/UX Design", "Cloud & DevOps"],
  Legal: ["Privacy Policy", "Terms of Service", "Sitemap"],
};

export default function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: DARK, color: "#fff",
      padding: "64px 5% 32px", fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: 48, marginBottom: 56,
      }} className="footer-grid">
        {/* Brand col */}
        <div>
          <ByteForgeLogo size={50} showText={true} />
          <p style={{ color: TEXT_ON_DARK_SOFT, fontSize: 14, lineHeight: 1.8, marginTop: 20, maxWidth: 260 }}>
            A service-based IT firm building world-class software, apps, and cloud infrastructure for startups and enterprises.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            {["𝕏", "in", "⌥"].map((icon, i) => (
              <div key={i} style={{
                width: 36, height: 36, borderRadius: 8,
                border: `1px solid ${BORDER_DARK}`, display: "flex",
                alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: 14, color: TEXT_ON_DARK_SOFT,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = BLUE; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER_DARK; e.currentTarget.style.color = TEXT_ON_DARK_SOFT; }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([heading, items]) => (
          <div key={heading}>
            <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: "1px", textTransform: "uppercase", color: "#fff", marginBottom: 20 }}>
              {heading}
            </div>
            {items.map(item => (
              <div key={item}
                style={{ color: TEXT_ON_DARK_SOFT, fontSize: 14, marginBottom: 12, cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = TEXT_ON_DARK_SOFT}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: `1px solid ${BORDER_DARK}`, paddingTop: 28,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ color: TEXT_ON_DARK_SOFT, fontSize: 13 }}>
          © {year} Byte Forge Technology. All rights reserved. · Ahmedabad, Gujarat, India
        </div>
        <div style={{ color: TEXT_ON_DARK_SOFT, fontSize: 13 }}>
          Built with ♥ in India · <span style={{ color: BLUE }}>byteforgetechnology.com</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}