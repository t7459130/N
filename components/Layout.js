import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site">

      {/* ================= HEADER ================= */}
      <header className="site-header">

        {/* LEFT */}
        <div className="header-left">
          <a href="tel:1234567890" className="phone">
            <FaPhone />
          </a>

          <nav className="nav-left desktop-only">
            <Link href="/">Home</Link>
            <Link href="/Inventory">Stock</Link>
            <Link href="/Sellyourcar">Sell</Link>
          </nav>
        </div>

        {/* CENTER LOGO (ALWAYS 4 LOGOS DESKTOP) */}
        <div className="logo-box desktop-only">
          <img src="/images/ferrari.png" />
          <img src="/images/lamborghini.png" />
          <img src="/images/rolls.png" />
          <img src="/images/bentley.png" />
        </div>

        {/* RIGHT */}
        <div className="header-right">
          <nav className="nav-right desktop-only">
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE CENTER LOGO (SINGLE SMALL BOX) */}
        <div className="mobile-logo">
          <img src="/images/ferrari.png" />
        </div>

        {/* MOBILE MENU */}
        <nav className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
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
        <div className="footer-logos">
          <img src="/images/ferrari.png" />
          <img src="/images/lamborghini.png" />
          <img src="/images/rolls.png" />
          <img src="/images/bentley.png" />
        </div>
      </footer>

    </div>
  );
}