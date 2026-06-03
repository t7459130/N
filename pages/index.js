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

  const mobileLogos = logoRow;

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
    fetch('/api/images')
      .then((r) => r.json())
      .then(setSoldImages)
      .catch(() => setSoldImages([]));
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setSoldIndex((p) => (p + 1) % (soldImages.length || 1));
    }, 3000);
    return () => clearInterval(i);
  }, [soldImages]);

  useEffect(() => {
    fetch('/api/cars')
      .then((r) => r.json())
      .then((d) => setCars(Array.isArray(d.cars) ? d.cars : []))
      .catch(() => setCars([]));
  }, []);

  return (
    <div className="app">
      <Head>
        <title>Car Dealership</title>
      </Head>

      {/* HEADER */}
      <header className="header">

        {/* LEFT NAV */}
        <div className="header-left">
          <a className="call-me" href="tel:1234567890">
            <FaPhone />
          </a>

          <nav className="nav-left">
            <Link href="/">Home</Link>
            <Link href="/Inventory">Stock</Link>
            <Link href="/Sellyourcar">Sell</Link>
          </nav>
        </div>

        {/* CENTER LOGOS */}
        <div className="logo-row">
          {logoRow.map((l, i) => (
            <img key={i} src={l} className="logo-small" />
          ))}
        </div>

        {/* RIGHT NAV */}
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

      {/* BANNER */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" />
      </section>

      {/* WELCOME */}
      <section className="welcome-section">
        <h2>Welcome to Our Dealership</h2>
      </section>

      {/* SOLD CAROUSEL */}
      <section className="sold-section">
        <h2>Previously Sold</h2>
        {soldImages.length > 0 && (
          <img src={soldImages[soldIndex]} />
        )}
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