import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

import { AdminProvider, useAdmin } from '../components/AdminContext';
import SearchOverlay from '../components/SearchOverlay';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [currentFooterLogoIndex, setCurrentFooterLogoIndex] = useState(0);

  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

  const [soldImages, setSoldImages] = useState([]);
  const [currentSoldImage, setCurrentSoldImage] = useState(0);

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

  /* CLOSE MENU */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* LOGOS */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatchIndex((prev) => (prev + 1) % logoBatches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFooterLogoIndex((prev) => (prev + 1) % footerLogos.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /* CAR FETCH */
  useEffect(() => {
    fetch('/api/cars')
      .then((res) => res.json())
      .then((data) => setCars(Array.isArray(data.cars) ? data.cars.reverse() : []))
      .catch(() => setCars([]))
      .finally(() => setLoadingCars(false));
  }, []);

  /* SOLD IMAGES */
  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then(setSoldImages)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!soldImages.length) return;

    const interval = setInterval(() => {
      setCurrentSoldImage((p) => (p + 1) % soldImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [soldImages]);

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
            <FaPhone size={20} />
          </a>

          <div className="desktop-nav">
            <Link href="/">HOME</Link>
            <Link href="/Inventory">Inventory</Link>
            <Link href="/Sellyourcar">Sell</Link>
          </div>
        </div>

        {/* CENTER LOGO */}
        <div className="logo-bar desktop-logo-bar">
          {logoBatches[currentBatchIndex].map((logo, i) => (
            <img key={i} src={logo} className="desktop-logo" />
          ))}
        </div>

        {/* RIGHT */}
        <div className="header-icons">

          <div className="desktop-nav">
            <Link href="/About">About</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <button className="search-btn" onClick={() => setIsSearchOpen(true)}>
            <FaSearch size={20} />
          </button>

          <button
            className="menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE LOGO */}
        <div className="mobile-logo-bar">
          <img src={footerLogos[currentFooterLogoIndex]} className="mobile-logo" />
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/Inventory">Inventory</Link></li>
            <li><Link href="/sold">Sold</Link></li>
            <li><Link href="/About">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/Sellyourcar">Sell</Link></li>
          </ul>
        </nav>

      </header>

      {/* BANNER */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" className="banner-image" />
        <div className="banner-text">
          <h1>Welcome to Our Dealership</h1>
        </div>
      </section>

      {/* WELCOME */}
      <section className="welcome-section">
        <div className="welcome-container">
          <h2>
            Welcome to <span>Nabil's Surrey Supercars</span>
          </h2>

          <p>
            We are a luxury car dealership specialising in supercars, prestige vehicles,
            and high-performance automobiles.
          </p>

          <p>
            We provide a professional, transparent and premium buying experience.
          </p>

          <p>
            Every vehicle is carefully selected and prepared to showroom standard.
          </p>

          <p>
            Our goal is to deliver a seamless and enjoyable customer experience.
          </p>
        </div>
      </section>

      <SearchOverlay cars={cars} isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main>

        {/* SOLD PREVIEW */}
        <section className="about-us">
          <div className="about-wrapper">

            <img
              src={soldImages[currentSoldImage]}
              className="about-image"
            />

            <div className="about-text-container">
              <h2>Previously Sold Vehicles</h2>

              <p>
                A showcase of luxury, prestige and performance vehicles sold across the UK.
              </p>

              <Link href="/sold" className="about-btn">
                View Sold Vehicles
              </Link>
            </div>

          </div>
        </section>

      </main>
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