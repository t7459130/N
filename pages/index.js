import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [wallpapers, setWallpapers] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  /* LOAD CARS */
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

  /* LOAD WALLPAPERS */
  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await fetch("/api/images");
        const data = await res.json();
        setWallpapers(Array.isArray(data) ? data : []);
      } catch {
        setWallpapers([]);
      }
    };

    loadImages();
  }, []);

  /* ROTATE HERO IMAGES */
  useEffect(() => {
    if (!wallpapers.length) return;

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % wallpapers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [wallpapers]);

  return (
    <Layout>
      {/* HERO */}
      <section className="banner">
        {wallpapers.length > 0 ? (
          <img
            src={wallpapers[heroIndex]}
            alt="Luxury Car Showroom"
            className="hero-img"
          />
        ) : (
          <img
            src="/images/carwallpaper.webp"
            alt="Luxury Car Showroom"
            className="hero-img"
          />
        )}

        <div className="banner-text">
          <h1>Luxury Car Dealership</h1>
          <p>Performance. Prestige. Perfection.</p>
        </div>
      </section>

      {/* WELCOME */}
      <section className="welcome-section">
        <h2>Welcome</h2>
        <p>
          We source and deliver the finest luxury vehicles across the United Kingdom.
        </p>
      </section>

      {/* SOLD */}
      <section className="sold-section">
        <h2>Previously Sold</h2>

        {wallpapers.length > 0 && (
          <div className="sold-tile">
            <img
              src={wallpapers[(heroIndex + 1) % wallpapers.length]}
              alt="Previously Sold Luxury Car"
            />
            <p>
              Delivered premium luxury vehicles to clients across the UK and internationally.
            </p>
          </div>
        )}
      </section>

      {/* INVENTORY */}
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