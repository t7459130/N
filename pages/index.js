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
        <title>Luxury Car Dealership</title>
      </Head>

      {/* ================= HEADER ================= */}
      <header className="header">

        <div className="nav-left">
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
        </div>

        <div className="logo-bar">
          {logoBatches[currentBatchIndex].map((logo, i) => (
            <img key={i} src={logo} className="logo" />
          ))}
        </div>

        <div className="nav-right">
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>

          <FaPhone className="icon" />
          <FaSearch className="icon" />

          <button className="menu-btn" onClick={() => setIsMenuOpen(true)}>
            <FaBars />
          </button>
        </div>

        <nav className={`mobile-menu ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
            <FaTimes />
          </button>

          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

      </header>

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Luxury & Performance Vehicles</h1>
          <p>Handpicked supercars, prestige & rare automotive excellence</p>
          <Link href="/Inventory" className="hero-btn">
            View Inventory
          </Link>
        </div>
      </section>

      {/* ================= FEATURED ABOUT ================= */}
      <section className="about-preview">
        <h2>About Us</h2>
        <p>
          We are a family-run luxury dealership based in Surrey,
          specialising in supercars, performance and prestige vehicles.
        </p>
      </section>

      {/* ================= SOLD ================= */}
      <section className="sold-section">
        <h2>Previously Sold Vehicles</h2>

        <div className="sold-card">
          <div className="sold-image" />
          <div className="sold-content">
            <p>We have successfully supplied luxury vehicles across the UK.</p>
            <Link href="/sold">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* ================= INVENTORY ================= */}
      <section className="inventory-preview">
        <h2>Latest Arrivals</h2>

        <div className="grid">
          <div className="card">
            <div className="placeholder" />
            <h3>Featured Vehicle</h3>
          </div>

          <div className="card">
            <div className="placeholder" />
            <h3>Featured Vehicle</h3>
          </div>

          <div className="card">
            <div className="placeholder" />
            <h3>Featured Vehicle</h3>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <img src={footerLogos[currentFooterLogoIndex]} className="footer-logo" />
        <p>Surrey, UK • Luxury Car Dealership</p>
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