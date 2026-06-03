import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';

import { AdminProvider } from '../components/AdminContext';
import SearchOverlay from '../components/SearchOverlay';

function HomeContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [logoIndex, setLogoIndex] = useState(0);

  const menuRef = useRef(null);

  const logos = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
  ];

  const footerLogos = logos;

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((p) => (p + 1) % logos.length);
    }, 2500);

    return () => clearInterval(interval);
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
        <title>Home</title>
      </Head>

      {/* HEADER */}
      <header className="header">

        {/* LEFT */}
        <div className="header-left">
          <a href="tel:1234567890" className="call-me">
            <FaPhone />
          </a>

          <nav className="nav-left">
            <Link href="/">Home</Link>
            <Link href="/Inventory">Stock</Link>
            <Link href="/Sellyourcar">Sell</Link>
          </nav>
        </div>

        {/* CENTER LOGO CAROUSEL */}
        <div className="logo-bar">
          <img src={logos[logoIndex]} className="logo" alt="logo" />
        </div>

        {/* RIGHT */}
        <div className="header-right">

          <nav className="nav-right">
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <button className="icon-btn" onClick={() => setIsSearchOpen(true)}>
            <FaSearch />
          </button>

          <button className="icon-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

      </header>

      {/* BANNER */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" className="banner-img" />
        <div className="banner-text">
          <h1>Luxury Cars</h1>
          <p>Premium vehicles. Premium service.</p>
        </div>
      </section>

      {/* HOME SECTIONS */}
      <section className="home-grid">

        <div className="home-card">
          <h2>About Us</h2>
          <p>Luxury dealership based in Surrey.</p>
          <Link href="/About">Read More</Link>
        </div>

        <div className="home-card">
          <h2>Sold Vehicles</h2>
          <p>View our previously sold cars.</p>
          <Link href="/sold">View Sold</Link>
        </div>

        <div className="home-card">
          <h2>Inventory</h2>
          <p>Browse current stock.</p>
          <Link href="/Inventory">View Stock</Link>
        </div>

      </section>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* FOOTER */}
      <footer className="footer">
        <img src={footerLogos[logoIndex]} className="footer-logo" />
      </footer>

    </div>
  );
}

export default function Home() {
  return (
    <AdminProvider>
      <HomeContent />
    </AdminProvider>
  );
}