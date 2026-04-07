import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Heart, Menu, X } from "lucide-react";

export default function Nav({ scrolled }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isLightPage = ["/impact", "/certifications", "/contact", "/albums"].includes(location.pathname);
  const showBackground = scrolled || isLightPage;

  const links = [
    { to: "/", label: "Home" },
    { to: "/#about", label: "About" },
    { to: "/albums", label: "Albums" },
    { to: "/certifications", label: "Certifications" },
    { to: "/contact", label: "Contact" },
  ];

  React.useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  return (
    <nav className={`nav ${showBackground ? "scrolled" : ""}`}>
      <NavLink to="/" className="nav-logo">
        <div className="nav-logo-mark">
           <Home size={20} color="#fff" strokeWidth={2.5} />
        </div>
        <div className="nav-logo-text">
          <span>Eternal Peace</span>
          <span>Mission</span>
        </div>
      </NavLink>
      <div className="nav-actions">
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {links.map((link) => {
            const isHash = link.to.startsWith("/#");
            if (isHash) {
              return (
                <li key={link.to}>
                  <a href={link.to} onClick={() => setIsOpen(false)}>{link.label}</a>
                </li>
              );
            }
            return (
              <li key={link.to}>
                <NavLink 
                  to={link.to} 
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <NavLink to="/impact" className="nav-cta" style={{textDecoration: "none"}}>
          <Heart size={16} fill="#fff" stroke="none" style={{marginRight: 8}} />
          Donate
        </NavLink>
        <button 
          className={`nav-mobile-toggle ${isOpen ? "is-open" : ""}`} 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Toggle menu"
        >
          <div className="nav-toggle-icon">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </div>
        </button>
      </div>
    </nav>
  );
}
