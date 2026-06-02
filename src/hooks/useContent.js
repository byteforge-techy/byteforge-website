// src/hooks/useContent.js
// Reusable hook to fetch content from API with fallback defaults

import { useState, useEffect } from "react";

const BASE = import.meta.env.VITE_API_URL;

// Default fallback content — shown if API is down
const DEFAULTS = {
  Hero: {
    badge:     "Now accepting new clients — 2025",
    headline1: "We Build",
    headline2: "That Last.",
    subtitle:  "Byte Forge is a service-based IT firm building world-class software, apps, and cloud infrastructure for startups and enterprises across India and beyond.",
    cta1:      "Explore Services →",
    cta2:      "View Our Work",
  },
  Stats: {
    projects: "50",
    clients:  "30",
    domains:  "6",
    delivery: "100",
  },
  About: {
    tagline: "A Team That Thinks in Solutions",
    body:    "Byte Forge was born from a belief that great software should be accessible to every business. We're engineers, designers, and strategists who care deeply about craft and outcomes.",
  },
  CTA: {
    headline: "Ready to Build Something Great?",
    subtext:  "Tell us about your project — we'll respond within 24 hours with a thoughtful plan.",
    btnText:  "Get a Free Consultation →",
  },
  Services: {
    tagline: "From ideation to deployment, we cover every layer of your digital product.",
  },
};

// Global cache so we don't refetch on every page
let cachedContent = null;
let fetchPromise = null;

async function fetchContent() {
  if (cachedContent) return cachedContent;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch(`${BASE}/api/content`)
    .then(r => r.json())
    .then(data => {
      // Merge with defaults so missing keys still work
      const merged = { ...DEFAULTS };
      Object.entries(data).forEach(([section, keys]) => {
        merged[section] = { ...DEFAULTS[section], ...keys };
      });
      cachedContent = merged;
      return merged;
    })
    .catch(() => DEFAULTS); // fallback silently

  return fetchPromise;
}

export function useContent() {
  const [content, setContent] = useState(cachedContent || DEFAULTS);
  const [loading, setLoading] = useState(!cachedContent);

  useEffect(() => {
    if (cachedContent) return;
    fetchContent().then(data => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  // Helper: get a value with fallback
  const get = (section, key, fallback = "") =>
    content?.[section]?.[key] ?? fallback;

  return { content, loading, get };
}

// Invalidate cache when admin saves content
export function invalidateContentCache() {
  cachedContent = null;
  fetchPromise = null;
}