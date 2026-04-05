import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

// Components
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Stories from "./pages/Stories";
import Impact from "./pages/Impact";
import Certifications from "./pages/Certifications";
import Contact from "./pages/Contact";
import Albums from "./pages/Albums";

// ── ScrollToTop helper ──────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-root">
        <Nav scrolled={scrolled} />
        
        <main className="main-content">
          <Routes>
            <Route path="/"               element={<Home />} />
            <Route path="/impact"         element={<Impact />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/contact"        element={<Contact />} />
            <Route path="/albums"         element={<Albums />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
