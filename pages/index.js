import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function Home() {
  const [cars, setCars] = useState([]);
  const [sold, setSold] = useState([]);
  const [soldIndex, setSoldIndex] = useState(0);

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

  useEffect(() => {
    if (!sold.length) return;
    const i = setInterval(() => {
      setSoldIndex(p => (p + 1) % sold.length);
    }, 3000);
    return () => clearInterval(i);
  }, [sold]);

  return (
    <Layout cars={cars}>

      {/* HERO */}
      <section className="hero">
        <img src="/images/carwallpaper.webp" />
        <div className="hero-text">
          <h1>Luxury Car Dealership</h1>
          <p>Performance. Prestige. Perfection.</p>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className="section">
        <h2>About Us</h2>
        <p>We source and supply the finest luxury vehicles in the UK.</p>
      </section>

      {/* SOLD CAROUSEL */}
      <section className="section dark">
        <h2>Previously Sold</h2>
        {sold.length > 0 && (
          <img className="carousel" src={sold[soldIndex]} />
        )}
        <p>Previously sold supercars and luxury vehicles.</p>
      </section>

      {/* INVENTORY */}
      <section className="section">
        <h2>Latest Inventory</h2>

        <div className="grid">
          {cars.slice(0, 6).map(c => (
            <div key={c._id} className="card">
              <img src={c.images?.[0]} />
              <h3>{c.make} {c.model}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM BANNERS */}
      <section className="section-row">
        <div className="box">About Us</div>
        <div className="box">Inventory</div>
        <div className="box">Sell Your Car</div>
      </section>

    </Layout>
  );
}