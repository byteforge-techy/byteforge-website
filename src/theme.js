// src/theme.js — Byte Forge brand tokens (single source of truth)
//
// A disciplined two-color system taken directly from the logo: blue + amber.
// Every accent below is a tint/shade of ONE of those two hues, plus dark/
// navy neutrals. No unrelated hues (purple, green, pink, cyan) are used
// anywhere on the site anymore — that's what was making it feel scattered.
//
// Usage: import the tokens you need, e.g.
//   import { BLUE, AMBER, DARK, INK, TEXT_MUTED } from "../theme";

// ── Brand ─────────────────────────────────────────────────
export const BLUE = "#2563eb";        // primary — logo blue
export const BLUE_LIGHT = "#3b82f6";  // hover states, gradients, tint variety
export const BLUE_DARK = "#1e40af";   // deep accent, replaces old purple

export const AMBER = "#f59e0b";       // secondary — logo amber, CTAs only
export const AMBER_LIGHT = "#fbbf24"; // gradient partner, tint variety
export const AMBER_DARK = "#d97706";  // deep accent

// ── Neutrals ──────────────────────────────────────────────
export const DARK = "#0a0a0a";        // matches logo's dark background exactly
export const INK = "#0f172a";         // near-black navy for headings / dark sections
export const INK_SOFT = "#1a2348";    // lighter navy, gradient partner for INK/DARK

// ── Text ──────────────────────────────────────────────────
export const TEXT_BODY = "#334155";       // higher-contrast reading copy (articles)
export const TEXT_MUTED = "#5b6472";      // standard body copy on light backgrounds
export const TEXT_SOFT = "#8891a3";       // secondary/meta text on light backgrounds
export const TEXT_ON_DARK = "#aab4cf";    // body copy on dark/navy sections
export const TEXT_ON_DARK_SOFT = "#7c88a8"; // de-emphasized text on dark sections
export const BADGE_TEXT = "#bcd0ff";      // pill/badge text on dark sections

// ── Borders & surfaces ────────────────────────────────────
export const BORDER = "#e5e7eb";
export const BORDER_DARK = "rgba(255,255,255,0.12)";
export const BG = "#ffffff";
export const BG_ALT = "#f7f8fc";

// ── Layout ────────────────────────────────────────────────
// Single source of truth for horizontal page margins. Navbar, Footer, and
// every section now share this exact value, so content lines up on every
// row instead of nav/footer using a proportional 5% gutter while sections
// used a fixed 24px one (which drifted apart on wide screens).
export const CONTAINER = { maxWidth: 1200, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" };
