import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FaBars,
  FaTimes,
  FaPhone,
  FaSearch,
  FaChevronRight,
} from 'react-icons/fa';
import SearchOverlay from './SearchOverlay';
import Footer, { PHONE_DIAL, PHONE_MENU_DISPLAY, SOCIALS } from './Footer';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const menuRef = useRef(null);

  const desktopLogoBatches = [
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

  // Mobile logos - all brands
  const mobileLogos = [
    '/images/bentley.png',
    '/images/ferrari.png',
    '/images/aston.png',
    '/images/bugatti.png',
    '/images/pagani.png',
    '/images/porsche.png',
    '/images/mercedes.png',
  ];

  /* CLOSE MENU ON OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* LOGO ROTATION */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % mobileLogos.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      {/* HEADER */}
      <header className="site-header">
        {/* SEARCH - pinned far left on desktop and mobile */}
        <div className="header-search-slot">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </div>

        {/* DESKTOP: LEFT */}
        <div className="header-side header-left desktop-only">
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
          <Link href="/FinanceAndWarranty">Finance &amp; Warranty</Link>
        </div>

        {/* CENTER - MOBILE LOGO */}
        <div className="header-mobile-logo">
          <img
            src={mobileLogos[currentLogoIndex]}
            alt="Brand logo"
            className="rotating-logo"
          />
        </div>

        {/* CENTER LOGOS (DESKTOP ONLY) */}
        <div className="header-center desktop-logos">
          <div className="logo-box">
            {desktopLogoBatches[
              Math.floor(currentLogoIndex / 4) % desktopLogoBatches.length
            ].map((logo, i) => (
              <img key={i} src={logo} alt="logo" />
            ))}
          </div>
        </div>

        {/* DESKTOP: RIGHT */}
        <div className="header-side header-right desktop-only">
          <Link href="/sold">Sold</Link>
          <Link href="/Testimonials">Reviews</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
          <a
            href={`tel:${PHONE_DIAL}`}
            className="icon-btn"
            aria-label="Call us"
          >
            <FaPhone />
          </a>
          <button
            type="button"
            className="icon-btn"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE: RIGHT (MENU) */}
        <div className="header-mobile-right mobile-only">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* DROPDOWN MENU (desktop + mobile) */}
        <nav ref={menuRef} className={`mobile-menu ${open ? 'open' : ''}`}>
          <div className="mobile-menu-links">
            <Link href="/">Home</Link>
            <Link href="/Inventory">Current Stock</Link>
            <Link href="/sold">Sold</Link>
            <Link href="/Sellyourcar">Sell Your Car</Link>
            <Link href="/FinanceAndWarranty">Finance &amp; Warranty</Link>
            <Link href="/Testimonials">Reviews</Link>
            <Link href="/About">
              About Us <FaChevronRight className="nav-chevron" />
            </Link>
            <Link href="/contact">Contact Us</Link>
          </div>

          {/* Shows PHONE_MENU_DISPLAY, dials PHONE_DIAL (both set in Footer.js) */}
          <a href={`tel:${PHONE_DIAL}`} className="mobile-menu-phone">
            <FaPhone /> {PHONE_MENU_DISPLAY}
          </a>

          <div className="mobile-menu-socials">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* SEARCH OVERLAY */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* PAGE CONTENT */}
      <main>{children}</main>

      {/* FOOTER (every page) */}
      <Footer />
    </div>
  );
}
