import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { AdminProvider, useAdmin } from '../components/AdminContext';

function SoldContent() {
  const { isAdmin } = useAdmin();

  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  // Load images
  useEffect(() => {
    fetch('/api/wallpaper-images')
      .then((res) => res.json())
      .then((data) => setImages(Array.isArray(data) ? data : []))
      .catch(() => setImages([]));
  }, []);

  // Hero slider
  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <Layout>
      <Head>
        <title>Previously Sold Vehicles</title>
      </Head>

      {/* HERO BANNER */}
      <section className="banner">
        {images.length > 0 ? (
          <img className="hero-img" src={images[currentImage]} alt="Sold vehicle" />
        ) : (
          <img className="hero-img" src="/images/carwallpaper.webp" alt="Sold vehicle" />
        )}

        <div className="banner-text">
          <h1>Previously Sold</h1>
          <p>Luxury vehicles delivered across the UK and internationally</p>
        </div>
      </section>

      {/* WELCOME SECTION */}
      <section className="welcome-section">
        <h2>Recently Sold Vehicles</h2>
        <p>Every vehicle below has successfully found its new home with our discerning clients.</p>
      </section>

      {/* SOLD GRID */}
      <section className="inventory">
        <h2 className="section-title">Sold Inventory</h2>

        {images.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#b0b0b0' }}>
            <p style={{ fontSize: '1.1rem' }}>Loading sold vehicles...</p>
          </div>
        ) : (
          <div className="car-grid">
            {images.map((img, index) => (
              <div key={index} className="car-card">
                <div className="car-image-wrapper">
                  <img src={img} alt="Sold luxury vehicle" />
                  <div className="price-tag sold-tag">SOLD</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer>
        <p>Nabil's Surrey Supercars • Surrey, England • +44 7826 456793</p>
        <p>&copy; 2025 All Rights Reserved</p>
      </footer>
    </Layout>
  );
}

export default function SoldPage() {
  return (
    <AdminProvider>
      <SoldContent />
    </AdminProvider>
  );
}