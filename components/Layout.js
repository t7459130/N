import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaBars, FaTimes, FaPhone, FaSearch } from "react-icons/fa";
import SearchOverlay from "./SearchOverlay";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

  const menuRef = useRef(null);

  const logoBatches = [
    ["/images/ferrari.png", "/images/lamborghini.png", "/images/rolls.png", "/images/bentley.png"],
    ["/images/aston.png", "/images/pagani.png", "/images/bugatti.png", "/images/mercedes.png"],
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBatchIndex((prev) => (prev + 1) % logoBatches.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <header className="site-header">

        <div className="header-side header-left">
          <a href="tel:+447826456793" className="phone">
            <FaPhone />
          </a>

          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
        </div>

        <div className="header-center">
          <div className="logo-box desktop-logos">
            {logoBatches[currentBatchIndex].map((logo, i) => (
              <img key={i} src={logo} />
            ))}
          </div>
        </div>

        <div className="header-side header-right">
          <Link href="/sold">Sold</Link>
          <Link href="/contact">Contact</Link>

          <button onClick={() => setSearchOpen(true)}>
            <FaSearch />
          </button>

          <button onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav ref={menuRef} className={`mobile-menu ${open ? "open" : ""}`}>
          <Link href="/">Home</Link>
          <Link href="/Inventory">Stock</Link>
          <Link href="/sold">Sold</Link>
        </nav>
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <main>{children}</main>
    </div>
  );
}