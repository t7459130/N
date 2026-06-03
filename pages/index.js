import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

import Sellyourcar from '../components/Sellyourcar';
import Inventory from '../components/Inventory';
import Testimonials from '../components/Testimonials';
import OtherServices from '../components/OtherServices';
import NewsAndEvents from '../components/NewsAndEvents';
import ContactUs from '../components/ContactUs';
import CarDetail from '../components/CarDetail';

import { AdminProvider, useAdmin } from '../components/AdminContext';
import AddCarPage from '../components/AddCarPageContent';
import SearchOverlay from '../components/SearchOverlay';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [currentFooterLogoIndex, setCurrentFooterLogoIndex] = useState(0);

  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

  // ✅ SOLD CAR CAROUSEL STATE
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

  // MENU CLOSE OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // LOGO ROTATION
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

  // FETCH CURRENT CARS
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/api/cars');
        if (!res.ok) throw new Error('Failed to fetch cars');
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

  // FETCH SOLD IMAGES
  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => setSoldImages(data))
      .catch((err) => console.error(err));
  }, []);

  // SOLD CAR ROTATION
  useEffect(() => {
    if (!soldImages.length) return;

    const interval = setInterval(() => {
      setCurrentSoldImage((prev) => (prev + 1) % soldImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [soldImages]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

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

          <button onClick={openSearch} className="search-btn">
            <FaSearch size={20} />
          </button>

          <button className="menu-btn" onClick={toggleMenu}>
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
        <img src="/images/carwallpaper.webp" className="banner-image" style={{ display: 'block' }} />
        <div className="banner-text">
          <h1>Welcome to Our Car Dealership</h1>
          <p>Discover our exclusive range of luxury cars.</p>
        </div>
      </section>

      {/* WELCOME */}
      <section className="welcome-section">
        <div className="welcome-container">
          <h2>Welcome to <br /><span>Nabil's Surrey Supercars</span></h2>
          <p>We are a family-run independent luxury car dealership...</p>
          <p>Founded through a lifelong passion...</p>
          <p>We pride ourselves on delivering...</p>
          <p>With specialist knowledge...</p>
        </div>
      </section>

      <SearchOverlay cars={cars} isOpen={isSearchOpen} onClose={closeSearch} />

      <main>

        {/* ✅ REPLACED ABOUT SECTION WITH SOLD PREVIEW */}
        <section className="about-us">
          <div className="about-wrapper">

            <div className="about-image-container">
              {soldImages.length > 0 && (
                <img
                  src={soldImages[currentSoldImage]}
                  className="about-image"
                  alt="Previously Sold"
                />
              )}
            </div>

            <div className="about-text-container">
              <h2>Previously Sold Vehicles</h2>

              <p>
                A showcase of luxury, prestige and performance vehicles we have
                successfully supplied to clients across the UK.
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