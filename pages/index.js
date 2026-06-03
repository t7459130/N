import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';

import SearchOverlay from '../components/SearchOverlay';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [currentLogoBatch, setCurrentLogoBatch] = useState(0);
  const [currentMobileLogo, setCurrentMobileLogo] = useState(0);

  const menuRef = useRef(null);

  const logoBatches = [
    ['/images/ferrari.png', '/images/lamborghini.png', '/images/rolls.png', '/images/bentley.png'],
    ['/images/aston.png', '/images/pagani.png', '/images/bugatti.png', '/images/mercedes.png'],
  ];

  const allLogos = logoBatches.flat();

  const navLeft = [
    { name: 'Home', link: '/' },
    { name: 'Stock', link: '/Inventory' },
    { name: 'Sell', link: '/Sellyourcar' },
  ];

  const navRight = [
    { name: 'Insights', link: '/NewsAndEvents' },
    { name: 'About', link: '/About' },
    { name: 'Contact', link: '/contact' },
  ];

  /* logo rotation (batch every 3s) */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoBatch((p) => (p + 1) % logoBatches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* mobile logo rotation */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMobileLogo((p) => (p + 1) % allLogos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  /* close menu outside click */
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

      <Head>
        <title>Surrey Supercars</title>
      </Head>

      {/* ================= HEADER ================= */}
      <header className="header">

        {/* LEFT */}
        <div className="header-left">
          <a href="tel:1234567890" className="call-me">
            <FaPhone />
          </a>

          <div className="desktop-nav">
            {navLeft.map((item) => (
              <Link key={item.name} href={item.link}>{item.name}</Link>
            ))}
          </div>
        </div>

        {/* CENTER LOGOS */}
        <div className="logo-bar desktop-logo-bar">
          {logoBatches[currentLogoBatch].map((logo, i) => (
            <img key={i} src={logo} className="desktop-logo" alt="" />
          ))}
        </div>

        {/* RIGHT */}
        <div className="header-icons">

          <div className="desktop-nav">
            {navRight.map((item) => (
              <Link key={item.name} href={item.link}>{item.name}</Link>
            ))}
          </div>

          <button className="search-btn" onClick={() => setIsSearchOpen(true)}>
            <FaSearch />
          </button>

          <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE LOGO */}
        <div className="logo-bar mobile-logo-bar">
          <img src={allLogos[currentMobileLogo]} className="mobile-logo" />
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {[...navLeft, ...navRight].map((item) => (
              <li key={item.name}>
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

      </header>

      {/* ================= BANNER ================= */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" className="banner-image" />
        <div className="banner-text">
          <h1>Surrey Supercars</h1>
          <p>Luxury. Performance. Prestige.</p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="welcome-section">
        <div className="welcome-container">
          <h2>About Us</h2>
          <p>
            We specialise in luxury, supercars and performance vehicles across the UK.
          </p>
        </div>
      </section>

      {/* ================= SOLD ================= */}
      <section className="about-us">
        <h2>Previously Sold</h2>
        <p>Take a look at some of our past luxury vehicle sales.</p>
        <Link href="/sold" className="about-btn">View Sold Cars</Link>
      </section>

      {/* ================= INVENTORY ================= */}
      <section className="latest-arrivals">
        <h2>Latest Inventory</h2>

        <div className="car-listings">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="car-card">
              <img src="/images/carwallpaper.webp" />
              <h3>Example Car {i}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SEARCH ================= */}
      <SearchOverlay
        cars={[]}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <img src="/images/ferrari.png" className="footer-logo-img" />
      </footer>

    </div>
  );
}