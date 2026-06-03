import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';

import { AdminProvider, useAdmin } from '../components/AdminContext';
import SearchOverlay from '../components/SearchOverlay';

function SoldContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [currentFooterLogoIndex, setCurrentFooterLogoIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

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

  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

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

  return (
    <div className="app">
      <Head>
        <title>Previously Sold Vehicles</title>
      </Head>

      {/* HEADER */}
      <header className="header" style={{ position: 'relative' }}>
        <div className="header-left">
          <a href="tel:07777777777" className="call-me">
            <FaPhone size={20} />
          </a>

          <div className="desktop-nav nav-left">
            <Link href="/">HOME</Link>
            <Link href="/Inventory">Current Stock</Link>
            <Link href="/Sellyourcar">Sell your car</Link>
          </div>
        </div>

        <div className="logo-bar desktop-logo-bar">
          {logoBatches[currentBatchIndex].map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt=""
              className="desktop-logo"
            />
          ))}
        </div>

        <div className="header-icons">
          <div className="desktop-nav nav-right">
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About Us</Link>
            <Link href="/contact">Contact Us</Link>
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="search-btn"
          >
            <FaSearch size={20} />
          </button>

          <button
            className={`menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="logo-bar mobile-logo-bar">
          <img
            src={footerLogos[currentFooterLogoIndex]}
            alt=""
            className="mobile-logo"
          />
        </div>

        <nav
          ref={menuRef}
          className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
        >
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/Inventory">Inventory</Link></li>
            <li><Link href="/sold">Previously Sold</Link></li>
            <li><Link href="/About">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/Sellyourcar">Sell Your Car</Link></li>

            {isAdmin && (
              <li>
                <Link href="/admin/add-car">
                  Add Car (Admin)
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* BANNER (FIXED WHITE LINE ISSUE) */}
      {images.length > 0 && (
        <section
          className="banner"
          style={{
            position: 'relative',
            height: '70vh',
            overflow: 'hidden',
            lineHeight: 0,
            fontSize: 0
          }}
        >
          <img
            src={images[currentImage]}
            alt="Sold Vehicle"
            className="banner-image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          <div className="banner-text" style={{ lineHeight: 1.4, fontSize: '16px' }}>
            <h1>Previously Sold Vehicles</h1>
            <p>
              A showcase of luxury, prestige and performance vehicles
              supplied to clients throughout Surrey and the UK.
            </p>
          </div>
        </section>
      )}

      {/* WELCOME */}
      <section className="welcome-section">
        <div className="welcome-container">
          <h2>
            Recently <span>Sold</span>
          </h2>

          <p>Every vehicle below has successfully found its new owner.</p>
          <p>We specialise in sourcing exceptional supercars, prestige vehicles and luxury SUVs.</p>
        </div>
      </section>

      {/* SOLD GRID */}
      <main>
        <section className="latest-arrivals">
          <h2>Sold Inventory</h2>

          <div className="car-listings">
            {images.map((img, index) => (
              <div
                key={index}
                className="car-card"
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <img
                  src={img}
                  alt="Sold Vehicle"
                  style={{ display: 'block', width: '100%' }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '-45px',
                    background: '#c40000',
                    color: '#fff',
                    width: '170px',
                    textAlign: 'center',
                    padding: '10px',
                    transform: 'rotate(45deg)',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    fontSize: '14px'
                  }}
                >
                  SOLD
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* SEARCH */}
      <SearchOverlay
        cars={[]}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img
              src={footerLogos[currentFooterLogoIndex]}
              alt=""
              className="footer-logo-img"
            />
          </div>

          <div className="footer-details">
            <p>Nabil's Surrey Supercars</p>
            <p>Surrey, England, UK</p>
            <p>07777777777</p>
          </div>

          <div className="footer-links">
            <Link href="/Inventory">Current Stock</Link>
            <Link href="/sold">Previously Sold</Link>
            <Link href="/Sellyourcar">Sell Your Car</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
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