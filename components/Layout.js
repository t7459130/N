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

        {/* TOP BAR */}
        <div className="header-top">

          <div className="header-left">
            <a href="tel:+447826456793" className="phone">
              <FaPhone />
              <span className="phone-text">+44 7826 456793</span>
            </a>

            <Link href="/">Home</Link>
            <Link href="/Inventory">Stock</Link>
            <Link href="/Sellyourcar">Sell</Link>
          </div>

          <div className="header-right">
            <button className="icon-btn" onClick={() => setSearchOpen(true)}>
              <FaSearch />
            </button>

            <button className="icon-btn" onClick={() => setOpen(!open)}>
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>

        </div>

        {/* LOGO ROW */}
        <div className="header-logo-row">

          <div className="header-mobile-logo">
            <img
              src={mobileLogos[currentLogoIndex]}
              alt="Brand logo"
              className="rotating-logo"
            />
          </div>

          <div className="header-center desktop-logos">
            <div className="logo-box">
              {desktopLogoBatches[
                Math.floor(currentLogoIndex / 4) % desktopLogoBatches.length
              ].map((logo, i) => (
                <img key={i} src={logo} alt="logo" />
              ))}
            </div>
          </div>

        </div>

        {/* MOBILE MENU */}
        <nav
          ref={menuRef}
          className={`mobile-menu ${open ? 'open' : ''}`}
        >
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