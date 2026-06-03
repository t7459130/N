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
     LOAD HERO IMAGES (HEADER FOLDER)
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
     LOAD SOLD IMAGES (WALLPAPER OR SAME SOURCE)
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
        <h2>Welcome</h2>
        <p>
          We source and deliver the finest luxury vehicles across the United Kingdom.
        </p>
      </section>

      {/* =========================
          PREVIOUSLY SOLD
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
              Delivered premium luxury vehicles to clients across the UK and internationally.
            </p>
          </div>
        )}
      </section>

      {/* =========================
          INVENTORY
      ========================= */}
      <section className="inventory">
        <h2>Latest Arrivals</h2>

        <div className="grid">
          {cars.slice(0, 6).map((car) => (
            <Link key={car._id} href={`/car/${car._id}`} className="card">
              <img src={car.images?.[0]} alt={car.make} />
              <h3>
                {car.make} {car.model}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}