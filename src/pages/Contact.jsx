import React from "react";
import { useReveal } from "../useReveal";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Contact() {
  useReveal();
  return (
    <section id="contact" className="contact-section" style={{minHeight:"100vh", display:'flex', alignItems:'center'}}>
      <div className="section-wrap">
        <div className="contact-grid">
          <div className="reveal">
            <div className="section-tag">Get in Touch</div>
            <h2 className="section-title">We'd Love to<br />Hear From You</h2>
            <p style={{color:"var(--muted)",marginBottom:"3rem"}}>Whether you wish to donate, volunteer, or visit — reach out anytime.</p>
            {[
              { ico: <MapPin size={24} color="var(--gold2)" />, label:"Our Home",      text:"No. 14, Gandhi Nagar, R.S. Puram,\nCoimbatore – 641 002" },
              { ico: <Phone size={24} color="var(--gold2)" />, label:"Phone Support", text:"+91 98421 55678" },
              { ico: <Mail size={24} color="var(--gold2)" />, label:"Mail Us",       text:"care@epmhome.org" },
            ].map((c,i) => (
              <div className="c-item" key={i}>
                <div className="c-ico">{c.ico}</div>
                <div>
                  <div className="c-label">{c.label}</div>
                  <div className="c-text" style={{whiteSpace:"pre-line"}}>{c.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{transitionDelay:".2s"}}>
            <div className="contact-form">
              {[
                { label:"Your Name",      type:"text",  ph:"e.g. John Doe" },
                { label:"Email Address",  type:"email", ph:"john@example.com" },
              ].map((f,i) => (
                <div className="f-group" key={i}>
                  <label className="f-label">{f.label}</label>
                  <input className="f-input" type={f.type} placeholder={f.ph} />
                </div>
              ))}
              <div className="f-group">
                <label className="f-label">How can we help?</label>
                <textarea className="f-input" rows={4} placeholder="Your message here..." style={{resize:"vertical"}} />
              </div>
              <button className="btn-gold" style={{width:"100%",justifyContent:"center"}} onClick={()=>{}}>
                Send Message <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
