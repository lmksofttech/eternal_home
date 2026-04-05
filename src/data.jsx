import React from 'react';
import { 
  GraduationCap, Heart, Users, Landmark, FileText, Globe, ShieldCheck, User
} from "lucide-react";

export const donors = [
  { name: "Rajesh Kumar",       amount: 25000,  type: "Online",  date: "Dec 28, 2024", msg: "Keep up the wonderful work! 🙏" },
  { name: "Anonymous",          amount: 10000,  type: "UPI",     date: "Dec 27, 2024", msg: "For the children's education" },
  { name: "Priya Suresh",       amount: 5000,   type: "Card",    date: "Dec 26, 2024", msg: "Monthly sponsor — God bless all" },
  { name: "Infosys CSR",        amount: 100000, type: "NEFT",    date: "Dec 24, 2024", msg: "Corporate donation — Merry Christmas!" },
  { name: "Meenakshi Rajan",    amount: 3000,   type: "UPI",     date: "Dec 22, 2024", msg: "In memory of my father" },
  { name: "Suresh & Family",    amount: 15000,  type: "Cheque",  date: "Dec 20, 2024", msg: "Birthday celebration donation" },
  { name: "Anonymous",          amount: 2000,   type: "UPI",     date: "Dec 18, 2024", msg: "" },
  { name: "Dr. Kavitha M.",     amount: 8000,   type: "Card",    date: "Dec 15, 2024", msg: "Supporting healthcare for children" },
  { name: "Raman Enterprises",  amount: 50000,  type: "NEFT",    date: "Dec 12, 2024", msg: "Annual CSR commitment" },
  { name: "Lakshmi Narayanan",  amount: 1500,   type: "UPI",     date: "Dec 10, 2024", msg: "Small contribution, big love ❤️" },
  { name: "Anonymous",          amount: 500,    type: "UPI",     date: "Dec 8, 2024",  msg: "" },
  { name: "Vijay & Shanthi",    amount: 12000,  type: "Card",    date: "Dec 5, 2024",  msg: "Silver anniversary donation" },
];

export const programs = [
  { icon: <GraduationCap size={24} />, title:"Education & Mentorship",    desc:"Empowering every child with quality schooling and specialized tutoring to build a foundational future of independence." },
  { icon: <Heart size={24} />, title:"Health & Holistic Care",     desc:"Providing round-the-clock medical attention, balanced nutrition, and compassionate psychological support for every child." },
  { icon: <Users size={24} />, title:"Vocational Growth", desc:"Equipping our older children with life skills and professional training to ensure a graceful transition into adulthood." },
];

export const namesList = [
  { name:"Infosys CSR", big:true }, { name:"Raman Enterprises", big:true },
  { name:"Rajesh Kumar" }, { name:"Dr. Kavitha M." }, { name:"Priya Suresh" },
  { name:"Meenakshi Rajan" }, { name:"Suresh & Family" }, { name:"Vijay & Shanthi" },
  { name:"Lakshmi Narayanan" }, { name:"Our Generous Donors" }, { name:"You", big:true, icon: <Heart size={16} style={{ marginLeft: 6, fill: 'var(--gold2)', stroke:'none' }} /> },
];

export const marqueeItems = ["26 Years of Hope", "100% Transparency", "Verified NGO", "80G Tax Benefit", "Donate Now", "Safe Haven", "Family For All"];

export const storiesData = [
  { name: "Rahul", cls: "s1", role: "Graduate, Engineering", quote: "Eternal Peace Mission Children home didn't just give me a home; they gave me a vision. Today, I stand as an engineer, ready to give back.", img: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&q=80&w=600" },
  { name: "Priya", cls: "s2", role: "Classical Dancer", quote: "In the quiet halls of our home, I found my rhythm. The support here turned my passion for dance into a lifelong career.", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600" },
  { name: "Arjun", cls: "s3", role: "State Athlete", quote: "They saw strength in me when I saw none. Through their belief, I earned my place on the track and in life.", img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=600" },
];

export const certsData = [
  { cls:"c1", icon: <Landmark size={40} />, name:"Society Registration", org:"Tamil Nadu Government", detail:"Reg. No: TN/CWC/2001/0047. Official recognition as a children's home since 2001.", badge:"Verified Society" },
  { cls:"c2", icon: <FileText size={40} />, name:"80G Tax Exemption",    org:"Income Tax Dept of India", detail:"All donations eligible for tax benefits under section 80G. PAN: AAAAA1234B.", badge:"Tax Deductible" },
  { cls:"c3", icon: <Globe size={40} />, name:"FCRA Registration",    org:"Ministry of Home Affairs", detail:"Licensed to accept international donations and foreign contributions safely.", badge:"FCRA Approved" },
];
