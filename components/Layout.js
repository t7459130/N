import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';
import SearchOverlay from './SearchOverlay';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileLogoIndex, setMobileLogoIndex] = useState(0);

  const menuRef = useRef(null);

  const logoRow = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
  ];

  const mobileLogos = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
    '/images/aston.png',
    '/images/bugatti.png',
  ];

  /* CLOSE MENU OUTSIDE CLICK */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* MOBILE LOGO ROTATION */
  useEffect(() => {
    const i = setInterval(() => {
      setMobileLogoIndex((p) => (p + 1) % mobileLogos.length);
    }, 2500);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="app">

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

        {/* CENTER LOGOS (DESKTOP) */}
        <div className="logo-row desktop-only">
          {logoRow.map((logo, i) => (
            <img key={i} src={logo} className="logo-small" />
          ))}
        </div>

        {/* MOBILE LOGO */}
        <div className="mobile-only mobile-logo">
          <img src={mobileLogos[mobileLogoIndex]} alt="logo" />
        </div>

        {/* RIGHT */}
        <div className="header-right">
          <nav className="nav-right">
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <button onClick={() => setIsSearchOpen(true)}>
            <FaSearch />
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main>{children}</main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-logos">
          {logoRow.map((l, i) => (
            <img key={i} src={l} />
          ))}
        </div>
      </footer>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

    </div>
  );
}