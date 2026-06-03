import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const logos = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
    '/images/aston.png',
    '/images/bugatti.png',
    '/images/mercedes.png',
    '/images/porsche.png'
  ];

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="app">

      <header className="site-header">

        {/* LEFT */}
        <div className="nav-left">
          <a href="tel:1234567890" className="phone">
            <FaPhone />
          </a>

          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
        </div>

        {/* CENTER LOGOS */}
        <div className="logo-box">
          {logos.slice(0, 4).map((l, i) => (
            <img key={i} src={l} alt="" />
          ))}
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>

          <button className="icon-btn" onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`mobile-menu ${open ? 'open' : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/Sellyourcar">Sell</Link>
          <Link href="/NewsAndEvents">Insights</Link>
          <Link href="/About">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

      </header>

      <main className="page">{children}</main>

    </div>
  );
}