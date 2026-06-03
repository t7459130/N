import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [mobileLogoIndex, setMobileLogoIndex] = useState(0);

  const menuRef = useRef(null);

  const desktopLogos = [
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
    '/images/mercedes.png',
    '/images/porsche.png',
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileLogoIndex((prev) => (prev + 1) % mobileLogos.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">

      <header className="site-header">

        {/* LEFT */}

        <div className="header-side header-left">
          <a href="tel:1234567890" className="phone">
            <FaPhone />
          </a>

          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
        </div>

        {/* CENTER */}

        <div className="header-center">

          <div className="logo-box desktop-logos">
            {desktopLogos.map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt=""
              />
            ))}
          </div>

          <div className="mobile-logo">
            <img
              src={mobileLogos[mobileLogoIndex]}
              alt=""
            />
          </div>

        </div>

        {/* RIGHT */}

        <div className="header-side header-right">
          <Link href="/sold">Sold</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>

          <button
            className="icon-btn"
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
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

      <main className="page">
        {children}
      </main>

    </div>
  );
}