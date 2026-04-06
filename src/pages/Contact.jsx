import React from "react";
import { useReveal } from "../useReveal";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Contact() {
  useReveal();
  return (
    <section id="contact" className="contact-section">
      <div className="section-wrap">
        <div className="contact-flex-container">
          <div className="contact-header-wrap reveal">
            <div className="section-tag">Get in Touch</div>
            <h2 className="section-title">We'd Love to<br />Hear From You</h2>
            <p className="contact-subtext">Whether you wish to donate, volunteer, or visit — reach out anytime through any of these channels.</p>
          </div>

          <div className="contact-main-grid">
            <div className="contact-form-side reveal" style={{transitionDelay:".2s"}}>
              <div className="contact-form-card">
                <div className="form-header">
                  <h3>Send a Message</h3>
                  <p>We usually respond within 24 hours</p>
                </div>
                <div className="form-body">
                  {[
                    { label:"Your Name", type:"text", ph:"e.g. John Doe" },
                    { label:"Email Address", type:"email", ph:"john@example.com" },
                  ].map((f, i) => (
                    <div className="f-group" key={i}>
                      <label className="f-label">{f.label}</label>
                      <input className="f-input" type={f.type} placeholder={f.ph} />
                    </div>
                  ))}
                  <div className="f-group">
                    <label className="f-label">How can we help?</label>
                    <textarea className="f-input" rows={4} placeholder="Your message here..." style={{resize:"none"}} />
                  </div>
                  <button className="btn-gold contact-submit-btn">
                    <span>Send Message</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="contact-info-side reveal" style={{transitionDelay:".3s"}}>
              <div className="contact-items-list">
                {[
                  { ico: <MapPin size={22} />, label:"Our Home", text:"No. 14, Gandhi Nagar, R.S. Puram, Coimbatore – 641 002" },
                  { ico: <Phone size={22} />, label:"Phone Support", text:"+91 98421 55678" },
                  { ico: <Mail size={22} />, label:"Mail Us", text:"care@epmhome.org" },
                ].map((c, i) => (
                  <div className="c-item" key={i}>
                    <div className="c-ico-wrap">
                      <div className="c-ico">{c.ico}</div>
                    </div>
                    <div className="c-content">
                      <div className="c-label">{c.label}</div>
                      <div className="c-text">{c.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
