// src/components/ByteForgeLogo.jsx

export default function ByteForgeLogo({ size = 40, showText = true }) {
  // Logo aspect ratio is ~1.05:1 (nearly square — monogram + text stacked)
  // width = size * 2.5 gives a good horizontal proportion for navbar use
  const height = size;
  const width = showText ? size * 2.5 : size;

  return (
    <img
      src="/byteforge_logo.svg"
      alt="Byte Forge Technology"
      height={height}
      width={width}
      style={{
        display: "block",
        objectFit: "contain",
      }}
    />
  );
}