import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
  const [cars, setCars] = useState([]);

  const [heroImages, setHeroImages] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  const [soldImages, setSoldImages] = useState([]);
  const [soldIndex, setSoldIndex] = useState(0);

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
     LOAD SOLD IMAGES
  ========================= */
  useEffect(() => {
    const loadSold = async () => {
      try {
        const res = await fetch("/api/wallpaper-images");
        const data = await res.json();
        setSoldImages(Array.isArray(data) ? data : []);
      } catch {
        setSoldImages([]);
      }
    };

    loadSold();
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

  /* =========================
     SOLD ROTATION
  ========================= */
  useEffect(() => {
    if (!soldImages.length) return;

    const interval = setInterval(() => {
      setSoldIndex((prev) => (prev + 1) % soldImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [soldImages]);

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
        <h2>Welcome to Excellence</h2>
        <p>
          Discover an exclusive selection of premium luxury vehicles sourced from across the world. Each car is hand-picked, meticulously inspected, and presented to the highest standards.
        </p>
      </section>

      {/* =========================
          SOLD
      ========================= */}
      <section className="sold-section">
        <h2>Previously Sold</h2>

        {soldImages.length > 0 && (
          <div className="sold-tile">
            <img
              src={soldImages[soldIndex]}
              alt="Sold Luxury Vehicle"
            />
            <p>
              A curated collection of exceptional vehicles delivered to discerning clients across the UK and internationally. Each transaction represents our commitment to finding the perfect match between car and owner.
            </p>
          </div>
        )}
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
          <div className="car-grid">
            {cars.slice(0, 8).map((car) => (
              <Link key={car._id} href={`/car/${car._id}`} className="car-card">

                <div className="car-image-wrapper">
                  <img
                    src={car.images?.[0]}
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
                    <span>{car.mileage?.toLocaleString()} miles</span>
                    <span>{car.fuelType}</span>
                    <span>{car.transmission}</span>
                  </div>

                  <button className="view-btn">
                    View Details
                  </button>
                </div>

              </Link>
            ))}
          </div>
        )}
      </section>

    </Layout>
  );
}