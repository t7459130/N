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

  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

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

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('/api/cars');
        if (!res.ok) throw new Error('Failed to fetch cars');
        const data = await res.json();

        const carList = Array.isArray(data.cars) ? data.cars : [];
        setCars(carList.reverse()); // Show newest first
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
          <button className={`menu-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} style={{ zIndex: 1001 }}>
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
            <li><Link href="/Inventory">Inventory</Link></li>
            <li><Link href="/About">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/Sellyourcar">Sell Your Car</Link></li>
            <li><Link href="/NewsAndEvents">News and Events</Link></li>
            <li><Link href="/OtherServices">Other Services</Link></li>
            <li><Link href="/Testimonials">Testimonials</Link></li>
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
          {loadingCars ? (
            <p>Loading latest arrivals...</p>
          ) : (
            <div className="car-listings">
              {cars.slice(0, 6).map((car) => (
                <div key={car._id} className="car-card">
                  <Link href={`/car/${car._id}`}>
                    <img src={car.images?.[0] || '/placeholder.png'} alt={`${car.make} ${car.model}`} />
                    <div className="car-details">
                      <h3>{car.year} {car.make} {car.model}</h3>
                      <p>Price: £{car.price}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
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
            <p>Nabil's Surrey Supercar Website</p>
            <p>Surrey, England, UK</p>
            <p>0777777777</p>
            <p>
              We are authorised and regulated by the Financial Conduct Authority (FCA)
              under FRN 660610. We are a credit broker, not a lender.
            </p>
          </div>
          <div className="footer-links">
            <Link href="/inventory">Current Stock</Link>
            <Link href="/Sellyourcar">Sell Your Car</Link>
            <Link href="/sold">Previously Sold</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/inventory">Luxury Cars</Link>
            <p>&copy; 2025 All Rights Reserved</p>
            <div className="footer-legal">
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
