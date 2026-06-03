import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [sold, setSold] = useState([]);
  const [soldIndex, setSoldIndex] = useState(0);

  useEffect(() => {
    fetch('/api/cars')
      .then((r) => r.json())
      .then((d) => setCars(Array.isArray(d.cars) ? d.cars : []))
      .catch(() => setCars([]));
  }, []);

  useEffect(() => {
    fetch('/api/images')
      .then((r) => r.json())
      .then(setSold)
      .catch(() => setSold([]));
  }, []);

  useEffect(() => {
    if (!sold.length) return;
    const t = setInterval(() => {
      setSoldIndex((p) => (p + 1) % sold.length);
    }, 3000);
    return () => clearInterval(t);
  }, [sold]);

  return (
    <Layout>

      <section className="banner">
        <img src="/images/carwallpaper.webp" alt="" />
        <div className="banner-text">
          <h1>Luxury Car Dealership</h1>
          <p>Performance • Prestige • Perfection</p>
        </div>
      </section>

      <section className="section">
        <h2>Welcome</h2>
        <p>Luxury vehicles sourced across the UK & Europe.</p>
      </section>

      <section className="section">
        <h2>Recently Sold</h2>

        {sold.length > 0 && (
          <div className="tile">
            <img src={sold[soldIndex]} alt="" />
            <p>Delivered luxury vehicles to clients worldwide.</p>
          </div>
        )}
      </section>

      <section className="section">
        <h2>Latest Arrivals</h2>

        <div className="grid">
          {cars.slice(0, 6).map((c) => (
            <Link key={c._id} href={`/car/${c._id}`} className="card">
              <img src={c.images?.[0]} alt="" />
              <h3>{c.make} {c.model}</h3>
            </Link>
          ))}
        </div>
      </section>

    </Layout>
  );
}