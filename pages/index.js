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
    const interval2 = setInterval(() => {
      setCurrentFooterLogoIndex((prev) => (prev + 1) % footerLogos.length);
    }, 1000);

    return () => clearInterval(interval2);
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/api/cars');

        if (!res.ok) {
          throw new Error('Failed to fetch cars');
        }

        const data = await res.json();

        const carList = Array.isArray(data.cars) ? data.cars : [];

        setCars(carList.reverse());
      } catch (err) {
        console.error('Error loading cars:', err);
        setCars([]);
      } finally {
        setLoadingCars(false);
      }
    };

    fetchCars();
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const openSearch = () => setIsSearchOpen(true);

  const closeSearch = () => setIsSearchOpen(false);

  return (
    <div className="app">

      <Head>
        <title>Nabil's Surrey Supercars</title>
        <link rel="icon" href="/images/ferrari.png" />
      </Head>

      {/* HEADER */}

      <header className="header" style={{ position: 'relative' }}>

        <div className="header-left">

          <a href="tel:1234567890" className="call-me">
            <FaPhone size={20} />
          </a>

          <div className="desktop-nav nav-left">
            <Link href="/">HOME</Link>
            <Link href="/Inventory">Current Stock</Link>
            <Link href="/Sellyourcar">Sell your car</Link>
          </div>

        </div>

        {/* CENTER LOGOS */}

        <div className="logo-bar desktop-logo-bar">
          {logoBatches[currentBatchIndex].map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`Logo ${idx}`}
              className="desktop-logo"
            />
          ))}
        </div>

        {/* RIGHT SIDE */}

        <div className="header-icons">

          <div className="desktop-nav nav-right">
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About Us</Link>
            <Link href="/contact">Contact Us</Link>
          </div>

          <button onClick={openSearch} className="search-btn">
            <FaSearch size={20} />
          </button>

          <button
            className={`menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* MOBILE LOGO */}

        <div className="logo-bar mobile-logo-bar">
          <img
            src={footerLogos[currentFooterLogoIndex]}
            alt="Mobile Logo"
            className="mobile-logo"
          />
        </div>

        {/* MENU */}

        <nav
          ref={menuRef}
          className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
        >
          <ul>

            <li><Link href="/">Home</Link></li>
            <li><Link href="/Inventory">Inventory</Link></li>
            <li><Link href="/About">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/Sellyourcar">Sell Your Car</Link></li>
            <li><Link href="/NewsAndEvents">News & Events</Link></li>

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

      {/* HERO */}

      <section className="banner">

        <img
          src="/images/carwallpaper.webp"
          alt="Banner"
          className="banner-image"
        />

        <div className="banner-text">
          <h1>Welcome to Our Car Dealership</h1>
          <p>Discover our exclusive range of luxury cars.</p>
        </div>

      </section>

      {/* SEARCH */}

      <SearchOverlay
        cars={cars}
        isOpen={isSearchOpen}
        onClose={closeSearch}
      />

      {/* ABOUT */}

      <section className="about-us">

        <div className="about-wrapper">

          <div className="about-image-container">
            <img
              src="/images/car1.jpg"
              alt="About Us"
              className="about-image"
            />
          </div>

          <div className="about-text-container">

            <h2>About Us</h2>

            <p>
              Nabil’s Surrey Supercars is a specialist independent luxury car dealership.
            </p>

            <p>
              We are passionate about delivering exceptional vehicles.
            </p>

            <div className="about-links">

              <Link href="/Inventory" className="about-btn">
                Current Stock
              </Link>

              <Link href="/NewsAndEvents" className="about-btn">
                News & Events
              </Link>

              <Link href="/Sellyourcar" className="about-btn">
                Sell Your Car
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* LATEST ARRIVALS */}

      <section className="latest-arrivals">

        <h2>Latest Arrivals</h2>

        {loadingCars ? (
          <p>Loading latest arrivals...</p>
        ) : (
          <div className="car-listings">

            {cars.slice(0, 6).map((car) => (

              <div key={car._id} className="car-card">

                <Link
                  href={`/car/${car._id}`}
                  className="car-link"
                >

                  <img
                    src={car.images?.[0] || '/placeholder.png'}
                    alt={`${car.make} ${car.model}`}
                  />

                  <div className="car-details">

                    <h3>
                      {car.year} {car.make} {car.model}
                    </h3>

                    <p className="car-price">
                      £{Number(car.price).toLocaleString()}
                    </p>

                    <div className="car-specs">

                      <div className="spec-box">
                        <span className="spec-title">Mileage</span>
                        <span className="spec-value">
                          {car.mileage?.toLocaleString()} mi
                        </span>
                      </div>

                      <div className="spec-box">
                        <span className="spec-title">Colour</span>
                        <span className="spec-value">
                          {car.colour || car.color}
                        </span>
                      </div>

                      <div className="spec-box">
                        <span className="spec-title">Year</span>
                        <span className="spec-value">
                          {car.year}
                        </span>
                      </div>

                    </div>

                  </div>

                </Link>

              </div>

            ))}

          </div>
        )}

      </section>

      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-content">

          <div className="footer-logo">

            <img
              src={footerLogos[currentFooterLogoIndex]}
              alt="Footer Logo"
              className="footer-logo-img"
            />

          </div>

          <div className="footer-details">

            <p>Nabil's Surrey Supercar Website</p>
            <p>Surrey, England, UK</p>
            <p>0777777777</p>

          </div>

          <div className="footer-links">

            <Link href="/inventory">Current Stock</Link>
            <Link href="/Sellyourcar">Sell Your Car</Link>
            <Link href="/contact">Contact Us</Link>

            <p>&copy; 2025 All Rights Reserved</p>

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