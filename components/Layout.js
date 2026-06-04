import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';
import SearchOverlay from './SearchOverlay';

export default function Layout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  const desktopLogoBatches = [
    [
      '/images/ferrari.png',
      '/images/lamborghini.png',
      '/images/rolls.png',
      '/images/bentley.png',
    ],
    [
      '/images/aston.png',
      '/images/pagani.png',
      '/images/bugatti.png',
      '/images/mercedes.png',
    ],
  ];

  const mobileLogos = [
    '/images/bentley.png',
    '/images/ferrari.png',
    '/images/aston.png',
    '/images/bugatti.png',
    '/images/pagani.png',
    '/images/porsche.png',
    '/images/mercedes.png',
  ];

  // Rotate logos (mobile + desktop share index)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % mobileLogos.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">

      {/* HEADER */}
      <header className="site-header">

        {/* LEFT - PHONE ONLY */}
        <div className="header-side header-left">
          <a href="tel:+447826456793" className="phone">
            <FaPhone />
            <span className="phone-text">+44 7826 456793</span>
          </a>
        </div>

        {/* CENTER - MOBILE ROTATING LOGO */}
        <div className="header-mobile-logo">
          <img
            src={mobileLogos[currentLogoIndex]}
            alt="Brand logo"
            className="rotating-logo"
          />
        </div>

        {/* DESKTOP CENTER LOGOS */}
        <div className="header-center desktop-only">
          <div className="logo-box">
            {desktopLogoBatches[
              Math.floor(currentLogoIndex / 4) % desktopLogoBatches.length
            ].map((logo, i) => (
              <img key={i} src={logo} alt="logo" />
            ))}
          </div>
        </div>

        {/* RIGHT - DESKTOP NAV ONLY */}
        <div className="header-side header-right desktop-only">
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>

          <button
            className="icon-btn"
            onClick={() => setSearchOpen(true)}
          >
            <FaSearch />
          </button>

          <Link href="/sold">Sold</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

      </header>

      {/* SEARCH */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* PAGE CONTENT */}
      <main>{children}</main>
    </div>
  );
}