import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function About() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/api/wallpaper')
      .then((res) => res.json())
      .then(setImages)
      .catch(() => setImages([]));
  }, []);

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <Layout>
      {/* HERO */}
      <section className="lux-hero">
        <div
          className="lux-hero-bg"
          style={{
            backgroundImage: `url(${images[index] || ''})`,
          }}
        />

        <div className="lux-overlay" />

        <div className="lux-hero-content">
          <h1>Crafting Automotive Excellence</h1>
          <p>Luxury. Precision. Performance.</p>
        </div>
      </section>

      {/* STORY */}
      <section className="lux-section">
        <h2>Our Mission</h2>
        <p>
          We exist to source and deliver the finest supercars and prestige vehicles
          with unmatched attention to detail and customer experience.
        </p>
      </section>

      <section className="lux-section dark">
        <h2>Vehicle Sourcing</h2>
        <p>
          Every vehicle is hand-selected from trusted partners across the UK and Europe,
          ensuring provenance, condition and specification meet elite standards.
        </p>
      </section>

      <section className="lux-section">
        <h2>Delivery Experience</h2>
        <p>
          From enquiry to handover, every step is curated to feel seamless, personal
          and premium — as expected from a luxury automotive house.
        </p>
      </section>
    </Layout>
  );
}