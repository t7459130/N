import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';
import SearchOverlay from './SearchOverlay';

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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

  const [logoIndex, setLogoIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setLogoIndex((p) => (p + 1) % mobileLogos.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

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
    <div className="app">

      <header className="site-header">

        {/* LEFT */}
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
          {logoRow.map((l, i) => (
            <img key={i} src={l} alt="" />
          ))}
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <Link href="/sold">Sold</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>

          <button onClick={() => setSearchOpen(true)} className="icon-btn">
            <FaSearch />
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="icon-btn">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE LOGO */}
        <div className="mobile-logo">
          <img src={mobileLogos[logoIndex]} alt="" />
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
          <Link href="/sold">Sold</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

      </header>

      <main className="page">{children}</main>

      <footer className="footer">
        <div className="footer-logos">
          {logoRow.map((l, i) => (
            <img key={i} src={l} alt="" />
          ))}
        </div>
      </footer>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}