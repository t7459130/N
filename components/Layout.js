import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* DESKTOP LOGO BATCHES (4 AT A TIME) */
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
    [
      '/images/porsche.png',
      '/images/ferrari.png',
      '/images/rolls.png',
      '/images/lambo.png',
    ],
  ];

  const mobileLogos = [
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

  const [batchIndex, setBatchIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setBatchIndex((prev) => (prev + 1) % logoBatches.length);
    }, 3000);

    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % mobileLogos.length);
    }, 1200);

    return () => clearInterval(i);
  }, []);

  return (
    <header className="header">

      {/* LEFT */}
      <div className="header-left">
        <a href="tel:1234567890" className="call-me">
          <FaPhone size={18} />
        </a>
      </div>

      {/* DESKTOP LOGOS (4 UP ROTATING) */}
      <div className="logo-bar desktop-logo-bar">
        {logoBatches[batchIndex].map((logo, i) => (
          <img key={i} src={logo} className="desktop-logo" />
        ))}
      </div>

      {/* RIGHT ICONS */}
      <div className="header-icons">
        <FaSearch />
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE LOGO (SINGLE ROTATING) */}
      <div className="logo-bar mobile-logo-bar">
        <img
          src={mobileLogos[mobileIndex]}
          className="mobile-logo"
          alt="logo"
        />
      </div>

    </header>
  );
}