import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Heart } from "lucide-react";

export default function Nav({ scrolled }) {
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

  return (
    <nav className={`nav ${showBackground ? "scrolled" : ""}`}>
      <NavLink to="/" className="nav-logo">
        <div className="nav-logo-mark">
           <Home size={20} color="#fff" strokeWidth={2.5} />
        </div>
        Eternal Peace Mission
      </NavLink>
      <ul className="nav-links">
        {links.map((link) => {
          const isHash = link.to.startsWith("/#");
          if (isHash) {
            return (
              <li key={link.to}>
                <a href={link.to}>{link.label}</a>
              </li>
            );
          }
          return (
            <li key={link.to}>
              <NavLink to={link.to} className={({ isActive }) => (isActive ? "active" : "")}>
                {link.label}
              </NavLink>
            </li>
          );
        })}
        <li>
          <NavLink to="/impact" className="nav-cta">
            <Heart size={16} fill="#fff" stroke="none" style={{marginRight: 8}} />
            Donate
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
