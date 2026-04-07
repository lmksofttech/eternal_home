import React from "react";
import homeImg from "../assets/home.png";
import { useReveal } from "../useReveal";
import { Landmark, Heart, Globe, ShieldCheck } from "lucide-react";

export default function About() {
  useReveal();
  return (
    <section id="about" className="about-section">
      <div className="section-wrap">
        <div className="about-grid">
          <div className="about-img-wrap reveal">
            <div className="about-img">
               <img src={homeImg} alt="About us" loading="lazy" />
            </div>
            <div className="about-chip reveal" style={{transitionDelay:".3s"}}>
              <div className="about-chip-n">247+</div>
              <div className="about-chip-t">Children finding hope under our care.</div>
            </div>
          </div>
          <div className="about-text reveal" style={{transitionDelay:".15s"}}>
            <div className="section-tag">About Eternal Peace Mission</div>
            <h2 className="section-title">A Safe Haven Built on<br />Love &amp; Dignity</h2>
            <p>Founded in 1998, Eternal Peace Mission Children home began as a small shelter for children in Coimbatore. Today, we are a fully accredited, government-recognized orphanage caring for over 247 children aged 0–18 years.</p>
            <p>We believe every child deserves safety, education, and the chance to dream. Our dedicated team of 48 staff members works tirelessly to create a nurturing family environment.</p>
            <div className="about-grid-pills">
              {[
                { icon: <Landmark size={20} color="var(--gold)" />, label:"Government Regd.", sub:"TN/CWC/2001/0047" },
                { icon: <Heart size={20} color="var(--gold)" />, label:"80G Tax Benefit",  sub:"Income Tax Exempted" },
                { icon: <Globe size={20} color="var(--gold)" />, label:"FCRA Approved",    sub:"Foreign Donations" },
                { icon: <ShieldCheck size={20} color="var(--gold)" />, label:"NGO Darpan",       sub:"Verified NITI Aayog ID" },
              ].map((p,i) => (
                <div className="pill-item" key={i}>
                  <div className="pill-icon">{p.icon}</div>
                  <div>
                    <span className="pill-label">{p.label}</span>
                    <span className="pill-sub">{p.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
