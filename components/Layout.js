import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';
import SearchOverlay from './SearchOverlay';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const menuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % mobileLogos.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">

      <header className="site-header">

        {/* LEFT (desktop only + mobile phone icon) */}
        <div className="header-left">
          <a href="tel:+447826456793" className="phone-icon">
            <FaPhone />
          </a>

          <div className="desktop-only nav-links">
            <Link href="/">Home</Link>
            <Link href="/Inventory">Stock</Link>
            <Link href="/Sellyourcar">Sell</Link>
          </div>
        </div>

        {/* CENTER MOBILE LOGO */}
        <div className="header-mobile-logo">
          <img
            src={mobileLogos[currentLogoIndex]}
            alt="Brand logo"
            className="rotating-logo"
          />
        </div>

        {/* DESKTOP CENTER LOGOS */}
        <div className="header-center desktop-logos">
          <div className="logo-box">
            {desktopLogoBatches[Math.floor(currentLogoIndex / 4) % desktopLogoBatches.length].map((logo, i) => (
              <img key={i} src={logo} alt="logo" />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="header-right">

          <button className="icon-btn" onClick={() => setSearchOpen(true)}>
            <FaSearch />
          </button>

          {/* desktop links */}
          <div className="desktop-only nav-links">
            <Link href="/sold">Sold</Link>
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* hamburger (mobile + desktop) */}
          <button className="icon-btn" onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav
          ref={menuRef}
          className={`mobile-menu ${open ? 'open' : ''}`}
        >
          <a href="tel:+447826456793">Call Us</a>
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/sold">Sold</Link>
          <Link href="/Sellyourcar">Sell</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

      </header>

      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <main>{children}</main>
    </div>
  );
}