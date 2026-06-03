import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';

import { AdminProvider } from '../components/AdminContext';
import SearchOverlay from '../components/SearchOverlay';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef(null);

  const logoBatches = [
    ['/images/ferrari.png', '/images/lamborghini.png', '/images/rolls.png', '/images/bentley.png'],
    ['/images/aston.png', '/images/pagani.png', '/images/bugatti.png', '/images/mercedes.png'],
  ];

  const [batchIndex, setBatchIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setBatchIndex((p) => (p + 1) % logoBatches.length);
    }, 3000);
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

      {/* HEADER */}
      <header className="header">

        {/* LEFT */}
        <div className="header-left">
          <a href="tel:1234567890" className="call-me">
            <FaPhone />
          </a>
        </div>

        {/* CENTER LOGO ROW (4 LOGOS) */}
        <div className="logo-bar">
          {logoBatches[batchIndex].map((logo, i) => (
            <img key={i} src={logo} className="desktop-logo" />
          ))}
        </div>

        {/* RIGHT NAV */}
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

        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} cars={[]} />
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