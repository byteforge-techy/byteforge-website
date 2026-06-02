// src/hooks/usePortfolio.js
import { useState, useEffect } from "react";

const BASE = import.meta.env.VITE_API_URL;

const FALLBACK_PORTFOLIO = [
  { id:1, tag:"Web Dev", title:"FinTrack Dashboard", description:"Real-time financial analytics for a Mumbai-based fintech startup.", backgroundColor:"#0f172a", accentColor:"#2563eb", isVisible:true },
  { id:2, tag:"Mobile App", title:"MediConnect", description:"Telemedicine app connecting 50k+ patients with certified doctors across Gujarat.", backgroundColor:"#0f2027", accentColor:"#16a34a", isVisible:true },
  { id:3, tag:"Custom Software", title:"LogiFlow ERP", description:"End-to-end logistics management reducing operational costs by 38%.", backgroundColor:"#0d1b2a", accentColor:"#ea580c", isVisible:true },
  { id:4, tag:"Cloud & DevOps", title:"ScaleStack Infra", description:"Zero-downtime cloud migration and auto-scaling for a SaaS provider.", backgroundColor:"#12232e", accentColor:"#7c3aed", isVisible:true },
];

const FALLBACK_TEAM = [
  { id:1, name:"Aryan Patel", role:"Founder & CEO", bio:"10+ years in enterprise software. Passionate about building products that solve real problems.", initials:"AP", color:"#dbeafe", accentColor:"#2563eb", isActive:true },
  { id:2, name:"Meera Shah", role:"Head of Design", bio:"Award-winning UX designer. Believes great design is invisible — it just works.", initials:"MS", color:"#fce7f3", accentColor:"#db2777", isActive:true },
  { id:3, name:"Rahul Joshi", role:"Lead Engineer", bio:"Full-stack architect with deep expertise in cloud infrastructure.", initials:"RJ", color:"#dcfce7", accentColor:"#16a34a", isActive:true },
  { id:4, name:"Nisha Verma", role:"Project Manager", bio:"Agile-certified PM with a track record of delivering complex projects on time.", initials:"NV", color:"#ffedd5", accentColor:"#ea580c", isActive:true },
];

let portfolioCache = null;
let teamCache = null;

export function usePortfolio() {
  const [items, setItems] = useState(portfolioCache || FALLBACK_PORTFOLIO);
  const [loading, setLoading] = useState(!portfolioCache);

  useEffect(() => {
    if (portfolioCache) return;
    fetch(`${BASE}/api/portfolio?visibleOnly=true`)
      .then(r => r.json())
      .then(data => {
        portfolioCache = data?.length ? data : FALLBACK_PORTFOLIO;
        setItems(portfolioCache);
      })
      .catch(() => setItems(FALLBACK_PORTFOLIO))
      .finally(() => setLoading(false));
  }, []);

  return { items, loading };
}

export function useTeam() {
  const [members, setMembers] = useState(teamCache || FALLBACK_TEAM);
  const [loading, setLoading] = useState(!teamCache);

  useEffect(() => {
    if (teamCache) return;
    fetch(`${BASE}/api/team?activeOnly=true`)
      .then(r => r.json())
      .then(data => {
        teamCache = data?.length ? data : FALLBACK_TEAM;
        setMembers(teamCache);
      })
      .catch(() => setMembers(FALLBACK_TEAM))
      .finally(() => setLoading(false));
  }, []);

  return { members, loading };
}