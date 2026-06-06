// src/components/ByteForgeLogo.jsx

export default function ByteForgeLogo({ size = 120, showText = true }) {
  // Height is fixed; width scales proportionally (original SVG is 1920x1080 → ~16:9 but logo content is roughly 3:1)
  const height = size;
  const width = size * 3;
console.log("Show Text", showText);
  if (showText) {
    // Full logo with "byte forge technology" text — use the full SVG
    return (
      <img
        src="/byteforge-logo-transparent.svg"
        alt="Byte Forge Technology"
        height={height}
        width={width}
        style={{ display: "block", objectFit: "contain" }}
      />
    );
  }

  // Icon only (no text) — still use full SVG but show only the monogram portion
  // by cropping via a div with overflow hidden
  return (
    <img
      src="/byteforge-logo-transparent.svg"
      alt="Byte Forge Technology"
      height={height}
      width={height}
      style={{ display: "block", objectFit: "contain" }}
    />
  );
}