import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';

import SearchOverlay from '../components/SearchOverlay';

export default function Home() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [logoBatchIndex, setLogoBatchIndex] = useState(0);
  const [mobileLogoIndex, setMobileLogoIndex] = useState(0);

  const menuRef = useRef(null);

  const logoBatches = [
    ['/images/ferrari.png', '/images/lamborghini.png', '/images/rolls.png', '/images/bentley.png'],
    ['/images/aston.png', '/images/pagani.png', '/images/bugatti.png', '/images/mercedes.png'],
  ];

  const allLogos = logoBatches.flat();

  const navLeft = [
    { name: 'Home', link: '/' },
    { name: 'Stock', link: '/Inventory' },
    { name: 'Sell', link: '/Sellyourcar' },
  ];

  const navRight = [
    { name: 'Insights', link: '/NewsAndEvents' },
    { name: 'About', link: '/About' },
    { name: 'Contact', link: '/contact' },
  ];

  /* ================= LOGO ROTATION ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoBatchIndex((p) => (p + 1) % logoBatches.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileLogoIndex((p) => (p + 1) % allLogos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  /* ================= FETCH CARS (MONGODB RESTORED) ================= */
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/api/cars');
        const data = await res.json();
        setCars(Array.isArray(data.cars) ? data.cars : []);
      } catch (err) {
        console.error(err);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  /* ================= CLOSE MENU ================= */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="app">

      <Head>
        <title>Surrey Supercars</title>
      </Head>

      {/* ================= HEADER ================= */}
      <header className="header">

        {/* LEFT */}
        <div className="header-left">
          <a href="tel:1234567890" className="call-me">
            <FaPhone />
          </a>

          <div className="desktop-nav left-nav">
            {navLeft.map((n) => (
              <Link key={n.name} href={n.link}>{n.name}</Link>
            ))}
          </div>
        </div>

        {/* CENTER LOGOS */}
        <div className="logo-bar">
          {logoBatches[logoBatchIndex].map((logo, i) => (
            <img key={i} src={logo} className="desktop-logo" />
          ))}
        </div>

        {/* RIGHT */}
        <div className="header-icons">

          <div className="desktop-nav right-nav">
            {navRight.map((n) => (
              <Link key={n.name} href={n.link}>{n.name}</Link>
            ))}
          </div>

          <button className="search-btn" onClick={() => setIsSearchOpen(true)}>
            <FaSearch />
          </button>

          <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE LOGO */}
        <div className="mobile-logo-bar">
          <img src={allLogos[mobileLogoIndex]} className="mobile-logo" />
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {[...navLeft, ...navRight].map((n) => (
              <li key={n.name}>
                <Link href={n.link}>{n.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

      </header>

      {/* ================= HERO ================= */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" className="banner-image" />
        <div className="banner-text">
          <h1>Surrey Supercars</h1>
          <p>Luxury • Performance • Prestige</p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="welcome-section">
        <h2>About Us</h2>
        <p>Luxury car specialists based in the UK.</p>
      </section>

      {/* ================= SOLD ================= */}
      <section className="about-us">
        <h2>Previously Sold</h2>
        <p>View our past luxury vehicles.</p>
        <Link href="/sold" className="about-btn">View Sold</Link>
      </section>

      {/* ================= INVENTORY (MONGODB FIXED) ================= */}
      <section className="latest-arrivals">
        <h2>Latest Inventory</h2>

        {loading ? (
          <p>Loading cars...</p>
        ) : (
          <div className="car-listings">
            {cars.slice(0, 6).map((car) => (
              <div key={car._id} className="car-card">
                <Link href={`/car/${car._id}`}>
                  <img src={car.images?.[0] || '/placeholder.png'} />
                  <h3>{car.year} {car.make} {car.model}</h3>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= SEARCH ================= */}
      <SearchOverlay cars={cars} isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <img src="/images/ferrari.png" className="footer-logo-img" />
      </footer>

    </div>
  );
}