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

  return (
    <div className="app">
      <Head>
        <title>Car Dealership</title>
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

        <div className="logo-bar desktop-logo-bar">
          {logoBatches[currentBatchIndex].map((logo, idx) => (
            <img key={idx} src={logo} alt="" className="desktop-logo" />
          ))}
        </div>

        <div className="header-icons">
          <div className="desktop-nav nav-right">
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About Us</Link>
            <Link href="/contact">Contact Us</Link>
          </div>

          <button onClick={() => setIsSearchOpen(true)} className="search-btn">
            <FaSearch size={20} />
          </button>

          <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="logo-bar mobile-logo-bar">
          <img
            src={footerLogos[currentFooterLogoIndex]}
            className="mobile-logo"
            alt=""
          />
        </div>

        <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
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
      <section className="banner" style={{ lineHeight: 0, fontSize: 0 }}>
        <img
          src="/images/carwallpaper.webp"
          className="banner-image"
          style={{ display: 'block' }}
        />
        <div className="banner-text">
          <h1>Welcome to Our Car Dealership</h1>
          <p>Discover our exclusive range of luxury cars.</p>
        </div>
      </section>

      {/* WELCOME SECTION (RESTORED TEXT) */}
      <section className="welcome-section">
        <div className="welcome-container">
          <h2>
            Welcome to <br />
            <span>Nabil's Surrey Supercars</span>
          </h2>

          <p>
            We are a family-run independent luxury car dealership based in Surrey,
            specialising in a carefully curated selection of supercars, prestige vehicles,
            luxury SUVs, and high-performance automobiles.
          </p>

          <p>
            Founded from a lifelong passion for exceptional engineering and automotive excellence,
            we are committed to offering only the highest quality vehicles presented to showroom standards.
          </p>

          <p>
            We pride ourselves on delivering a professional, discreet, and seamless experience for every client.
            Whether you're purchasing your dream car, selling a cherished vehicle, or sourcing something rare,
            we ensure the process is smooth, transparent, and enjoyable.
          </p>

          <p>
            With specialist knowledge and genuine enthusiasm for luxury motoring,
            we aim to build long-term relationships and provide a level of service
            that reflects the exclusivity of the vehicles we represent.
          </p>
        </div>
      </section>

      <SearchOverlay cars={cars} isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <main>

        {/* SOLD PREVIEW (FIXED MOBILE LAYOUT EXPECTED VIA CSS) */}
        <section className="about-us">
          <div className="about-wrapper">

            <div className="about-image-container">
              {soldImages.length > 0 && (
                <img
                  src={soldImages[currentSoldImage]}
                  className="about-image"
                  alt="Previously Sold Vehicles"
                />
              )}
            </div>

            <div className="about-text-container">
              <h2>Previously Sold Vehicles</h2>

              <p>
                A showcase of luxury, prestige and performance vehicles we have successfully
                supplied to clients across the UK.
              </p>

              <div className="about-links">
                <Link href="/sold" className="about-btn">
                  View All Sold Vehicles
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
                  <Link href={`/car/${car._id}`}>
                    <img src={car.images?.[0] || '/placeholder.png'} />
                    <div className="car-details">
                      <h3>{car.year} {car.make} {car.model}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={footerLogos[currentFooterLogoIndex]} className="footer-logo-img" />
          </div>

          <div className="footer-details">
            <p>Nabil's Surrey Supercar Website</p>
            <p>Surrey, England, UK</p>
            <p>0777777777</p>
          </div>

          <div className="footer-links">
            <Link href="/inventory">Current Stock</Link>
            <Link href="/sold">Previously Sold</Link>
            <Link href="/contact">Contact Us</Link>
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