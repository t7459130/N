import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [soldImages, setSoldImages] = useState([]);
  const [soldIndex, setSoldIndex] = useState(0);

  /* SOLD IMAGES */
  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then(setSoldImages)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!soldImages.length) return;

    const i = setInterval(() => {
      setSoldIndex((p) => (p + 1) % soldImages.length);
    }, 3500);

    return () => clearInterval(i);
  }, [soldImages]);

  /* CARS */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/cars');
        const data = await res.json();
        setCars(Array.isArray(data.cars) ? data.cars : []);
      } catch {
        setCars([]);
      }
    };
    load();
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" alt="Banner" />

        <div className="banner-text">
          <h1>Luxury Car Dealership</h1>
          <p>Performance. Prestige. Perfection.</p>
        </div>
      </section>

      {/* WELCOME */}
      <section className="welcome-section">
        <h2>Welcome</h2>
        <p>We source and deliver the finest luxury vehicles in the UK.</p>
      </section>

      {/* SOLD */}
      <section className="sold-section">
        <h2>Previously Sold</h2>

        {soldImages.length > 0 && (
          <div className="sold-tile">
            <img src={soldImages[soldIndex]} alt="Sold car" />
            <p>Delivered luxury vehicles to clients across the UK and beyond.</p>
          </div>
        )}
      </section>

      {/* INVENTORY */}
      <section className="inventory">
        <h2>Latest Arrivals</h2>

        <div className="grid">
          {cars.slice(0, 6).map((c) => (
            <Link key={c._id} href={`/car/${c._id}`} className="card">
              <img src={c.images?.[0]} alt={`${c.make} ${c.model}`} />
              <h3>{c.make} {c.model}</h3>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}