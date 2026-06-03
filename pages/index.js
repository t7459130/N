import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {

  const [cars, setCars] = useState([]);
  const [sold, setSold] = useState([]);

  useEffect(() => {
    fetch('/api/cars')
      .then(r => r.json())
      .then(d => setCars(d.cars || []));
  }, []);

  useEffect(() => {
    fetch('/api/images')
      .then(r => r.json())
      .then(setSold);
  }, []);

  return (
    <Layout>

      {/* HERO */}
      <div className="banner">
        <img src="/images/carwallpaper.webp" />
      </div>

      {/* ABOUT SECTION */}
      <section className="page">
        <h2>About Us</h2>
        <p>Luxury dealership specialising in supercars and prestige vehicles.</p>
        <Link href="/About">Read More</Link>
      </section>

      {/* SOLD SECTION */}
      <section className="page">
        <h2>Previously Sold</h2>
        {sold.length > 0 && (
          <img src={sold[0]} style={{ width: '100%', borderRadius: 10 }} />
        )}
        <Link href="/sold">View All Sold</Link>
      </section>

      {/* INVENTORY SECTION */}
      <section className="page">
        <h2>Latest Inventory</h2>

        <div className="grid">
          {cars.slice(0, 6).map(car => (
            <Link key={car._id} href={`/car/${car._id}`} className="card">
              <img src={car.images?.[0]} />
              <h3>{car.make} {car.model}</h3>
            </Link>
          ))}
        </div>

        <Link href="/Inventory">View Full Stock</Link>
      </section>

    </Layout>
  );
}