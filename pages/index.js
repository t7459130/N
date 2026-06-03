import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

import { AdminProvider } from '../components/AdminContext';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [currentFooterLogoIndex, setCurrentFooterLogoIndex] = useState(0);

  const menuRef = useRef(null);

  const logoBatches = [
    ['/images/ferrari.png', '/images/lamborghini.png', '/images/rolls.png', '/images/bentley.png'],
    ['/images/aston.png', '/images/pagani.png', '/images/bugatti.png', '/images/mercedes.png'],
  ];

  const footerLogos = [
    '/images/lamborghini.png',
    '/images/ferrari.png',
    '/images/porsche.png',
    '/images/pagani.png',
    '/images/mercedes.png',
    '/images/aston.png',
    '/images/bugatti.png',
    '/images/bentley.png',
    '/images/rolls.png',
  ];

  /* CLOSE MENU OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* LOGO ROTATION */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatchIndex((p) => (p + 1) % logoBatches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFooterLogoIndex((p) => (p + 1) % footerLogos.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">

      <Head>
        <title>Car Dealership</title>
      </Head>

      {/* ================= HEADER ================= */}
      <header className="header">

        {/* LEFT NAV */}
        <div className="nav-left">
          <Link href="/">Home</Link>
          <Link href="/Inventory">Current Stock</Link>
          <Link href="/Sellyourcar">Sell Your Car</Link>
        </div>

        {/* CENTER LOGOS */}
        <div className="logo-bar">
          {logoBatches[currentBatchIndex].map((logo, i) => (
            <img key={i} src={logo} className="logo" />
          ))}
        </div>

        {/* RIGHT NAV */}
        <div className="nav-right">
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About Us</Link>
          <Link href="/contact">Contact Us</Link>

          <FaPhone className="icon" />
          <FaSearch className="icon" />

          <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>
            <FaBars />
          </button>
        </div>

        {/* MOBILE OVERLAY MENU ONLY */}
        <nav ref={menuRef} className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
            <FaTimes />
          </button>

          <Link href="/">Home</Link>
          <Link href="/Inventory">Current Stock</Link>
          <Link href="/Sellyourcar">Sell Your Car</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About Us</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>

      </header>

      {/* ================= BANNER ================= */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" />
        <div className="banner-text">
          <h1>Welcome to Our Car Dealership</h1>
        </div>
      </section>

      {/* ================= SOLD ================= */}
      <section className="sold-section">
        <h2>Previously Sold Vehicles</h2>
        <div className="sold-box">
          <img src="/images/carwallpaper.webp" />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <img src={footerLogos[currentFooterLogoIndex]} className="footer-logo" />
        <p>Surrey, UK</p>
      </footer>

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