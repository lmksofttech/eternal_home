import React, { useState } from "react";
import { useReveal } from "../useReveal.js";
import { Camera, Trophy, Users, Home as HomeIcon, X } from "lucide-react";

// Images
import sports1 from "../assets/sports-1.png";
import meeting1 from "../assets/meeting-1.png";
import home1 from "../assets/home.png";
import home2 from "../assets/home-2.jpeg";
import aboutImg from "../assets/about.png";

const albums = [
  {
    id: "sports",
    title: "Sports & Athletics",
    icon: <Trophy size={20} />,
    desc: "Nurturing physical health and team spirit through regular sports activities.",
    images: [
      { src: sports1, title: "Volleyball Tournament" },
      { src: home2, title: "Evening Football" },
      { src: sports1, title: "Annual Sports Day" },
      { src: home2, title: "Track Practice" },
    ]
  },
  {
    id: "home",
    title: "Our Home Life",
    icon: <HomeIcon size={20} />,
    desc: "A glimpse into the daily life, study time, and joyful moments at Eternal Peace Mission.",
    images: [
      { src: home1, title: "Main Building" },
      { src: aboutImg, title: "Our Study Room" },
      { src: home2, title: "Garden Area" },
      { src: home1, title: "Dining Hall" },
    ]
  },
  {
    id: "meetings",
    title: "Meetings & Events",
    icon: <Users size={20} />,
    desc: "Collaborations with volunteers, donors, and official mission gatherings.",
    images: [
      { src: meeting1, title: "Founder Meeting" },
      { src: aboutImg, title: "Volunteer Workshop" },
      { src: meeting1, title: "Monthly Review" },
      { src: aboutImg, title: "Donor Visit" },
    ]
  }
];

export default function Albums() {
  const [selectedImg, setSelectedImg] = useState(null);
  useReveal();

  return (
    <main className="albums-page">
      {/* Hero */}
      <section className="ip-hero" style={{paddingTop: '9rem'}}>
        <div className="ip-eyebrow">Visual Journey · Eternal Peace Mission</div>
        <h1 className="ip-h1">Memory <em>Albums</em></h1>
        <p className="ip-sub">Experience the stories of joy, growth, and togetherness that define our mission every day.</p>
      </section>

      <div className="ip-divider">
        <div className="ip-divider-line" />
        <div className="ip-divider-diamond" />
        <div className="ip-divider-line" />
      </div>

      <div className="section-wrap" style={{paddingBottom: '8rem'}}>
        {albums.map((album, idx) => (
          <div key={album.id} className="album-group reveal" style={{marginBottom: '5rem', transitionDelay: `${idx * 0.15}s`}}>
            <div className="album-header">
              <div className="album-title-row">
                <div className="album-ico-box">{album.icon}</div>
                <h2 className="album-heading">{album.title}</h2>
              </div>
              <p className="album-desc">{album.desc}</p>
            </div>

            <div className="album-grid">
              {album.images.map((img, i) => (
                <div 
                  key={i} 
                  className="album-card" 
                  onClick={() => setSelectedImg(img)}
                >
                  <div className="album-img-wrap">
                    <img src={img.src} alt={img.title} loading="lazy" />
                    <div className="album-overlay">
                      <div className="album-zoom-ico"><Camera size={20} /></div>
                      <span>{img.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div className="lb-overlay" onClick={() => setSelectedImg(null)}>
          <div className="lb-box" style={{padding:0, background:'transparent', maxWidth:'1200px'}}>
            <button className="lb-close" style={{top:'-50px', color:'#fff', background:'rgba(255,255,255,0.1)'}} onClick={() => setSelectedImg(null)}>
              <X size={24} />
            </button>
            <img src={selectedImg.src} style={{width:'100%', borderRadius:'12px', boxShadow:'0 40px 100px rgba(0,0,0,0.5)'}} alt={selectedImg.title} loading="lazy" />
            <div style={{color:'#fff', textAlign:'center', marginTop:'1.5rem', fontFamily:'Cormorant Garamond, serif', fontSize:'1.8rem'}}>{selectedImg.title}</div>
          </div>
        </div>
      )}
    </main>
  );
}
