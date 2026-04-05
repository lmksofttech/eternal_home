import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, Heart } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "Our Story" },
    { to: "/programs", label: "Programs" },
    { to: "/stories", label: "Impact" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="footer">
      <div className="section-wrap">
        <div className="footer-grid">
          <div className="reveal">
            <div className="footer-logo">Eternal Peace Mission</div>
            <p className="footer-desc">A sanctuary of love and hope in Coimbatore, dedicated to empowering children with education and dignity since 1998.</p>
            <div className="socials">
              {[
                { ico: <Facebook size={18} />, link: "#" },
                { ico: <Instagram size={18} />, link: "#" },
                { ico: <Youtube size={18} />, link: "#" },
              ].map((s, idx) => (
                <a href={s.link} key={idx} className="social-btn">{s.ico}</a>
              ))}
            </div>
          </div>
          <div className="reveal" style={{transitionDelay:".1s"}}>
            <div className="footer-heading">Quick Links</div>
            <ul className="footer-ul">
              {quickLinks.map((link) => (
                <li key={link.label}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="reveal" style={{transitionDelay:".3s"}}>
            <div className="footer-heading">Contact</div>
            <ul className="footer-ul" style={{color:"rgba(255,255,255,0.35)"}}>
              <li style={{marginBottom:"1rem", display:'flex', alignItems:'center', gap: 10}}>
                <Phone size={14} color="var(--gold)" /> +91 98421 55678
              </li>
              <li style={{marginBottom:"1rem", display:'flex', alignItems:'center', gap: 10}}>
                <Mail size={14} color="var(--gold)" /> care@epmhome.org
              </li>
              <li style={{lineHeight:"1.65", display:'flex', alignItems:'flex-start', gap: 10}}>
                <MapPin size={14} color="var(--gold)" style={{marginTop: 4}} /> 
                <span>RS Puram, Coimbatore,<br/>Tamil Nadu – 641002</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2024 Eternal Peace Mission Children home. Registered NGO.</div>
          <div>Crafted with <Heart size={12} fill="var(--gold)" stroke="none" /> For Our Children</div>
        </div>
      </div>
    </footer>
  );
}
