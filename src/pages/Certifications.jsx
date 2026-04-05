import React, { useState, useEffect, useRef } from "react";
import { Check, Award, Eye, Shield, Star, X } from "lucide-react";

import regis1 from "../assets/regis-1.jpeg";
import regis2 from "../assets/regis-2.jpeg";
import regis3 from "../assets/regis-3.jpeg";
import peace from "../assets/Ethernal-peace.jpeg";

const certs = [
  {
    img: regis1,
    name: "Registration Certificate",
    org: "Directorate of Social Defence",
    detail: "Official registration as a Children's Home under the Juvenile Justice Act, 2015.",
    badge: "DSD Registered",
    year: "2022",
    icon: Shield,
    accent: "#9A7020",
    accentBg: "#FAF3E0",
  },
  {
    img: regis2,
    name: "Compliance Verification",
    org: "Directorate of Social Defence",
    detail: "Structural, sanitary & fire safety compliance verified for 2022–2025.",
    badge: "Safety Verified",
    year: "2022",
    icon: Check,
    accent: "#1A5C38",
    accentBg: "#E8F5EE",
  },
  {
    img: regis3,
    name: "Official Authorization",
    org: "Directorate of Social Defence",
    detail: "Official signatures authorizing Eternal Peace Mission operations.",
    badge: "Authenticated",
    year: "2023",
    icon: Award,
    accent: "#4A2E99",
    accentBg: "#EEE8FB",
  },
  {
    img: peace,
    name: "Eternal Peace Trust",
    org: "Trust Act No: 199/2005",
    detail: "Registered under the Indian Trust Act for charitable service since 2005.",
    badge: "Trust Registered",
    year: "2005",
    icon: Star,
    accent: "#9A7020",
    accentBg: "#FAF3E0",
  },
];

