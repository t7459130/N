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

  /* CLOSE MENU OUTSIDE CLICK */
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFooterLogoIndex((prev) => (prev + 1) % footerLogos.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /* FETCH CARS */
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/api/cars');
        const data = await res.json();
        setCars(Array.isArray(data.cars) ? data.cars.reverse() : []);
      } catch (err) {
        console.error(err);
        setCars([]);
      } finally {
        setLoadingCars(false);
      }
    };

    fetchCars();
  }, []);

  /* FETCH SOLD IMAGES */
  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => setSoldImages(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!soldImages.length) return;

    const interval = setInterval(() => {
      setCurrentSoldImage((prev) => (prev + 1) % soldImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [soldImages]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <div className="app">
      <Head>
        <title>Car Dealership</title>
        <link rel="icon" href="/images/ferrari.png" />
      </Head>

      {/* HEADER */}
      <header className="header">

        <div className="header-left">
          <a href="tel:1234567890" className="call-me">
            <FaPhone size={20} />
          </a>

          <div className="desktop-nav">
            <Link href="/">HOME</Link>
            <Link href="/Inventory">Current Stock</Link>
            <Link href="/Sellyourcar">Sell your car</Link>
          </div>
        </div>

        <div className="logo-bar desktop-logo-bar">
          {logoBatches[currentBatchIndex].map((logo, idx) => (
            <img key={idx} src={logo} className="desktop-logo" />
          ))}
        </div>

        <div className="header-icons">
          <div className="desktop-nav">
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About Us</Link>
            <Link href="/contact">Contact Us</Link>
          </div>

          <button onClick={() => setIsSearchOpen(true)} className="search-btn">
            <FaSearch />
          </button>

          <button className="menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="logo-bar mobile-logo-bar">
          <img src={footerLogos[currentFooterLogoIndex]} className="mobile-logo" />
        </div>

        {/* SAFE FALLBACK INLINE CONTROL */}
        <nav
          ref={menuRef}
          className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
          style={{ display: isMenuOpen ? 'flex' : 'none' }}
        >
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/Inventory">Inventory</Link></li>
            <li><Link href="/About">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/Sellyourcar">Sell Your Car</Link></li>
            <li><Link href="/NewsAndEvents">News and Events</Link></li>
            <li><Link href="/OtherServices">Other Services</Link></li>
            <li><Link href="/Testimonials">Testimonials</Link></li>
          </ul>
        </nav>

      </header>

      {/* BANNER */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" className="banner-image" />
        <div className="banner-text">
          <h1>Welcome to Our Car Dealership</h1>
          <p>Discover our exclusive range of luxury cars.</p>
        </div>
      </section>

      {/* WELCOME */}
      <section className="welcome-section">
        <div className="welcome-container">
          <h2>Welcome to <br /><span>Nabil's Surrey Supercars</span></h2>

          <p>We are a family-run luxury dealership...</p>
          <p>We specialise in supercars and prestige vehicles...</p>
          <p>We deliver a seamless experience...</p>
          <p>We build long-term client relationships...</p>
        </div>
      </section>

      <SearchOverlay cars={cars} isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main>

        <section className="about-us">
          <div className="about-wrapper">

            <div className="about-image-container">
              {soldImages.length > 0 && (
                <img src={soldImages[currentSoldImage]} className="about-image" />
              )}
            </div>

            <div className="about-text-container">
              <h2>Previously Sold Vehicles</h2>
              <p>Luxury vehicles supplied across the UK.</p>

              <Link href="/sold" className="about-btn">
                View All Sold Vehicles
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