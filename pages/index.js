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
  const [mobileLogoIndex, setMobileLogoIndex] = useState(0);

  const menuRef = useRef(null);

  const logos = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
  ];

  const mobileLogos = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
    '/images/aston.png',
    '/images/bugatti.png',
  ];

  /* MENU CLOSE */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* MOBILE LOGO ROTATION */
  useEffect(() => {
    const i = setInterval(() => {
      setMobileLogoIndex((p) => (p + 1) % mobileLogos.length);
    }, 2500);
    return () => clearInterval(i);
  }, []);

  /* SOLD */
  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then(setSoldImages)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!soldImages.length) return;
    const i = setInterval(() => {
      setSoldIndex((p) => (p + 1) % soldImages.length);
    }, 3500);
    return () => clearInterval(i);
  }, [soldImages]);

  /* CARS */
  useEffect(() => {
    fetch('/api/cars')
      .then((res) => res.json())
      .then((data) => setCars(Array.isArray(data.cars) ? data.cars : []));
  }, []);

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      {/* HEADER */}
      <header className="header">

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
          {logos.map((l, i) => (
            <img key={i} src={l} className="logo-small" />
          ))}
        </div>

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

        {/* MOBILE LOGO */}
        <div className="mobile-logo">
          <img src={mobileLogos[mobileLogoIndex]} />
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
        <div className="banner-text">
          <h1>Luxury Cars</h1>
        </div>
      </section>

      {/* SOLD */}
      <section>
        <h2>Previously Sold</h2>
        {soldImages.length > 0 && (
          <img className="sold-image" src={soldImages[soldIndex]} />
        )}
      </section>

      {/* INVENTORY */}
      <section>
        <h2>Latest Stock</h2>

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
          {logos.map((l, i) => (
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