/* ── Lightbox ── */
function Lightbox({ cert, onClose }) {
  const Icon = cert.icon;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const esc = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 280);
  }

  return (
    <div
      className={`cl-overlay${visible ? " cl-overlay--in" : ""}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className={`cl-panel${visible ? " cl-panel--in" : ""}`}>
        <button className="cl-close" onClick={handleClose} aria-label="Close">
          <X size={18} />
        </button>
        <div className="cl-img-col">
          <img src={cert.img} alt={cert.name} loading="lazy" />
        </div>
        <div className="cl-info-col">
          <span className="cl-info-year">{cert.year}</span>
          <p className="cl-info-org" style={{ color: cert.accent }}>{cert.org}</p>
          <h3 className="cl-info-name">{cert.name}</h3>
          <p className="cl-info-desc">{cert.detail}</p>
          <span
            className="cl-info-badge"
            style={{ color: cert.accent, background: cert.accentBg }}
          >
            <Icon size={13} />
            {cert.badge}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Reveal on scroll ── */
function useCardReveal() {
  const ref = useRef(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setEntered(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, entered };
}

/* ── Cert Card (uniform) ── */
function CertCard({ cert, index, onClick }) {
  const Icon = cert.icon;
  const { ref, entered } = useCardReveal();

  return (
    <button
      ref={ref}
      className={`cc-card${entered ? " cc-card--in" : ""}`}
      style={{
        "--a": cert.accent,
        "--ab": cert.accentBg,
        transitionDelay: entered ? `${index * 90}ms` : "0ms",
      }}
      onClick={onClick}
      aria-label={`View ${cert.name}`}
    >
      <div className="cc-img-wrap">
        <img src={cert.img} alt={cert.name} className="cc-img" loading="lazy" />
        <div className="cc-img-overlay">
          <span className="cc-eye-btn"><Eye size={14} /> View</span>
        </div>
      </div>
      <div className="cc-body">
        <div className="cc-meta-row">
          <span className="cc-year">{cert.year}</span>
          <span className="cc-icon-wrap"><Icon size={13} /></span>
        </div>
        <p className="cc-org">{cert.org}</p>
        <h3 className="cc-name">{cert.name}</h3>
        <p className="cc-desc">{cert.detail}</p>
        <span className="cc-badge">
          <Check size={10} strokeWidth={3} />{cert.badge}
        </span>
      </div>
      <div className="cc-accent-bar" />
    </button>
  );
}

/* ══ Main ══ */
export default function Certifications() {
  const [modal, setModal] = useState(null);
  const headerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    setHeaderVisible(true);
  }, []);

  return (
    <>
      <style>{`
        /* ═══════════════════════════════════════════
           CERTIFICATIONS PAGE — REDESIGN v3
           ═══════════════════════════════════════════ */

        .cp-wrap {
          --gold: #9A7020;
          --ink: #18160F;
          --ink2: #4C4840;
          --ink3: #8A857E;
          --surf: #FFFFFF;
          --surf2: #F7F5F0;
          --surf3: #EFECE4;
          --bdr: rgba(24,22,15,0.08);
          --bdr2: rgba(24,22,15,0.14);
          font-family: 'DM Sans', "Helvetica Neue", Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          background: var(--surf2);
          color: var(--ink);
          min-height: 100vh;
        }

        /* ── HERO ── */
        .cp-hero {
          background: linear-gradient(160deg, #1A140E 0%, #262113 50%, #1E1A10 100%);
          padding: 6.5rem 2rem 3.5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 680px) { .cp-hero { padding: 4.5rem 1.5rem 2.5rem; } }
        .cp-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 55% at 50% 40%, rgba(201,168,76,0.09) 0%, transparent 65%),
            radial-gradient(circle at 85% 25%, rgba(201,168,76,0.04) 0%, transparent 35%);
          pointer-events: none;
        }
        .cp-hero-inner {
          position: relative; z-index: 2;
          max-width: 600px; margin: 0 auto;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.16,1,.3,1);
        }
        .cp-hero-inner.cp-hero--in {
          opacity: 1; transform: translateY(0);
        }

        .cp-eyebrow {
          display: inline-flex;
          align-items: center; gap: 8px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(201,168,76,0.7);
          margin-bottom: 1.5rem;
        }
        .cp-eyebrow-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(201,168,76,0.4);
        }

        .cp-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #fff;
          margin: 0 0 1.2rem;
        }
        .cp-title em {
          font-style: italic;
          background: linear-gradient(90deg, #C9A84C, #E8C97D, #C9A84C);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: cpShimmer 4s linear infinite;
        }
        @keyframes cpShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .cp-sub {
          font-size: 0.95rem;
          line-height: 1.75;
          color: rgba(255,255,255,0.4);
          max-width: 440px;
          margin: 0 auto 2.5rem;
          font-weight: 300;
        }

        .cp-stats {
          display: flex;
          justify-content: center;
          gap: 0;
        }
        .cp-stat {
          display: flex; flex-direction: column;
          align-items: center; gap: 4px;
          padding: 0 2rem;
        }
        .cp-stat + .cp-stat { border-left: 1px solid rgba(255,255,255,0.08); }
        .cp-stat-n {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2rem; font-weight: 600;
          color: rgba(232,201,125,0.85);
          line-height: 1;
        }
        .cp-stat-l {
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        /* ── TRUST PILLS ── */
        .cp-pills-bar {
          background: var(--surf);
          border-bottom: 1px solid var(--bdr);
          padding: 1rem 1.5rem;
          display: flex; justify-content: center;
          gap: 0.6rem; flex-wrap: wrap;
        }
        .cp-pill {
          display: inline-flex;
          align-items: center; gap: 6px;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.03em;
          color: var(--ink2);
          background: var(--surf2);
          border: 1px solid var(--bdr2);
          border-radius: 100px;
          padding: 6px 14px;
          transition: all 0.25s;
        }
        .cp-pill:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: #FAF3E0;
          transform: translateY(-1px);
        }
        .cp-pill svg { color: var(--gold); width: 12px; height: 12px; }

        /* ── 4-COLUMN GRID ── */
        .cp-grid {
          max-width: 1280px;
          margin: 0 auto;
          padding: 3rem 1.5rem 5rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.2rem;
        }
        @media (max-width: 680px) { .cp-grid { padding: 2rem 1.25rem 3rem; gap: 1rem; } }
        @media (max-width: 1000px) {
          .cp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .cp-grid { grid-template-columns: 1fr; max-width: 400px; }
        }

        /* ── CARD ── */
        .cc-card {
          all: unset;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          background: var(--surf);
          border: 1px solid var(--bdr);
          border-radius: 18px;
          overflow: hidden;
          position: relative;
          text-align: left;
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.55s ease,
            transform 0.55s cubic-bezier(.16,1,.3,1),
            border-color 0.25s,
            box-shadow 0.3s;
        }
        .cc-card--in { opacity: 1; transform: translateY(0); }
        .cc-card:hover {
          border-color: var(--a, rgba(154,112,32,0.35));
          box-shadow: 0 12px 40px rgba(0,0,0,0.10);
          transform: translateY(-6px) !important;
        }

        /* Image */
        .cc-img-wrap {
          position: relative; overflow: hidden;
          height: 200px; flex-shrink: 0;
          background: var(--surf3);
        }
        .cc-img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
          transition: transform 0.65s cubic-bezier(.16,1,.3,1);
        }
        .cc-card:hover .cc-img { transform: scale(1.07); }

        .cc-img-overlay {
          position: absolute; inset: 0;
          background: rgba(18,14,8,0.45);
          backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.28s;
        }
        .cc-card:hover .cc-img-overlay { opacity: 1; }

        .cc-eye-btn {
          display: flex; align-items: center; gap: 6px;
          background: #fff; color: var(--ink);
          padding: 0.5rem 1.1rem; border-radius: 100px;
          font-size: 0.78rem; font-weight: 700;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          transform: translateY(8px);
          transition: transform 0.3s cubic-bezier(.16,1,.3,1);
        }
        .cc-card:hover .cc-eye-btn { transform: translateY(0); }

        /* Body */
        .cc-body {
          padding: 1.4rem 1.5rem 1.6rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 680px) { .cc-body { padding: 1.1rem 1.25rem 1.25rem; } }

        .cc-meta-row {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 0.4rem;
        }
        .cc-year {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.12em; color: var(--ink3);
        }
        .cc-icon-wrap {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: var(--ab); color: var(--a);
          display: flex; align-items: center; justify-content: center;
        }

        .cc-org {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.09em; text-transform: uppercase;
          color: var(--a); margin: 0 0 0.3rem;
          line-height: 1.3;
        }
        .cc-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.35rem; font-weight: 600;
          letter-spacing: -0.01em; line-height: 1.2;
          color: var(--ink); margin: 0 0 0.5rem;
        }
        .cc-desc {
          font-size: 0.82rem; line-height: 1.65;
          color: var(--ink2); font-weight: 400;
          margin: 0 0 1rem;
        }
        .cc-badge {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--a); background: var(--ab);
          border-radius: 100px;
          padding: 4px 11px;
          align-self: flex-start;
          margin-top: auto;
        }

        .cc-accent-bar {
          position: absolute; bottom: 0; left: 0;
          width: 0; height: 2.5px;
          background: var(--a);
          transition: width 0.32s cubic-bezier(.16,1,.3,1);
        }
        .cc-card:hover .cc-accent-bar { width: 100%; }

        /* ── CTA STRIP ── */
        .cp-cta-strip {
          background: linear-gradient(160deg, #1A140E, #262113);
          padding: 3rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cp-cta-strip::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 50% 80% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .cp-cta-inner {
          position: relative; z-index: 2;
          max-width: 500px; margin: 0 auto;
        }
        .cp-cta-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem; font-weight: 400;
          color: rgba(255,255,255,0.65);
          line-height: 1.4;
          margin: 0 0 1.5rem;
        }
        .cp-cta-text strong { color: rgba(232,201,125,0.85); font-weight: 600; }
        .cp-verify-btn {
          all: unset;
          cursor: pointer;
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px;
          padding: 0.7rem 1.8rem;
          transition: all 0.3s;
        }
        .cp-verify-btn:hover {
          color: #E8C97D;
          border-color: rgba(201,168,76,0.35);
          background: rgba(201,168,76,0.06);
          transform: translateY(-2px);
        }

        /* ── LIGHTBOX ── */
        .cl-overlay {
          position: fixed; inset: 0;
          background: rgba(18,15,10,0);
          backdrop-filter: blur(0px);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 1.5rem;
          transition: background 0.28s ease, backdrop-filter 0.28s ease;
        }
        .cl-overlay--in {
          background: rgba(18,15,10,0.72);
          backdrop-filter: blur(12px);
        }

        .cl-panel {
          background: var(--surf);
          border-radius: 20px;
          overflow: hidden;
          width: 100%;
          max-width: 640px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          box-shadow: 0 40px 80px rgba(0,0,0,0.3);
          opacity: 0;
          transform: translateY(20px) scale(0.96);
          transition: opacity 0.28s ease, transform 0.35s cubic-bezier(0.34,1.3,0.64,1);
          position: relative;
        }
        .cl-panel--in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        @media (max-width: 560px) {
          .cl-panel { grid-template-columns: 1fr; max-width: 400px; }
        }

        .cl-close {
          all: unset; cursor: pointer;
          position: absolute; top: 12px; right: 12px;
          width: 32px; height: 32px;
          background: rgba(0,0,0,0.2);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #fff; z-index: 5;
          transition: all 0.2s;
        }
        .cl-close:hover { background: rgba(0,0,0,0.4); transform: rotate(90deg); }

        .cl-img-col { overflow: hidden; min-height: 280px; }
        @media (max-width: 560px) { .cl-img-col { min-height: 180px; } }
        .cl-img-col img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          display: block;
        }

        .cl-info-col {
          padding: 2rem 1.8rem;
          display: flex; flex-direction: column; gap: 8px;
          justify-content: center;
        }
        .cl-info-year {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ink3);
          background: var(--surf2);
          border-radius: 6px;
          padding: 4px 10px;
          align-self: flex-start;
        }
        .cl-info-org {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          margin: 0;
        }
        .cl-info-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem; font-weight: 600;
          letter-spacing: -0.02em; line-height: 1.2;
          color: var(--ink); margin: 0;
        }
        .cl-info-desc {
          font-size: 0.85rem; line-height: 1.7;
          color: var(--ink2); margin: 0;
        }
        .cl-info-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.04em;
          border-radius: 100px; padding: 6px 14px;
          align-self: flex-start; margin-top: 4px;
        }

        /* ── RESPONSIVE FINE TUNING ── */
        @media (max-width: 480px) {
          .cp-hero { padding: 4.5rem 1.25rem 2rem; }
          .cp-stat { padding: 0 0.75rem; }
          .cp-stat-n { font-size: 1.4rem; }
          .cp-pills-bar { padding: 0.75rem 1rem; gap: 0.4rem; }
          .cp-pill { padding: 4px 10px; font-size: 10px; }
          .cp-title { font-size: 1.9rem; }
          .cc-name { font-size: 1.2rem; }
          .cc-img-wrap { height: 160px; }
        }
      `}</style>

      <div className="cp-wrap">

        {/* ── HERO ── */}
        <section className="cp-hero">
          <div
            ref={headerRef}
            className={`cp-hero-inner${headerVisible ? " cp-hero--in" : ""}`}
          >
            <div className="cp-eyebrow">
              <Shield size={11} />
              <span className="cp-eyebrow-dot" />
              Trust & Transparency
              <span className="cp-eyebrow-dot" />
            </div>
            <h1 className="cp-title">Verified <em>&amp;</em> Certified</h1>
            <p className="cp-sub">
              Eternal Peace Mission Children home operates with full government authorization — every
              document is authentic, verifiable, and legally compliant.
            </p>
            <div className="cp-stats">
              {[["4", "Certificates"], ["100%", "Compliant"], ["19+", "Years Active"]].map(([n, l]) => (
                <div className="cp-stat" key={l}>
                  <span className="cp-stat-n">{n}</span>
                  <span className="cp-stat-l">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST PILLS ── */}
        <div className="cp-pills-bar">
          {[
            [Shield, "Govt. Registered"],
            [Check, "JJ Act 2015"],
            [Award, "Fire & Safety"],
            [Star, "Indian Trust Act"],
          ].map(([Icon, label]) => (
            <span className="cp-pill" key={label}>
              <Icon size={12} /> {label}
            </span>
          ))}
        </div>

        {/* ── CARD GRID (4 in a row) ── */}
        <div className="cp-grid">
          {certs.map((cert, i) => (
            <CertCard
              key={i}
              cert={cert}
              index={i}
              onClick={() => setModal(cert)}
            />
          ))}
        </div>

        {/* ── CTA STRIP ── */}
 
      </div>

      {/* Lightbox */}
      {modal && <Lightbox cert={modal} onClose={() => setModal(null)} />}
    </>
  );
}