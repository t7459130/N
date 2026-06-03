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

  const logos = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
  ];

  /* CLOSE MENU ON OUTSIDE CLICK */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* FETCH CARS */
  useEffect(() => {
    fetch('/api/cars')
      .then(res => res.json())
      .then(data => setCars(Array.isArray(data.cars) ? data.cars : []))
      .catch(() => setCars([]));
  }, []);

  /* FETCH SOLD IMAGES */
  useEffect(() => {
    fetch('/api/images')
      .then(res => res.json())
      .then(setSoldImages)
      .catch(() => setSoldImages([]));
  }, []);

  /* SOLD CAROUSEL */
  useEffect(() => {
    if (!soldImages.length) return;

    const interval = setInterval(() => {
      setSoldIndex(prev => (prev + 1) % soldImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [soldImages]);

  return (
    <div>

      <Head>
        <title>Home | Dealership</title>
      </Head>

      {/* ================= HEADER ================= */}
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

        {/* CENTER LOGOS */}
        <div className="logo-row">
          {logos.map((logo, i) => (
            <img key={i} src={logo} className="logo-small" alt="logo" />
          ))}
        </div>

        {/* RIGHT */}
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

      {/* ================= BANNER ================= */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" alt="banner" />
        <div className="banner-text">
          <h1>Luxury Cars. Premium Service.</h1>
        </div>
      </section>

      {/* ================= ABOUT / INTRO ================= */}
      <section>
        <h2>Welcome</h2>
        <p style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          We specialise in luxury and performance vehicles across the UK.
        </p>
      </section>

      {/* ================= SOLD SECTION ================= */}
      <section>
        <h2>Previously Sold</h2>

        {soldImages.length > 0 && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={soldImages[soldIndex]}
              style={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
          </div>
        )}
      </section>

      {/* ================= INVENTORY ================= */}
      <section>
        <h2>Latest Stock</h2>

        <div className="grid">
          {cars.slice(0, 6).map(car => (
            <Link key={car._id} href={`/car/${car._id}`} className="card">
              <img src={car.images?.[0] || '/placeholder.png'} />
              <h3>{car.year} {car.make} {car.model}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-logos">
          {logos.map((logo, i) => (
            <img key={i} src={logo} alt="logo" />
          ))}
        </div>
      </footer>

      {/* SEARCH OVERLAY */}
      <SearchOverlay
        cars={cars}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

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