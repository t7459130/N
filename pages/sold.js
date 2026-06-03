import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

import { AdminProvider, useAdmin } from '../components/AdminContext';
import SearchOverlay from '../components/SearchOverlay';
import Layout from '../components/Layout';

function SoldContent() {
  const { isAdmin } = useAdmin();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const logoBatches = [
    [
      '/images/ferrari.png',
      '/images/lamborghini.png',
      '/images/rolls.png',
      '/images/bentley.png',
    ],
    [
      '/images/aston.png',
      '/images/pagani.png',
      '/images/bugatti.png',
      '/images/mercedes.png',
    ],
  ];

  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

  // LOAD SOLD IMAGES
  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch(() => setImages([]));
  }, []);

  // HERO SLIDER
  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images]);

  // LOGO ROTATION (MATCH HOMEPAGE SPEED)
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

      {/* HERO */}
      {images.length > 0 && (
        <section className="banner">
          <img
            src={images[currentImage]}
            alt="Sold Vehicle"
          />

          <div className="banner-text">
            <h1>Previously Sold Vehicles</h1>
            <p>
              A showcase of luxury, prestige and performance vehicles supplied across the UK.
            </p>
          </div>
        </section>
      )}

      {/* WELCOME */}
      <section className="welcome-section">
        <h2>Recently Sold</h2>
        <p>Every vehicle below has successfully found its new owner.</p>
      </section>

      {/* SOLD GRID */}
      <section className="inventory">
        <h2>Sold Inventory</h2>

        <div className="grid">
          {images.map((img, index) => (
            <div key={index} className="card" style={{ position: 'relative' }}>
              <img src={img} alt="Sold Vehicle" />

              <div
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '-40px',
                  background: '#c40000',
                  color: '#fff',
                  width: '160px',
                  textAlign: 'center',
                  padding: '8px',
                  transform: 'rotate(45deg)',
                  fontWeight: 'bold',
                  letterSpacing: '2px',
                  fontSize: '13px',
                }}
              >
                SOLD
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

    </div>
  );
}

export default function SoldPage() {
  return (
    <AdminProvider>
      <Layout>
        <SoldContent />
      </Layout>
    </AdminProvider>
  );
}