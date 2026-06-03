import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const menuRef = useRef(null);

  // ✅ EXACT LOGOS YOU WANTED (NO EXTRA FILES)
  const logos = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
    '/images/aston.png',
    '/images/bugatti.png',
    '/images/pagani.png',
    '/images/mercedes.png',
    '/images/porsche.png',
  ];

  // mobile rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setMobileIndex((p) => (p + 1) % logos.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // close menu outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        {/* LEFT NAV */}
        <div className="nav-left">
          <a href="tel:1234567890" className="phone">
            <FaPhone />
          </a>

          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
        </div>

        {/* CENTER LOGOS (DESKTOP) */}
        <div className="logo-bar desktop-only">
          {logos.map((logo, i) => (
            <img key={i} src={logo} className="logo" alt="" />
          ))}
        </div>

        {/* MOBILE LOGO (SINGLE ROTATING) */}
        <div className="mobile-only mobile-logo">
          <img src={logos[mobileIndex]} alt="" />
        </div>

        {/* RIGHT NAV */}
        <div className="nav-right">
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>

          <button className="hamburger" onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`mobile-menu ${open ? 'open' : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

      </header>

      {/* PAGE CONTENT */}
      <main className="page">{children}</main>

      {/* FOOTER */}
      <footer className="footer">
        <p>Luxury Car Dealership</p>
      </footer>

    </div>
  );
}