import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';

import { AdminProvider } from '../components/AdminContext';
import SearchOverlay from '../components/SearchOverlay';

function HomeContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [cars, setCars] = useState([]);
  const [soldImages, setSoldImages] = useState([]);
  const [soldIndex, setSoldIndex] = useState(0);

  const menuRef = useRef(null);

  const logoRow = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
  ];

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    fetch('/api/cars')
      .then(r => r.json())
      .then(d => setCars(d.cars || []));
  }, []);

  useEffect(() => {
    fetch('/api/images')
      .then(r => r.json())
      .then(setSoldImages);
  }, []);

  useEffect(() => {
    if (!soldImages.length) return;
    const i = setInterval(() => {
      setSoldIndex(p => (p + 1) % soldImages.length);
    }, 3000);
    return () => clearInterval(i);
  }, [soldImages]);

  return (
    <div className="app">
      <Head>
        <title>Car Dealership</title>
      </Head>

      {/* HEADER */}
      <header className="header">

        {/* LEFT NAV ONLY (NO DUPLICATES ANYWHERE) */}
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

        {/* CENTER LOGOS (FIXED CENTERING) */}
        <div className="logo-row">
          {logoRow.map((l, i) => (
            <img key={i} src={l} className="logo-small" />
          ))}
        </div>

        {/* RIGHT NAV ONLY */}
        <div className="header-right">
          <nav className="nav-right">
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <button onClick={() => setIsSearchOpen(true)}>
            <FaSearch />
          </button>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
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

      {/* HERO */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" />
        <div className="banner-text">
          <h1>Luxury Car Dealership</h1>
        </div>
      </section>

      {/* WELCOME */}
      <section className="welcome-section">
        <h2>Welcome</h2>
        <p>Luxury cars, sourced and delivered across the UK.</p>
      </section>

      {/* SOLD SECTION (FIXED TILE + CAROUSEL + TEXT) */}
      <section className="sold-section">

        <h2>Previously Sold</h2>

        <div className="sold-tile">

          <div className="sold-image-box">
            {soldImages.length > 0 && (
              <img src={soldImages[soldIndex]} className="sold-image" />
            )}
          </div>

          <div className="sold-text">
            <h3>Recent Deliveries</h3>
            <p>
              A curated selection of luxury vehicles recently delivered to clients across the UK.
              Every car represents precision sourcing, premium condition, and exceptional provenance.
            </p>

            <p>
              From Ferrari and Lamborghini to Rolls-Royce and Bentley, each vehicle is hand-selected
              and delivered with a bespoke client experience.
            </p>
          </div>

        </div>
      </section>

      {/* INVENTORY */}
      <section className="inventory">
        <h2>Latest Arrivals</h2>

        <div className="grid">
          {cars.slice(0, 6).map((c) => (
            <Link key={c._id} href={`/car/${c._id}`} className="card">
              <img src={c.images?.[0]} />
              <h3>{c.make} {c.model}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logos">
          {logoRow.map((l, i) => (
            <img key={i} src={l} />
          ))}
        </div>
      </footer>

      <SearchOverlay cars={cars} isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
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