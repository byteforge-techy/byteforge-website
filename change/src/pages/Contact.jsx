// src/pages/Contact.jsx — Byte Forge (redesigned to match Home)
import { useRef, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  BLUE, BLUE_DARK, AMBER, DARK, INK,
  TEXT_MUTED, TEXT_SOFT, TEXT_ON_DARK, BADGE_TEXT, BORDER,
  BG_ALT,
} from "../theme";
const wrap = { maxWidth:1200, margin:"0 auto", padding:"0 24px" };
const fontHead = { fontFamily:"'Outfit',sans-serif" };

function useReveal() {
  const ref = useRef(null); const [shown, setShown] = useState(false);
  useEffect(() => { const el=ref.current; if(!el)return;
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setShown(true);obs.disconnect();}},{threshold:0.1});
    obs.observe(el); return ()=>obs.disconnect();
  }, []); return [ref, shown];
}
function Reveal({ children, delay=0, style={} }) {
  const [ref, shown] = useReveal();
  return <div ref={ref} style={{ opacity:shown?1:0, transform:shown?"translateY(0)":"translateY(30px)", transition:`all 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`, ...style }}>{children}</div>;
}
function SectionLabel({ children, color=BLUE }) {
  return <div style={{ display:"inline-block", ...fontHead, fontWeight:700, fontSize:14, letterSpacing:"2px", textTransform:"uppercase", color, marginBottom:16 }}>{children}</div>;
}

