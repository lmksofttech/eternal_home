import React from "react";
import { storiesData } from "../data.jsx";
import { useReveal } from "../useReveal";

export default function Stories() {
  useReveal();
  return (
    <section id="stories" className="stories-section" style={{minHeight:"100vh", display:'flex', alignItems:'center'}}>
      <div className="section-wrap">
        <div style={{textAlign:"center"}} className="reveal">
          <div className="section-tag" style={{justifyContent:"center"}}>Hope in Action</div>
          <h2 className="section-title">Stories That Inspire</h2>
          <p className="section-sub">Behind every donation is a child whose life was transformed.</p>
        </div>
        <div className="story-grid">
          {storiesData.map((s,i) => (
            <div className="story-card reveal" key={i} style={{transitionDelay:`${i*.15}s`}}>
              <div className="story-img">
                <img src={s.img} alt={s.name} />
              </div>
              <div className="story-body">
                <div className="story-name">{s.name}</div>
                <span className="story-role">{s.role}</span>
                <p className="story-quote">“{s.quote}”</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
