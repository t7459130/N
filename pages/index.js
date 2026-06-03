import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';

import SearchOverlay from '../components/SearchOverlay';
import { AdminProvider } from '../components/AdminContext';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef(null);

  const logoBatches = [
    ['/images/ferrari.png', '/images/lamborghini.png', '/images/rolls.png', '/images/bentley.png'],
  ];

  const [logoIndex, setLogoIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setLogoIndex((p) => (p + 1) % logoBatches[0].length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="app">

      <Head>
        <title>Car Dealership</title>
      </Head>

      {/* HEADER GRID */}
      <header className="header">

        {/* LEFT */}
        <div className="header-left">
          <a href="tel:1234567890" className="call-me">
            <FaPhone />
          </a>
        </div>

        {/* CENTER LOGOS (ONLY THIS IS CENTERED) */}
        <div className="logo-bar">
          <img
            src={logoBatches[0][logoIndex]}
            className="desktop-logo"
            alt=""
          />
        </div>

        {/* RIGHT */}
        <div className="header-right">
          <nav className="desktop-nav">
            <Link href="/">Home</Link>
            <Link href="/Inventory">Stock</Link>
            <Link href="/Sellyourcar">Sell</Link>
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <button className="search-btn" onClick={() => setIsSearchOpen(true)}>
            <FaSearch />
          </button>

          <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/Inventory">Stock</Link></li>
            <li><Link href="/Sellyourcar">Sell</Link></li>
            <li><Link href="/NewsAndEvents">Insights</Link></li>
            <li><Link href="/About">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <SearchOverlay
          cars={[]}
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

      </header>

      {/* BANNER */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" className="banner-image" />
        <div className="banner-text">
          <h1>Luxury Cars. Premium Service.</h1>
        </div>
      </section>

    </div>
  );
}

export default function Home() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}