import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';

export default function Header() {

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
      setBatchIndex((p) => (p + 1) % logoBatches.length);
    }, 3000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setMobileIndex((p) => (p + 1) % mobileLogos.length);
    }, 1200);
    return () => clearInterval(i);
  }, []);

  return (
    <header className="header">

      {/* LEFT */}
      <div className="header-left">
        <a href="tel:1234567890" className="call-me">
          <FaPhone />
        </a>
      </div>

      {/* DESKTOP: 4 LOGO BATCH */}
      <div className="logo-bar desktop-logo-bar">
        {logoBatches[batchIndex].map((logo, i) => (
          <img key={i} src={logo} className="desktop-logo" />
        ))}
      </div>

      {/* MOBILE: SINGLE ROTATING LOGO */}
      <div className="logo-bar mobile-logo-bar">
        <img src={mobileLogos[mobileIndex]} className="mobile-logo" />
      </div>

      {/* RIGHT */}
      <div className="header-right">
        <FaBars />
      </div>

    </header>
  );
}