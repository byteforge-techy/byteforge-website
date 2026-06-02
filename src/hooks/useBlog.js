// src/hooks/useBlog.js
import { useState, useEffect } from "react";

const BASE = import.meta.env.VITE_API_URL;

const FALLBACK_POSTS = [
  { id:1, title:"How We Built a Telemedicine App in 6 Months", slug:"telemedicine-app-6-months", category:"Case Study", excerpt:"A deep dive into the architecture, challenges, and lessons learned building MediConnect.", status:"published", views:1240, createdAt:"2025-05-20", publishedAt:"2025-05-20" },
  { id:2, title:"React vs Next.js — Which to Choose in 2025?", slug:"react-vs-nextjs-2025", category:"Technology", excerpt:"We compare both frameworks across performance, SEO, and developer experience.", status:"published", views:3450, createdAt:"2025-05-10", publishedAt:"2025-05-10" },
];

// Fetch all published posts
export function useBlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE}/api/blog`)
      .then(r => r.json())
      .then(data => setPosts(data?.length ? data : FALLBACK_POSTS))
      .catch(() => setPosts(FALLBACK_POSTS))
      .finally(() => setLoading(false));
  }, []);

  return { posts, loading };
}

// Fetch a single post by slug
export function useBlogPost(slug) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`${BASE}/api/blog/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then(data => setPost(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  return { post, loading, error };
}