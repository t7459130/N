```jsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { AdminProvider, useAdmin } from '../components/AdminContext';
import SearchOverlay from '../components/SearchOverlay';
import Layout from '../components/Layout';

function SoldContent() {
  const { isAdmin } = useAdmin();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

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

  return (
    <div className="app">

      <Head>
        <title>Previously Sold Vehicles</title>
      </Head>

      {images.length > 0 && (
        <section className="banner">

          <img
            className="hero-img"
            src={images[currentImage]}
            alt="Sold Vehicle"
          />

          <div className="banner-text">
            <h1>Previously Sold Vehicles</h1>

            <p>
              A showcase of luxury, prestige and performance vehicles supplied
              across the UK.
            </p>
          </div>

        </section>
      )}

      <section className="welcome-section">
        <h2>Recently Sold</h2>

        <p>
          Every vehicle below has successfully found its new owner.
        </p>
      </section>

      <section className="inventory">

        <h2
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: 'var(--accent)',
            fontFamily: 'Playfair Display',
          }}
        >
          Sold Inventory
        </h2>

        <div className="grid">

          {images.map((img, index) => (
            <div
              key={index}
              className="card"
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
              }}
            >

              <img
                src={img}
                alt="Sold Vehicle"
              />

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
                  zIndex: 2,
                }}
              >
                SOLD
              </div>

            </div>
          ))}

        </div>

      </section>

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
```
