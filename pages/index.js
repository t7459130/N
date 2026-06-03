import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [soldImages, setSoldImages] = useState([]);
  const [soldIndex, setSoldIndex] = useState(0);

  /* LOAD SOLD IMAGES */
  useEffect(() => {
    fetch('/api/images')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSoldImages(data);
        else setSoldImages([]);
      })
      .catch(() => setSoldImages([]));
  }, []);

  /* SOLD CAROUSEL */
  useEffect(() => {
    if (!soldImages.length) return;

    const interval = setInterval(() => {
      setSoldIndex((p) => (p + 1) % soldImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [soldImages]);

  /* LOAD CARS */
  useEffect(() => {
    const loadCars = async () => {
      try {
        const res = await fetch('/api/cars');
        const data = await res.json();

        const list = Array.isArray(data?.cars) ? data.cars : [];
        setCars(list);
      } catch {
        setCars([]);
      }
    };

    loadCars();
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="banner">
        <img src="/images/carwallpaper.webp" alt="Luxury cars" />

        <div className="banner-text">
          <h1>Luxury Car Dealership</h1>
          <p>Performance. Prestige. Perfection.</p>
        </div>
      </section>

      {/* WELCOME */}
      <section className="welcome-section">
        <h2>Welcome</h2>
        <p>
          We source and deliver high-end luxury, performance and prestige vehicles across the UK.
        </p>
      </section>

      {/* SOLD SECTION */}
      <section className="sold-section">
        <h2>Previously Sold</h2>

        {soldImages.length > 0 ? (
          <div className="sold-tile">
            <img src={soldImages[soldIndex]} alt="Sold vehicle" />
            <p>
              A selection of previously delivered luxury vehicles to satisfied clients.
            </p>
          </div>
        ) : (
          <p>No sold vehicles available.</p>
        )}
      </section>

      {/* INVENTORY */}
      <section className="inventory">
        <h2>Latest Arrivals</h2>

        {cars.length > 0 ? (
          <div className="grid">
            {cars.slice(0, 6).map((car) => (
              <Link key={car._id} href={`/car/${car._id}`} className="card">
                <img src={car.images?.[0] || '/placeholder.png'} alt="" />
                <h3>
                  {car.make} {car.model}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <p>No vehicles available.</p>
        )}
      </section>
    </Layout>
  );
}