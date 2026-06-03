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

  // CLOSE MENU ON OUTSIDE CLICK
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // MOBILE LOGO CYCLER
  useEffect(() => {
    const interval = setInterval(() => {
      setMobileLogoIndex((prev) => (prev + 1) % mobileLogos.length);
    }, 2500);

    return () => clearInterval(interval);
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

        {/* CENTER DESKTOP LOGOS */}
        <div className="logo-row desktop-only">
          {logoRow.map((logo, i) => (
            <img key={i} src={logo} className="logo-small" />
          ))}
        </div>

        {/* MOBILE LOGO (FIXED BOX) */}
        <div className="mobile-only mobile-logo">
          <div className="mobile-logo-box">
            <img
              src={mobileLogos[mobileLogoIndex]}
              alt="logo"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="header-right">
          <nav className="nav-right">
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <button
            className="icon-btn"
            onClick={() => setIsSearchOpen(true)}
          >
            <FaSearch />
          </button>

          <button
            className="icon-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav
          ref={menuRef}
          className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}
        >
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
          {logoRow.map((logo, i) => (
            <img key={i} src={logo} className="footer-logo" />
          ))}
        </div>
      </footer>

      {/* SEARCH OVERLAY */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

    </div>
  );
}