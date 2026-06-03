import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [soldImages, setSoldImages] = useState([]);
  const [soldIndex, setSoldIndex] = useState(0);

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

  useEffect(() => {
    fetch('/api/cars')
      .then((res) => res.json())
      .then((data) => setCars(data.cars || []))
      .catch(() => setCars([]));
  }, []);

  return (
    <Layout>

      {/* HERO */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" alt="" />
        <div className="banner-text">
          <h1>Luxury Car Dealership</h1>
          <p>Performance. Prestige. Perfection.</p>
        </div>
      </section>

      {/* WELCOME */}
      <section className="section">
        <h2>Welcome</h2>
        <p>We source and deliver premium vehicles across the UK.</p>
      </section>

      {/* SOLD */}
      <section className="section">
        <h2>Previously Sold</h2>

        {soldImages.length > 0 && (
          <div className="tile">
            <img src={soldImages[soldIndex]} alt="" />
          </div>
        )}
      </section>

      {/* INVENTORY */}
      <section className="section">
        <h2>Latest Arrivals</h2>

        <div className="grid">
          {cars.slice(0, 6).map((c) => (
            <Link key={c._id} href={`/car/${c._id}`} className="card">
              <img src={c.images?.[0]} alt="" />
              <p>{c.make} {c.model}</p>
            </Link>
          ))}
        </div>
      </section>

    </Layout>
  );
}