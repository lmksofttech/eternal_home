import React, { useState, useEffect, useRef } from "react";
import { Heart, Shield, Award, TrendingUp, Users, BookOpen, Utensils, GraduationCap, ChevronRight, Star, Lock, ArrowRight } from "lucide-react";

const levels = [
  { val: 500, label: "₹500", note: "Nutrition", desc: "Nutritious meals for one child for a full week.", icon: Utensils, color: "#1A5C38", bg: "#E8F5EE" },
  { val: 1500, label: "₹1,500", note: "School Kit", desc: "Books, bag, stationery and school uniform.", icon: BookOpen, color: "#4A2E99", bg: "#EEE8FB" },
  { val: 5000, label: "₹5,000", note: "Full Care", desc: "Complete care for one child for an entire month.", icon: Heart, color: "#9A3030", bg: "#FBE8E8" },
  { val: 10000, label: "₹10,000", note: "Education", desc: "A child's full semester of education expenses.", icon: GraduationCap, color: "#9A7020", bg: "#FAF3E0" },
];

const donors = [
  { name: "Priya Sharma", amount: 5000, type: "One-time", date: "Apr 4", msg: "For the little ones." },
  { name: "Anonymous", amount: 1500, type: "Monthly", date: "Apr 3", msg: "" },
  { name: "Rajan Mehta", amount: 10000, type: "One-time", date: "Apr 2", msg: "God bless all children." },
  { name: "Kavitha S", amount: 500, type: "Monthly", date: "Apr 1", msg: "Small but sincere." },
  { name: "Arun Kumar", amount: 2500, type: "One-time", date: "Mar 31", msg: "In memory of my mother." },
  { name: "Divya Nair", amount: 5000, type: "Quarterly", date: "Mar 29", msg: "Keep shining!" },
  { name: "Meena R", amount: 3000, type: "Monthly", date: "Mar 27", msg: "Every child deserves love." },
  { name: "Vijay T", amount: 10000, type: "One-time", date: "Mar 26", msg: "For education." },
];

const stats = [
  { n: "₹18.6L", label: "Raised this year", icon: TrendingUp },
  { n: "340+", label: "Total supporters", icon: Users },
  { n: "52", label: "Children supported", icon: Heart },
  { n: "19+", label: "Years of service", icon: Award },
];

const impacts = {
  500: "Nutritious meals for one child for a full week.",
  1500: "Books, bag, stationery and school uniform.",
  5000: "Complete care for one child for an entire month.",
  10000: "A child's full semester of education expenses.",
};

/* ── Reveal hook ── */
function useRevealRef() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

