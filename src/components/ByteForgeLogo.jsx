// src/components/ByteForgeLogo.jsx
export default function ByteForgeLogo({ size = 40, showText = true }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer rounded square */}
        <rect width="40" height="40" rx="10" fill="#0a0a0a" />
        {/* Anvil / forge base shape */}
        <rect x="8" y="24" width="24" height="8" rx="2" fill="#ffffff" opacity="0.15" />
        {/* Hammer head */}
        <rect x="10" y="26" width="20" height="4" rx="1.5" fill="#ffffff" />
        {/* B letter stylized as stacked bits / bytes */}
        <rect x="11" y="10" width="3" height="12" rx="1" fill="#2563eb" />
        <rect x="14" y="10" width="7" height="3" rx="1" fill="#2563eb" />
        <rect x="14" y="15" width="6" height="3" rx="1" fill="#2563eb" />
        <rect x="14" y="19" width="7" height="3" rx="1" fill="#2563eb" />
        <rect x="21" y="11" width="2" height="5" rx="1" fill="#2563eb" />
        <rect x="20" y="16" width="2" height="5" rx="1" fill="#2563eb" />
        {/* Spark / forge fire accent */}
        <circle cx="29" cy="11" r="2" fill="#f59e0b" opacity="0.9" />
        <circle cx="32" cy="9" r="1.2" fill="#f59e0b" opacity="0.6" />
        <circle cx="27" cy="8.5" r="1" fill="#f59e0b" opacity="0.5" />
      </svg>
      {showText && (
        <span style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: size * 0.45,
          letterSpacing: "-0.5px",
          color: "#0a0a0a",
          lineHeight: 1,
        }}>
          Byte<span style={{ color: "#2563eb" }}>Forge</span>
        </span>
      )}
    </div>
  );
}