export default function Contact() {
  const [form, setForm] = useState({ name:"", company:"", email:"", phone:"", service:"", budget:"", timeline:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const update = (k,v) => setForm(f => ({ ...f, [k]:v }));

  const submit = async () => {
    setError("");
    if (!form.name || !form.email || !form.message) { setError("Please fill in your name, email, and message."); return; }
    setSending(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
      else setError("Something went wrong. Please try again or email me directly.");
    } catch { setError("Network error. Please try again or email me directly."); }
    finally { setSending(false); }
  };

  const input = (name) => ({
    width:"100%", padding:"14px 16px", borderRadius:12, fontSize:15, ...fontHead, color:INK, background:"#fff",
    border:`1.5px solid ${focused===name ? BLUE : "#e2e2e2"}`, outline:"none", transition:"border-color .2s", boxSizing:"border-box",
  });

  const services = ["Mobile App","Web Platform","Backend / API","Cloud & DevOps","Healthcare App","E-Commerce / POS","Other"];
  const budgets = ["< ₹1L","₹1L–5L","₹5L–15L","₹15L+","Not sure yet"];
  const timelines = ["ASAP","1–3 months","3–6 months","Flexible"];

  const faqs = [
    { q:"Do I work directly with you?", a:"Yes — always. You're not handed to a junior team. I handle your project personally, end to end." },
    { q:"What's your typical response time?", a:"I respond to every inquiry personally within 24 business hours." },
    { q:"Can you work with my existing codebase?", a:"Absolutely. I regularly pick up, fix, and extend existing apps across Flutter, Android, .NET, and Laravel." },
    { q:"Do you sign NDAs?", a:"Yes. Happy to sign an NDA before discussing any sensitive project details." },
  ];

  const contactCards = [
    { icon:"✉️", label:"Email", value:"writetobyteforge@byteforgetechnology.net", c:BLUE },
    { icon:"🌐", label:"Website", value:"byteforgetechnology.com", c:BLUE_DARK },
    { icon:"📍", label:"Based in", value:"Ahmedabad, Gujarat, India", c:AMBER },
  ];

  return (
    <div style={{ background:"#fff", ...fontHead, overflowX:"hidden" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ position:"relative", background:`linear-gradient(135deg, ${DARK} 0%, #14172a 55%, #1a2348 100%)`, color:"#fff", paddingTop:150, paddingBottom:100, overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${BLUE}11 1px,transparent 1px),linear-gradient(90deg,${BLUE}11 1px,transparent 1px)`, backgroundSize:"56px 56px", opacity:0.5 }}/>
        <div style={{ position:"absolute", top:-150, left:-100, width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle, ${BLUE}40, transparent 70%)`, filter:"blur(40px)" }}/>
        <div style={{ ...wrap, position:"relative" }}>
          <Reveal><SectionLabel color={BADGE_TEXT}>Get in Touch</SectionLabel></Reveal>
          <Reveal delay={0.06}><h1 style={{ ...fontHead, fontSize:"clamp(36px,6vw,72px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-2px", margin:"0 0 22px", color:"#fff" }}>Let's Build Something</h1></Reveal>
          <Reveal delay={0.12}><p style={{ fontSize:"clamp(16px,2vw,19px)", lineHeight:1.7, color:TEXT_ON_DARK, maxWidth:620, margin:"0 auto" }}>Tell me about your project. I respond personally within 24 hours with honest, practical advice.</p></Reveal>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section style={{ background:"#fff", padding:"0", marginTop:-50, position:"relative", zIndex:2 }}>
        <div style={{ ...wrap }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:0, background:"#fff", borderRadius:20, boxShadow:"0 20px 60px rgba(0,0,0,0.1)", overflow:"hidden", border:`1px solid ${BORDER}` }}>
            {contactCards.map((c,i) => (
              <div key={i} style={{ padding:"32px 28px", textAlign:"center", borderRight:i<contactCards.length-1?`1px solid ${BORDER}`:"none" }}>
                <div style={{ width:52, height:52, borderRadius:13, background:`${c.c}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, margin:"0 auto 14px" }}>{c.icon}</div>
                <div style={{ fontSize:13, color:TEXT_SOFT, fontWeight:600, textTransform:"uppercase", letterSpacing:"1px", marginBottom:6 }}>{c.label}</div>
                <div style={{ fontSize:15, color:INK, fontWeight:600, wordBreak:"break-word" }}>{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + FAQ */}
      <section style={{ background:"#fff", padding:"80px 0 100px" }}>
        <div style={{ ...wrap, display:"grid", gridTemplateColumns:"1.3fr 1fr", gap:48, alignItems:"start" }}>
          {/* FORM */}
          <Reveal>
            <div style={{ background:"#fff", border:`1px solid ${BORDER}`, borderRadius:20, padding:"40px", boxShadow:"0 8px 30px rgba(0,0,0,0.05)" }}>
              {submitted ? (
                <div style={{ textAlign:"center", padding:"40px 0" }}>
                  <div style={{ width:72, height:72, borderRadius:"50%", background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center", fontSize:34, margin:"0 auto 20px" }}>✓</div>
                  <h3 style={{ ...fontHead, fontSize:26, fontWeight:800, color:INK, margin:"0 0 12px" }}>Message Sent!</h3>
                  <p style={{ fontSize:16, color:TEXT_MUTED, lineHeight:1.6 }}>Thanks, <strong>{form.name}</strong>! I'll reach out to <strong>{form.email}</strong> within 24 business hours.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ ...fontHead, fontSize:24, fontWeight:800, color:INK, margin:"0 0 6px" }}>Tell Me About Your Project</h3>
                  <p style={{ fontSize:15, color:TEXT_SOFT, margin:"0 0 28px" }}>Fields marked * are required.</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                    <input style={input("name")} placeholder="Your Name *" value={form.name} onChange={e=>update("name",e.target.value)} onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)} />
                    <input style={input("company")} placeholder="Company / Startup" value={form.company} onChange={e=>update("company",e.target.value)} onFocus={()=>setFocused("company")} onBlur={()=>setFocused(null)} />
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
                    <input style={input("email")} placeholder="Email Address *" value={form.email} onChange={e=>update("email",e.target.value)} onFocus={()=>setFocused("email")} onBlur={()=>setFocused(null)} />
                    <input style={input("phone")} placeholder="Phone (optional)" value={form.phone} onChange={e=>update("phone",e.target.value)} onFocus={()=>setFocused("phone")} onBlur={()=>setFocused(null)} />
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:16 }}>
                    <select style={input("service")} value={form.service} onChange={e=>update("service",e.target.value)} onFocus={()=>setFocused("service")} onBlur={()=>setFocused(null)}>
                      <option value="">Service</option>{services.map(s=><option key={s}>{s}</option>)}
                    </select>
                    <select style={input("budget")} value={form.budget} onChange={e=>update("budget",e.target.value)} onFocus={()=>setFocused("budget")} onBlur={()=>setFocused(null)}>
                      <option value="">Budget</option>{budgets.map(s=><option key={s}>{s}</option>)}
                    </select>
                    <select style={input("timeline")} value={form.timeline} onChange={e=>update("timeline",e.target.value)} onFocus={()=>setFocused("timeline")} onBlur={()=>setFocused(null)}>
                      <option value="">Timeline</option>{timelines.map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <textarea style={{ ...input("message"), resize:"vertical", minHeight:130, marginBottom:8 }} placeholder="Tell me about your project… *" value={form.message} onChange={e=>update("message",e.target.value)} onFocus={()=>setFocused("message")} onBlur={()=>setFocused(null)} />
                  {error && <div style={{ color:"#dc2626", fontSize:14, marginBottom:14 }}>{error}</div>}
                  <button onClick={submit} disabled={sending} style={{ ...fontHead, width:"100%", background:sending?"#94a3b8":`linear-gradient(90deg,${BLUE},#3b82f6)`, color:"#fff", border:"none", padding:"16px", borderRadius:12, fontSize:16, fontWeight:700, cursor:sending?"default":"pointer", marginTop:16, boxShadow:"0 10px 30px rgba(37,99,235,0.3)" }}>
                    {sending ? "Sending…" : "Send Message →"}
                  </button>
                </>
              )}
            </div>
          </Reveal>

          {/* FAQ */}
          <Reveal delay={0.1}>
            <div>
              <SectionLabel>Quick Answers</SectionLabel>
              <h3 style={{ ...fontHead, fontSize:26, fontWeight:800, color:INK, margin:"0 0 24px", letterSpacing:"-0.5px" }}>Frequently Asked</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {faqs.map((f,i) => (
                  <div key={i} onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ background:BG_ALT, border:`1px solid ${BORDER}`, borderRadius:14, padding:"18px 20px", cursor:"pointer" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
                      <span style={{ ...fontHead, fontSize:15.5, fontWeight:700, color:INK }}>{f.q}</span>
                      <span style={{ color:BLUE, fontSize:20, fontWeight:700, transform:openFaq===i?"rotate(45deg)":"none", transition:"transform .2s" }}>+</span>
                    </div>
                    {openFaq===i && <p style={{ fontSize:14.5, lineHeight:1.6, color:TEXT_MUTED, margin:"12px 0 0" }}>{f.a}</p>}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
      <style>{`@media(max-width:900px){section > div[style*="grid-template-columns: 1.3fr"]{grid-template-columns:1fr !important}}`}</style>
    </div>
  );
}