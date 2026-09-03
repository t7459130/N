import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FaBars,
  FaTimes,
  FaPhone,
  FaSearch,
  FaChevronRight,
  FaYoutube,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import SearchOverlay from './SearchOverlay';

const PHONE_NUMBER = '+447826456793';
const PHONE_DISPLAY = '01737 428 863';

const SOCIAL_LINKS = [
  { href: 'https://www.youtube.com', label: 'YouTube', Icon: FaYoutube },
  { href: 'https://www.facebook.com', label: 'Facebook', Icon: FaFacebookF },
  { href: 'https://twitter.com', label: 'Twitter', Icon: FaTwitter },
  { href: 'https://www.instagram.com', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://www.linkedin.com', label: 'LinkedIn', Icon: FaLinkedinIn },
];

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
        {/* DESKTOP: LEFT (search sits at the far left, then nav links) */}
        <div className="header-side header-left desktop-only">
          <button
            className="icon-btn header-search-slot"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <FaSearch />
          </button>
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
        </div>

        {/* MOBILE: LEFT (search icon, matching the Romans layout) */}
        <div className="header-mobile-left mobile-only">
          <button
            className="icon-btn header-search-slot"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <FaSearch />
          </button>
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
            {desktopLogoBatches[Math.floor(currentLogoIndex / 4) % desktopLogoBatches.length].map((logo, i) => (
              <img key={i} src={logo} alt="logo" />
            ))}
          </div>
        </div>

        {/* DESKTOP: RIGHT */}
        <div className="header-side header-right desktop-only">
          <Link href="/sold">Sold</Link>
          <Link href="/FinanceAndWarranty">Finance &amp; Warranty</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
          <a href={`tel:${PHONE_NUMBER}`} className="icon-btn phone-icon-only" aria-label="Call us">
            <FaPhone />
          </a>
          <button className="icon-btn" onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE: RIGHT (PHONE + MENU) */}
        <div className="header-mobile-right mobile-only">
          <a href={`tel:${PHONE_NUMBER}`} className="icon-btn phone-icon-only" aria-label="Call us">
            <FaPhone />
          </a>
          <button className="icon-btn" onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE / DESKTOP DROPDOWN MENU */}
        <nav
          ref={menuRef}
          className={`mobile-menu ${open ? 'open' : ''}`}
        >
          <div className="mobile-menu-links">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/Inventory" onClick={() => setOpen(false)}>Current Stock</Link>
            <Link href="/Sellyourcar" onClick={() => setOpen(false)}>Sell Your Car</Link>
            <Link href="/sold" onClick={() => setOpen(false)}>Sold</Link>
            <Link href="/FinanceAndWarranty" onClick={() => setOpen(false)}>Finance &amp; Warranty</Link>
            <Link href="/NewsAndEvents" onClick={() => setOpen(false)}>Insights</Link>
            <Link href="/About" onClick={() => setOpen(false)}>
              About Us
              <FaChevronRight className="nav-chevron" />
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact Us</Link>
          </div>

          <a href={`tel:${PHONE_NUMBER}`} className="mobile-menu-phone">
            <FaPhone /> {PHONE_DISPLAY}
          </a>

          <div className="mobile-menu-socials">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
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
    </div>
  );
}