export default function Impact() {
  const [amt, setAmt] = useState(500);
  const [custom, setCustom] = useState("");
  const [method, setMethod] = useState("UPI");
  const [donor, setDonor] = useState("");
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [heroVis, setHeroVis] = useState(false);
  const toastRef = useRef();

  const statsReveal = useRevealRef();
  const donateReveal = useRevealRef();
  const wallReveal = useRevealRef();

  useEffect(() => { setHeroVis(true); }, []);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast({ show: false, msg }), 3200);
  };

  const handleSubmit = () => {
    const final = amt === "custom" ? parseInt(custom) : amt;
    if (!final || final < 1) return;
    showToast(`Thank you, ${donor || "Kind Donor"} — ₹${final.toLocaleString("en-IN")} via ${method}`);
  };

  const previewAmt = amt === "custom" ? parseInt(custom) || 0 : amt;
  const closest = [500, 1500, 5000, 10000].reduce((a, b) =>
    Math.abs(b - previewAmt) < Math.abs(a - previewAmt) ? b : a
  );
  const selLevel = levels.find(l => l.val === (amt === "custom" ? closest : amt)) || levels[0];

  return (
    <>
      <style>{`
        .imp-wrap {
          --gold: #9A7020;
          --gold2: #C9A84C;
          --ink: #18160F;
          --ink2: #4C4840;
          --ink3: #8A857E;
          --surf: #FFFFFF;
          --surf2: #F7F5F0;
          --surf3: #EFECE4;
          --bdr: rgba(24,22,15,0.08);
          --bdr2: rgba(24,22,15,0.14);
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          background: var(--surf2);
          color: var(--ink);
          min-height: 100vh;
        }

        /* ── HERO ── */
        .imp-hero {
          background: linear-gradient(160deg, #1A140E 0%, #262113 50%, #1E1A10 100%);
          padding: 7.5rem 2rem 4rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .imp-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 55% 50% at 50% 40%, rgba(201,168,76,0.09) 0%, transparent 60%),
            radial-gradient(circle at 80% 25%, rgba(201,168,76,0.04) 0%, transparent 35%);
          pointer-events: none;
        }
        .imp-hero-inner {
          position: relative; z-index: 2;
          max-width: 620px; margin: 0 auto;
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(.16,1,.3,1);
        }
        .imp-hero-inner.--in { opacity: 1; transform: translateY(0); }

        .imp-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(201,168,76,0.7);
          margin-bottom: 1.5rem;
        }
        .imp-hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 300; line-height: 1.1;
          color: #fff; margin: 0 0 1.2rem;
          letter-spacing: -0.02em;
        }
        .imp-hero-title em {
          font-style: italic;
          background: linear-gradient(90deg, #C9A84C, #E8C97D, #C9A84C);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: impShimmer 4s linear infinite;
        }
        @keyframes impShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .imp-hero-sub {
          font-size: 0.95rem; line-height: 1.75;
          color: rgba(255,255,255,0.4);
          max-width: 460px; margin: 0 auto;
          font-weight: 300;
        }

        /* ── STATS BAR ── */
        .imp-stats-bar {
          background: var(--surf);
          border-bottom: 1px solid var(--bdr);
          padding: 1.5rem 2rem;
        }
        .imp-stats-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .imp-stat-item {
          display: flex; align-items: center; gap: 14px;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(.16,1,.3,1);
        }
        .imp-stat-item.--in { opacity: 1; transform: translateY(0); }
        .imp-stat-ico {
          width: 44px; height: 44px; border-radius: 12px;
          background: var(--surf2);
          border: 1px solid var(--bdr2);
          display: flex; align-items: center; justify-content: center;
          color: var(--gold); flex-shrink: 0;
        }
        .imp-stat-n {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.5rem; font-weight: 600; color: var(--ink);
          line-height: 1;
        }
        .imp-stat-l {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--ink3); margin-top: 2px;
        }

        @media (max-width: 800px) {
          .imp-stats-inner { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 450px) {
          .imp-stats-inner { grid-template-columns: 1fr; }
        }

        /* ── DONATE SECTION ── */
        .imp-donate {
          max-width: 1100px; margin: 0 auto;
          padding: 3rem 1.5rem 4rem;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 2rem; align-items: stretch;
        }
        @media (max-width: 800px) {
          .imp-donate { grid-template-columns: 1fr; max-width: 560px; }
        }
        .imp-don-reveal {
          opacity: 0; transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(.16,1,.3,1);
        }
        .imp-don-reveal.--in { opacity: 1; transform: translateY(0); }

        /* Left: Amount selection */
        .imp-don-left {
          background: var(--surf); border: 1px solid var(--bdr);
          border-radius: 20px; padding: 2.5rem;
          box-shadow: 0 8px 30px rgba(0,0,0,0.04);
        }
        .imp-sec-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 1.5rem;
          display: flex; align-items: center; gap: 8px;
        }
        .imp-sec-label::before {
          content: ''; width: 24px; height: 1.5px;
          background: var(--gold); border-radius: 2px;
        }

        .imp-levels {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; margin-bottom: 1.5rem;
        }
        .imp-lv {
          all: unset; cursor: pointer;
          border: 1px solid var(--bdr2); border-radius: 14px;
          padding: 1.2rem 1rem;
          display: flex; align-items: flex-start; gap: 12px;
          transition: all 0.25s;
          position: relative; overflow: hidden;
        }
        .imp-lv:hover { border-color: var(--gold2); background: rgba(201,168,76,0.03); }
        .imp-lv.sel { border-color: var(--gold2); background: rgba(201,168,76,0.06); }
        .imp-lv-ico {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.3s;
        }
        .imp-lv.sel .imp-lv-ico { transform: scale(1.08); }
        .imp-lv-info { flex: 1; }
        .imp-lv-amt {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.3rem; font-weight: 600; color: var(--ink); line-height: 1;
        }
        .imp-lv-note {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.05em; text-transform: uppercase;
          margin-top: 4px;
        }
        .imp-lv-dot {
          position: absolute; top: 10px; right: 12px;
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--gold2); opacity: 0; transition: opacity 0.2s;
        }
        .imp-lv.sel .imp-lv-dot { opacity: 1; }

        .imp-inp-group { margin-bottom: 1rem; }
        .imp-inp-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--ink3); display: block; margin-bottom: 6px;
        }
        .imp-inp {
          width: 100%; padding: 0.85rem 1rem;
          border: 1px solid var(--bdr2); border-radius: 10px;
          background: var(--surf2); font-size: 0.9rem;
          font-family: 'DM Sans', sans-serif;
          color: var(--ink); outline: none;
          transition: all 0.25s;
        }
        .imp-inp:focus { border-color: var(--gold2); background: var(--surf); box-shadow: 0 0 0 4px rgba(201,168,76,0.08); }
        .imp-inp::placeholder { color: var(--ink3); }

        .imp-methods {
          display: flex; gap: 8px; margin-bottom: 1.5rem;
        }
        .imp-mth {
          all: unset; cursor: pointer;
          flex: 1; text-align: center;
          padding: 0.65rem 0; border-radius: 10px;
          border: 1px solid var(--bdr2);
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--ink3);
          transition: all 0.2s;
        }
        .imp-mth:hover { border-color: var(--gold); color: var(--ink2); }
        .imp-mth.sel { border-color: var(--gold2); color: var(--gold); background: rgba(201,168,76,0.06); }

        .imp-cta {
          all: unset; cursor: pointer;
          width: 100%; box-sizing: border-box;
          padding: 1rem; border-radius: 12px;
          background: linear-gradient(135deg, #C9A84C, #A07A30);
          color: #fff; text-align: center;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.3s;
          box-shadow: 0 6px 20px rgba(201,168,76,0.25);
        }
        .imp-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(201,168,76,0.35); }

        .imp-trust {
          display: flex; gap: 8px; margin-top: 1rem; flex-wrap: wrap; justify-content: center;
        }
        .imp-trust-pill {
          font-size: 10px; font-weight: 600; color: var(--ink3);
          display: flex; align-items: center; gap: 4px;
          padding: 4px 10px; border: 1px solid var(--bdr2);
          border-radius: 100px; letter-spacing: 0.03em;
        }
        .imp-trust-pill svg { color: var(--gold); }

        /* Right: Impact preview */
        .imp-don-right { display: flex; flex-direction: column; gap: 1.2rem; }

        .imp-preview-card {
          background: var(--surf); border: 1px solid var(--bdr);
          border-radius: 20px; padding: 2rem 2.2rem;
          box-shadow: 0 8px 30px rgba(0,0,0,0.04);
          position: relative; overflow: hidden;
          flex-shrink: 0;
        }
        .imp-preview-card::before {
          content: '"'; position: absolute; top: -10px; left: 10px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 8rem; line-height: 1;
          color: var(--gold); opacity: 0.04;
          pointer-events: none;
        }
        .imp-prev-label {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 0.5rem;
        }
        .imp-prev-amt {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.8rem; font-weight: 300;
          color: var(--ink); line-height: 1;
          margin-bottom: 0.6rem;
        }
        .imp-prev-desc {
          font-size: 0.9rem; line-height: 1.7;
          color: var(--ink2); font-style: italic; font-weight: 300;
        }
        .imp-prev-icon-row {
          display: flex; align-items: center; gap: 10px;
          margin-top: 1.2rem; padding-top: 1rem;
          border-top: 1px solid var(--bdr);
        }
        .imp-prev-icon-badge {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .imp-prev-icon-label {
          font-size: 12px; font-weight: 600; color: var(--ink);
        }

        .imp-mini-stats {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
        }
        .imp-mini-stat {
          background: var(--surf); border: 1px solid var(--bdr);
          border-radius: 14px; padding: 1.3rem;
          text-align: center; transition: all 0.3s;
        }
        .imp-mini-stat:hover { border-color: var(--gold2); transform: translateY(-2px); }
        .imp-mini-stat-n {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem; font-weight: 600; color: var(--gold);
          line-height: 1;
        }
        .imp-mini-stat-l {
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--ink3); margin-top: 4px;
        }

        /* Payment summary card */
        .imp-pay-summary {
          background: var(--surf); border: 1px solid var(--bdr);
          border-radius: 16px; padding: 1.5rem 1.8rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
        }
        .imp-pay-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0.6rem 0;
        }
        .imp-pay-row + .imp-pay-row { border-top: 1px solid var(--bdr); }
        .imp-pay-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: var(--ink3);
        }
        .imp-pay-val {
          font-size: 13px; font-weight: 600; color: var(--ink);
          display: flex; align-items: center; gap: 6px;
        }
        .imp-pay-method-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: var(--surf2); border: 1px solid var(--bdr2);
          border-radius: 8px; padding: 4px 10px;
          font-size: 11px; font-weight: 700; color: var(--gold);
          letter-spacing: 0.04em;
        }

        /* Method specific inputs on right */
        .imp-pay-details-area { margin-top: 1rem; }
        .imp-pay-field-wrap { margin-bottom: 0.8rem; }
        .imp-pay-field-label {
          display: block; font-size: 9px; font-weight: 700;
          color: var(--ink3); text-transform: uppercase;
          margin-bottom: 4px; letter-spacing: 0.05em;
        }
        .imp-pay-input-sm {
          width: 100%; padding: 0.6rem 0.8rem;
          border: 1px solid var(--bdr2); border-radius: 8px;
          background: var(--surf2); font-size: 0.85rem;
          color: var(--ink); outline: none; transition: border-color 0.2s;
        }
        .imp-pay-input-sm:focus { border-color: var(--gold2); background: white; }
        .imp-pay-cvv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        .imp-blurb-card {
          background: linear-gradient(135deg, #262113, #1A140E);
          border-radius: 16px; padding: 1.8rem 2rem;
          color: rgba(255,255,255,0.55);
          font-size: 0.85rem; line-height: 1.75; font-weight: 300;
          position: relative; overflow: hidden;
          flex: 1; display: flex; align-items: center;
        }
        .imp-blurb-card::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 70% 30%, rgba(201,168,76,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .imp-blurb-card span { position: relative; z-index: 2; display: block; }
        .imp-blurb-card strong { color: rgba(232,201,125,0.8); font-weight: 600; }

        /* ── GRATITUDE WALL ── */
        .imp-wall {
          max-width: 1100px; margin: 0 auto;
          padding: 0 1.5rem 4rem;
        }
        .imp-wall-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.5rem; padding-bottom: 1rem;
          border-bottom: 1px solid var(--bdr2);
        }
        .imp-wall-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.6rem; font-weight: 600;
          color: var(--ink);
        }
        .imp-live {
          display: flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--ink3);
        }
        .imp-live-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #C85A5A;
          animation: impPulse 1.6s ease-in-out infinite;
        }
        @keyframes impPulse { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.3;transform:scale(.6);} }

        .imp-wall-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        @media (max-width: 900px) { .imp-wall-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 500px) { .imp-wall-grid { grid-template-columns: 1fr; } }

        .imp-donor-card {
          background: var(--surf); border: 1px solid var(--bdr);
          border-radius: 16px; padding: 1.4rem 1.5rem;
          transition: all 0.35s;
          opacity: 0; transform: translateY(14px);
        }
        .imp-donor-card.--in { opacity: 1; transform: translateY(0); }
        .imp-donor-card:hover { border-color: var(--gold2); transform: translateY(-4px) !important; box-shadow: 0 8px 28px rgba(0,0,0,0.06); }
        .imp-dc-top {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 8px;
        }
        .imp-dc-name {
          font-size: 13px; font-weight: 600; color: var(--ink);
        }
        .imp-dc-name.anon { font-style: italic; color: var(--ink3); font-weight: 400; }
        .imp-dc-date {
          font-size: 10px; font-weight: 600; color: var(--ink3);
          letter-spacing: 0.04em;
        }
        .imp-dc-amt {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.35rem; font-weight: 600; color: var(--gold);
          line-height: 1;
        }
        .imp-dc-type {
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          color: var(--ink3);
          background: var(--surf2);
          border: 1px solid var(--bdr2);
          padding: 2px 8px; border-radius: 100px;
          display: inline-block; margin-top: 6px;
        }
        .imp-dc-msg {
          font-size: 12px; color: var(--ink2);
          font-style: italic; line-height: 1.5;
          margin-top: 10px; padding-top: 8px;
          border-top: 1px solid var(--bdr);
        }

        /* ── TOAST ── */
        .imp-toast {
          position: fixed; bottom: 1.5rem; left: 50%;
          transform: translateX(-50%) translateY(12px);
          background: var(--surf); color: var(--gold);
          border: 1px solid var(--gold2);
          padding: 0.7rem 1.8rem; border-radius: 100px;
          font-size: 13px; font-weight: 600;
          box-shadow: 0 12px 32px rgba(0,0,0,0.12);
          opacity: 0; transition: all 0.3s; pointer-events: none;
          white-space: nowrap; z-index: 99;
        }
        .imp-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

        /* ── RESPONSIVE ── */
        @media (max-width: 480px) {
          .imp-hero { padding: 6rem 1.2rem 3rem; }
          .imp-don-left { padding: 1.8rem; }
          .imp-levels { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="imp-wrap">

        {/* ── HERO ── */}
        <section className="imp-hero">
          <div className={`imp-hero-inner${heroVis ? " --in" : ""}`}>
            <div className="imp-eyebrow">
              <Heart size={11} /> Make an Impact
            </div>
            <h1 className="imp-hero-title">
              Every rupee is a<br /><em>life touched</em>
            </h1>
            <p className="imp-hero-sub">
              Your generosity directly shapes the future of our children.
              Choose a level, or give freely — every contribution matters.
            </p>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div className="imp-stats-bar" ref={statsReveal.ref}>
          <div className="imp-stats-inner">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className={`imp-stat-item${statsReveal.vis ? " --in" : ""}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="imp-stat-ico"><Icon size={18} /></div>
                  <div>
                    <div className="imp-stat-n">{s.n}</div>
                    <div className="imp-stat-l">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── DONATE SECTION ── */}
        <div
          className={`imp-donate imp-don-reveal${donateReveal.vis ? " --in" : ""}`}
          ref={donateReveal.ref}
        >
          {/* Left: Form */}
          <div className="imp-don-left">
            <div className="imp-sec-label">Choose your impact</div>

            <div className="imp-levels">
              {levels.map((l) => {
                const Icon = l.icon;
                return (
                  <button
                    key={l.val}
                    className={`imp-lv${amt === l.val ? " sel" : ""}`}
                    onClick={() => { setAmt(l.val); setCustom(""); }}
                  >
                    <div className="imp-lv-ico" style={{ background: l.bg, color: l.color }}>
                      <Icon size={16} />
                    </div>
                    <div className="imp-lv-info">
                      <div className="imp-lv-amt">{l.label}</div>
                      <div className="imp-lv-note" style={{ color: l.color }}>{l.note}</div>
                    </div>
                    <div className="imp-lv-dot" />
                  </button>
                );
              })}
            </div>

            <div className="imp-inp-group">
              <label className="imp-inp-label">Custom Amount</label>
              <input
                className="imp-inp"
                type="number"
                placeholder="Enter amount (₹)"
                value={custom}
                onChange={(e) => { setCustom(e.target.value); setAmt("custom"); }}
              />
            </div>
            <div className="imp-inp-group">
              <label className="imp-inp-label">Your Name</label>
              <input
                className="imp-inp"
                type="text"
                placeholder="Anonymous if left empty"
                value={donor}
                onChange={(e) => setDonor(e.target.value)}
              />
            </div>

            <div className="imp-sec-label" style={{ marginTop: "0.5rem" }}>Payment Method</div>
            <div className="imp-methods">
              {["UPI", "Card", "Net Banking"].map((m) => (
                <button
                  key={m}
                  className={`imp-mth${method === m ? " sel" : ""}`}
                  onClick={() => setMethod(m)}
                >{m}</button>
              ))}
            </div>

            <button className="imp-cta" onClick={handleSubmit}>
              Complete Donation <ArrowRight size={14} />
            </button>

            <div className="imp-trust">
              <span className="imp-trust-pill"><Lock size={10} /> Secure</span>
              <span className="imp-trust-pill"><Shield size={10} /> 80G Tax Benefit</span>
              <span className="imp-trust-pill"><Award size={10} /> Govt. Registered</span>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="imp-don-right">
            <div className="imp-preview-card">
              <div className="imp-prev-label">With your gift</div>
              <div className="imp-prev-amt">
                ₹{previewAmt ? previewAmt.toLocaleString("en-IN") : "—"}
              </div>
              <div className="imp-prev-desc">
                {previewAmt
                  ? impacts[closest] || "Making a meaningful difference in a child's life."
                  : "Enter an amount to see your impact."}
              </div>
              <div className="imp-prev-icon-row">
                <div
                  className="imp-prev-icon-badge"
                  style={{ background: selLevel.bg, color: selLevel.color }}
                >
                  {React.createElement(selLevel.icon, { size: 16 })}
                </div>
                <span className="imp-prev-icon-label">{selLevel.note} Program</span>
              </div>
            </div>

            {/* Payment Summary & Dynamic Details */}
            <div className="imp-pay-summary">
              <div className="imp-pay-row">
                <span className="imp-pay-label">Method</span>
                <span className="imp-pay-val">
                  <span className="imp-pay-method-badge">
                    {method === "UPI" && <Shield size={11} />}
                    {method === "Card" && <Lock size={11} />}
                    {method === "Net Banking" && <Award size={11} />}
                    {method}
                  </span>
                </span>
              </div>

              <div className="imp-pay-details-area">
                {method === "UPI" && (
                  <div className="imp-pay-field-wrap">
                    <label className="imp-pay-field-label">UPI ID</label>
                    <input className="imp-pay-input-sm" placeholder="username@upi" />
                  </div>
                )}

                {method === "Card" && (
                  <>
                    <div className="imp-pay-field-wrap">
                      <label className="imp-pay-field-label">Card Number</label>
                      <input className="imp-pay-input-sm" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="imp-pay-cvv-grid">
                      <div className="imp-pay-field-wrap">
                        <label className="imp-pay-field-label">Expiry</label>
                        <input className="imp-pay-input-sm" placeholder="MM/YY" />
                      </div>
                      <div className="imp-pay-field-wrap">
                        <label className="imp-pay-field-label">CVV</label>
                        <input className="imp-pay-input-sm" type="password" placeholder="***" />
                      </div>
                    </div>
                  </>
                )}

                {method === "Net Banking" && (
                  <div className="imp-pay-field-wrap">
                    <label className="imp-pay-field-label">Select Bank</label>
                    <select className="imp-pay-input-sm">
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="imp-pay-row" style={{ marginTop: "0.5rem", borderTop: "1px solid var(--bdr)", paddingTop: "1rem" }}>
                <span className="imp-pay-label">Donor</span>
                <span className="imp-pay-val">{donor || "Anonymous"}</span>
              </div>
              <div className="imp-pay-row">
                <span className="imp-pay-label">Final Amount</span>
                <span className="imp-pay-val" style={{ color: "var(--gold)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem" }}>
                  ₹{previewAmt ? previewAmt.toLocaleString("en-IN") : "—"}
                </span>
              </div>
            </div>

            <div className="imp-mini-stats">
              <div className="imp-mini-stat">
                <div className="imp-mini-stat-n">₹2.4L</div>
                <div className="imp-mini-stat-l">Raised this month</div>
              </div>
              <div className="imp-mini-stat">
                <div className="imp-mini-stat-n">47</div>
                <div className="imp-mini-stat-l">Donors this month</div>
              </div>
            </div>

            <div className="imp-blurb-card">
              <span>
                Every child receives <strong>shelter, care, education, and love</strong>.
                Your contribution reaches the children directly — no administrative leakage.
              </span>
            </div>
          </div>
        </div>

        {/* ── GRATITUDE WALL ── */}
        <div className="imp-wall" ref={wallReveal.ref}>
          <div className="imp-wall-header">
            <h2 className="imp-wall-title">✦ Gratitude Wall</h2>
            <div className="imp-live"><span className="imp-live-dot" /> Live updates</div>
          </div>

          <div className="imp-wall-grid">
            {donors.map((d, i) => (
              <div
                key={i}
                className={`imp-donor-card${wallReveal.vis ? " --in" : ""}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="imp-dc-top">
                  <span className={`imp-dc-name${d.name === "Anonymous" ? " anon" : ""}`}>
                    {d.name}
                  </span>
                  <span className="imp-dc-date">{d.date}</span>
                </div>
                <div className="imp-dc-amt">₹{d.amount.toLocaleString("en-IN")}</div>
                <span className="imp-dc-type">{d.type}</span>
                {d.msg && <div className="imp-dc-msg">"{d.msg}"</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className={`imp-toast${toast.show ? " show" : ""}`}>{toast.msg}</div>
    </>
  );
}