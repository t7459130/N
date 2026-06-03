import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';

const allLogos = [
  '/images/ferrari.png',
  '/images/lamborghini.png',
  '/images/rolls.png',
  '/images/bentley.png',
  '/images/aston.png',
  '/images/bugatti.png',
  '/images/mercedes.png',
  '/images/porsche.png'
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoIndex, setLogoIndex] = useState(0);

  const menuRef = useRef(null);

  /* ROTATE ALL LOGOS */
  useEffect(() => {
    const i = setInterval(() => {
      setLogoIndex((p) => (p + 1) % allLogos.length);
    }, 1800);

    return () => clearInterval(i);
  }, []);

  /* CLOSE MENU OUTSIDE CLICK */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="header">

        {/* LEFT */}
        <div className="header-left">
          <a href="tel:1234567890" className="call-me">
            <FaPhone />
          </a>

          <nav className="nav-left">
            <Link href="/">Home</Link>
            <Link href="/Inventory">Stock</Link>
            <Link href="/Sellyourcar">Sell</Link>
          </nav>
        </div>

        {/* CENTER ROTATING LOGO (GLOBAL FIX) */}
        <div className="logo-row">
          <img
            src={allLogos[logoIndex]}
            className="logo-small"
            alt="logo"
          />
        </div>

        {/* RIGHT */}
        <div className="header-right">
          <nav className="nav-right">
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      {/* PAGE CONTENT */}
      <main>{children}</main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-logos">
          {allLogos.map((l, i) => (
            <img key={i} src={l} />
          ))}
        </div>
      </footer>
    </>
  );
}