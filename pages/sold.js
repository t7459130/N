import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaSearch, FaPhone, FaBars, FaTimes } from 'react-icons/fa';
import { useRef } from 'react';

import { AdminProvider, useAdmin } from '../components/AdminContext';
import SearchOverlay from '../components/SearchOverlay';

function SoldContent() {
  const { isAdmin } = useAdmin();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const menuRef = useRef(null);

  const mobileLogos = [
    '/images/bentley.png',
    '/images/ferrari.png',
    '/images/aston.png',
    '/images/bugatti.png',
    '/images/pagani.png',
    '/images/porsche.png',
    '/images/mercedes.png',
  ];

  const desktopLogoBatches = [
    ['/images/ferrari.png', '/images/lamborghini.png', '/images/rolls.png', '/images/bentley.png'],
    ['/images/aston.png', '/images/pagani.png', '/images/bugatti.png', '/images/mercedes.png'],
  ];

  // Load images
  useEffect(() => {
    fetch('/api/wallpaper-images')
      .then((res) => res.json())
      .then((data) => setImages(Array.isArray(data) ? data : []))
      .catch(() => setImages([]));
  }, []);

  // Hero slider
  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images]);

  // Logo rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % mobileLogos.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="app">
      <Head>
        <title>Previously Sold Vehicles</title>
      </Head>

      {/* HEADER */}
      <header className="site-header">
        {/* DESKTOP: LEFT */}
        <div className="header-side header-left desktop-only">
          <a href="tel:+447826456793" className="phone">
            <FaPhone />
            <span className="phone-text">+44 7826 456793</span>
          </a>
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
        </div>

        {/* MOBILE: LEFT (PHONE ICON ONLY) */}
        <div className="header-mobile-left mobile-only">
          <a href="tel:+447826456793" className="phone">
            <FaPhone />
          </a>
        </div>

        {/* CENTER - MOBILE LOGO */}
        <div className="header-mobile-logo">
          <img
            src={mobileLogos[currentLogoIndex]}
            alt="Brand logo"
            className="rotating-logo"
          />
        </div>

        {/* CENTER LOGOS (DESKTOP ONLY) */}
        <div className="header-center desktop-logos">
          <div className="logo-box">
            {desktopLogoBatches[Math.floor(currentLogoIndex / 4) % desktopLogoBatches.length].map((logo, i) => (
              <img key={i} src={logo} alt="logo" />
            ))}
          </div>
        </div>

        {/* DESKTOP: RIGHT */}
        <div className="header-side header-right desktop-only">
          <button className="icon-btn" onClick={() => setIsSearchOpen(true)}>
            <FaSearch />
          </button>
          <Link href="/sold">Sold</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
          <button className="icon-btn" onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE: RIGHT (SEARCH + MENU) */}
        <div className="header-mobile-right mobile-only">
          <button className="icon-btn" onClick={() => setIsSearchOpen(true)}>
            <FaSearch />
          </button>
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

      {/* HERO BANNER */}
      <section className="banner">
        {images.length > 0 ? (
          <img className="hero-img" src={images[currentImage]} alt="Sold vehicle" />
        ) : (
          <img className="hero-img" src="/images/carwallpaper.webp" alt="Sold vehicle" />
        )}

        <div className="banner-text">
          <h1>Previously Sold</h1>
          <p>Luxury vehicles delivered across the UK and internationally</p>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="welcome-section">
        <h2>Recently Sold Vehicles</h2>
        <p>Every vehicle below has successfully found its new home with our discerning clients.</p>
      </section>

      {/* SOLD GRID */}
      <section className="inventory">
        <h2 className="section-title">Sold Inventory</h2>

        {images.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#b0b0b0' }}>
            <p style={{ fontSize: '1.1rem' }}>Loading sold vehicles...</p>
          </div>
        ) : (
          <div className="car-grid">
            {images.map((img, index) => (
              <div key={index} className="car-card">
                <div className="car-image-wrapper">
                  <img src={img} alt="Sold luxury vehicle" />
                  <div className="price-tag sold-tag">SOLD</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SEARCH OVERLAY */}
      <SearchOverlay
        cars={[]}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* FOOTER */}
      <footer>
        <p>Nabil's Surrey Supercars • Surrey, England • +44 7826 456793</p>
        <p>&copy; 2025 All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default function SoldPage() {
  return (
    <AdminProvider>
      <SoldContent />
    </AdminProvider>
  );
}