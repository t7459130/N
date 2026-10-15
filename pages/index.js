import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import ThumbnailStrip from "../components/ThumbnailStrip";

// Latest Arrivals tiles: while this is false they point at /404 instead of the
// car page. The car page itself (pages/car/[carId].js) is untouched - set this
// to true to switch the tile links back on.
const CAR_PAGE_LINKS_ENABLED = false;

export default function Home() {
  const [cars, setCars] = useState([]);

  const [heroImages, setHeroImages] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  // Tracks which image is being previewed per car (keyed by car id),
  // so scrolling the thumbnail strip on one card doesn't affect others.
  const [previewIndices, setPreviewIndices] = useState({});
  const getPreviewIndex = (carId) => previewIndices[carId] || 0;
  const setPreviewIndex = (carId, index) =>
    setPreviewIndices((prev) => ({ ...prev, [carId]: index }));

  // PHONE CAROUSEL: on small screens the Latest Arrivals grid becomes a
  // horizontal swipe strip (one tile at a time, see main.css). These keep the
  // little dots under it in sync with whichever tile is showing.
  const carGridRef = useRef(null);
  const [activeCar, setActiveCar] = useState(0);

  const getCarStep = () => {
    const el = carGridRef.current;
    if (!el || !el.firstElementChild) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return el.firstElementChild.getBoundingClientRect().width + gap;
  };

  const handleCarScroll = () => {
    const el = carGridRef.current;
    const step = getCarStep();
    if (!el || !step) return;
    setActiveCar(Math.round(el.scrollLeft / step));
  };

  const scrollToCar = (index) => {
    const el = carGridRef.current;
    const step = getCarStep();
    if (!el || !step) return;
    el.scrollTo({ left: index * step, behavior: "smooth" });
  };

  // Marks <body> so the transparent, full-screen hero header (styled in
  // main.css under `body.home-page`) only applies on this page.
  useEffect(() => {
    document.body.classList.add('home-page');
    return () => document.body.classList.remove('home-page');
  }, []);

  /* =========================
     LOAD CARS
  ========================= */
  useEffect(() => {
    const loadCars = async () => {
      try {
        const res = await fetch("/api/cars");
        const data = await res.json();
        setCars(Array.isArray(data.cars) ? data.cars : []);
      } catch {
        setCars([]);
      }
    };

    loadCars();
  }, []);

  /* =========================
     LOAD HERO IMAGES
  ========================= */
  useEffect(() => {
    const loadHero = async () => {
      try {
        const res = await fetch("/api/header-images");
        const data = await res.json();
        setHeroImages(Array.isArray(data) ? data : []);
      } catch {
        setHeroImages([]);
      }
    };

    loadHero();
  }, []);

  /* =========================
     HERO ROTATION
  ========================= */
  useEffect(() => {
    if (!heroImages.length) return;

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <Layout>

      {/* =========================
          HERO
      ========================= */}
      <section className="banner">
        {heroImages.length > 0 ? (
          <img
            src={heroImages[heroIndex]}
            alt="Luxury Cars"
            className="hero-img"
          />
        ) : (
          <img
            src="/images/carwallpaper.webp"
            alt="Luxury Cars"
            className="hero-img"
          />
        )}

        <div className="banner-text">
          <h1>Luxury Car Dealership</h1>
          <p>Performance. Prestige. Perfection.</p>
        </div>
      </section>

      {/* =========================
          WELCOME
      ========================= */}
      <section className="welcome-section">
        <h2>Welcome to Titan Global Auto Group LTD</h2>
        <p>
          Discover an exclusive selection of premium luxury vehicles sourced from across the world. Each car is hand-picked, meticulously inspected, and presented to the highest standards.
        </p>
      </section>

      {/* =========================
          INVENTORY (NEW CARD UI)
      ========================= */}
      <section className="inventory">
        <h2 className="section-title">Latest Arrivals</h2>

        {cars.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#b0b0b0' }}>
            <p style={{ fontSize: '1.1rem' }}>No vehicles currently available</p>
          </div>
        ) : (
          <div className="car-grid" ref={carGridRef} onScroll={handleCarScroll}>
            {cars.slice(0, 8).map((car) => (
              <Link
                key={car._id}
                href={CAR_PAGE_LINKS_ENABLED ? `/car/${car._id}` : "/404"}
                className="car-card"
              >

                <div className="car-image-wrapper">
                  <img
                    src={car.images?.[getPreviewIndex(car._id)] || car.images?.[0]}
                    alt={`${car.make} ${car.model}`}
                  />

                  <div className="price-tag">
                    £{Number(car.price).toLocaleString()}
                  </div>
                </div>

                <div className="car-info">
                  <h3>
                    {car.year} {car.make} {car.model}
                  </h3>

                  <div className="car-meta">
                    {car.year && <span>Year: {car.year}</span>}
                    {car.colour && <span>Colour: {car.colour}</span>}
                    {car.mileage != null && (
                      <span>Mileage: {Number(car.mileage).toLocaleString()}</span>
                    )}
                  </div>

                  <button className="view-btn">
                    View Details
                  </button>
                </div>

                <div style={{ padding: '0 1.5rem 1.5rem' }}>
                  <ThumbnailStrip
                    images={car.images}
                    currentIndex={getPreviewIndex(car._id)}
                    onSelect={(index) => setPreviewIndex(car._id, index)}
                    visibleCount={6}
                    theme="dark"
                  />
                </div>

              </Link>
            ))}
          </div>
        )}

        {cars.length > 1 && (
          <div className="car-dots" aria-hidden="true">
            {cars.slice(0, 8).map((car, i) => (
              <button
                key={car._id}
                type="button"
                className={`car-dot${i === activeCar ? " active" : ""}`}
                onClick={() => scrollToCar(i)}
              />
            ))}
          </div>
        )}
      </section>

    </Layout>
  );
}
