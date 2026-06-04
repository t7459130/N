import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaSearch, FaPhone } from 'react-icons/fa';

import { AdminProvider, useAdmin } from '../components/AdminContext';
import SearchOverlay from '../components/SearchOverlay';

function SoldContent() {
  const { isAdmin } = useAdmin();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

  const logoBatches = [
    ['/images/ferrari.png', '/images/lamborghini.png', '/images/rolls.png', '/images/bentley.png'],
    ['/images/aston.png', '/images/pagani.png', '/images/bugatti.png', '/images/mercedes.png'],
  ];

  // Load images
  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch(() => setImages([]));
  }, []);

  // hero slider
  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images]);

  // logo rotation (same as homepage)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatchIndex((prev) => (prev + 1) % logoBatches.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">

      <Head>
        <title>Previously Sold Vehicles</title>
      </Head>

      {/* HEADER (IDENTICAL TO HOMEPAGE STRUCTURE) */}
      <header className="site-header">

        <div className="header-side header-left">
          <a href="tel:07777777777" className="phone">
            <FaPhone />
            <span className="phone-text">Call</span>
          </a>

          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
        </div>

        <div className="header-center">
          <div className="logo-box">
            {logoBatches[currentBatchIndex].map((logo, i) => (
              <img key={i} src={logo} alt="logo" />
            ))}
          </div>
        </div>

        <div className="header-side header-right">
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>

          <button className="icon-btn" onClick={() => setIsSearchOpen(true)}>
            <FaSearch />
          </button>
        </div>
      </header>

      {/* HERO (MATCHES HOMEPAGE BANNER EXACTLY) */}
      {images.length > 0 && (
        <section className="banner">
          <img className="hero-img" src={images[currentImage]} alt="Sold vehicle" />

          <div className="banner-text">
            <h1>Previously Sold Vehicles</h1>
            <p>Luxury, prestige and performance delivered across the UK</p>
          </div>
        </section>
      )}

      {/* WELCOME (SAME STYLE AS HOMEPAGE) */}
      <section className="welcome-section">
        <h2>Recently Sold</h2>
        <p>Every vehicle below has successfully found its new owner.</p>
      </section>

      {/* SOLD GRID (USES HOMEPAGE CAR GRID SYSTEM) */}
      <section className="inventory">
        <h2 className="section-title">Sold Inventory</h2>

        <div className="car-grid">
          {images.map((img, index) => (
            <div key={index} className="car-card">

              <div className="car-image-wrapper">
                <img src={img} alt="Sold vehicle" />

                <div className="price-tag" style={{ background: '#c40000' }}>
                  SOLD
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* SEARCH OVERLAY */}
      <SearchOverlay
        cars={[]}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* FOOTER (SAME SIMPLE FOOTER STYLE AS HOMEPAGE) */}
      <footer>
        Nabil's Surrey Supercars • Surrey, UK • 07777777777
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