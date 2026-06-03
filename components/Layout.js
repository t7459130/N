import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaSearch } from 'react-icons/fa';
import SearchOverlay from './SearchOverlay';

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);

  const logoBatches = [
    ['/images/ferrari.png', '/images/lamborghini.png', '/images/rolls.png', '/images/bentley.png'],
  ];

  const [logoIndex, setLogoIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setLogoIndex((p) => (p + 1) % logoBatches[0].length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="header">

        {/* LEFT */}
        <div className="header-left">
          <a href="tel:07777777777" className="call-me">
            <FaPhone />
          </a>

          <nav className="desktop-nav">
            <Link href="/">Home</Link>
            <Link href="/inventory">Stock</Link>
            <Link href="/Sellyourcar">Sell</Link>
          </nav>
        </div>

        {/* CENTER LOGO */}
        <div className="logo-bar">
          <img src={logoBatches[0][logoIndex]} className="desktop-logo" />
        </div>

        {/* RIGHT */}
        <div className="header-icons">
          <nav className="desktop-nav">
            <Link href="/NewsAndEvents">Insights</Link>
            <Link href="/About">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <button className="search-btn" onClick={() => setSearchOpen(true)}>
            <FaSearch />
          </button>

          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <nav ref={menuRef} className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/inventory">Stock</Link></li>
            <li><Link href="/Sellyourcar">Sell</Link></li>
            <li><Link href="/NewsAndEvents">Insights</Link></li>
            <li><Link href="/About">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} cars={[]} />

      </header>

      {/* PAGE CONTENT */}
      <main>{children}</main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logos">
          <img src="/images/ferrari.png" />
          <img src="/images/lamborghini.png" />
          <img src="/images/bentley.png" />
          <img src="/images/rolls.png" />
        </div>

        <p>© Surrey Supercars</p>
      </footer>
    </>
  );
}