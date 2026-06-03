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
  const { isAdmin } = useAdmin();

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

  // LOCK SCROLL WHEN MENU OPEN
  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
  }, [isMenuOpen]);

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // LOGO ROTATION
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

  // FETCH CARS
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/api/cars');
        const data = await res.json();
        setCars(Array.isArray(data.cars) ? data.cars.reverse() : []);
      } catch {
        setCars([]);
      } finally {
        setLoadingCars(false);
      }
    };
    fetchCars();
  }, []);

  // SOLD IMAGES
  useEffect(() => {
    fetch('/api/images')
      .then((r) => r.json())
      .then(setSoldImages)
      .catch(() => setSoldImages([]));
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

        <div className="header-left">
          <a href="tel:1234567890" className="call-me">
            <FaPhone />
          </a>

          <div className="desktop-nav">
            <Link href="/">Home</Link>
            <Link href="/Inventory">Inventory</Link>
            <Link href="/Sellyourcar">Sell Your Car</Link>
          </div>
        </div>

        <div className="logo-bar desktop-logo-bar">
          {logoBatches[currentBatchIndex].map((l, i) => (
            <img key={i} src={l} className="desktop-logo" />
          ))}
        </div>

        <div className="header-icons">
          <button onClick={() => setIsSearchOpen(true)} className="icon-btn">
            <FaSearch />
          </button>

          <button onClick={() => setIsMenuOpen((v) => !v)} className="icon-btn">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="logo-bar mobile-logo-bar">
          <img src={footerLogos[currentFooterLogoIndex]} className="mobile-logo" />
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/Inventory">Inventory</Link></li>
            <li><Link href="/About">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/Sellyourcar">Sell Your Car</Link></li>
            <li><Link href="/NewsAndEvents">News</Link></li>
            <li><Link href="/OtherServices">Services</Link></li>
            <li><Link href="/Testimonials">Testimonials</Link></li>
          </ul>
        </nav>
      </header>

      {/* BANNER */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" className="banner-image" />
        <div className="banner-text">
          <h1>Welcome to Our Car Dealership</h1>
          <p>Luxury & Performance Vehicles</p>
        </div>
      </section>

      {/* WELCOME */}
      <section className="welcome-section">
        <div className="welcome-container">
          <h2>Welcome to <span>Nabil's Surrey Supercars</span></h2>

          <p>Family-run luxury dealership based in Surrey...</p>
          <p>We specialise in supercars and prestige vehicles...</p>
          <p>We offer a transparent and premium experience...</p>
          <p>Long-term relationships and trusted service...</p>
        </div>
      </section>

      <SearchOverlay cars={cars} isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main>

        {/* SOLD */}
        <section className="about-us">
          <div className="about-wrapper">

            <div className="about-image-container">
              {soldImages.length > 0 && (
                <img src={soldImages[currentSoldImage]} className="about-image" />
              )}
            </div>

            <div className="about-text-container">
              <h2>Previously Sold Vehicles</h2>
              <p>Luxury and performance vehicles supplied across the UK.</p>
              <Link href="/sold" className="about-btn">View Sold Cars</Link>
            </div>

          </div>
        </section>

        {/* INVENTORY */}
        <section className="latest-arrivals">
          <h2>Latest Arrivals</h2>

          {loadingCars ? (
            <p>Loading...</p>
          ) : (
            <div className="car-listings">
              {cars.slice(0, 6).map((c) => (
                <div key={c._id} className="car-card">
                  <Link href={`/car/${c._id}`}>
                    <img src={c.images?.[0]} />
                    <h3>{c.year} {c.make} {c.model}</h3>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <img src={footerLogos[currentFooterLogoIndex]} className="footer-logo-img" />

          <div className="footer-links">
            <Link href="/Inventory">Inventory</Link>
            <Link href="/sold">Sold</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
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