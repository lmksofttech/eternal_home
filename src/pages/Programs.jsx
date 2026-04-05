import React from "react";
import { programs } from "../data.jsx";
import { useReveal } from "../useReveal";

export default function Programs() {
  useReveal();
  return (
    <section id="programs" className="programs-section" style={{minHeight:"100vh", display:'flex', alignItems:'center'}}>
      <div className="section-wrap" style={{position:"relative",zIndex:2}}>
        <div className="section-header reveal" style={{textAlign:"center",marginBottom:"0"}}>
          <div className="section-tag" style={{justifyContent:"center"}}>Our Programs</div>
          <h2 className="section-title" style={{color:"#fff", margin: "0 auto 1.5rem"}}>Wholistic Care &amp; Growth</h2>
          <p className="section-sub" style={{color: "rgba(255,255,255,0.4)"}}>Comprehensive support designed to nurture every aspect of a child's development.</p>
        </div>
        <div className="prog-grid" style={{marginTop:"3rem"}}>
          {programs.map((p, i) => (
            <div className="prog-card reveal" key={i} style={{transitionDelay:`${i*.07}s`}}>
              <div className="prog-ico" style={{ color: 'var(--gold2)' }}>{p.icon}</div>
              <div className="prog-title">{p.title}</div>
              <p className="prog-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
