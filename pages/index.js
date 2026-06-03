import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

import { AdminProvider, useAdmin } from '../components/AdminContext';
import SearchOverlay from '../components/SearchOverlay';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [currentFooterLogoIndex, setCurrentFooterLogoIndex] = useState(0);

  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

  const [soldImages, setSoldImages] = useState([]);
  const [currentSoldImage, setCurrentSoldImage] = useState(0);

  const menuRef = useRef(null);

  const logoBatches = [
    ['/images/ferrari.png', '/images/lamborghini.png', '/images/rolls.png', '/images/bentley.png'],
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

  /* CLOSE MENU ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* FOOTER LOGO ROTATION */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFooterLogoIndex((p) => (p + 1) % footerLogos.length);
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
      } catch {
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
      .catch(() => setSoldImages([]));
  }, []);

  useEffect(() => {
    if (!soldImages.length) return;
    const interval = setInterval(() => {
      setCurrentSoldImage((p) => (p + 1) % soldImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [soldImages]);

  return (
    <div className="app">
      <Head>
        <title>Nabil Surrey Supercars</title>
      </Head>

      {/* HEADER */}
      <header className="header">

        <div className="header-left">
          <a href="tel:1234567890" className="icon">
            <FaPhone />
          </a>

          <div className="desktop-nav">
            <Link href="/">Home</Link>
            <Link href="/Inventory">Inventory</Link>
            <Link href="/Sellyourcar">Sell Your Car</Link>
          </div>
        </div>

        <div className="logo-center">
          <img src="/images/ferrari.png" />
        </div>

        <div className="header-right">
          <button className="icon" onClick={() => setIsSearchOpen(true)}>
            <FaSearch />
          </button>

          <button className="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/Inventory">Inventory</Link>
          <Link href="/About">About Us</Link>
          <Link href="/Sellyourcar">Sell Your Car</Link>
          <Link href="/NewsAndEvents">News</Link>
          <Link href="/Testimonials">Testimonials</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <img src="/images/carwallpaper.webp" />
        <div className="hero-text">
          <h1>Luxury Car Dealership</h1>
          <p>Supercars • Prestige • Performance</p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <h2>About Us</h2>

        <p>
          We are a family-run independent luxury car dealership based in Surrey,
          specialising in supercars, prestige vehicles and performance cars.
        </p>

        <p>
          Built from a passion for automotive excellence, we carefully select every vehicle
          to ensure showroom-quality standards.
        </p>

        <p>
          We pride ourselves on transparency, professionalism and long-term customer relationships.
        </p>
      </section>

      {/* SOLD CAROUSEL */}
      <section className="section dark">
        <h2>Previously Sold Vehicles</h2>

        <div className="sold-box">
          {soldImages.length > 0 && (
            <img src={soldImages[currentSoldImage]} className="sold-image" />
          )}
        </div>

        <p className="subtext">
          A showcase of luxury and performance vehicles successfully supplied across the UK.
        </p>
      </section>

      {/* INVENTORY */}
      <section className="section">
        <h2>Latest Arrivals</h2>

        {loadingCars ? (
          <p>Loading...</p>
        ) : (
          <div className="grid">
            {cars.slice(0, 6).map((car) => (
              <div key={car._id} className="card">
                <Link href={`/car/${car._id}`}>
                  <img src={car.images?.[0]} />
                  <h3>{car.year} {car.make} {car.model}</h3>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <img src={footerLogos[currentFooterLogoIndex]} className="footer-logo" />

        <p>© Nabil Surrey Supercars</p>
        <p>Surrey, UK</p>
      </footer>

      <SearchOverlay cars={cars} isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
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