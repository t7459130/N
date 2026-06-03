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
      setCurrentBatchIndex((prev) => (prev + 1) % logoBatches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* FOOTER LOGO ROTATION */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFooterLogoIndex((prev) => (prev + 1) % footerLogos.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  /* CARS */
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/api/cars');
        const data = await res.json();
        setCars(Array.isArray(data.cars) ? data.cars.reverse() : []);
      } catch (e) {
        setCars([]);
      } finally {
        setLoadingCars(false);
      }
    };
    fetchCars();
  }, []);

  /* SOLD IMAGES */
  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then(setSoldImages)
      .catch(() => {});
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

        {/* LEFT NAV */}
        <div className="nav-left">
          <Link href="/">Home</Link>
          <Link href="/Inventory">Current Stock</Link>
          <Link href="/Sellyourcar">Sell Your Car</Link>
        </div>

        {/* CENTER LOGOS */}
        <div className="logo-bar">
          {logoBatches[currentBatchIndex].map((logo, i) => (
            <img key={i} src={logo} className="desktop-logo" />
          ))}
        </div>

        {/* RIGHT NAV */}
        <div className="nav-right">
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About Us</Link>
          <Link href="/contact">Contact Us</Link>

          <FaPhone className="icon" />
          <FaSearch className="icon" />

          <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/Inventory">Inventory</Link>
          <Link href="/Sellyourcar">Sell Your Car</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
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
          <p>Family-run luxury dealership in Surrey...</p>
          <p>Specialising in supercars, prestige & performance...</p>
          <p>We deliver a premium buying experience...</p>
        </div>
      </section>

      {/* SOLD SECTION (ROTATING IMAGE BOX) */}
      <section className="sold-section">
        <h2>Previously Sold Vehicles</h2>

        <div className="sold-box">
          {soldImages.length > 0 && (
            <img src={soldImages[currentSoldImage]} />
          )}
        </div>

        <p className="sold-text">
          A showcase of luxury vehicles successfully supplied to clients across the UK.
        </p>
      </section>

      {/* INVENTORY */}
      <section className="inventory">
        <h2>Latest Arrivals</h2>

        {loadingCars ? (
          <p>Loading...</p>
        ) : (
          <div className="grid">
            {cars.slice(0, 6).map((car) => (
              <div key={car._id} className="card">
                <img src={car.images?.[0]} />
                <h3>{car.year} {car.make} {car.model}</h3>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logos">
          <img src={footerLogos[currentFooterLogoIndex]} />
        </div>

        <p>Surrey, UK • 0777777777</p>
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