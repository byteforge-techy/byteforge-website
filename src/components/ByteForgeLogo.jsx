// src/components/ByteForgeLogo.jsx
//
// NOTE: Your two source SVGs (byteforge-icon-only_new.svg and
// byteforge-full-logo_new.svg) turned out to be byte-for-byte identical —
// there is no actual "text" version to load. Both only contain the square
// "BF" monogram, sitting in a mostly-empty 1920x1080 canvas, which is why
// it rendered as a tiny cramped blob in the header.
//
// This version uses ONE corrected icon file (byteforge-icon.svg — tightly
// cropped, no more empty canvas) and renders the wordmark as real HTML text
// next to it. That's more reliable than a second SVG anyway: crisper text,
// easy to restyle/recolor, no font-in-a-vector guesswork.

export default function ByteForgeLogo({ size = 36, showText = true }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.3,
      }}
    >
      <img
        src="/byteforge-icon.svg"
        alt="Byte Forge Technology"
        height={size}
        width={size}
        style={{ display: "block", objectFit: "contain", flexShrink: 0 }}
      />

      {showText && (
        <span
          style={{
            fontSize: size * 0.5,
            fontWeight: 700,
            lineHeight: 1,
            whiteSpace: "nowrap",
            color: "#f5f5f5",
          }}
        >
          Byte<span style={{ color: "#f59e0b" }}>Forge</span>
        </span>
      )}
    </div>
  );
}