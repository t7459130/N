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

  const mobileLogo = '/images/ferrari.png';

  return (
    <div className="site">

      {/* HEADER */}
      <header className="header">

        {/* LEFT */}
        <div className="header-left">
          <a href="tel:1234567890" className="phone">
            <FaPhone />
          </a>

          <nav className="nav-left">
            <Link href="/">Home</Link>
            <Link href="/Inventory">Stock</Link>
            <Link href="/Sellyourcar">Sell</Link>
          </nav>
        </div>

        {/* CENTER LOGOS */}
        <div className="logo-row">
          {logoRow.map((l, i) => (
            <img key={i} src={l} className="logo" />
          ))}
        </div>

        {/* RIGHT */}
        <div className="header-right">
          <nav className="nav-right">
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <button onClick={() => setSearchOpen(true)} className="icon-btn">
            <FaSearch />
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="icon-btn">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE LOGO */}
        <div className="mobile-logo">
          <img src={mobileLogo} />
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

      {/* SEARCH */}
      <SearchOverlay cars={cars} isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}