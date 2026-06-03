import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

  const menuRef = useRef(null);

  const logoBatches = [
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

  /* CLOSE MENU ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* LOGO ROTATION */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatchIndex((prev) => (prev + 1) % logoBatches.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">

      {/* HEADER */}
      <header className="site-header">

        {/* LEFT SIDE */}
        <div className="header-side header-left">

          {/* CALL BUTTON */}
          <a href="tel:+447826456793" className="phone">
            <FaPhone />
            <span className="phone-text">+44 7826 456793</span>
          </a>

          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
        </div>

        {/* CENTER LOGOS */}
        <div className="header-center">
          <div className="logo-box desktop-logos">
            {logoBatches[currentBatchIndex].map((logo, i) => (
              <img key={i} src={logo} alt="" />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="header-side header-right">
          <Link href="/sold">Sold</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>

          <button className="icon-btn" onClick={() => setOpen(!open)}>
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

      {/* PAGE CONTENT */}
      <main>
        {children}
      </main>

    </div>
  );
}