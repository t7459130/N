import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';
import SearchOverlay from './SearchOverlay';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [logoIndex, setLogoIndex] = useState(0);

  const menuRef = useRef(null);

  const logoRow = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
  ];

  const allLogos = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
    '/images/aston.png',
    '/images/bugatti.png',
    '/images/mercedes.png',
    '/images/pagani.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((p) => (p + 1) % allLogos.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="app">

      {/* HEADER */}
      <header className="site-header">

        {/* LEFT NAV */}
        <div className="nav-left">
          <a href="tel:07777777777" className="phone">
            <FaPhone />
          </a>

          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
        </div>

        {/* CENTER LOGOS (DESKTOP) */}
        <div className="logo-box">
          {logoRow.map((logo, i) => (
            <img key={i} src={logo} alt="logo" />
          ))}
        </div>

        {/* RIGHT NAV */}
        <div className="nav-right">
          <Link href="/sold">Sold</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>

          <button className="hamburger" onClick={() => setIsSearchOpen(true)}>
            <FaSearch />
          </button>

          <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE LOGO (ONLY ONE SMALL CENTERED) */}
        <div className="mobile-logo">
          <img src={allLogos[logoIndex]} alt="logo" />
        </div>

        {/* MOBILE MENU */}
        <nav
          ref={menuRef}
          className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
        >
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
          <Link href="/sold">Sold</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

      </header>

      {/* PAGE CONTENT */}
      <main className="page">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logos">
          {allLogos.map((logo, i) => (
            <img key={i} src={logo} alt="logo" />
          ))}
        </div>
      </footer>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

    </div>
  );
}