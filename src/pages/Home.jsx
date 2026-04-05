import React from "react";
import heroImg from "../assets/hero.png";
import { useReveal } from "../useReveal";
import { Heart, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import { marqueeItems } from "../data.jsx";

// Section Components
import About from "./About";
import Programs from "./Programs";
import Stories from "./Stories";

function Marquee() {
  const double = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee-strip">
      <div className="marquee-inner">
        {double.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot"></span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  useReveal();
  return (
    <>
      <section id="home" className="hero">
        <img src={heroImg} className="hero-bg-img" alt="Background" />
        <div className="hero-noise"></div>
        <div className="hero-glow"></div>
        <div className="hero-line-deco"></div>
        <div className="hero-inner">
          <div className="reveal">
            <div className="hero-eyebrow">✦ Registered Charity · Coimbatore, TN</div>
            <h1 className="hero-title">
              Every Child Deserves<br />
              a Place to <em>Call Home</em>
            </h1>
            <p className="hero-desc">
              Eternal Peace Mission Children home is a registered charitable orphanage providing shelter, education,
              healthcare, and unconditional love to children in need since 1998.
            </p>
            <div className="hero-btns">
              <Link to="/impact" className="btn-gold">
                 <Heart size={18} fill="#fff" stroke="none" />
                 Make an Impact
              </Link>
              <a href="#about" className="btn-ghost">
                 <Navigation size={18} />
                 Our Mission
              </a>
            </div>
            <div className="hero-stats">
              <div><div className="hero-stat-n">247+</div><div className="hero-stat-l">Children Sheltered</div></div>
              <div><div className="hero-stat-n">26+</div><div className="hero-stat-l">Years of Grace</div></div>
              <div><div className="hero-stat-n">100%</div><div className="hero-stat-l">Transparency</div></div>
            </div>
          </div>
        </div>
      </section>
      <Marquee />
      <About />
      <Programs />
      <Stories />
    </>
  );
}
