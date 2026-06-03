import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';
import SearchOverlay from './SearchOverlay';

export default function Layout({ children, cars = [] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);

  const logoRow = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
  ];

  return (
    <div className="site">

      {/* ===== HEADER (GLOBAL FIXED) ===== */}
      <header className="header-modern">

        {/* LEFT */}
        <div className="nav-left">
          <a href="tel:1234567890" className="phone">
            <FaPhone />
          </a>

          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
        </div>

        {/* CENTER LOGOS */}
        <div className="logo-center">
          {logoRow.map((l, i) => (
            <img key={i} src={l} className="logo-small" />
          ))}
        </div>

        {/* RIGHT */}
        <div className="nav-right">

          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>

          <button className="icon-btn" onClick={() => setSearchOpen(true)}>
            <FaSearch />
          </button>

          <button className="icon-btn" onClick={() => setMenuOpen(!menuOpen)}>
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
      <main className="page">{children}</main>

      <SearchOverlay cars={cars} isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}