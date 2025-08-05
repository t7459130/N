import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import Head from 'next/head';
import { useAdmin } from './AdminContext';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [currentFooterLogoIndex, setCurrentFooterLogoIndex] = useState(0);
  const menuRef = useRef(null);
  const { isAdmin } = useAdmin();

  const logoBatches = [
    ['/images/ferrari.png', '/images/lamborghini.png', '/images/rolls.png', '/images/bentley.png'],
    ['/images/aston.png', '/images/pagani.png', '/images/bugatti.png', '/images/mercedes.png'],
  ];

  const footerLogos = [
    '/images/lamborghini.png', '/images/ferrari.png', '/images/porsche.png', '/images/pagani.png',
    '/images/mercedes.png', '/images/aston.png', '/images/bugatti.png', '/images/bentley.png', '/images/rolls.png',
  ];

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    });
    const interval = setInterval(() => {
      setCurrentBatchIndex((prev) => (prev + 1) % logoBatches.length);
    }, 3000);
    const interval2 = setInterval(() => {
      setCurrentFooterLogoIndex((prev) => (prev + 1) % footerLogos.length);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Car Dealership</title>
        <link rel="icon" href="/images/ferrari.png" />
      </Head>

      <header className="header">
        <div className="header-left">
          <a href="tel:1234567890"><FaPhone /></a>
        </div>

        <div className="logo-bar desktop-logo-bar">
          {logoBatches[currentBatchIndex].map((logo, idx) => (
            <img key={idx} src={logo} alt="brand" className="desktop-logo" />
          ))}
        </div>

        <div className="header-icons">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-btn">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className="logo-bar mobile-logo-bar">
          <img src={footerLogos[currentFooterLogoIndex]} alt="rotating" className="mobile-logo" />
        </div>

        <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/inventory">Inventory</Link></li>
            <li><Link href="/About">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/Sellyourcar">Sell Your Car</Link></li>
            <li><Link href="/NewsAndEvents">News and Events</Link></li>
            <li><Link href="/OtherServices">Other Services</Link></li>
            <li><Link href="/Testimonials">Testimonials</Link></li>
            {isAdmin && <li><Link href="/admin/add-car">Add Car</Link></li>}
          </ul>
        </nav>
      </header>

      <main>{children}</main>

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
    </>
  );
}

