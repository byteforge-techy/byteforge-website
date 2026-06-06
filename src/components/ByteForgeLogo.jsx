// src/components/ByteForgeLogo.jsx
// Uses designer SVG files from /public folder
// byteforge-icon-only.svg  → just the bf monogram (for navbar)
// byteforge-full-logo.svg  → full logo with text (for footer)

export default function ByteForgeLogo({ size = 40, showText = true }) {
  if (!showText) {
    // Icon only — navbar use
    return (
      <img
        src="/byteforge-icon-only.svg"
        alt="Byte Forge Technology"
        height={size}
        width={size}
        style={{ display: "block", objectFit: "contain" }}
      />
    );
  }

  // Full logo with text — footer use
  // Aspect ratio ~1.04:1 so width ≈ height × 2.8
  return (
    <img
      src="/byteforge-full-logo.svg"
      alt="Byte Forge Technology"
      height={size}
      width={size * 2.8}
      style={{ display: "block", objectFit: "contain" }}
    />
  );
}