import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [mobileLogoIndex, setMobileLogoIndex] = useState(0);

  const menuRef = useRef(null);

  const desktopLogos = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
  ];

  const mobileLogos = [
    '/images/ferrari.png',
    '/images/lamborghini.png',
    '/images/rolls.png',
    '/images/bentley.png',
    '/images/aston.png',
    '/images/bugatti.png',
    '/images/mercedes.png',
    '/images/porsche.png',
  ];

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMobileLogoIndex((prev) => (prev + 1) % mobileLogos.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">

      <header className="site-header">

        {/* LEFT NAV