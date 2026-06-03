import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [soldImages, setSoldImages] = useState([]);
  const [soldIndex, setSoldIndex] = useState(0);

  /* LOAD CARS */
  useEffect(() => {
    const loadCars = async () => {
      try {
        const res = await fetch('/api/cars');
        const data = await res.json();
        setCars(Array.isArray(data.cars) ? data.cars : []);
      } catch {
        setCars([]);
      }
    };
    loadCars();
  }, []);

  /* SOLD IMAGES */
  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then(setSoldImages)
      .catch(() => setSoldImages([]));
  }, []);

  useEffect(() => {
    if (!soldImages.length) return;

    const interval = setInterval(() => {
      setSoldIndex((p) => (p + 1) % soldImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [soldImages]);

  return (
    <Layout>

      {/* HERO */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" alt="hero" />

        <div className="banner-text">
          <h1>Luxury Car Dealership</h1>
          <p>Performance. Prestige. Perfection.</p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section">
        <h2>About Us</h2>
        <p>
          We specialise in luxury, supercars and prestige vehicles sourced
          across the UK and Europe.
        </p>
      </section>

      {/* SOLD SECTION */}
      <section className="section">
        <h2>Recently Sold</h2>

        {soldImages.length > 0 && (
          <div className="tile">
            <img src={soldImages[soldIndex]} alt="sold" />
            <p>Delivered to happy clients across the UK & worldwide.</p>
          </div>
        )}
      </section>

      {/* INVENTORY */}
      <section className="section">
        <h2>Latest Arrivals</h2>

        <div className="grid">
          {cars.slice(0, 6).map((car) => (
            <Link key={car._id} href={`/car/${car._id}`} className="card">
              <img src={car.images?.[0]} alt="" />
              <h3>{car.make} {car.model}</h3>
            </Link>
          ))}
        </div>
      </section>

    </Layout>
  );
}