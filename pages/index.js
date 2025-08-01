// pages/index.js
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

import { AdminProvider, useAdmin } from '../AdminContext';
import AddCarPage from '../components/AddCarPage';
import SearchOverlay from '../components/SearchOverlay';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [currentFooterLogoIndex, setCurrentFooterLogoIndex] = useState(0);
  const menuRef = useRef(null);
  const { isAdmin } = useAdmin();

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

  const [cars, setCars] = useState([
    {
      id: 1,
      make: 'Tesla',
      model: 'Model S',
      year: 2021,
      price: '80000',
      transmission: 'Automatic',
      fuelType: 'Electric',
      mileage: '15000',
      bodyStyle: 'Sedan',
      colour: 'Red',
      images: ['/images/car1.jpg'],
    },
    {
      id: 2,
      make: 'BMW',
      model: 'i8',
      year: 2020,
      price: '120000',
      transmission: 'Automatic',
      fuelType: 'Hybrid',
      mileage: '8000',
      bodyStyle: 'Coupe',
      colour: 'Blue',
      images: ['/images/car2.jpg'],
    },
    {
      id: 3,
      make: 'Audi',
      model: 'R8',
      year: 2019,
      price: '150000',
      transmission: 'Manual',
      fuelType: 'Petrol',
      mileage: '5000',
      bodyStyle: 'Coupe',
      colour: 'Black',
      engineSize: '5.2L',
      images: ['/images/car3.jpg'],
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const addCar = (newCar) => {
    setCars((prev) => [...prev, { ...newCar, id: Date.now() }]);
  };

  return (
    <div className="app">
      <Head>
        <title>Car Dealership</title>
        <link rel="icon" href="/images/ferrari.png" />
      </Head>

      <header className="header" style={{ position: 'relative' }}>
        <div className="header-left">
          <a href="tel:1234567890" className="call‑me">
            <FaPhone size={20} />
          </a>
        </div>

        <div className="logo-bar desktop-logo-bar">
          {logoBatches[currentBatchIndex].map((logo, idx) => (
            <img key={idx} src={logo} alt={`Logo batch ${currentBatchIndex} - ${idx}`} className="desktop-logo" />
          ))}
        </div>

        <div className="header‑icons">
          <button onClick={openSearch} className="search-btn">
            <FaSearch size={20} />
          </button>
          <button
            className={`menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            style={{ zIndex: 1001 }}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="logo-bar mobile-logo-bar">
          <img
            src={footerLogos[currentFooterLogoIndex]}
            alt={`Footer logo ${currentFooterLogoIndex}`}
            className="mobile-logo"
          />
        </div>

        <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/inventory">Inventory</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/sell">Sell Your Car</Link></li>
            <li><Link href="/news">News and Events</Link></li>
            <li><Link href="/services">Other Services</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
            {isAdmin && <li><Link href="/admin/add-car">Add Car (Admin)</Link></li>}
          </ul>
        </nav>
      </header>

      <section className="banner">
        <img src="/images/carwallpaper.webp" alt="Banner" className="banner-image" />
        <div className="banner-text">
          <h1>Welcome to Our Car Dealership</h1>
          <p>Discover our exclusive range of luxury cars.</p>
        </div>
      </section>

      <SearchOverlay cars={cars} isOpen={isSearchOpen} onClose={closeSearch} />

      <main>
        <section className="about-us">
          <div className="about-content">
            <img src="/images/car1.jpg" alt="About Us" className="about-image" />
            <div className="about-text">
              <h2>About Us</h2>
              <p>Welcome to our car dealership. We offer the best selection of luxury cars.</p>
            </div>
          </div>
        </section>

        <section className="latest-arrivals">
          <h2>Latest Arrivals</h2>
          <div className="car-listings">
            {cars.map((car) => (
              <div key={car.id} className="car-card">
                <Link href={`/car/${car.id}`}>
                  <a>
                    <img src={car.images[0]} alt={`${car.make} ${car.model}`} />
                    <div className="car-details">
                      <h3>{car.year} {car.make} {car.model}</h3>
                      <p>Price: £{car.price}</p>
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img
              src={footerLogos[currentFooterLogoIndex]}
              alt={`Footer Logo ${currentFooterLogoIndex}`}
              className="footer-logo-img"
            />
          </div>
          <div className="footer-details">
            <p>Nabils Surrey Supercar Website</p>
            <p>Surrey, England, UK</p>
            <p>0777777777</p>
            <p>
              We are authorised and regulated by the Financial Conduct Authority (FCA)
              under FRN 660610. We are a credit broker, not a lender.
            </p>
          </div>
          <div className="footer-links">
            <Link href="/inventory">Current Stock</Link>
            <Link href="/sell">Sell Your Car</Link>
            <Link href="/sold">Previously Sold</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/luxury-cars">Luxury Cars</Link>
            <p>&copy; 2025 All Rights Reserved</p>
            <div className="footer-legal">
              <Link href="/sitemap">Sitemap</Link> |{' '}
              <Link href="/cookie-policy">Cookie Policy</Link> |{' '}
              <Link href="/privacy-policy">Privacy Policy</Link> |{' '}
              <Link href="/complaints-procedure">Complaints Procedure</Link> |{' '}
              <Link href="/modern-slavery">Modern Slavery Statement</Link>
            </div>
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
